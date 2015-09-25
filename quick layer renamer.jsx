// quick layer renamer
// quickly rename a bunch of selected layers IN SUCCESSION

// gather selected layers into array
// loop thru and rename each quickly, showing which one's selected

quickLayerRenamer ();

function quickLayerRenamer ()
{
	if (app.project.activeItem == null)
		return
		
	if (app.project.activeItem.numLayers == 0)
		return
		
	// vars
		var comp = app.project.activeItem;		
		var array = []
		var seld = false; // doing selected layers or not?
	
	/// BUILD ARRAY
		// SELECTED LAYERS
			if (comp.selectedLayers.length > 0)
				{
					seld = true;
					
					for (var i=comp.selectedLayers.length-1; i>=0; i--)
						{
							array.push(comp.selectedLayers[i])			
							comp.selectedLayers[i].selected = false;
						}
				}
			else
		// VISIBLE LAYERS
			if (comp.selectedLayers.length == 0
			&& comp.hideShyLayers == true)
				{
					for (var i=comp.layers.length; i>=1; i--)
						{
							if (comp.layer(i).shy == false)
								array.push(comp.layer(i))
						}
				}
			else
		// ALL LAYERS
			if (comp.selectedLayers.length == 0
			&& comp.hideShyLayers == false)
				{
					for (var i=comp.layers.length; i>=1; i--)
						{
							array.push(comp.layer(i))
						}
				}
			
	// BEGIN UNDO
		app.beginUndoGroup('Quick Rename Multiple Layers')
	
	// loop thru array to rename
		for (var i=array.length-1; i>=0; i--)
			{
				// vars
				var lr = array[i]
				var invertindex = (array.length-i)
				var lindex = invertindex.toString()
				var llength = array.length.toString()
				
				// select layer
				lr.selected = true;
				
				/// NEW NAME WINDOW
				var newName = edittextWindow('Rename Layer: "'+lr.name+'" ('+lindex+' of '+llength+')', lr.name, 30, false)
				
				// deselect layer
				lr.selected = false;
				
				// escape if null
				if (newName == null)
					{
						if (seld == true)
							reselectAllLayers(array)
						return
					}
					
				// rename if different
				if (newName != lr.name)
					lr.name = newName			
			}
		
	// reselect all layers
		if (seld == true)
			reselectAllLayers(array)
	
	// END UNDO
		app.endUndoGroup()
	
}

function reselectAllLayers(layerArray)
{
	if (layerArray.length < 1)
		return
	
	for (var i=layerArray.length-1; i>=0; i--)
		{
			layerArray[i].selected = true;
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



