import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@ramnaresh8/medium-common"
export const userRouter = new Hono<
    {
        Bindings: {
            DATABASE_URL: string,
            JWT_SECRET: string
        }
    }>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    //console.log(body);

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        });

        console.log("user created", user);

        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        // console.log(jwt);
        return c.json({ jwt });

    } catch (e) {
        console.error('Signup error:', e);
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
})
