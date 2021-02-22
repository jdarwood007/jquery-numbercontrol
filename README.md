# JQuery Number Control

Implants a plugin for JQuery to add number spinner that is mobile friendly and a virtual keyboard.  

# Requirements
 - JQuery v3 or higher.
 - Bootstrap v4 or higher.

# Install
## Add to your javascript sources
 - jquery-numbercontrol.js (or .min.js)
## Attach to any input
    $(document).ready(function() {
		$('#numbercontrol').numbercontrol();
	});

# Full Sample Code
    <input type="text" id="numbercontrol" value="1" min="-500" max="500" />
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="./jquery-numbercontrol.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		console.log('loading');
		$('#numbercontrol').numbercontrol();
	});
	</script>

# HTML 5 Input Type="number"
This plugin supports working with input type="number", decimal and text.  It will detect usage of min, max and step attributes on the input tag.  These can be optionally specified in the loading of the numbercontrol plugin.  The priority of the options are

 1. Options specified
	 {min: 0, max: 1000, step: 10}
 2. Tag attributes
	 <input type="number" min="0" max="1000" step="10" value="1" / >
 3. Default sane attributes
	 Step: 1
	 Min: Number.MIN_VALUE
	 Max: Number.MAX_VALUE 

# Options
## type
Optionally override an input type.  By default it sets to "number"
#### Type: string
### Values
 - text
 - number
 - decimal

## disableVirtualKeyboard
Disable the virtual keyboard popup upon clicking the input.
### Type: Bool

## separator
decimal separator
### type: string
### Values
Any valid character such as period (.) or comma (,).

## inputWrap
Wraps the input object in a container.
### type: Html
### Values:
Any valid HTML.  This should be kept basic.  If multiple nested html containers are used, the default logic is to find the nearest container to the input object as the "parent" container.
### Default Value: `<div class="input-group numberControl"></div>`

## parentSelector
Optionally specify the parent selector.  If left blank, we locate the nearest parent to the input object.
### type: JQuery Selector

## inputCss
Specify css to add to the input object
### type: css class styles
### Default Value: `numberControlInput form-control px-1`

## prependHtml
Specify different HTML to prepend to the input object
### type: Html
### Default Value: `<div class="input-group-prepend"><button class="btn btn-decrease btn-outline-secondary px-1"><span class="oi oi-minus" /></button></div>`

## appendHtml
Specify different HTML to append to the input object
### type: HTML
### Default Value: `<div class="input-group-append"><button class="btn btn-increase btn-outline-secondary px-1"><span class="oi oi-plus" /></button></div>`

## DisableNumberSpinStyleFix
Optionally Disables the default HTML 5 spin (Increase/Decrease buttons) fix when input type is number/decimal.  By default this plugin will append a style fix to the body element to hide this.
### type: bool
## bindButtonEvents
Optionally specify events used to trigger buttons/inputs.
### type: user actions
### Default Value: `click tap touch touchstart`

## virtualKeyboardAttachSelector
Optionally specify where to attach the virtual keyboard.  If left blank, it is appended the nearest to the input object.
### type: JQuery Selector

## keyboardLayout
Specify a custom keyboard layout.   This has placeholders for all functions/input controls.  These are surrounded by curly braces {}.  The current buttons are:
 - Numbers 0-9
 - INPUTBOX
 - DELETE
 - SEP
 - UP
 - DOWN
 - CLEAR
 - INVERSE
 - DONE

### type: HTML
## keyboardControl[]
Optionally specify custom HTML for any button.  This will be replaced with the layout placeholders on initialization.  The INPUTBOX control placeholder optionally can hold {VAL} which will be replaced with the current value.  All others can optionally contain a {[CONTROL]_LANG} which will replace the button with the appropriate language for the button.  The button object should contain a "data-function" which indicates which control function it should trigger.
### Custom function
If a custom function is needed the function should be specified in "data-custom-function"
#### Parameters
 - this: (the current object)
 - event: (the user event such as mouse click, or touch)
 - thisFunction: the string from "data-function"

## keyboardLanguage[]
Optionally specify a custom language string for any control button.  

## onBeforeInitialized
Add a custom event handler before any logic has been applied to the input object.
### Paramaters:
 - this: (the current object)

## onAfterInitialized
Add a custom event handler after all logic has been applied to the input object.
### Paramaters:
 - this: (the current object)

## onBeforeClickDecrease
Add a custom event handler before clicking the decrease button built in event triggers
### Paramaters:
 - this: (the current object)
 - event: (the user event such as mouse click, or touch)

## onAfterClickDecrease
Add a custom event handler after clicking the decrease button built in event triggers
### Paramaters:
 - this: (the current object)
 - event: (the user event such as mouse click, or touch)

## onBeforeClickIncrease
Add a custom event handler before clicking the increase button built in event triggers
### Paramaters:
 - this: (the current object)
 - event: (the user event such as mouse click, or touch)

## onAfterClickIncrease
Add a custom event handler after clicking the increase button built in event triggers
### Paramaters:
 - this: (the current object)
 - event: (the user event such as mouse click, or touch)

## onBeforeVirtualKeyboardInitalized
Add a custom event handler before the initialization of the virtual keyboard.
### Paramaters:
 - this: (the current object)

## onAfterVirtualKeyboardInitalized
Add a custom event handler after the initialization of the virtual keyboard.
### Paramaters:
 - this: (the current object)

## onBeforeVirtualKeyboardOpen
Add a custom event handler before the opening of the virtual keyboard.
### Paramaters:
 - this: (the current object)

## onAfterVirtualKeyboardOpen
Add a custom event handler after the opening of the virtual keyboard.
### Paramaters:
 - this: (the current object)

## onBeforeVirtualKeyboardButton
Add a custom event handler before the trigger of a keyboard button.
### Paramaters:
 - this: (the current object)
 - event: (the user event such as mouse click, or touch)
 - thisFunction: The button action