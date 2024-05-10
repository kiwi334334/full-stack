import { Hono } from 'hono'
import { JSONFilePreset } from 'lowdb/node'

const app = new Hono();
const Port = 3000;

//DB setup
const db = await JSONFilePreset('db.json', {
    posts: [
        { id: 1, authorId: 1, title: "Hello World!", body: "Welcome to The Universe..." }
    ],
    users: [
        { username: "System", id: 1 },
        { username: "User", id: 2 }
    ]
});

//Routes
app.get('/api/posts', (c) => {
    return c.json(db.data.posts);
});
app.get('/api/posts/:PostID', (c) => {
    return c.json(db.data.posts[c.req.param('PostID') as unknown as number])
});

console.log(`Server Is Running On Port ${Port}`);
Bun.serve({
    port: Port,
    fetch: app.fetch
});