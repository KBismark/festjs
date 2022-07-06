"use strict";



(function () {
  "use strict";
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; };
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
    }

    ;
    TEXTS[x].push(text);
    return i;
  }

  ;
  var z = ["defineProperty", "appendNodes", "", "textContent", "getAttribute", "appendChild", "setAttribute"],
      wce = {
    writable: false,
    configurable: false,
    enumerable: false
  };
  var INSERTS = {},
      TEXTS = {};
  var INSERTABLE = false;

  function props(el, obj, rend, main,tags) {
    var keys = Object.keys(obj),
        k,
        ls,
        l,
        ind;

    if (main) {
      ind = keys.indexOf("fest");

      if (ind >= 0) {
        keys.splice(ind, 1);
      }
    }

    ;

    for (k in keys) {
      switch (keys[k]) {
        case "style":
          if (typeof obj["style"] === "string") {
            el["style"] = obj["style"];
          } else {
            ls = Object.keys(obj["style"]);

            for (l in ls) {
              el["style"][ls[l]] = obj["style"][ls[l]];
            }

            ;
          }

          ;
          break;

        case "id":
          el.setAttribute("id", obj["id"]);
          break;

        case "class":
          var att = el.getAttribute("class");

          if (typeof att === "string") {
            el.setAttribute("class", obj["class"] + " " + att);
          } else {
            el.setAttribute("class", obj["class"]);
          }

          ;
          break;

        case "events":
          ls = Object.keys(obj["events"]);

          for (l in ls) {
            el.addEventListener(ls[l], obj["events"][ls[l]], false);
          }

          ;
          break;

        case "appendNodes":
          ls = Object.keys(obj.appendNodes);

          for (l in ls) {
            if (typeof obj.appendNodes[ls[l]] === "string") {
              el.appendChild(document.createTextNode(obj.appendNodes[ls[l]]));
            } else if (typeof obj.appendNodes[ls[l]] === "function") {
              el.appendChild(obj.appendNodes[ls[l]]());
            } else if (Array.isArray(obj.appendNodes[ls[l]]) ||typeof obj.appendNodes[ls[l]].length === "number") {
              for (var i = 0; i < obj.appendNodes[ls[l]].length; i++) {
                el.appendChild(obj.appendNodes[ls[l]][i]);
              }
            } else {
              el.appendChild(obj.appendNodes[ls[l]]);
            }
          }

          ;
          break;
        
        case "onrerender":
        case "container":
        case "fest":
        case "onbuild":
          if (typeof rend !== "boolean") {
            el[keys[k]] = obj[keys[k]];
          }

          ;
          break;
        case "$tags":
        case "$element":
          if (tags) {
            el[keys[k]] = obj[keys[k]];
          };
          break;

        default:
          el[keys[k]] = obj[keys[k]];
          break;
      }
    }

    ;
  }

  ;
  var sym1 = Symbol(),
      sym2 = Symbol();
  Object.defineProperty(window, "__RENDERFESTAPP", _objectSpread({
    value: function value(festProps, JXS, render) {
      if (typeof render !== "boolean") {
        render = false;
      }

      ;
      var cont = "div";
      var main = {};
      main[sym1] = false;
      Object.defineProperty(main, "raw", _objectSpread({
        value: function value(args, ignoreCont) {
          if(!main){return ""};
          if (typeof festProps.container === "string") {
            cont = festProps.container;
          }

          ;
          var x, y;

          if (ignoreCont === sym1) {
            INSERTABLE = true;
            return JXS.bind({
              TEXT: insertTexts
            })(args);
          } else {
            INSERTABLE = false;

            if (cont !== '') {
              x = "<".concat(cont, ">");
              y = "</".concat(cont, ">");
            } else {
              x = '', y = '';
            }

            ;
            var zz = JXS.bind({
              TEXT: insertTexts
            })(args);

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
            if(!main){return null};
            if (rendable === sym1) {
              main[sym1] = true;
              festProps.onrerender();
            } else {
              main[sym1] = false;
            }

            ;

            if (typeof festProps.container === "string") {
              cont = festProps.container;
            }

            ;
            var aa = main.raw(args, sym1);

            if (typeof aa !== "string") {
              return null;
            }

            ;
            var d = document.createElement(cont),
                i;
            d.innerHTML = aa;
            aa = null;
            props(d, festProps, main[sym1], true);

            if (festProps.fest) {
              var fst = d.getElementsByClassName("fest");

              if (fst) {
                var atn = null;
                fst = Object.values(fst);

                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("fest");

                  if (typeof atn === "string" && festProps.fest[atn]) {
                    props(fst[i], festProps.fest[atn], 1, false);
                    festProps.fest[atn]["$element"] = fst[i];
                    fst[i].removeAttribute("fest");
                    fst[i].setAttribute("festag-ftags-festag",atn);
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" fest ").join(" ")+" festag-ftags-festag");
                  }

                  ;
                }

                ;
                fst = null;
              }
            }

            ;
            var insrt = d.getElementsByClassName("fest");

            if (insrt) {
              insrt = Object.values(insrt);
              var attn = null;

              for (i = 0; i < insrt.length; i++) {
                if (insrt[i].tagName !== "I") {
                  continue;
                }

                ;
                attn = insrt[i].getAttribute("fest");

                if (typeof attn === "string" && INSERTS[attn]) {
                  insrt[i].parentNode.replaceChild(INSERTS[attn].shift(), insrt[i]);

                  if (INSERTS[attn].length === 0) {
                    delete INSERTS[attn];
                  }
                }
              }

              ;
              insrt = d.getElementsByClassName("fest");

              if (insrt) {
                insrt = Object.values(insrt);
                attn = null;

                for (i = 0; i < insrt.length; i++) {
                  if (insrt[i].tagName !== "I") {
                    continue;
                  }

                  ;
                  attn = insrt[i].getAttribute("fest");

                  if (typeof attn === "string" && TEXTS[attn]) {
                    insrt[i].parentNode.replaceChild(document.createTextNode(TEXTS[attn].shift()), insrt[i]);

                    if (TEXTS[attn].length === 0) {
                      delete TEXTS[attn];
                    }
                  }
                }

                ;
                insrt = null;
              }

              ;
            }

            ;
            var tagNames,tags,k;
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
                  tags=null;
                }
              };
              
            };
            if (festProps.fest) {
              let fst = d.getElementsByClassName("festag-ftags-festag");

              if (fst) {
                fst = Object.values(fst);
                let atn;
                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("festag-ftags-festag");

                  if (typeof atn === "string" && festProps.fest[atn]&& festProps.fest[atn].$tags) {
                    tagNames = Object.keys(festProps.fest[atn].$tags);
                    let m;
                    for(m=0;m<tagNames.length;m++){
                      tags=fst[i].getElementsByTagName(tagNames[m]);

                      if(tags){
                        for(k=0;k<tags.length;k++){
                          if(tags[k].getAttribute("exclude")===null){
                            props(tags[k], festProps.fest[atn]["$tags"][tagNames[m]], 1, false,true);
                          }
                        }
                        tags=null;
                      }
                    };
                    fst[i].removeAttribute("festag-ftags-festag");
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" festag-ftags-festag ").join(" "));
                  }

                  ;
                }

                ;
                fst = null;
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
            if (!main) {
              return null;
            };

            if (typeof festProps.container === "string") {
              cont = festProps.container;
            }

            ;
            var aa = main.raw(args, sym1);
            if (typeof aa !== "string") {
              return null;
            }

            ;
            var d = document.createElement(cont),
                i;
            d.innerHTML = aa;
            aa = null;
            props(d, festProps, main[sym1], true);

            if (festProps.fest) {
              var fst = d.getElementsByClassName("fest");

              if (fst) {
                var atn = null;
                fst = Object.values(fst);

                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("fest");

                  if (typeof atn === "string" && festProps.fest[atn]) {
                    props(fst[i], festProps.fest[atn], 1, false);
                    festProps.fest[atn]["$element"] = fst[i];
                    fst[i].removeAttribute("fest");
                    fst[i].setAttribute("festag-ftags-festag",atn);
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" fest ").join(" ")+" festag-ftags-festag");
                  }

                  ;
                }

                ;
                fst = null;
              }
            }

            ;
            var insrt = d.getElementsByClassName("fest");

            if (insrt) {
              insrt = Object.values(insrt);
              var attn = null;

              for (i = 0; i < insrt.length; i++) {
                if (insrt[i].tagName !== "I") {
                  continue;
                }

                ;
                attn = insrt[i].getAttribute("fest");

                if (typeof attn === "string" && INSERTS[attn]) {
                  insrt[i].parentNode.replaceChild(INSERTS[attn].shift(), insrt[i]);

                  if (INSERTS[attn].length === 0) {
                    delete INSERTS[attn];
                  }
                }
              }

              ;
              insrt = d.getElementsByClassName("fest");

              if (insrt) {
                insrt = Object.values(insrt);
                attn = null;

                for (i = 0; i < insrt.length; i++) {
                  if (insrt[i].tagName !== "I") {
                    continue;
                  }

                  ;
                  attn = insrt[i].getAttribute("fest");

                  if (typeof attn === "string" && TEXTS[attn]) {
                    insrt[i].parentNode.replaceChild(document.createTextNode(TEXTS[attn].shift()), insrt[i]);

                    if (TEXTS[attn].length === 0) {
                      delete TEXTS[attn];
                    }
                  }
                }

                ;
                insrt = null;
              }

              ;
            }

            ;
            var tagNames,tags,k;
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
                  tags=null;
                }
              };
            };
            if (festProps.fest) {
              let fst = d.getElementsByClassName("festag-ftags-festag");

              if (fst) {
                fst = Object.values(fst);
                let atn;
                for (i = 0; i < fst.length; i++) {
                  atn = fst[i].getAttribute("festag-ftags-festag");
                  let m;
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
                        tags=null;
                      }
                    };
                    fst[i].removeAttribute("festag-ftags-festag");
                    fst[i].setAttribute("class", " ".concat(fst[i].getAttribute("class"), " ").split(" festag-ftags-festag ").join(" "));
                  }

                  ;
                }

                ;
                fst = null;
              }
            };
            if (typeof festProps.onbuild === "function") {
              festProps.onbuild();
            };
            main = null;
            cont = null;
            festProps = null;
            JXS=null;
            return d;
          }
        }, wce));
        Object.defineProperty(main, "rerender", _objectSpread({
          value: function value(args) {
            if(!main){return null};
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
            if(!main){return ""};
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
            
            if(!main){return ""};
            
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
            return i;
          }
        }, wce));
      }

      ;
      return main;
    }
  }, wce));
})();