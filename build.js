
var fs = require("fs"),
http = require("http"),
url = require("url");
var fest = require("./lib/fest");
var config = require("./config.fest.json");
console.log("\n");
console.log("-->>>");
console.log("-->>> Building your app...");
var changed = 0,i,delayServer=false,fileWatchers=[],
watchingFiles=false;
function watchFiles(){
    fileWatchers=[];
    for(i in config.scripts){
        let eachFile=config.scripts[i].compile?config.scripts[i].path+".jsx":config.scripts[i].path+".js";
        let fwatch=fs.watch(eachFile,(event,filename)=>{
            console.log(filename+" has been "+event+"d!!!");
            unWatchFiles();
            fest.compile(config);
            changed++;
            watchFiles();
        });
        fileWatchers.push(fwatch);
    };
    watchingFiles=true;
};
function unWatchFiles(){
    for(i in fileWatchers){
        fileWatchers[i].close();
    }
    fileWatchers=[];
    watchingFiles=false;
};
for(let i=0;i<config.scripts.length;i++){
    if(config.scripts[i].path.startsWith("./")){
        config.scripts[i].path=__dirname+"/scripts"+config.scripts[i].path.replace(".","");
    }
};
fest.compile(config);
watchFiles();
function serve(){
    return http.createServer(function(request,response){
        if(delayServer){response.writeHead(400,{}).end();return;};
        delayServer=false;
        var request_url = url.parse(request.url);
        
        if(request_url.pathname==="/"){
            response.writeHead(200,{
                "Content-Type":"text/html"
            }).end(fs.readFileSync(config.main));
        }else if(request_url.pathname===config.appSrcName){
            response.writeHead(200,{
                "Content-Type":"text/javascript"
            }).end(fs.readFileSync(config.compileTo));
        }else if(request_url.pathname===config.festEngineSrcName){
            //changed=0;
            response.writeHead(200,{
                "Content-Type":"text/javascript"
            }).end(fs.readFileSync(__dirname+"/lib/render.js"));
        }else if(request_url.pathname==="/check-changes"){
            response.writeHead(200,{
                "Content-Type":"application/json"
            });
            var u_path = request_url.query;
            if(u_path===""||u_path===changed+""){
                response.end(JSON.stringify({}));
            }else{
                response.end(JSON.stringify({reload:!0,ch:changed+""}),function(){});
            }
    }else{
            if(config.external[request_url.pathname]){
                response.writeHead(200,config.external[request_url.pathname].headers)
                .end(fs.readFileSync(config.external[request_url.pathname].src));
            }else{
                response.writeHead(400,{}).end(null);
            }
            
            
        }
    }).listen(8003,function(){
        console.log("-->>> App built. View your app as you make changes to your code at http://localhost:8003 ");
        console.log("-->>>");
        console.log("\n");
    });
};
serve();