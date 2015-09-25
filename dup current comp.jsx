// duplicates your current comp and opens the dup
// places it in the same folder as your current comp
// hold SHIFT to rename the dup

dupcomp(true)

function dupcomp (rename)
{
	// RENAME TRUE = prompt to rename dup comp
	// RENAME FALSE = just duplicates the comp without the rename option
	
	// nothing / multiple selected
	if (app.project.activeItem == null)
		return
	// comp not selected
	if (!(app.project.activeItem instanceof CompItem))
		return
		
	app.beginUndoGroup('Duplicate Current Comp')
		
	// reveal current comp in project panel
	app.executeCommand(3696)	
	

	// duplicate this comp
	var thedup = app.project.activeItem.duplicate()
	
	if (rename == true)
	{
		var newName = Window.prompt ('Name duplicate of comp: "'+thedup.name+'"', thedup.name, 'Name Comp Dup')
		thedup.name = newName
	}
	
	// deselect all
	thedup.openInViewer()
	
// 	alert(thedup)

}