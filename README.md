LaneJS
======

An object-oriented JavasScript framework
It allows to design the web page without any CSS and HTML with 100% cross-browser compatibility. 

Targeted Platforms
— Internet Explorer 6.0 or above.
— Mozilla Firefox 1.5 or above.
— Apple Safari 2.0 or above.
— Opera 9.25 or above.
— Chrome 1.0 or above.

Before looking at examples, let's have a glance at some basic concepts of this Framework. 
The core idea of Lane is that you define the layout of your page in a JavaScript file using JSON 
(JavaScript Object Notation). That's it. You don't need CSS, you don't need HTML. 
All you need to do, is to define your web elements and their relationships (parent/child), 
as well as the properties you want them to have.

The great thing about Lane is that it has a very well defined way for elements positioning. 
JavaScript automatically calculates the sizes of the window and inner elements and then arranges 
them correspondingly. There are no “em's”, no “%” or any other ambiguous measurement types, only pixels. 
One other thing to notice is that all the elements on the page use absolute positioning inside their parent element. 
It means that you always know where exactly your element is put on the page. 

========================================================================


Now let's look at Lane in detail.
FormElement is a part of BoxElement. FormElements contains all kind of Form elements: 
radiobuttons, text fields, buttons, select options etc.


— BaseObject.js
The main class is BaseObject, which implements Events and Properties. 
You can add event listeners to the objects and then trigger the event. Each object has properties.

— Browser.js 
Contains browser specific information. You can specify properties for each browser client. 
For example, you could set the shadow property for Firefox as 
	shadowProperty : 'MozBoxShadow' 
for Opera it would be
	shadowProperty: 'boxShadow'

In general, you won't need to modify the source code of Browser.js except you want to add some browser-specific feature.

— Dialogs.js
Properties for dialog windows, as well as events are specified in Dialogs.js

— SpeedUtils.js
Basically, it's just statistics which measures the execution speed of every function.

— lzw.js
It's an algorithm which allows data packing.

========================================================================


How to create elements on the page.


In order to avoid XML and HTML - JSON is used to describe elements we want to create. It means that if you want to add some child elements to a parent element, you just need to describe them using using the following notation:

	    		c:[
		    		{
		    			type:"Label",
		    			width:200,
		    			value:"lane.js label element"
		    		},
		    		{
		    			type:"Button",
		    			width:200,
		    			caption:"lane.js button"
		    		},


You can have any amount of inner children objects you want:

	    		caption:"Some random window",
	    		width:400,
	    		height:200,
	    		c:[
	    			{
	    				type:"Container",
	    				hs:true,
	    				horizontal:true,
	    				c:[
		    				{
		    					type:"Label",
		    					width:200,
		    					value:"Some label element"
		    				},
		    				{
		    					type:"Button",
		    					width:200,
		    					caption:"Awesome button"
		    				},
                                                             ]
	    			},





Some properties which should be described in more detail:
hs – horizontal stretching. It means the element can be stretched horizontally.
vs – vertical stretching. It means the element could be stretched vertically.
type – stands for the type of an element you're creating. In this example you're creating an element of type “Container”  which has one element of type “Label” and one element of type “Button”. In case you need to edit or add some properties of these type of elements, you need to see the source of “Container.js” and add a property. For example: 

Container.addProperty("horizontal", false, {type:"boolean"});

=========================================================================


— Event driven model.
When you change property of some element, this element gets a flag, that it's been changed. 
Then this element is put into the hash map, which is later recalculated in order to redraw the elements. 
For example, if you change the size of a button, it's parent element (let it be some random div) checks 
if it's size is suitable for containing the button, it not, it becomes bigger in order to let the button fit in. 
If that div is in another div, that upper div will also recalculate its sizes. Thus, Lane allows automatic 
resizing of all the elements on the web page.
