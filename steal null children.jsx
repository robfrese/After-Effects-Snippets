// that thing where you need to reposition a NULL without moving the layers parented to it

// duplicate the null, position the dup as necessary, and RUN THIS SCRIPT

// it will parent the original null to this null, then delete the original null and rename this null to the name of the original null
// it assumes that your DUPLICATE is the layer ABOVE the original null, so it uses the next layer as the original null

// 050415 _ 0425PM

stealNullChildren()

function stealNullChildren()
{
	var comp = app.project.activeItem;
	if (comp == null) return
	if (!(comp instanceof CompItem)) return
	if (comp.selectedLayers.length == 0) return 
	
	var newn = comp.selectedLayers[0]
	
	if (newn.index == comp.numLayers) return;
	
	var oldn = comp.layer(newn.index+1)
	if (oldn.nullLayer == false){alert('Layer below is not a null! Aborted!'); return;}
	
	app.beginUndoGroup('Steal Null Children')
		
	oldn.parent = newn
	newn.name = oldn.name
	oldn.remove()
	
	app.endUndoGroup()
}