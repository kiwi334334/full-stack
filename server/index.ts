import { Hono } from 'hono'

const app = new Hono();
const Port = 3000;

app.get('/response', (c) => {
    return c.text('hello world!')
})

console.log(`Server Is Running On Port ${Port}`);
Bun.serve({
    port: Port,
    fetch: app.fetch
});