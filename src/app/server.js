import { file } from "bun";

import * as fs from 'fs';


export const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    fetch(req) {  
        const url = new URL(req.url);
        let filePath = "." + url.pathname;
        let dir = import.meta.dir;
        let dist = './dist/';

        import.meta.dist = "/Users/berto/Desktop/playground/bun/bun/dist";
        
        console.log(`dir ::`, dir, '\n');

        console.log(req, '\n');
        console.log(url, '\n');
        console.log(url.pathname, '\n');

        // console.log("this actual file", import.meta.url);
        
        if (url.pathname == '/') {
            return new Response(file("./index.html"));
        }
        
        if (url.pathname.match(/css$/)) {
            
            let fName = fs.readdirSync(dist).filter((f) => f.match(/css$/))
            .reduce((acc, curr) => {
                if (!acc) {
                    return curr;
                }
                console.log(dist  + acc);
                console.log(dist  + curr);

                var time1 = fs.statSync(dist + acc).ctime;
                var time2 = fs.statSync(dist + curr).ctime;

                if (time1 > time2) {
                    // fs.unlink(dist + curr);
                    fs.unlink(import.meta.dist + '/' + curr, (err) => {
                        if (err) throw err;
                        console.log(`${import.meta.dist + '/' + f} was deleted`);
                    });
                    return acc;
                }
                fs.unlink(import.meta.dist + '/' + acc, (err) => {
                    if (err) throw err;
                    console.log(`${import.meta.dist + '/' + f} was deleted`);
                });
                return curr;
            });
            
            console.log(`fName ::`, fName);
            var f = file('./dist/' + fName);

        } else {
            var f = file("." + url.pathname);
        }
        
        
        console.log(`f.size ::`, f.size, "\n");

        if (f.size) {
            return new Response(f);
        }

        return new Response("404");
    }
});

console.log(`port :: ${ Bun.env.PORT || 3000 }`);

