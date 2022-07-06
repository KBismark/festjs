
var n=String.fromCharCode(5432),string_start=6001,nn=String.fromCharCode(4356),attr_name='__ARRAYFIED_ARRAY';
/**
 * 
 * @param {string} code 
 */
function RemoveStrings(code){
    var all_strings=[];
    code = code.replace(/\n/gm,n).replace(/\\"/g,nn);
    var strings = code.match(/"(.*?)"/g),i;
    if(strings){
        for(i=0;i<strings.length;i++){
            code = code.replace(strings[i],String.fromCharCode(string_start+all_strings.length));
            all_strings.push(strings[i]);
            strings[i]=null;
        }
    };
    return {strings:all_strings,code:code};
};

/**
 * 
 * @param {string} code 
 */
function attributeReplacer(code,attr_variables){
    var j,chars=']=?|(<>.:;{})/&!.\\,+*^ [-';
    var attributes = code.match(/\.(.*?)[\]=\?\|\(<>\.:;\{\}\)/&!]/g),i;
    if(attributes){
        for(i=0;i<attributes.length;i++){
            if(attributes[i].length>3){
                attributes[i]=attributes[i].slice(1,attributes[i].length-1);
                if(!/[^a-zA-Z0-9_$]/.test(attributes[i])&&!/^[0-9]/.test(attributes[i])&&!attr_variables.includes(attributes[i])){
                    attr_variables.push(attributes[i]);
                    attributes[i]=`.${attributes[i]}`.replace(/[\\[.*+(?{^$|})]/g,'\\$&');
                    for(j=0;j<chars.length;j++){
                        code=code.replace(RegExp(`${attributes[i]}\\${chars[j]}`,"g"),`[${attr_name}[${attr_variables.length-1}]]${chars[j]}`);
                    }
                    
                }
            }
            attributes[i]=null;
        }
    };
    attributes = code.match(/\.(.*?)[\.\\,\+\*\^ \[-]/g);
    if(attributes){
        for(i=0;i<attributes.length;i++){
            if(attributes[i].length>3){
                attributes[i]=attributes[i].slice(1,attributes[i].length-1);
                if(!/[^a-zA-Z0-9_$]/.test(attributes[i])&&!/^[0-9]/.test(attributes[i])&&!attr_variables.includes(attributes[i])){
                    attr_variables.push(attributes[i]);
                    attributes[i]=`.${attributes[i]}`.replace(/[\\[.*+(?{^$|})]/g,'\\$&');
                    for(j=0;j<chars.length;j++){
                        code=code.replace(RegExp(`${attributes[i]}\\${chars[j]}`,"g"),`[${attr_name}[${attr_variables.length-1}]]${chars[j]}`);
                    }
                }
            }
            attributes[i]=null;
        }
    };
    return {
        code:code
    };
};

function parse(code){
    var worlk_thread = {
        ...RemoveStrings(code)
    },i,j,red_string,attributes=[];
    code=null;
    worlk_thread = {
        strings:worlk_thread.strings,
        ...attributeReplacer(attributeReplacer(worlk_thread.code,attributes).code,attributes)
    };
    for(i=0;i<worlk_thread.strings.length;i++){
        red_string=worlk_thread.strings[i].match(/ (.*?)[^ ]/g);
        if(red_string){
            for(j=0;j<red_string.length;j++){
                worlk_thread.strings[i]=worlk_thread.strings[i].replace(red_string[j],` ${red_string[j][red_string[j].length-1]}`)
            }
        };
        worlk_thread.code=worlk_thread.code.replace(String.fromCharCode(string_start+i),worlk_thread.strings[i].replace(RegExp(nn,"g"),"'"));
        worlk_thread.strings[i]=null;
    };
    worlk_thread.code=worlk_thread.code.replace(RegExp(n,"g"),'\n');
    return `${attributes.length>0?`var ${attr_name}=${JSON.stringify(attributes)};`:''}\n\n${worlk_thread.code.replace(RegExp(nn,"gm"),'\\"')}`;
};
module.exports={parse:parse};
