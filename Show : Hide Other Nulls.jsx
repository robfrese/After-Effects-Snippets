// too many null controllers? hard to tell what's what?
// select the nulls you need and run this -- it'll HIDE all the UNSELECTED nulls in the comp
// deselect all layers and run again to SHOW all nulls in the comp
// nulls!

app.beginUndoGroup('Hide Other Nulls')

var comp = app.project.activeItem;

if (comp.selectedLayers.length == 0)
{
	for (var i = 1; i<=comp.layers.length; i++)
		{
			// info
			clearOutput()
			writeLn('Processing layer '+i+' of '+comp.layers.length)
			
			var layer = comp.layer(i)
			if (layer.nullLayer == true && layer.shy == true)
				{layer.enabled = false}
			else
			if (layer.nullLayer == true && layer.shy == false)
				{layer.enabled = true}

		}
}
else
{
	for (var i = 1; i<=comp.layers.length; i++)
		{
			// info
			clearOutput()
			writeLn('Processing layer '+i+' of '+comp.layers.length)
			
			var layer = comp.layer(i)
			if (layer.nullLayer == true && layer.selected == false)
				{layer.enabled = false}
		}
}

clearOutput()