import { file } from "bun";

import * as fs from 'fs';


export const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    fetch(req) {  
        const url = new URL(req.url);
        let dir = import.meta.dir;
        let dist = './dist/';

        import.meta.dist = "/Users/berto/Desktop/playground/bun/bun/dist";
        
        // console.log(`dir ::`, dir, '\n');

        console.log(req, '\n');
        console.log(url, '\n');
        console.log(url.pathname, '\n');

        // console.log("this actual file", import.meta.url);
        
        if (url.pathname == '/') {
            return new Response(file("./index.html"));
        }
        
        if (url.pathname.match(/css$/)) {
            
            let distFiles = fs.readdirSync(dist);

            console.log(`distFiles ::\n`, distFiles);

            let fName = distFiles.filter((f) => {
                if (f.match(/css$/)) {
                    if (f.match(/index/) && url.pathname.match(/index/)) {
                        return true;
                    }
                    if (f.match(/main/) && url.pathname.match(/main/)) {
                        return true;
                    }
                }
                return false;
            });
            
            console.log(`distFiles Filtered ::\n`, fName);

            fName.reduce((acc, curr) => {

                console.log(`dist  + acc`, dist  + acc);
                console.log(`dist  + curr`, dist  + curr);

                var time1 = fs.statSync(dist + acc).ctime;
                var time2 = fs.statSync(dist + curr).ctime;

                if (time1 > time2) {
                    fs.unlink(import.meta.dist + '/' + curr, (err) => {
                        if (err) throw err;
                        console.log(`${ import.meta.dist + '/' + f } was deleted`);
                    });
                    return acc;
                }

                fs.unlink(import.meta.dist + '/' + acc, (err) => {
                    if (err) throw err;
                    console.log(`${ import.meta.dist + '/' + f } was deleted`);
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

