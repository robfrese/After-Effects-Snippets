// sometimes you need to precomp a precomp to do things to that precomp
// this quickly creates a "wrapper comp" and puts the current comp inside of it
// hold SHIFT to choose the wrapper comp's name

createWrapper(false)


function createWrapper(ScriptUI.environment.keyboardState.shiftKey)
{
	var comp = app.project.activeItem
	
	app.beginUndoGroup('Create Comp Wrapper')

	if (comp == null)
	return

	if (!(comp instanceof CompItem))
	return
	
	var newName = comp.name+' _ wrapper'
	
	if (askName == true)
	{
		var n = Window.prompt('Wrapper Comp Name', newName, 'Wrapper Comp Name')
		if (n == null) return;
		newName = n
	}

	// create empty comp at same level with exact settings of this comp

	var comp2 = comp.parentFolder.items.addComp(newName,comp.width,comp.height,comp.pixelAspect,comp.duration,comp.frameRate)
	
	// alert(comp2);

	comp2.time = comp.time
	comp2.bgColor = comp.bgColor;

	comp2.layers.add(comp);
	
	comp2.layer(1).collapseTransformation = true;

	comp2.openInViewer()
	
}
