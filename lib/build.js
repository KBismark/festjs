
var fs = require("fs"),
http = require("http"),
url = require("url");
var fest = require("./compiler");
var config = require("../config.fest.json"),
dirname=__dirname.split("lib")[0];
console.log("\n");
console.log("-->>>");
console.log("-->>> Building your app...");
var changed = 0,i,delayServer=false,fileWatchers=[],
watchingFiles=false;
function watchScriptsDir(){
    let fwatch=fs.watch(dirname+"scripts",(event,filename)=>{
        console.log(filename+" has been "+event+"d!!!");
        unWatchFiles();
        if(event==="rename"){
            getScripts();
        }
        fest.compile(config);
        changed++;
        watchScriptsDir();
    });
    fileWatchers.push(fwatch);
};
function unWatchFiles(){
    for(i in fileWatchers){
        fileWatchers[i].close();
    }
    fileWatchers=[];
    watchingFiles=false;
};
function getScripts(){
    var Scripts = fs.readdirSync(dirname+"scripts","utf8");
    var CompiledScripts = fs.readdirSync(dirname+"compiled","utf8");
    config.scripts=[];
    var script_name = "",i;
    for(i=0;i<Scripts.length;i++){
        switch(Scripts[i]){
            case ".global.js":
                config.scripts.unshift({
                    "compile":false,
                    "path":dirname+"scripts/.global"
                });
            case ".global.jsx":
            case ".app.jsx":
            case ".app.js":
                break;
            default:
                if(Scripts[i].endsWith(".jsx")){
                    script_name = Scripts[i].split(".jsx")[0];
                    config.scripts.push({
                        "compile":true,
                        "exports":[script_name],
                        "path":dirname+"/scripts/"+script_name
                    });
                }
        }
    };
    config.scripts.push({
        "compile":false,
        "path":dirname+"scripts/.app"
    });
    for(i=0;i<CompiledScripts.length;i++){
        if(Scripts.indexOf(CompiledScripts[i]+"x")<0){
            fs.unlinkSync(dirname+"compiled/"+CompiledScripts[i]);
        }
    }
    Scripts=null;
};
if(!config.compileTo||config.compileTo===""){
    config.compileTo=dirname+"app.js";
}
getScripts();
fest.compile(config);
watchScriptsDir();
//Watches static css files
fs.watch(dirname+"statics/css",(event,filename)=>{
    console.log(filename+" has been "+event+"d!!!");
    changed++;
});
//Watches static js files
fs.watch(dirname+"statics/js",(event,filename)=>{
    console.log(filename+" has been "+event+"d!!!");
    changed++;
});
//Watches static img files
fs.watch(dirname+"statics/img",(event,filename)=>{
    console.log(filename+" has been "+event+"d!!!");
    changed++;
});
//Watches static fonts files
fs.watch(dirname+"statics/fonts",(event,filename)=>{
    console.log(filename+" has been "+event+"d!!!");
    changed++;
});
//Watch app files
fs.watch(dirname+"app.html",(event,filename)=>{
    console.log(filename+" has been "+event+"d!!!");
    changed++;
});
fs.watch(dirname+"app.css",(event,filename)=>{
    console.log(filename+" has been "+event+"d!!!");
    changed++;
});
function serve(){
    return http.createServer(function(request,response){
        if(delayServer){response.writeHead(400,{}).end();return;};
        delayServer=false;
        var request_url = url.parse(request.url);
        
        if(request_url.pathname==="/"){
            response.writeHead(200,{
                "Content-Type":"text/html"
            }).end(fs.readFileSync(`${dirname}app.html`));
        }else if(request_url.pathname==="/app.js"){
            response.writeHead(200,{
                "Content-Type":"text/javascript"
            }).end(fs.readFileSync(config.compileTo));
        }else if(request_url.pathname==="/app.css"){
            response.writeHead(200,{
                "Content-Type":"text/css"
            }).end(fs.readFileSync(`${dirname}app.css`));
        }
        else if(request_url.pathname.startsWith("/statics/")){
            var splited_url = request_url.pathname.split("/"),fileContent=null;
            try {
                fileContent = fs.readFileSync(dirname+"statics/"+splited_url[2]+"/"+splited_url[3]);
            } catch (error) {
                fileContent=null;
            }
            if(fileContent!==null){
                switch(splited_url[2]){
                    case "css":
                        response.writeHead(200,{
                            "Content-Type":"text/css"
                        }).write(fileContent);
                        break;
                    case "js":
                        response.writeHead(200,{
                            "Content-Type":"text/javascript"
                        }).write(fileContent);
                        break;
                    case "img":
                        var imageType = splited_url[3].split(".").pop().toLocaleLowerCase();
                        if(imageType!=="svg"){
                            response.writeHead(200,{
                                "Content-Type":`image/${imageType}`
                            }).write(fileContent);
                        }else{
                            response.writeHead(200,{
                                "Content-Type":`image/svg+xml`
                            }).write(fileContent);
                        }
                        break;
                    case "fonts":
                        var fontType = splited_url[3].split(".").pop().toLocaleLowerCase();
                        switch (fontType) {
                            case "woff":
                            case "woff2":
                                fontType="woff";
                            case "ttf":
                                response.writeHead(200,{
                                    "Content-Type":"application/x-font-"+fontType
                                }).write(fileContent);
                                break;
                            case "svg":
                                response.writeHead(200,{
                                    "Content-Type":"image/svg+xml"
                                }).write(fileContent);
                                break;
                            case "eot":
                                response.writeHead(200,{
                                    "Content-Type":"application/vnd.ms-fontobject"
                                }).write(fileContent);
                                break;

                            //Add your own font extention cases here

                            default:
                                response.writeHead(404,{});
                                break;
                        }
                        break;

                    //Add your own path cases here

                    default:
                        response.writeHead(404,{});
                };
                fileContent=null;
                response.end();
            }else{
                //Not found
                response.writeHead(404,{}).end();
            }
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
        }
        else{
            response.writeHead(404,{}).end(null);
        }
    }).listen(8000,function(){
        console.log("-->>> App built. View your app as you make changes to your code at http://localhost:8000 ");
        console.log("-->>>");
        console.log("\n");
    });
};
serve();
