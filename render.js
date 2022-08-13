
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
         * This builds your component and returns the fully built component. Components
         * built with `getElement` will be re-rendered everytime it's parent component renders. 
         * 
         * All components rely on the current state of the `festProps object` passed to `Render()`
         * and the argument, `args` passed to your JSX method
         */
        getElement:emptyElement,
        /**
         * This builds your component and returns the fully built component only once. Components
         * built with `getElementOnce` will not be re-rendered even if it's parent component renders.
         * It re-renders only when `rerender` is called.    
         * 
         * All components rely on the current state of the `festProps object` passed to `Render()`
         * and the argument, `args` passed to your JSX method. 
         */
         getElementOnce:emptyElement,
         /**
         * This builds your component and returns the fully built component only once. Components
         * built with `getStatelessElement` uses the state obeject, `festProps object` only once and 
         * does not keep a reference to the component. Hence, `rerender` has no effect. Calling any of
         * the component buider methods after `getStatelessElement` will return null or an empty string 
         * depending on the method called.   
         * 
         * All components rely on the current state of the `festProps object` passed to `Render()`
         * and the argument, `args` passed to your JSX method. State object for this cnnot be reused  
         * 
         * *Recommended if component won't be re-rendered.*
         */
          getStatelessElement:emptyElement,
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
          renderStatelessElement:emptyString,
        /**
         * 
         */
        rerender:emptyElement,
        /**
         * The best way to remove a re-rendable component is to call `remove`.
         * Calling `remove` removes the component from the DOM tree and destroys all 
         * references to the component that was created. 
         * 
         */
         remove:()=>{},
         /**
         * The best way to hide a re-rendable component from showing on the screen
         *  is to call `hide` and use `show` to show it back on the screen. 
         * 
         */
         hide:()=>{},
         /**
          * This will display a hidden re-rendable component
         */
         show:()=>{},
         /**
          * This destroys all references created for a re-rendable component
         */
         disown:()=>{},
    };
    
};
module.exports=Render;
