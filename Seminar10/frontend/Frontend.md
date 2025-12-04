# Frontend

The frontend represents the part of a web app the user can see and interact with.

It consists of the layout, styling, animations and every visible or hidden element in a web page.

It is structured in 3 parts:

- The structure of the page - **HTML** - it defines the elements that are displayed on the page  
- The styling of those elements - **CSS** - it defines the way the elements look and how they are positioned  
- The behaviour of the elements - **JS** - it defines how the page should react when the user interacts with the elements

## HTML
    
Hyper Text Markup Language is a language used to create web pages.

A simple HTML document would look like this:

```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

### Example Explained

- The `<!DOCTYPE html>` declaration defines that this document is an HTML5 document  
- The `<html>` element is the root element of an HTML page  
- The `<head>` element contains meta information about the HTML page  
- The `<title>` element specifies a title for the HTML page (which is shown in the browser's title bar or in the page's tab)  
- The `<body>` element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.  
- The `<h1>` element defines a large heading  
- The `<p>` element defines a paragraph
        
## CSS

CSS is a styling language, used to format the elements of a HTML document.

It consists of the following main parts:

### Selectors

Selectors are used to select the elements which we want to style.  
They are made up of different items:

- **Elements** — you can select an element from the web page:

```css
div {
  background-color: red;
}
```

- **Classes** — identifiers used to apply the same stlye to multiple elements.  
  You can select a class using `"."`:

```html
<div class="class1">Hello</div>
<p class="class1">World!</p>
```

```css
.class1 {
  font-style: italic;
}
```

- **IDs** — identifiers used to uniquely identify an element.  
  You can select the elements with a hashtag `#`:

```html
<div id="name">Tudor</div>
```

```css
#name {
  color: red;
}
```

### Properties

Properties are used to define the look of the elements.  
There exist multiple properties used to change the style of fonts, colors, spacing, etc.

### Specificity

Some elements contain multiple selectors (element, classes, ids).  
To know which style to apply with what priority there exists a system of cascading.  
This system creates a hierarchy between the styles.

#### CSS Specificity Hierarchy

Each type of CSS selector has a position in the specificity hierarchy, and the selector types carry different "weights".

| Selector type                                   | Example                         | Description                                             | Weight |
| ----------------------------------------------- | -------------------------------- | ------------------------------------------------------- | ------ |
| Inline styles                                   | `<h1 style="color: pink;">`     | Highest priority, will override all other selectors     | —      |
| Id selectors                                    | `#navbar`                       | Second highest priority                                 | 1-0-0  |
| Classes, attribute selectors and pseudo-classes | `.test`, `[type="text"]`, `:hover` | Third highest priority                              | 0-1-0  |
| Elements and pseudo-elements                    | `h1`, `::before`, `::after`     | Low priority                                            | 0-0-1  |
| Universal selector and `:where()`               | `*`, `:where()`                 | No priority                                             | 0-0-0 |

## JS

In the browser JS is used to give dynamic behaviour to different elements in the page.
    
### DOM 

The Document Object Model (DOM) is a programming interface that represents a tree which is made up of the elements present in the webpage.  
The DOM serves as a universal bridge that turns static HTML into a live, interactive tree of objects that JavaScript can modify instantly.

![DOM](assets/pic_htmltree.gif)

**Example:**

```html
<script>
  const titleElement = document.getElementById('title');
  titleElement.innerText = "Updated via DOM!";
</script>
```

### DOM Events

Events are actions that happen in the browser like clicks, scrolls, submits, etc.  
The DOM enables JS to listen to these events and react to them.
        
Some of the most common events are:

#### Click (Trigger an Alert)

```javascript
document.getElementById("saveBtn").addEventListener("click", function() {
  // Shows a popup message to the user
  alert("Your changes have been saved!"); 
});
```

#### Mouseover (Add Visual Effect)

```javascript
document.getElementById("profilePic").addEventListener("mouseover", function() {
  // Adds a border when hovering over the image
  this.style.border = "2px solid red"; 
});
```

#### Submit (Log Data)

```javascript
document.getElementById("loginForm").addEventListener("submit", function(event) {
  // Stops the page from refreshing
  event.preventDefault(); // prevents the default behaviour of the browser when triggering this event
  
  console.log("Attempting to log in..."); 
});
```

#### Change (Update Dropdown)

```javascript
document.getElementById("colorSelect").addEventListener("change", function(event) {
  // Gets the value selected by the user
  console.log("User picked: " + event.target.value); 
});
```

#### Load (Ready Message)

```javascript
window.addEventListener("load", function() {
  // Runs once the entire page (images & scripts) is ready
  console.log("Page fully loaded. App starting..."); 
});
```
