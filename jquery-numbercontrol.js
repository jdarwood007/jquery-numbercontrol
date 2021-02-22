;(function ($) {
    "use strict"
    $.fn.numbercontrol = function (methodOrProps) {
        if (methodOrProps === "destroy") {
            this.each(function () {
                this.destroyInputSpinner()
            })
            return this
        }

		// Allow customizing the options.
        var options = {
        	debug: false,
        	separator: '.',
        	type: "number",
        	prependHtml: '<div class="input-group-prepend"><button class="btn btn-decrease btn-outline-secondary px-1"><span class="oi oi-minus" /></button></div>',
        	appendHtml: '<div class="input-group-append"><button class="btn btn-increase btn-outline-secondary px-1"><span class="oi oi-plus" /></button></div>',
        	inputWrap: '<div class="input-group numberControl"></div>',
        	inputCss: 'numberControlInput form-control px-1',
        	bindButtonEvents: 'click tap touch touchstart',
        	keyboardLanguage: {
        		'UP' : '<span class="oi oi-chevron-top" />',
        		'DOWN' : '<span class="oi oi-chevron-bottom" />',
        		'INVERSE' : '<span class="oi oi-transfer" />',
        		'SEP' : '<span class="oi oi-media-record" />',
        	},
        	keyboardControl: {
        	},
			buttons: [...Array(10).keys(), 'DELETE', 'CLEAR', 'DONE', 'CANCEL', 'UP', 'DOWN', 'SEP', 'INVERSE']
        }
        for (var option in methodOrProps) {
            options[option] = methodOrProps[option]
        }

		function setNewValue(container, value)
		{
			if (options.type === 'number')
				$(container).val(parseInt(value));
			else
				$(container).val(parseFloat(value));
		}

		function findMinMaxValue()
		{
			var testValue;
			for (var i=0; i < arguments.length; i++) {
				testValue = arguments[i];
				if (typeof testValue !== 'undefined' && !isNaN(testValue))
				{
					if (options.type === 'number' && parseInt(testValue) !== null)
						return parseInt(testValue);
					else if (parseFloat(testValue) !== null)
						return parseFloat(testValue);
					continue;
				}
			}
			return 0;
		}

		// Bind to each input selector
        this.each(function () {
			if (options.onBeforeInitialized !== undefined)
				options.onBeforeInitialized(this);

            var $base = $(this);

			// Some settings we either can pull in from a options, from standard attributes or defaults.
			var $step = findMinMaxValue(parseFloat(options.step), parseFloat($base.attr('step')), 1);
			var $minValue = findMinMaxValue(options.min, $base.attr('min'), Number.MIN_VALUE);
			var $maxValue = findMinMaxValue(options.max, $base.attr('max'), Number.MAX_VALUE);

			// Build the parent up. 
			$base.wrap(options.inputWrap);
			var $parent = $base.parent(options.parentSelector);

			// Set the base.
			$base.attr('type', options.type);
			$base.addClass(options.inputCss);

			// Wrap the buttons around.			
			$base.before(options.prependHtml);
			$base.after(options.appendHtml);
			
			// Add the style to the body to cleanup input controls for number.
			if (options.type == 'number' && !options.DisableNumberSpinStyleFix)
				$('body').append('<style>' +
							'.numberControlInput::-webkit-outer-spin-button,.numberControlInput::-webkit-inner-spin-button {' + 
								'-webkit-appearance: none;' +
							'}</style>'
				);

			// The decrease event.
			var $decreaseButton = $parent.find('.btn-decrease');
			$decreaseButton.on(options.bindButtonEvents, function (event) {
				if (options.onBeforeClickDecrease !== undefined)
					options.onBeforeClickDecrease(this, event);
				if ($base.val() > $minValue)
					setNewValue($base, parseFloat($base.val()) - parseFloat($step));
				if (options.onAfterClickDecrease !== undefined)
					options.onAfterClickDecrease(this, event);
				if (options.debug)
					console.log('numbercontrl: decreaseButton: Click', event, $base.val(), $minValue);
			});

			// The increase event.
			var $decreaseButton = $parent.find('.btn-increase');
			$decreaseButton.on(options.bindButtonEvents, function (event) {
				if (options.onBeforeClickIncrease !== undefined)
					options.onBeforeClickIncrease(this, event);
				if ($base.val() < $maxValue)
					setNewValue($base, parseFloat($base.val()) + parseFloat($step));
				if (options.onAfterClickIncrease !== undefined)
					options.onAfterClickIncrease(this, event);
				if (options.debug)
					console.log('numbercontrl: increaseButton: Click', event, $base.val(), $minValue);
			});

			// The Popup Numberpad
			if (!options.disableVirtualKeyboard)
			{
				if (options.onBeforeVirtualKeyboardInitalized !== undefined)
					options.onBeforeVirtualKeyboardInitalized(this);

				$base.on(options.bindButtonEvents, function (event) {
					event.stopPropagation();

					if (options.onBeforeVirtualKeyboardOpen !== undefined)
						options.onBeforeVirtualKeyboardOpen(this);

					var $location = options.virtualKeyboardAttachSelector ? $(options.virtualKeyboardAttachSelector) : $base;

					if (options.keyboardLayout)
						var $KeyboardLayout = options.keyboardLayout;
					else
						var $KeyboardLayout = 
							'<div class="modal-dialog modal-dialog-centered" style="width: 250px;">' +
								'<div class="modal-content">' +
									'<table>' +
										'<tr>' +
											'<td colspan="4">{INPUTBOX}</td>' +
										'</tr><tr>' +
											'<td>{7}</td>' +
											'<td>{8}</td>' +
											'<td>{9}</td>' +
											'<td>{DELETE}</td>' +
										'</tr><tr>' +
											'<td>{4}</td>' +
											'<td>{5}</td>' +
											'<td>{6}</td>' +
											'<td>{CLEAR}</td>' +
										'</tr><tr>' +
											'<td>{1}</td>' +
											'<td>{2}</td>' +
											'<td>{3}</td>' +
											'<td>{DONE}</td>' +
										'</tr><tr>' +
											'<td>{UP}</td>' +
											'<td>{0}</td>' +
											'<td>{DOWN}</td>' +
											'<td>{CANCEL}</td>' +
										'</tr>' +
									'</table>' +
								'</div>' +
							'</div>'
						;

					// Fill out the input.
					if (typeof options.keyboardControl["INPUTBOX"] === 'undefined')
						options.keyboardControl["INPUTBOX"] = '<input class="numberControlVirtualNumPad numberControlVirtualNumPadINPUT form-control" type="text" readonly value="{VAL}"/>';
					$KeyboardLayout = $KeyboardLayout.replace('{INPUTBOX}', options.keyboardControl["INPUTBOX"].replace('{VAL}', $base.val()).toString());

					// Fill out all buttons.
					$.each(options.buttons, function(i, v){
						var LanguageBox = options.keyboardLanguage[v] ? options.keyboardLanguage[v] : v;

						if (typeof options.keyboardControl[v] === 'undefined')
							options.keyboardControl[v] = '<button class="numberControlVirtualNumPad numberControlVirtualNumPad' + v + ' btn btn-outline-secondary w-100" data-function="' + v + '">{' + v + '_LANG}</button>';
						$KeyboardLayout = $KeyboardLayout.replace('{' + v + '}', options.keyboardControl[v].replace('{' + v + '_LANG}', LanguageBox));
					});

					// Attach the keyboard to the container.
					$location.after('<div class="numberControlVirtualNumPad modal d-block">' + $KeyboardLayout + '</div>');
					var $VirtualKeyboard = $parent.find('.numberControlVirtualNumPad');
					var $VirtualKeyboardInput = $VirtualKeyboard.find('.numberControlVirtualNumPadINPUT');

					// Bind the virtual Keyboard action.
					$VirtualKeyboard.find('.numberControlVirtualNumPad').on(options.bindButtonEvents, function(event){						
						if (options.debug) console.log('numbercontrl: numberControlVirtualNumPad: Click', event, $base.val(), $VirtualKeyboardInput.val().toString(), $(this).attr('data-function'));

						var thisFunction = $(this).attr('data-function');

						if (options.onBeforeVirtualKeyboardButton !== undefined)
							options.onBeforeVirtualKeyboardButton(this, event, thisFunction);

						switch (thisFunction)
						{
							case 'DELETE':
								$VirtualKeyboardInput.val($VirtualKeyboardInput.val().toString().slice(0, -1));
							break;
							
							case 'CLEAR':
								$VirtualKeyboardInput.val("");
							break;
							
							// Done break.
							case 'DONE':
								if ($VirtualKeyboardInput.val() > $maxValue)
									setNewValue($base, $maxValue);
								else if ($VirtualKeyboardInput.val() < $minValue)
									setNewValue($base, $minValue);
								else
									setNewValue($base, $VirtualKeyboardInput.val());
							case 'CANCEL':
								$VirtualKeyboard.remove();
							break;
							
							case 'UP':
								if ($VirtualKeyboardInput.val() < $maxValue)
									setNewValue($VirtualKeyboardInput, parseFloat($VirtualKeyboardInput.val()) + parseFloat($step));
							break;
							
							case 'DOWN':
								if ($VirtualKeyboardInput.val() > $minValue)
									setNewValue($VirtualKeyboardInput, parseFloat($VirtualKeyboardInput.val()) - parseFloat($step));
							break;

							case 'SEP':
								if ($VirtualKeyboardInput.val().toString().indexOf(options.separator) === -1)
									$VirtualKeyboardInput.val($VirtualKeyboardInput.val().toString() + options.separator);
							break;

							case 'INVERSE':
								setNewValue($VirtualKeyboardInput, parseFloat($VirtualKeyboardInput.val()) * -1);
							break;
														
							// Default to assume its numbers.
							default:
								if ($(this).attr('data-custom-function'))
									$(this).attr('data-custom-function')(this, event, thisFunction);
								else
									setNewValue($VirtualKeyboardInput, $VirtualKeyboardInput.val().toString() + $(this).attr('data-function'));
						}

						if (options.onAfterVirtualKeyboardButton !== undefined)
							options.onAfterVirtualKeyboardButton(this, event, thisFunction);
					});

					if (options.onAfterVirtualKeyboardOpen !== undefined)
						options.onAfterVirtualKeyboardOpen(this);
				});

				if (options.onAfterVirtualKeyboardInitalized !== undefined)
					options.onAfterVirtualKeyboardInitalized(this);
			}

			if (options.onAfterInitialized !== undefined)
				options.onAfterInitialized(this);
			if (options.debug) console.log($base.parent());
		});
}

}(jQuery));