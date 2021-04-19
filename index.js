/* WebTool - Version B1 */

// Use strict mode
"use strict";

// Custom WebTool error
class WebToolError extends Error {
    constructor(message) {
        super(message);
        this.name = "WebToolError";
        this.message = message;
    }
}

// Main function for selecting elements
let $WEBTOOL_DOM = () => {};

// Window variable
let $WEBTOOL_BOM = {
    // Properties for the URL
    domain: document.domain,
    url: location.href,
    hash: location.hash,

    // Width and height (not including scrollbar)
    width: window.visualViewport.width,
    height: window.visualViewport.height,

    // Width and height (including scrollbar)
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,

    // Alert pop-up message
    alert: txt => {
        if (!txt) {
            txt = "";
        }
        window.alert(txt);
    },

    // Confirm message
    confirm: txt => {
        if (!txt) {
            throw new WebToolError("Please enter some text");
        }
        return window.confirm(txt);
    },

    // Prompt/ask message
    ask: txt => {
        if (!txt) {
            throw new WebToolError("Please enter some text");
        }
        return window.prompt(txt);
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

    // Checks if the object is a DOM element
    const isDOM = obj => obj instanceof Element;

    // Checks if two objects are the same
    const isSameObj = (obj1, obj2) => !!(JSON.stringify(obj1) == JSON.stringify(obj2));

    // Open a new tab/window
    $WEBTOOL_BOM.open = (url, target) => {
        // Final method to open a new tab
        let finalTarget;

        // If `url` is not a string, throw an error
        if (!checkDataType(url, "str")) {
            throw new WebToolError("First argument must be a string");
        }

        // If `target` is not a string and not undefined, throw an error
        if (!checkDataType(target, "str") && typeof target !== "undefined") {
            throw new WebToolError("Second argument must be a string");
        }

        // If `target` is undefined, default target is "_self"
        !target ? finalTarget = "_self"
                : finalTarget = target;
        
        // Open the page
        window.open(url, finalTarget);
    };

    // Close the current tab or window
    $WEBTOOL_BOM.close = () => {
        window.close();
    };

    // Do something every specified milliseconds
    $WEBTOOL_BOM.update = (ms, callback) => {
        // Checks if `ms` is a number
        if (!checkDataType(ms, "num")) {
            throw new WebToolError("The first argument must be a number");
        }

        // Checks is `callback` is a function
        if (!checkDataType(callback, "func")) {
            throw new WebToolError("The second argument must be a callback function");
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
                    let finalReturn = ``;

                    // Loop through the elements
                    for (i = 0; i < elements.length; i++) {
                        if (typeof str !== "undefined" && str.toString()) {
                            // If `str` is defined, set all the elements' html to the value in `str`
                            elements[i].innerHTML = str.toString();
                        } else {
                            // If `str` is not defined, push all the elements into the `finalReturn` array
                            finalReturn += elements[i].innerHTML;
                        }
                    }

                    // If `str` is undefined, return all HTML
                    if (typeof str === "undefined") {
                        return finalReturn;
                    }
                }
                
                // If `elements.length` is false
                else {
                    if (typeof str !== "undefined" && str.toString()) {
                        // If `str` is defined, set the specified element's inner HTML to the value of `str`
                        elements.innerHTML = str.toString();
                    } else {
                        // Otherwise, return the current inner HTML
                        return elements.innerHTML;
                    }
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
                    let finalReturn = ``;

                    // Loops through the elements
                    for (i = 0; i < elements.length; i++) {
                        if (typeof str !== "undefined" && str.toString()) {
                            // If `str` is defined, set the text to the value of `str`
                            elements[i].innerText = str.toString();
                        } else {
                            // If `str` is not defined, push all the selected elements' text into an array
                            finalReturn += elements[i].innerText;
                        }
                    }

                    // If `str` is undefined, return array of text content
                    if (!str) {
                        return finalReturn;
                    }
                }
                
                // If user selected one element
                else {
                    if (typeof str !== "undefined" && str.toString()) {
                        // If `str` is defined, set the text of the element to the value of `str`
                        elements.innerText = str.toString();
                    } else {
                        // If `str` is not defined, return the current text content
                        return elements.innerText;
                    }
                }
            },

            // Set the ID of an element
            id: newId => {
                // If user selected multiple elements
                if (elements.length) {
                    // If user wants to set ID, set it
                    if (newId) {
                        elements[0].id = newId;
                    }

                    // Otherwise, return the ID
                    else {
                        return elements[0].id;
                    }
                }
                
                // If user selected one element
                else {
                    // If user wants to set the ID, set it
                    if (newId) {
                        elements.id = newId;
                    }
                    
                    // Otherwise, return the ID
                    else {
                        return elements.id;
                    }
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
                    throw new WebToolError("Argument must be a string or an array");
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

            // Get or set an attribute
            attr: (name, val) => {
                // If `name` is an invalid data type, throw an error
                if (!name) {
                    throw new WebToolError("The first argument must be a string or an object");
                }
                if (!checkDataType(name, "str") && !checkDataType(name, "obj")) {
                    throw new WebToolError("The first argument must be a string or an object");
                }
                
                // If `name` is a string
                if (checkDataType(name, "str")) {
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

                    // If `val` is not a string
                    // (this will get the attribute's value)
                    else {
                        // Final return value
                        let finalReturn = [];

                        // If more than one element selected
                        if (elements.length) {
                            return elements[0][name];
                        }

                        // If one element selected
                        else {
                            return elements[name];
                        }
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
                            elements.setAttribute(i2, name[i2]);
                        }
                    }

                    // Stop function
                    return;
                }
            },

            // Add event listeners
            event: (evt, code, remove) => {
                // If `evt` is not a string, then throw an error
                if (!checkDataType(evt, "str")) {
                    throw new WebToolError("First argument must be a string");
                }

                // If `code` is not a function, then throw an error
                if (!checkDataType(code, "func")) {
                    throw new WebToolError("Second argument must be a function");
                }

                // If the user selected multiple elements
                if (elements.length) {
                    // Loop through the elements
                    for (i = 0; i < elements.length; i++) {
                        // If user wants to add an event, add it
                        if (!remove) {
                            elements[i].addEventListener(evt, code);
                        }

                        // Otherwise, delete the event
                        else {
                            elements[i].removeEventListener(evt, code);
                        }
                    }
                }

                // If user selected one element
                else {
                    // If user wants to add an event, add it
                    if (!remove) {
                        elements.addEventListener(evt, code);
                    }

                    // Otherwise, delete it
                    else {
                        elements.removeEventListener(evt, code);
                    }
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
            },

            // Prepend an element to somewhere
            prepend: (wtel) => {
                // If `wtel` is undefined
                if (!wtel) {
                    throw new WebToolError("The argument must also be a string.");
                }

                // If multiple elements selected
                if (elements.length) {
                    // Loop through the elements and append the string
                    for (i = 0; i < wtel.length; i++) {
                        elements[i].prepend(wtel.toString());
                    }
                }

                // If one element selected
                else {
                    elements.prepend(wtel.toString());
                }

                // Return
                return;
            },

            // Append an element to somewhere
            append: (wtel) => {
                // If `wtel` is something weird
                if (!wtel) {
                    throw new WebToolError("Make sure the argument passed in is made with one of WebTool's method for creating elements. The argument may also be a string.");
                }

                // If `wtel` is a string
                if (checkDataType(wtel, "str")) {
                    // If multiple elements selected
                    if (elements.length) {
                        // Loop through the elements and append the string
                        for (i = 0; i < wtel.length; i++) {
                            elements[i].append(wtel.toString());
                        }
                    }

                    // If one element selected
                    else {
                        elements.append(wtel.toString());
                    }

                    // Return
                    return;
                }
                
                // If created with WebTool's `$doc.createList()`
                if (wtel.special === "new-list-el") {
                    wtel.el.innerHTML = "";
                    for (i = 0; i < wtel.liItems.length; i++) {
                        wtel.el.innerHTML += `<li>${wtel.liItems[i]}</li>`;
                    }
                }
                
                // If created with `$doc.createTable()`
                else if (wtel.special === "new-table-el") {
                    // New table element and final inner HTML
                    const tableEl = document.createElement("table");
                    let final = ``;

                    // If user wants the first row to be the table heading
                    if (wtel.tableHasHeading) {
                        final += `<thead><tr>`;
                        for (i = 0; i < wtel.tableData[0].length; i++) {
                            final += `<th>${wtel.tableData[0][i]}</th>`;
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
                        !!wtel.tableHasHeading ? i = 1 : i = 0;

                        // Loop through the data
                        for (; i < wtel.tableData.length; i++) {
                            let tr = `<tr>`;
                            for (let j = 0; j < wtel.tableData[i].length; j++) {
                                tr += `<td>${wtel.tableData[i][j]}</td>`;
                            }
                            tr += `</tr>`;
                            final += tr;
                        }

                        // Final touches
                        final += `</tbody>`;
                        tableEl.innerHTML = final;
                        wtel.el = tableEl;
                    }();
                }
                
                if (wtel.el) {
                    // If multiple elements selected
                    if (elements.length) {
                        // Loop through the elements
                        for (i = 0; i < elements.length; i++) {
                            elements[i].appendChild(wtel.el);
                        }
                    }

                    // If one element selected
                    else {
                        // Append child
                        elements.appendChild(wtel.el);
                    }
                }
            },

            // Do something with each element selected
            each: callback => {
                // Checks if argument is a function
                if (!checkDataType(callback, "func")) {
                    throw new WebToolError("The argument must be a function");
                }

                // If multiple elements selected
                if (elements.length) {
                    // Loop through every element and do something to it
                    for (i = 0; i < elements.length; i++) {
                        callback(selectorMethods(elements[i]), i);
                    }
                }

                // If not
                else {
                    callback(selectorMethods(elements), 0);
                }
            }
        };
    };
    
    // Redefine $WEBTOOL_DOM function
    $WEBTOOL_DOM = (sel) => {
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
            return selectorMethods(elements);
        }
        
        // Catch the error
        catch (err) {
            // Default error stored in a constant
            const defaultErr = errors.invalid;

            // Throw the error
            if (err === errors.notStr) {
                throw new WebToolError(err);
            } else {
                throw new WebToolError(defaultErr);
            }
        }
    };

    // HTML, head, body, and title elements
    $WEBTOOL_DOM.docElement = selectorMethods(document.documentElement);
    $WEBTOOL_DOM.head = selectorMethods(document.head);
    $WEBTOOL_DOM.body = selectorMethods(document.body);
    $WEBTOOL_DOM.title = selectorMethods(document.querySelector("title"));

    // Create a new element
    $WEBTOOL_DOM.create = (info) => {
        // If `info` is not an object
        if (!info) {
            throw new WebToolError("Argument must be an object or a string");
        }
        if (!checkDataType(info, "obj") && !checkDataType(info, "str")) {
            throw new WebToolError("Argument must be an object or a string");
        }

        // If `info` is a string
        if (checkDataType(info, "str")) {
            try {
                const element = document.createElement(info);
                return selectorMethods(element);
            } catch (err) {
                throw new WebToolError("The argument must be a valid selector");
            }
        }

        // If `info.name` is not a string
        if (!checkDataType(info.name, "str")) {
            throw new WebToolError("The name property must be a string");
        }

        // Store the object's values
        let cls;
        const { id, attr, html, text, css } = info;
        const el = info.name, to = info.append;
        
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
                throw new WebToolError("The class must be a string or an array");
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
                throw new WebToolError("The attr property must be an object");
            }
            if (checkDataType(attr, "obj")) {
                for (const j in attr) {
                    element.setAttribute(j, attr[j]);
                }
            }
        }

        // If user specified where to append it, append it
        if (to) {
            try {
                const elTo = document.querySelectorAll(to);
                for (i = 0; i < elTo.length; i++) {
                    elTo[i].appendChild(element);
                }
            } catch (err) {
                throw new WebToolError("The append property should be a valid selector");
            }
            return;
        }

        // Return the element; the return value can be used in `append()`
        return selectorMethods(element);
    };
    
    // Create a list
    $WEBTOOL_DOM.createList = (info) => {
        // Checks if `info` is defined
        if (!info) {
            throw new WebToolError("The argument must be an object or a string");
        }
        if (!checkDataType(info, "obj") && !checkDataType(info, "str")) {
            throw new WebToolError("The argument must be an object or a string");
        }

        // If `info` is a string
        if (checkDataType(info, "str")) {
            let listEl = null, finalReturn = null;
            switch (info.toLowerCase()) {
                case "ul":
                    listEl = document.createElement("ul");
                    break;
                case "ol":
                    listEl = document.createElement("ol");
                    break;
                default:
                    throw new WebToolError("The argument must be 'ul' or 'ol'");
                    break;
            }
            finalReturn = selectorMethods(listEl);
            finalReturn.special = "new-list-el";
            finalReturn.liType = info.toLowerCase();
            finalReturn.liCont = [];
            return finalReturn;
        }

        // If `info` is an object
        if (checkDataType(info, "obj")) {
            // Checks for incorrect data types
            if (!checkDataType(info.type, "str")) {
                throw new WebToolError("The type property must be a string");
            }
            
            // Variables
            let list, finalReturn, i2 = -1;

            // Create DOM element
            switch (info.type.toLowerCase()) {
                case "ul":
                    list = document.createElement("ul");
                    break;
                case "ol":
                    list = document.createElement("ol");
                    break;
                default:
                    throw new WebToolError("The type property should be 'ul' or 'ol'");
            }
            
            // If user wanted to append list immediately
            if (info.append && info.items) {
                // Loop through the list and add HTML content to the DOM element
                while (++i2 < info.items.length) {
                    list.innerHTML += `<li>${info.items[i2]}</li>`;
                }
            }
            
            // If user specified an `append` property
            if (info.append) {
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
                    throw new WebToolError("Invalid selector for the append property");
                }
            }

            // Otherwise
            else {
                finalReturn = selectorMethods(list);
                finalReturn.special = "new-list-el";
                finalReturn.liType = info.type.toLowerCase();
                finalReturn.liItems = info.items;
                return finalReturn;
            }
        }
    };

    // Create a table
    $WEBTOOL_DOM.createTable = (info) => {
        // Variables
        let el = document.createElement("table"), final = ``;
        
        // Check data types
        if (!info) {
            const finalReturn = selectorMethods(el);
            finalReturn.special = "new-table-el";
            finalReturn.tableData = [];
            finalReturn.tableHasHeading = false;
            return finalReturn;
        }
        if (!checkDataType(info, "obj")) {
            throw new WebToolError("The argument must be an object");
        }
        
        // If data is an array
        if (checkDataType(info.data, "arr")) {
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
                final += `</tbody>`;
                el.innerHTML = final;
            }();
            
            // If user wanted to append immediately
            if (info.append) {
                // Append element
                const elTo = document.querySelectorAll(info.append);

                // Loop through all the elements
                for (i = 0; i < elTo.length; i++) {
                    elTo[i].appendChild(el);
                }
            }

            // Otherwise
            else {
                const finalReturn = selectorMethods(el);
                finalReturn.special = "new-table-el";
                finalReturn.tableData = info.data;
                finalReturn.tableHasHeading = info.hasHeading;
                return finalReturn;
            }
        }
    };

    // Print things into body element
    $WEBTOOL_DOM.print = (txt) => {
        document.body.innerHTML += txt;
    };

}(0);

// Define $dom
const $dom = $WEBTOOL_DOM;
$WEBTOOL_DOM = undefined;

// Define $bom
const $bom = $WEBTOOL_BOM;
$WEBTOOL_BOM = undefined;






