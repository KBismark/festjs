"use strict";



(function () {
  "use strict";
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; };
//This allows insertion of user provided strings/texts into html 
function insertTexts(text) {
    if (!INSERTABLE) {
      return "";
    }

    ;
    var x = Math.random();
    x = "".concat(x, "x").concat(x);
    var i = "<i class=\"fest\" fest=\"".concat(x, "\"></i>");

    if (typeof TEXTS[x] === "undefined") {
      TEXTS[x] = [];
    };
    //Stores text in TEXTS
    TEXTS[x].push(text);
    //Returns html string rather, instead of text
    return i;
  };
  //The properties of the object returned by Render() should not be changed
  var wce = {
    writable: false,
    configurable: false,
    enumerable: false
  };
  //Declare usefull variables
  var INSERTS = {},
      TEXTS = {};
  var INSERTABLE = false;

  //Main rendering engine
  function props(el, obj, rend, main,tags) {
    var keys = Object.keys(obj),
        k,
        ls,
        l,
        ind,hd;

    if (main) {
      ind = keys.indexOf("fest");

      if (ind >= 0) {
        keys.splice(ind, 1);
      }
    };

    for (k in keys) {
      switch (keys[k]) {
        //Sets style attribute
        case "style":
          if (typeof obj["style"] === "string") {
            el["style"] = obj["style"];
          } else {
            //For style objects
            ls = Object.keys(obj["style"]);

            for (l in ls) {
              el["style"][ls[l]] = obj["style"][ls[l]];
            };
          };
          break;
        //Sets id attribute
        case "id":
          el.setAttribute("id", obj["id"]);
          break;
        //Sets the class attribute
        case "class":
          var att = el.getAttribute("class");//First get the class set in the html 

          if (typeof att === "string") {
            el.setAttribute("class", obj["class"] + " " + att); //Join the class names
          } else {
            el.setAttribute("class", obj["class"]); //Set class from state object only
          };
          break;
        //Sets event handlers on element
        case "events":
          ls = Object.keys(obj["events"]);
          for (l in ls) {
            el.addEventListener(ls[l], obj["events"][ls[l]], false);
          };
          break;
        //Append nodes (HTMLelements and strings) to element
        case "appendNodes":
          ls = Object.keys(obj.appendNodes);
          for (l in ls) {
            if (typeof obj.appendNodes[ls[l]] === "string") {
              el.appendChild(document.createTextNode(obj.appendNodes[ls[l]]));
            } else if (typeof obj.appendNodes[ls[l]] === "function") {
              hd=obj.appendNodes[ls[l]]();
              if (typeof (hd) === "string") {
                el.appendChild(document.createTextNode(hd));
              }else{
                el.appendChild(hd);
              }
              hd=null;
            } else if (Array.isArray(obj.appendNodes[ls[l]]) ||typeof obj.appendNodes[ls[l]].length === "number") {
              for (var i = 0; i < obj.appendNodes[ls[l]].length; i++) {
                if (typeof obj.appendNodes[ls[l]][i] === "string") {
                  el.appendChild(document.createTextNode(obj.appendNodes[ls[l]][i]));
                }else if (typeof obj.appendNodes[ls[l]][i] === "function") {
                  hd=obj.appendNodes[ls[l]][i]();
                  if (typeof (hd) === "string") {
                    el.appendChild(document.createTextNode(hd));
                  }else{
                    el.appendChild(hd);
                  }
                  hd=null;
                }else{
                  el.appendChild(obj.appendNodes[ls[l]][i]);
                }
              }
            } else {
              el.appendChild(obj.appendNodes[ls[l]]);
            }
          };
          break;
        
        case "onrerender"://Implementation is in the Render function
        case "container"://Implementation is in the Render function
        case "fest"://Implementation is in the Render function
        case "onbuild":
          if (typeof rend !== "boolean") {
            el[keys[k]] = obj[keys[k]];
          };
          break;
        case "$tags"://Implementation is in the Render function
        case "$element"://Implementation is in the Render function
          if (tags) {
            el[keys[k]] = obj[keys[k]];
          };
          break;
        default:
          //Sets the attribute directly on the element
          el[keys[k]] = obj[keys[k]];
          break;
      }
    }

    ;
  };
  
  var sym1 = Symbol(),
      sym2 = Symbol("Refs"),
      sym3 = Symbol("data");
  
  //RENDER FUNCTION
  Object.defineProperty(window, "__RENDERFESTAPP", _objectSpread({
    value: function value(festProps, JXS, render) {
      if (typeof render !== "boolean") {
        render = false;
      };
      //main is returned as the Render object. Has all the render methods set as properties
      var main = {};
      main[sym1] = false;
      main[sym3] = {
        hidenRef:null,
        hidden:false,
        container:"div"
      };
      //Binds an object to the rendable function.
      // Has insertTexts() set to TEXT for inserting untrusted texts in the html
      JXS=JXS.bind({
        TEXT: insertTexts
      });

    /**---------------------------------------------------------------------------------------
     * 
     * Below is the implementation of all render methods set on the object returned by Render().
     * 
     * 
     * These methods are created whenever Render is called. 
     */

      Object.defineProperty(main, "raw", _objectSpread({
        value: function value(args, ignoreCont) {
          if(!main){return ""};//If component is disowned, main is no more useable
          if (typeof festProps.container === "string") {
            main[sym3].container = festProps.container;
          }

          ;
          var x, y;

          if (ignoreCont === sym1) {
            INSERTABLE = true;
            return JXS(args);
          } else {
            INSERTABLE = false;

            if (main[sym3].container !== '') {
              x = "<".concat(main[sym3].container, ">");
              y = "</".concat(main[sym3].container, ">");
            } else {
              x = '', y = '';
            }

            ;
            var zz = JXS(args);

            if (typeof zz !== "string") {
              return null;
            }

            ;
            return "".concat(x).concat(zz).concat(y);
          }

          ;
        }
      }, wce));

      if (render) {
        Object.defineProperty(main, "getElement", _objectSpread({
          value: function value(args, rendable) {
            if(!main){return null};//If component is disowned, main is no more useable

            //If rerendering element, calls onrerender()
            if (rendable === sym1) {
              main[sym1] = true;
              festProps.onrerender();
            } else {
              main[sym1] = false;
            };
            if (typeof festProps.container === "string") {
              main[sym3].container = festProps.container;
            };
            var aa = main.raw(args, sym1); //Gets the html text of the rendable function (JSX)

            if (typeof aa !== "string") {
              return null;
            };
            //Creates the container element
            var d = document.createElement(main[sym3].container),
                i;
            d.innerHTML = aa; 
            aa = null;
            //Build the container element
            props(d, festProps, main[sym1], true);

            //Continue with fest elements in the container element
            var fst = d.getElementsByClassName("fest");
            
            if(fst){
              var atn = null,
              fst = Object.values(fst);
              if (festProps.fest) {
                  for (i = 0; i < fst.length; i++) {
                    atn = fst[i].getAttribute("fest");

                    if (typeof atn === "string") {
                      if(festProps.fest[atn]){
                        props(fst[i], festProps.fest[atn], 1, false);
                        festProps.fest[atn]["$element"] = fst[i];
                        fst[i].removeAttribute("fest");
                        fst[i].setAttribute("festag-ftags-festag",atn);
                        fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" fest ").join(" ")+" festag-ftags-festag");
                      }else{
                        if (INSERTS[atn]) {
                          fst[i].parentNode.replaceChild(INSERTS[atn].shift(), fst[i]);
        
                          if (INSERTS[atn].length === 0) {
                            delete INSERTS[atn];
                          }
                        };
                        if (TEXTS[atn]) {
                          fst[i].parentNode.replaceChild(document.createTextNode(TEXTS[atn].shift()), fst[i]);
      
                          if (TEXTS[atn].length === 0) {
                            delete TEXTS[atn];
                          }
                        }
                      }
                        
                    }
                    fst[i]=null;
                  }
              }else{
                for (i = 0; i < fst.length; i++) {
                  if (fst[i].tagName !== "I") {
                    continue;
                  };
                  atn = fst[i].getAttribute("fest");

                  if (typeof atn === "string") {
                    if (INSERTS[atn]) {
                      fst[i].parentNode.replaceChild(INSERTS[atn].shift(), fst[i]);
    
                      if (INSERTS[atn].length === 0) {
                        delete INSERTS[atn];
                      }
                    };
                    if (TEXTS[atn]) {
                      fst[i].parentNode.replaceChild(document.createTextNode(TEXTS[atn].shift()), fst[i]);
  
                      if (TEXTS[atn].length === 0) {
                        delete TEXTS[atn];
                      }
                    }
                  }
                  fst[i]=null;
                };
              }
              fst=null;
            }
            //Build tagged elements selected with $tags
            var tagNames,tags,k,m;
            if(festProps.$tags){
              tagNames = Object.keys(festProps.$tags);
              for(i=0;i<tagNames.length;i++){
                tags=d.getElementsByTagName(tagNames[i]);
                if(tags){
                  for(k=0;k<tags.length;k++){
                    if(tags[k].getAttribute("exclude")===null){
                      props(tags[k], festProps.$tags[tagNames[i]], 1, false,true);
                    }
                  }
                }
              };
              tagNames=null,tags=null;
            };
            if (festProps.fest) {//Don't move up... parent elements must be built first
              fst = d.getElementsByClassName("festag-ftags-festag");
              
              if (fst) {
                fst = Object.values(fst);
                /**Builds $tags of fest elements */
                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("festag-ftags-festag");
                  if (typeof atn === "string" && festProps.fest[atn]&& festProps.fest[atn].$tags) {
                    tagNames = Object.keys(festProps.fest[atn].$tags);
                    for(m=0;m<tagNames.length;m++){
                      tags=fst[i].getElementsByTagName(tagNames[m]);
                      if(tags){
                        for(k=0;k<tags.length;k++){
                          if(tags[k].getAttribute("exclude")===null){
                            props(tags[k], festProps.fest[atn]["$tags"][tagNames[m]], 1, false,true);
                          }
                        }
                      }
                    };
                    fst[i].removeAttribute("festag-ftags-festag");
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" festag-ftags-festag ").join(" "));
                  };
                  fst[i]=null;
                };
                fst = null,tagNames=null,tags=null;
              }
            };
            if (typeof festProps.onbuild === "function") {
              festProps.onbuild();
            }

            ;
            if (!main[sym2]) {
              main[sym2] = d;
            }
            ;
            return d;
          }
        }, wce));
        Object.defineProperty(main, "getElementOnce", _objectSpread({
          value: function value(args, rendable) {
            if(main[sym1]){
              //Reuse already built component
              return main[sym2];
            };

            if (typeof festProps.container === "string") {
              main[sym3].container = festProps.container;
            }

            ;
            var aa = main.raw(args, sym1);
            if (typeof aa !== "string") {
              return null;
            }

            ;
            var d = document.createElement(main[sym3].container),
                i;
            d.innerHTML = aa;
            aa = null;
            props(d, festProps, main[sym1], true);
            
            var fst = d.getElementsByClassName("fest"),atn;
            
            if(fst){
              fst = Object.values(fst);
              if (festProps.fest) {
                /**Builds fest elements */
                  for (i = 0; i < fst.length; i++) {
                    atn = fst[i].getAttribute("fest");

                    if (typeof atn === "string") {
                      if(festProps.fest[atn]){
                        props(fst[i], festProps.fest[atn], 1, false);
                        festProps.fest[atn]["$element"] = fst[i];
                        fst[i].removeAttribute("fest");
                        fst[i].setAttribute("festag-ftags-festag",atn);
                        fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" fest ").join(" ")+" festag-ftags-festag");
                      }else{
                        if (INSERTS[atn]) {
                          fst[i].parentNode.replaceChild(INSERTS[atn].shift(), fst[i]);
        
                          if (INSERTS[atn].length === 0) {
                            delete INSERTS[atn];
                          }
                        };
                        if (TEXTS[atn]) {
                          fst[i].parentNode.replaceChild(document.createTextNode(TEXTS[atn].shift()), fst[i]);
      
                          if (TEXTS[atn].length === 0) {
                            delete TEXTS[atn];
                          }
                        }
                      }
                        
                    }
                    fst[i]=null;
                  }
              }else{
                for (i = 0; i < fst.length; i++) {
                  if (fst[i].tagName !== "I") {
                    continue;
                  };
                  atn = fst[i].getAttribute("fest");

                  if (typeof atn === "string") {
                    if (INSERTS[atn]) {
                      fst[i].parentNode.replaceChild(INSERTS[atn].shift(), fst[i]);
    
                      if (INSERTS[atn].length === 0) {
                        delete INSERTS[atn];
                      }
                    };
                    if (TEXTS[atn]) {
                      fst[i].parentNode.replaceChild(document.createTextNode(TEXTS[atn].shift()), fst[i]);
  
                      if (TEXTS[atn].length === 0) {
                        delete TEXTS[atn];
                      }
                    }
                  }
                  fst[i]=null;
                };
              }
              fst=null;
              atn=null;
            };
            var tagNames,tags,k,m;
            if(festProps.$tags){
              tagNames = Object.keys(festProps.$tags);
              for(i=0;i<tagNames.length;i++){
                tags=d.getElementsByTagName(tagNames[i]);
                if(tags){
                  for(k=0;k<tags.length;k++){
                    if(tags[k].getAttribute("exclude")===null){
                      props(tags[k], festProps.$tags[tagNames[i]], 1, false,true);
                    }
                  }
                }
              };
              tagNames=null,tags=null;
            };
            if (festProps.fest) {//Don't move up... parent elements must be built first
              fst = d.getElementsByClassName("festag-ftags-festag");
              
              if (fst) {
                fst = Object.values(fst);
                /**Builds $tags of fest elements */
                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("festag-ftags-festag");
                  if (typeof atn === "string" && festProps.fest[atn]&& festProps.fest[atn].$tags) {
                    tagNames = Object.keys(festProps.fest[atn].$tags);
                    for(m=0;m<tagNames.length;m++){
                      tags=fst[i].getElementsByTagName(tagNames[m]);
                      if(tags){
                        for(k=0;k<tags.length;k++){
                          if(tags[k].getAttribute("exclude")===null){
                            props(tags[k], festProps.fest[atn]["$tags"][tagNames[m]], 1, false,true);
                          }
                        }
                      }
                    };
                    fst[i].removeAttribute("festag-ftags-festag");
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" festag-ftags-festag ").join(" "));
                  };
                  fst[i]=null;
                };
                fst = null,tagNames=null,tags=null;
              }
            };
            if (typeof festProps.onbuild === "function") {
              festProps.onbuild();
            };
            main[sym1]=true;
            main[sym2] = d;
            return d;
          }
        }, wce));
        Object.defineProperty(main, "getStatelessElement", _objectSpread({
          value: function value(args, rendable) {
            if (!main) {
              return null;
            };

            if (typeof festProps.container === "string") {
              main[sym3].container = festProps.container;
            }

            ;
            var aa = main.raw(args, sym1);
            if (typeof aa !== "string") {
              return null;
            }

            ;
            var d = document.createElement(main[sym3].container),
                i;
            d.innerHTML = aa;
            aa = null;
            props(d, {...festProps,class:typeof (festProps.class)==="string"?festProps.class+" festCostant":"festCostant"}, main[sym1], true);
            
            var fst = d.getElementsByClassName("fest"),atn;
            
            if(fst){
              fst = Object.values(fst);
              if (festProps.fest) {
                /**Builds fest elements */
                  for (i = 0; i < fst.length; i++) {
                    atn = fst[i].getAttribute("fest");

                    if (typeof atn === "string") {
                      if(festProps.fest[atn]){
                        props(fst[i], festProps.fest[atn], 1, false);
                        festProps.fest[atn]["$element"] = fst[i];
                        fst[i].removeAttribute("fest");
                        fst[i].setAttribute("festag-ftags-festag",atn);
                        fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" fest ").join(" ")+" festag-ftags-festag");
                      }else{
                        if (INSERTS[atn]) {
                          fst[i].parentNode.replaceChild(INSERTS[atn].shift(), fst[i]);
        
                          if (INSERTS[atn].length === 0) {
                            delete INSERTS[atn];
                          }
                        };
                        if (TEXTS[atn]) {
                          fst[i].parentNode.replaceChild(document.createTextNode(TEXTS[atn].shift()), fst[i]);
      
                          if (TEXTS[atn].length === 0) {
                            delete TEXTS[atn];
                          }
                        }
                      }
                        
                    }
                    fst[i]=null;
                  }
              }else{
                for (i = 0; i < fst.length; i++) {
                  if (fst[i].tagName !== "I") {
                    continue;
                  };
                  atn = fst[i].getAttribute("fest");

                  if (typeof atn === "string") {
                    if (INSERTS[atn]) {
                      fst[i].parentNode.replaceChild(INSERTS[atn].shift(), fst[i]);
    
                      if (INSERTS[atn].length === 0) {
                        delete INSERTS[atn];
                      }
                    };
                    if (TEXTS[atn]) {
                      fst[i].parentNode.replaceChild(document.createTextNode(TEXTS[atn].shift()), fst[i]);
  
                      if (TEXTS[atn].length === 0) {
                        delete TEXTS[atn];
                      }
                    }
                  }
                  fst[i]=null;
                };
              }
              fst=null;
              atn=null;
            };
            var tagNames,tags,k,m;
            if(festProps.$tags){
              tagNames = Object.keys(festProps.$tags);
              for(i=0;i<tagNames.length;i++){
                tags=d.getElementsByTagName(tagNames[i]);
                if(tags){
                  for(k=0;k<tags.length;k++){
                    if(tags[k].getAttribute("exclude")===null){
                      props(tags[k], festProps.$tags[tagNames[i]], 1, false,true);
                    }
                  }
                }
              };
              tagNames=null,tags=null;
            };
            if (festProps.fest) {//Don't move up... parent elements must be built first
              fst = d.getElementsByClassName("festag-ftags-festag");
              
              if (fst) {
                fst = Object.values(fst);
                /**Builds $tags of fest elements */
                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("festag-ftags-festag");
                  if (typeof atn === "string" && festProps.fest[atn]&& festProps.fest[atn].$tags) {
                    tagNames = Object.keys(festProps.fest[atn].$tags);
                    for(m=0;m<tagNames.length;m++){
                      tags=fst[i].getElementsByTagName(tagNames[m]);
                      if(tags){
                        for(k=0;k<tags.length;k++){
                          if(tags[k].getAttribute("exclude")===null){
                            props(tags[k], festProps.fest[atn]["$tags"][tagNames[m]], 1, false,true);
                          }
                        }
                      }
                    };
                    fst[i].removeAttribute("festag-ftags-festag");
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" festag-ftags-festag ").join(" "));
                  };
                  fst[i]=null;
                };
                fst = null,tagNames=null,tags=null;
              }
            };
            if (typeof festProps.onbuild === "function") {
              festProps.onbuild();
            };
            //Disown (destroy) all references
            main[sym3] = null;
            main = null;
            festProps = null;
            JXS=null;
            return d;
          }
        }, wce));
        Object.defineProperty(main, "rerender", _objectSpread({
          value: function value(args) {
            if(!main){return null};//If component is disowned, main is no more useable
            var n;

            if (typeof festProps.onrerender === "function") {
              n = main.getElement(args, sym1);
            } else {
              n = main.getElement(args, false);
            }

            ;

            if (!n) {
              return null;
            }

            ;
            main[sym2].parentNode.replaceChild(n, main[sym2]);
            main[sym2] = n;
            return n;
          }
        }, wce));
        Object.defineProperty(main, "render", _objectSpread({
          value: function value(args) {
            if(!main){return ""};//If component is disowned, main is no more useable
            if (!INSERTABLE) {
              return "";
            }

            ;
            var x = Math.random();
            x = "".concat(x, "i").concat(x);
            var i = "<i class=\"fest\" fest=\"".concat(x, "\"></i>");

            if (typeof INSERTS[x] === "undefined") {
              INSERTS[x] = [];
            }

            ;
            var n = main.getElement(args);

            if (!n) {
              return '';
            }

            ;
            INSERTS[x].push(n);
            return i;
          }
        }, wce));
        Object.defineProperty(main, "renderOnce", _objectSpread({
          value: function value(args) {
            
            if(!main){return ""};//If component is disowned, main is no more useable
            
            if (!INSERTABLE) {
              return "";
            }

            ;
            var x = Math.random();
            x = "".concat(x, "i").concat(x);
            var i = "<i class=\"fest\" fest=\"".concat(x, "\"></i>");

            if (typeof INSERTS[x] === "undefined") {
              INSERTS[x] = [];
            }

            ;
            var n = main.getElementOnce(args);
            if (!n) {
              return '';
            }

            ;
            INSERTS[x].push(n);
            n=null;
            return i;
          }
        }, wce));
        Object.defineProperty(main, "renderStatelessElement", _objectSpread({
          value: function value(args) {
            
            if(!main){return ""};//If component is disowned, main is no more useable
            
            if (!INSERTABLE) {
              return "";
            }

            ;
            var x = Math.random();
            x = "".concat(x, "i").concat(x);
            var i = "<i class=\"fest\" fest=\"".concat(x, "\"></i>");

            if (typeof INSERTS[x] === "undefined") {
              INSERTS[x] = [];
            }

            ;
            var n = main.getStatelessElement(args);
            if (!n) {
              return '';
            }

            ;
            INSERTS[x].push(n);
            n=null;
            return i;
          }
        }, wce));
        Object.defineProperty(main, "remove", _objectSpread({
          value: function value() {
            if(!main){return}
            main[sym2].parentNode.removeChild(main[sym2]);
            main[sym3] = null;
            main = null;
            festProps = null;
            JXS=null;
          }
        }, wce));
        Object.defineProperty(main, "hide", _objectSpread({
          value: function value() {
            //Hides the component from displaying on screen
          //Don't HIDE if not displayed
            if(!main||main[sym3].hidden){return}
            main[sym3].hidenRef = document.createElement("div");
            main[sym2].parentNode.replaceChild(main[sym3].hidenRef, main[sym2]);
            main[sym3].hidden=true;
          }
        }, wce));
        Object.defineProperty(main, "show", _objectSpread({
          value: function value() {
            //Displays the component on the screen
            //Don't SHOW if not hidden
            if(!main||!main[sym3].hidden){return}
            main[sym3].hidenRef.parentNode.replaceChild(main[sym2], main[sym3].hidenRef);
            main[sym3].hidenRef = null;
            main[sym3].hidden=false;
          }
        }, wce));
        Object.defineProperty(main, "disown", _objectSpread({
          value: function value() {
            //Disown (destroy) all references
            main[sym3] = null;
            main = null;
            festProps = null;
            JXS=null;
          }
        }, wce));
      }

      ;
      return main;
    }
  }, wce));
})();
