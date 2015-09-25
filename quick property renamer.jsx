// quick prop renamer
// quickly rename a bunch of selected properties IN SUCCESSION 

quickPropertyRenamer ();

function quickPropertyRenamer ()
{
	if (app.project.activeItem == null)
		return
		
	if (app.project.activeItem.numLayers == 0)
		return
		
	if (app.project.activeItem.selectedProperties.length == 0)
		return
		
	// vars
		var comp = app.project.activeItem;		
		var array = comp.selectedProperties;
				
	// deselect all selected props (so we can see what we're doing)
	for (var i=array.length-1; i>=0; i--)
			{
				if (array[i].elided == true)
					continue;
					
				array[i].selected = false;				
			}
			
	// BEGIN UNDO
		app.beginUndoGroup('Quick Rename Multiple Properties')
	
	// loop thru array to rename
// 		for (var i=array.length-1; i>=0; i--)
		for (var i=0; i<array.length; i++)
			{
				// vars
				var prop = array[i]				
				var numindexnum = i+1
				var pindex = numindexnum.toString()
				var plength = array.length.toString()				
				
				if (prop.elided == true)
					continue;
				
				if (prop.parentProperty.propertyType != PropertyType.INDEXED_GROUP)
					continue;
				
				// select layer
				prop.selected = true;
				
				/// NEW NAME WINDOW
				var newName = edittextWindow('Rename Layer: "'+prop.name+'" ('+pindex+' of '+plength+')', prop.name, 30, false)
				
				// escape if null
				if (newName == null)
					{
						reselectAllProps(array)
						return
					}
					
				// rename if different
				if (newName != prop.name)
					prop.name = newName
					
				prop.selected = false;
			}
		
	// reselect all layers
		reselectAllProps(array)
	
	// END UNDO
		app.endUndoGroup()
	
}

function reselectAllProps(array)
{
	if (array.length < 1)
		return
	
	for (var i=array.length-1; i>=0; i--)
		{
			if (array[i].elided == true)
				continue;
				
			array[i].selected = true;
		}
}

function edittextWindow(windowName, defaultText, textSize, qQuit, buttonArray, buttonOrientation)
{
	// BLANK EDIT TEXT DIALOG WINDOW
	// shows a quick edit text window with optional buttons...
	// Returns: typed text (OR, if using buttonArray, returns array of [typedText, selectedButton]
	
	// windowName == name of window
	// defaultText == text to be in the edit text box on start
	// textSize == single number, edittext.characters
	// qQuit == if true, Q quits the dialog, else false
	// buttonArray == (optional), if included, adds custom buttons and returns them with text in array 
			// NOTE: first button will always default to "OK" button
	// buttonOrientation == (optional), if using buttonArray, it changes the orientation
	
				
	// VARS
	if (defaultText == '')
		defaultText = null
	
	var customButtons = false;
		if (buttonArray == undefined)
			customButtons = false
		else
		if (buttonArray.length == 0)
			customButtons = false
		else
		if (buttonArray.length > 0)
			customButtons = true
			
	if (customButtons == true)
		{
			var rtn = [defaultText, null]
			
			if (buttonOrientation != 'row'
			&& buttonOrientation != 'column')
				buttonOrientation = 'row'
		}
	else
	if (customButtons != true)
		var rtn = defaultText
		
	if (Number(textSize) == NaN)
		textSize = 30;
	else
	if (Number(textSize) != NaN)
		textSize = Number(textSize)
		
	var x = undefined;	
		
	// WINDOW
	var w = new Window ('dialog', windowName, x)
	w.alignment = ['fill', 'fill']
	w.alignChildren = ['fill', 'fill']
	w.spacing = 5
	w.margins = 5
	
	var titletext = w.add('statictext', x, windowName)
	titletext.justify = 'center'
	
	// EDIT TEXT
	var entry = w.add('edittext', x, defaultText)
	entry.characters = textSize;
	entry.active = true;
	
	// NO CUSTOM BUTTONS
	if (customButtons == false)
		{
			// UPDATE ENTRY RETURN VAR
			entry.onChange = entry.onChanging = function ()
				{
					if (entry.text != '')
						rtn = entry.text
					else
						rtn = null
				}
			
			// CREATE OK / CANCEL BUTTONS
			var b = w.add('group {orientation: "row"}')
			b.alignment = ['fill', 'fill']
			b.alignChildren = ['fill', 'fill']
			b.spacing = 5
			b.margins = 0
			
				var ok = b.add('button', x, 'OK')
				var cancel = b.add('button', x, 'Cancel')
				
				cancel.onClick = function ()
					{
						rtn = null
						w.close()
					}
		}
	else	
	// YES CUSTOM BUTTONS
	if (customButtons == true)
		{
			// UPDATE ENTRY RETURN VAR
			entry.onChange = entry.onChanging = function ()
				{
					if (entry.text != '')
						rtn[0] = entry.text
					else
						rtn[0] = null
				}
			
			// CREATE CUSTOM BUTTONS
			var b = w.add('group {orientation: "'+buttonOrientation+'"}')
			b.alignment = ['fill', 'fill']
			b.alignChildren = ['fill', 'fill']
			b.spacing = 5
			b.margins = 0

			// BUTTONS
			var buttons = new Object()
			var tempButtonArray = []
			
			for (var i=0; i<buttonArray.length; i++)
				{
					if (i==0)
						buttons[i] = b.add('button', x, buttonArray[i], {name: 'ok'})
					else
						buttons[i] = b.add('button', x, buttonArray[i])
						
					buttons[i].helpTip = buttonArray[i]
					tempButtonArray.push(buttons[i])
				}	
			
			
			// BUTTON ON CLICKS
			for (i in buttons)
				{
					buttons[i].onClick = function ()
						{
							rtn[1] = this.text
							w.close()
						}			
				}
		}
	
	// QQUIT / SPACETRIGGER (if applicable)
	if (qQuit == true)
		{	
			w.addEventListener("keydown", function(k)
				{
					if (k.keyName == 'Q')
						{							
							if (customButtons == false)
								{
									rtn = null
								}					
							else
							if (customButtons == true)
								{
									rtn = [null, null]
								}
							
							w.close()
						}
				});
		}
	
	
	// SHOW
	w.show()
	
	// RETURN
	return rtn	
}// edittextWindow



