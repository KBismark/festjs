
const fs=require("fs"),
babel = require("@babel/core"),
arrayfy = require("./arrayfy"),
uglify = require("uglify-js"),
dirname=__dirname.split("lib")[0];
var checkerString = `
(function(){
    var currentChange=window.localStorage.getItem("changes"),
    http = new XMLHttpRequest(),t_out;
    currentChange=typeof (currentChange)==="string"?currentChange:"00";
    http.responseType="json";
    http.onload=function(){
        clearTimeout(t_out);
        if(http.response.reload){
            window.localStorage.setItem("changes",http.response.ch);
            setTimeout(()=>{
                window.location.replace(window.location.origin);
            },10);
        }else{
            t_out=setTimeout(()=>{
                http.open("GET","/check-changes?"+currentChange,true);
                http.send();
            }, 1000);
        }
    };
    setTimeout(()=>{
        http.open("GET","/check-changes?",true);
        http.send();
    }, 4000);
})();
`;
const _fest = {
    /**
     * 
     * @param {{path:string,exports:string[]}} subtree 
     * @param {boolean|undefined} exportsOnly
     */
    parse:function(subtree,exportsOnly){
        var cst="";
        if(subtree.exports.length>0){
            cst=`const ${subtree.exports[0]}=`
        };
        if(exportsOnly){return cst};
        var code=fs.readFileSync(subtree.path+".jsx","utf8");
       code = `${code.replace(/<fest>/gs,"`").replace(/<\/fest>/gs,"`")};`;
        fs.writeFileSync(subtree.jsPath+".js",`${code.replace(/[\s]export[\s]default[\s]/,'\n;module.exports= ')}\n`);
        return `${cst}(function(){${code.replace(/[\s]export[\s]default[\s]/,'\n;return ').replace(/\/\/<(.*?)\/\/>/gs,"")}})();\n`;
    },
    /**
     * 
     * @param {{production:boolean,compileTo:string,scripts:[{exports:string[],path:string,compile:boolean}...]}} config 
     */
    compile:function(config){
        var i;
        if(config.scripts.length>0){
            fs.writeFileSync(config.compileTo,'');
            for(i in config.scripts){
                config.scripts[i].jsPath = dirname+"compiled/"+config.scripts[i].path.split("/").pop();
                if(config.scripts[i].compile){
                    fs.appendFileSync(config.compileTo,babel.transformSync(_fest.parse(config.scripts[i]),{
                        generatorOpts:{
                            comments:false,
                            minified:config.production?true:config["white-space"]?false:true
                        },
                        presets:[
                            dirname+"node_modules/@babel/preset-env/lib/index.js"
                        ]
                    }).code);
                }else{
                    
                    if(config.scripts[i].exports){
                        let exporters = _fest.parse(config.scripts[i],!0);
                        fs.appendFileSync(config.compileTo,babel.transformSync(`${exporters}(function(){${fs.readFileSync(config.scripts[i].jsPath+".js","utf8").replace(/\/\/<(.*?)\/\/>/gs,"").replace(/;module\.exports=[\s]/,';return ')}})();\n`,{
                            generatorOpts:{
                                comments:false,
                                minified:config.production?true:config["white-space"]?false:true
                            },
                            presets:[
                                dirname+"node_modules/@babel/preset-env/lib/index.js"
                            ]
                        }).code);
                    }else{
                        fs.appendFileSync(config.compileTo,babel.transformSync(`${fs.readFileSync(config.scripts[i].path+".js","utf8").replace(/\/\/<(.*?)\/\/>/gs,"")}\n`,{
                            generatorOpts:{
                                comments:false,
                                minified:config.production?true:config["white-space"]?false:true
                            },
                            presets:[
                                dirname+"node_modules/@babel/preset-env/lib/index.js"
                            ]
                        }).code);
                    }
                }
            };
            
            
            if(config.production){
                var f=config.compileTo.split(".");f=[f.pop(),f.length>0?f.join("."):''];
                //Combined --not minified false?arrayfy.parse(fs.readFileSync(config.compileTo,"utf8")):
                fs.writeFileSync(
                    `${f[1]}.combined.${f[0]}`,
                    babel.transformSync(`(function(){\n var Render=window.__RENDERFESTAPP;\n${fs.readFileSync(config.compileTo,"utf8")}})();`,{ 
                        generatorOpts:{
                            comments:false,
                            minified:false
                        }
                    }).code
                );
                //Production code --minified
                fs.writeFileSync(
                    config.compileTo,
                    uglify.minify(`(function(){var Render=window.__RENDERFESTAPP;${arrayfy.parse(fs.readFileSync(config.compileTo,"utf8"))}})();`,{
                        compress:{
                            drop_console:true
                        }
                    }).code
                );
                //Production code --not minified
                fs.writeFileSync(
                    `${f[1]}.ugly.${f[0]}`,
                    babel.transformSync(
                        fs.readFileSync(config.compileTo,"utf8"),
                        {
                            generatorOpts:{
                                comments:false,
                                minified:false
                            }
                        }
                    ).code
                );
            }else{
                fs.writeFileSync(config.compileTo,`${!config.reload?'':checkerString}\n(function(){\n var Render=window.__RENDERFESTAPP;\n${fs.readFileSync(config.compileTo,"utf8")}})();`);
            }
        }else{
            console.log(">>>>>>>");
            console.log(">>>>>>>");
            console.log("Your code is compiling....");
            fs.writeFileSync(config.compileTo,`(function(){`);
            for(i=0;i<config.scripts.length;i++){
                console.log("/--"+config.scripts[i].path);
                to_Arrayfy+=fs.readFileSync(config.scripts[i].path+".js","utf8");
                fs.appendFileSync(config.compileTo,fs.readFileSync(config.scripts[i].path+".js","utf8"));
            }
            fs.appendFileSync(config.compileTo,`})();`);
            fs.writeFileSync(config.compileTo,arrayfy.parse(fs.readFileSync(config.compileTo,"utf8")));
            console.log(">>>>>>>");
            console.log(">>>>>>>");
            console.log("Your code is compiled!");
        }
    }
};
module.exports=_fest;
