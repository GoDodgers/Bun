import { file } from "bun";


export const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    fetch(req) {  
        
        const url = new URL(req.url);
        console.log(req);
        console.log(url);

        switch (url.pathname) {
            case '/': 
                return new Response(file("./index.html"));
            case '/dist/index.js':
                return new Response(file('./dist/index.js'));
            case '/dist/index-cbc7bef3a51ebccd.css':
                return new Response(file('./dist/index-cbc7bef3a51ebccd.css'));
            default:
                return new Response('404');
        }

    }
});

console.log(`port :: ${ Bun.env.PORT || 3000 }`);
// console.log(`hola!!`);

