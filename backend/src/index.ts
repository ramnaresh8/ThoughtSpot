import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { verify } from 'hono/jwt';
import { cors } from 'hono/cors'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.use('/api/v1/blog/*', async (c, next) => {
  //get the header
  //verify the header
  //if header is correct , we need to proceed
  //if not, we need to return the user 403 status code
  const token = c.req.header("authorization") || "";
  //const token = header.split(" ")[1];
  const response = await verify(token, c.env.DATABASE_URL);

  if (response.id) {
    next();
  } else {
    c.status(403)
    return c.json({ error: "Unauthorized" })
  }

})



export default app
