import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono"
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ramnaresh8/medium-common";



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            console.log('User verified from token:', user);
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({ message: "You are not logged in" });
        }
    } catch (e) {
        //console.error('Token verification error:', e);
        c.status(403);
        return c.json({ message: "You are not logged in" });
    }
});


blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    console.log('Creating post for user ID:', authorId);

    try {
        // Check if the user exists
        const userExists = await prisma.user.findUnique({
            where: { id: authorId }
        });

        if (!userExists) {
            console.error('User not found:', authorId);
            c.status(400);
            return c.json({ error: "User not found" });
        }

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });

        return c.json({ id: post.id });
    } catch (e) {
        console.error('Error while posting:', e);
        c.status(403);
        return c.json({ error: "Error while posting" });
    }
});


blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        return c.json({
            id: post.id
        });
    } catch (e) {
        c.status(403)
        return c.json({ error: "error while updating" })

    }
})

// add Pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        posts
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            post
        });
    } catch (e) {
        c.status(411)
        return c.json({ error: "error while fetching blog post" })

    }
})



