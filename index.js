/* WebTool - Version A2 */

// Use strict mode
"use strict";

// Main function for selecting elements
let $WEBTOOL_DOC = () => {};

// Window variable
let $WEBTOOL_WIN = {
    // Properties for the URL
    domain: document.domain,
    url: location.href,
    urlAnchor: location.hash,

    // Width and height (not including scrollbar)
    width: window.visualViewport.width,
    height: window.visualViewport.height,

    // Width and height (including scrollbar)
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,

    // Alert pop-up message
    alert: (txt) => {
        if (!txt) {
            txt = "";
        }
        window.alert(txt);
    }
};

// Main
void function main(i) {

    // Function for checking the data type
    const checkDataType = (val, typ) => {
        switch (typ.toLowerCase()) {
            case "num":
                return typeof val === "number";
                break;
            case "str":
                return typeof val === "string";
                break;
            case "bool":
                return typeof val === "boolean";
                break;
            case "arr":
                return Array.isArray(val);
                break;
            case "obj":
                return val.constructor === Object;
                break;
            case "func":
                return typeof val === "function";
                break;
        }
    };

    // Open a new tab/window
    $WEBTOOL_WIN.open = (url, target) => {
        // Final method to open a new tab
        let finalTarget;

        // If `url` is not a string, throw an error
        if (!checkDataType(url, "str")) {
            throw new Error("First argument must be a string");
        }

        // If `target` is not a string and not undefined, throw an error
        if (!checkDataType(target, "str") && typeof target !== "undefined") {
            throw new Error("Second argument must be a string");
        }

        // If `target` is undefined, default target is "_self"
        !target ? finalTarget = "_self"
                : finalTarget = target;
        
        // Open the page
        window.open(url, finalTarget);
    };

    // Close the current tab or window
    $WEBTOOL_WIN.close = () => {
        window.close();
    };

    // Do something every specified milliseconds
    $WEBTOOL_WIN.update = (ms, callback) => {
        // Checks if `ms` is a number
        if (!checkDataType(ms, "num")) {
            throw new Error("The first argument must be a number");
        }

        // Checks is `callback` is a function
        if (!checkDataType(callback, "func")) {
            throw new Error("The second argument must be a callback function");
        }

        // Set interval
        window.setInterval(callback, ms);
    };

    // Function for returning selector methods
    const selectorMethods = (elements) => {
        return {
            // Property for the actual DOM element
            el: elements,

            // Setting or getting the inner HTML
            html: str => {
                // Checks if `elements.length` is true
                if (elements.length) {
                    // Final return array if `str` is undefined
                    let finalReturn = [];

                    // Loop through the elements
                    for (i = 0; i < elements.length; i++) {
                        if (str) {
                            // If `str` is defined, set all the elements' html to the value in `str`
                            elements[i].innerHTML = str;
                        } else {
                            // If `str` is not defined, push all the elements into the `finalReturn` array
                            finalReturn.push(elements[i].innerHTML);
                        }
                    }

                    // If `str` is undefined, return the array of elements
                    if (!str) {
                        return finalReturn;
                    }
                }
                
                // If `elements.length` is false
                else {
                    if (str) {
                        // If `str` is defined, set the specified element's inner HTML to the value of `str`
                        elements.innerHTML = str;
                    } else {
                        // Otherwise, return the current inner HTML
                        return elements.innerHTML;
                    }
                }
            },

            // Add HTML to the end of inner HTML function
            addHtml: str => {
                // If there are multiple elements selected
                if (elements.length) {
                    // Loop through all elements selected
                    for (i = 0; i < elements.length; i++) {
                        // Add `str` to the end of inner HTML
                        elements[i].innerHTML += str;
                    }
                }
                
                // If there is only on element selected
                else {
                    // Add `str` to the end of inner HTML
                    elements.innerHTML += str;
                }
            },

            // Change the CSS of the specified element(s)
            css: (prop, val) => {
                // If `prop` is a string
                if (checkDataType(prop, "str")) {
                    // If user selected multiple elements
                    if (elements.length) {
                        // Loop through all the elements
                        for (i = 0; i < elements.length; i++) {
                            // Set the CSS
                            elements[i].style = `${prop}: ${val};`;
                        }
                    }
                    
                    // If user selected one element
                    else {
                        // Set the CSS of the element
                        elements.style = `${prop}: ${val};`;
                    }
                }

                // If `prop` is an object
                if (checkDataType(prop, "obj")) {
                    // This will hold all the different CSS properties and values
                    let elStyle = "";

                    // Loop through the object
                    for (const i2 in prop) {
                        // Add properties and values to the `elStyle` string
                        elStyle += `${i2}: ${prop[i2]};`;
                    }

                    // If user selected multiple elements
                    if (elements.length) {
                        // Loop through the elements
                        for (i = 0; i < elements.length; i++) {
                            // Set the CSS of all the elements
                            elements[i].style = elStyle;
                        }
                    }
                    
                    // If user selected one element
                    else {
                        // Set the CSS of the element
                        elements.style = elStyle;
                    }
                }
            },

            // Change the text of an element
            text: str => {
                // If user selected multiple elements
                if (elements.length) {
                    // Final return
                    let finalReturn = [];

                    // Loops through the elements
                    for (i = 0; i < elements.length; i++) {
                        if (str) {
                            // If `str` is defined, set the text to the value of `str`
                            elements[i].textContent = str;
                        } else {
                            // If `str` is not defined, push all the selected elements' text into an array
                            finalReturn.push(elements[i].textContent);
                        }
                    }

                    // If `str` is undefined, return array of text content
                    if (!str) {
                        return finalReturn;
                    }
                }
                
                // If user selected one element
                else {
                    if (str) {
                        // If `str` is defined, set the text of the element to the value of `str`
                        elements.textContent = str;
                    } else {
                        // If `str` is not defined, return the current text content
                        return elements.textContent;
                    }
                }
            },

            // Add text to the end of an element
            addText: str => {
                // If user selected multiple elements
                if (elements.length) {
                    // Loop through the elements
                    for (i = 0; i < elements.length; i++) {
                        // Add `str` to the end of text content
                        elements[i].textContent += str;
                    }
                }
                
                // If user selected one element
                else {
                    // Add `str` to the end of text content
                    elements.textContent += str;
                }
            },

            // Set the ID of an element
            setId: id => {
                // If user selected multiple elements
                if (elements.length) {
                    // Set the ID of the first element the browser finds
                    elements[0].id = id;
                }
                
                // If user selected one element
                else {
                    // Set the ID
                    elements.id = id;
                }
            },

            // Set the class of an element
            setClass: cls => {
                // If user selected multiple elements
                if (elements.length) {
                    // Loops through the elements
                    for (i = 0; i < elements.length; i++) {
                        // Set the class of the elements
                        elements[i].className = cls;
                    }
                }

                // If user selected one element
                else {
                    // Set the class of the elements
                    elements.className = cls;
                }
            },

            // Get the class of an element
            getClass: () => {
                // If user selected multiple elements
                if (elements.length) {
                    // Final return, will return a list of all classes
                    let finalReturn = [];

                    // Loops through the element
                    for (i = 0; i < elements.length; i++) {
                        finalReturn.push(Array.from(elements[i].classList));
                    }

                    return finalReturn;
                }

                // If one element selected
                else {
                    return Array.from(elements.classList);
                }
            },

            // Add a class to an element
            addClass: cls => {
                // If the arguments is not a string nor an array
                if (!checkDataType(cls, "str") &&
                    !checkDataType(cls, "arr")) {
                    // Throw an error
                    throw new Error("Argument must be a string or an arrar");
                }

                // If argument is a string
                if (checkDataType(cls, "str")) {
                    // If more than one element is selected
                    if (elements.length) {
                        // Loop through the elements
                        for (i = 0; i < elements.length; i++) {
                            // Set class name
                            elements[i].className += ` ${cls}`;
                        }
                    }

                    // If one element selected
                    else {
                        elements.className += ` ${cls}`;
                    }
                }

                // If argument is an array
                if (checkDataType(cls, "arr")) {
                    // Final variable
                    let final = ``;

                    // Loop through the array
                    for (const i2 of cls) {
                        final += ` ${cls[i2]}`;
                    }

                    // If multiple elements selected
                    if (elements.length) {
                        // Loop through the elements
                        for (i = 0; i < elements.length; i++) {
                            // Set the class name
                            elements[i].className = final;
                        }
                    }

                    // If one element selected
                    else {
                        elements.className = final;
                    }
                }
            },

            // Getting or setting an attribute
            attr: (name, val) => {
                // If `name` is a string
                if (checkDataType(name, "str")) {
                    // If `val` is not a string
                    // (this will return the current value of the attribute)
                    if (!checkDataType(val, "str")) {
                        // Final return value
                        let finalReturn = [];

                        // If more than one element selected
                        if (elements.length) {
                            // Loop through the elements
                            for (i = 0; i < elements.length; i++) {
                                finalReturn.push(elements[i][name]);
                            }

                            // Return all attribute values
                            return finalReturn;
                        }

                        // If one element selected
                        else {
                            // Set `finalReturn` to the value of the attribute
                            finalReturn = elements[name];

                            // Return value of attribute
                            return finalReturn;
                        }
                    }

                    // If `val` is a string
                    // (this will set the attribute)
                    if (checkDataType(val, "str")) {
                        // If more than one element is selected
                        if (elements.length) {
                            // Loop through the elements
                            for (i = 0; i < elements.length; i++) {
                                elements[i].setAttribute(name, val);
                            }
                        }

                        // If one element is selected
                        else {
                            elements.setAttribute(name, val);
                        }

                        // Stop function
                        return;
                    }
                }

                // If `name` is an object
                // (this allows the user to set multiple attributes)
                if (checkDataType(name, "obj")) {
                    // Loop through `name` object
                    for (const i2 in name) {
                        // If multiple elements selected
                        if (elements.length) {
                            // Loop through the elements
                            for (let j = 0; j < elements.length; j++) {
                                // Set the attributes to each element
                                elements[j].setAttribute(i2, name[i2]);
                            }
                        }

                        // If one element selected
                        else {
                            // Set the attribute
                            elements.setAttribute(i2, name[i]);
                        }
                    }

                    // Stop function
                    return;
                }

                // If `name` is neither a string nor an object, throw an error
                throw new Error("The first argument must be a string or an object");
            },

            // Add event listeners
            event: (evt, code) => {
                // If `evt` is not a string, then throw an error
                if (!checkDataType(evt, "str")) {
                    throw new Error("First argument must be a string");
                }

                // If `code` is not a function, then throw an error
                if (!checkDataType(code, "func")) {
                    throw new Error("Second argument must be a function");
                }

                // If the user selected multiple elements
                if (elements.length) {
                    // Loop through the elements
                    for (i = 0; i < elements.length; i++) {
                        // Add event listener
                        elements[i].addEventListener(evt, code);
                    }
                }

                // If user selected one element
                else {
                    // Add event listener
                    elements.addEventListener(evt, code);
                }
            },

            // Removing an element
            remove: () => {
                // If user selected multiple elements
                if (elements.length) {
                    // Loop through all the elements
                    for (i = 0; i < elements.length; i++) {
                        // Remove all elements selected
                        elements[i].remove();
                    }
                }

                // Otherwise
                else {
                    // Remove the element
                    elements.remove();
                }
            }
        };
    };
    
    // Redefine $WEBTOOL_DOC function
    $WEBTOOL_DOC = (sel) => {
        // Store the different error messages
        const errors = {
            invalid: "Invalid selector",
            notStr: "Argument must be a string"
        };

        // If there's an error, throw the error
        try {
            // Checks if argument is a string
            if (!checkDataType(sel, "str")) {
                throw errors.notStr;
            }

            // Return
            const elements = document.querySelectorAll(sel);
            return selectorMethods(elements)
        }
        
        // Catch the error
        catch (err) {
            // Default error stored in a constant
            const defaultErr = errors.invalid;

            // Throw the error
            if (err === errors.notStr) {
                throw new Error(err);
            } else {
                throw new Error(defaultErr);
            }
        }
    };

    // Head, body, and title elements
    $WEBTOOL_DOC.head = selectorMethods(document.head);
    $WEBTOOL_DOC.body = selectorMethods(document.body);
    $WEBTOOL_DOC.title = selectorMethods(document.title);

    // Create a new element
    $WEBTOOL_DOC.create = (info) => {
        // If `info` is not an object
        if (!checkDataType(info, "obj")) {
            throw new Error("Argument must be an object");
        }

        // If `info.name` is not a string
        if (!checkDataType(info.name, "str")) {
            throw new Error("The name property must be a string");
        }

        // If `info.append` is not a string
        if (!checkDataType(info.append, "str")) {
            throw new Error("The append property must be a string");
        }

        // Store the object's values
        let cls;
        const el = info.name,
              to = info.append,
              id = info.id,
            attr = info.attr,
            html = info.html,
            text = info.text,
              css = info.css;
        
        // Set `cls` variable
        for (; info.cls || info["class"] || info.className;) {
            if (typeof info.cls !== "undefined") {
                cls = info.cls;
            }
            if (typeof info["class"] !== "undefined") {
                cls = info["class"];
            }
            if (typeof info.className !== "undefined") {
                cls = info.className;
            }
        }

        // Define append elements
        const elTo = document.querySelectorAll(to);

        // Loop through append elements
        for (i = 0; i < elTo.length; i++) {
            // Create the element
            const element = document.createElement(el);

            // If user specified `info.html,` set the inner HTML of the new element
            if (html) {
                element.innerHTML = html;
            }

            // If user specified `info.text,` set the text of the new element
            if (text) {
                element.textContent = text;
            }

            // If user specified `info.css,` set the css
            if (css) {
                // If `info.css` is a string
                if (checkDataType(css, "str")) {
                    element.style = css;
                }

                // If `info.css` is an object
                if (checkDataType(css, "obj")) {
                    // Final CSS
                    let final = ``;

                    // Loop through object, then set the final CSs
                    for (const j in css) {
                        final += `${j}: ${css[j]};`;
                    }
                    element.style = final;
                }
            }

            // If user specified `info.id,` set the ID
            if (id) {
                element.id = id;
            }

            // If user specified a class, set the class
            if (cls) {
                // If the class value is not a string nor an array, throw an error
                if (!checkDataType(cls, "str") && !checkDataType(cls, "array")) {
                    throw new Error("The class must be a string or an array");
                }
                
                // If class is a string, set the class
                if (checkDataType(cls, "str")) {
                    element.className = cls;
                }

                // If class is an array, set the classes
                if (checkDataType(cls, "arr")) {
                    // Final
                    let final = ``;

                    // Loop through the array
                    for (let j = 0; j < cls.length; j++) {
                        final += ` ${cls[j]}`;
                    }

                    // Set the classes
                    element.className = final;
                }
            }

            // If user specified (an) attribute(s), set them
            if (attr) {
                if (!checkDataType(attr, "obj")) {
                    throw new Error("The attr property must be an object");
                }
                if (checkDataType(attr, "obj")) {
                    for (const j in attr) {
                        element.setAttribute(j, attr[j]);
                    }
                }
            }

            // Append the element
            elTo[i].appendChild(element);
        }
    };
    
    // Create a list
    $WEBTOOL_DOC.createList = (info) => {
        // Checks if user provided an object
        if (!checkDataType(info, "obj")) {
            throw new Error("The argument must be an object");
        }

        // Checks for incorrect data types
        if (!checkDataType(info.li, "arr")) {
            throw new Error("The li property must be an array");
        }
        if (!checkDataType(info.type, "str")) {
            throw new Error("The type property must be a string")
        }
        
        // Variables
        let list, final = ``, i2 = -1;

        // Create DOM element
        switch (info.type.toLowerCase()) {
            case "ul":
                list = document.createElement("ul");
                break;
            case "ol":
                list = document.createElement("ol");
                break;
            default:
                throw new Error("The type property should be 'ul' or 'ol'");
                break;
        }

        // Loop through the list and add HTML content to the DOM element
        while (++i2 < info.li.length) {
            list.innerHTML += `<li>${info.li[i2]}</li>`;
        }
        
        // The user might put an invalid selector
        try {
            // Append list to the specified elements
            const elTo = document.querySelectorAll(info.append);
            for (i = 0; i < elTo.length; i++) {
                elTo[i].appendChild(list);
            }
        }
        
        // If invalid selector for `info.append`, throw an error
        catch (err) {
            throw new Error("Invalid selector for the append property");
        }
    };

    // Create a table
    $WEBTOOL_DOC.createTable = (info) => {
        // Final
        let final = `<table>`;
        
        // Check data types
        if (!checkDataType(info, "obj")) {
            throw new Error("The argument must be an object");
        }
        if (!checkDataType(info.data, "arr")) {
            throw new Error("The data property must be an array");
        }
        if (!checkDataType(info.append, "str")) {
            throw new Error("The append property must be a string");
        }
        
        // If data is an array
        if (checkDataType(info.data, "arr")) {
            // Append element
            const elTo = document.querySelectorAll(info.append);

            // If user wants the first row to be the table heading
            if (info.hasHeading) {
                final += `<thead><tr>`;
                for (i = 0; i < info.data[0].length; i++) {
                    final += `<th>${info.data[0][i]}</th>`;
                }
                final += `</tr></thead><tbody>`;
            }
            
            // Otherwise
            else {
                final += `<tbody>`;
            }

            // Put tbody element
            void function tbody() {
                // Change `i` depending on whether the user wants a heading
                !!info.hasHeading ? i = 1 : i = 0;

                // Loop through the data
                for (; i < info.data.length; i++) {
                    let tr = `<tr>`;
                    for (let j = 0; j < info.data[i].length; j++) {
                        tr += `<td>${info.data[i][j]}</td>`;
                    }
                    tr += `</tr>`;
                    final += tr;
                }

                // Final touches
                final += `</tbody></table>`;
            }();

            // Loop through all the elements
            for (i = 0; i < elTo.length; i++) {
                elTo[i].innerHTML += final;
            }

            // Return
            return;
        }
    };

    // Print things into body element
    $WEBTOOL_DOC.print = (txt) => {
        document.body.innerHTML += txt;
    };

}(0);

// Define $doc
const $doc = $WEBTOOL_DOC;
$WEBTOOL_DOC = undefined;

// Define $win
const $win = $WEBTOOL_WIN;
$WEBTOOL_WIN = undefined;






