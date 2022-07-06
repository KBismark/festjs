
function emptyElement(args){return new HTMLElement()};
function emptyString(args){return ""};

/**
 * All components rely on the current state of the `festProps` object passed to `Render()`
 * and the argument, `args` passed to your JSX method.    
 * 
 * Render returns an `HTMLElement`, the fully built component if
 * @param {{fest:{ [festName]:{class:{}|string,appendNodes:{},events:{onclick:()=>void,...},onclick:()=>void,...,$element:HTMLElement},...},class:{}|string,appendNodes:{},onbuild:()=>void,onrerender:()=>void}} festProps 
 * This object holds the state of your component.
 * @param {(args:*)=>JSX} JXS This method returns your JSX code. It takes an `args` as argument.
 * @param {boolean} render This tells the fest engine whether you want to build a component or just need the raw HTML string.
 * 
 *
 */
function Render(festProps,JXS,render) {

    return {
        /**
         * This builds your component and returns the fully built component.
         * All components rely on the current state of the `festProps` object passed to `Render()`
         * and the argument, `args` passed to your JSX method
         */
        getElement:emptyElement,
        /**
         * This builds your component and returns the fully built component only once.
         * All components rely on the current state of the `festProps` object passed to `Render()`
         * and the argument, `args` passed to your JSX method. *Recommended if component won't be re-rendered.*
         */
         getElementOnce:emptyElement,
        /**
         * 
         */
        raw:emptyString,
        /**
         * 
         */
        render:emptyString,
        /**
         * 
         */
         renderOnce:emptyString,
        /**
         * 
         */
        rerender:emptyElement
    };
    
};
module.exports=Render;
