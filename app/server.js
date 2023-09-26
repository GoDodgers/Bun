export const server = Bun.serve({
    port: 2222,
    fetch(req) {
        
        const url = new URL(req.url);
        console.log(req);
        
        return new Response("hello world");
    }
});

