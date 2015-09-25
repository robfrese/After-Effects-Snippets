// add opacity cut
// 050615 _ 1156AM
// adds opacity hold keyframe at current time
// if opacity = 0, it's 100, else it's 0
// made for a specific project i was doing where i needed to do this a lot

addOpacityCut ()
function addOpacityCut () { 
	var comp = app.project.activeItem;
	if (comp == null) return;
	if (!(comp instanceof CompItem)) return;
	if(comp.numLayers === 0) return;
	if(comp.selectedLayers.length === 0) return;

	var lr = comp.selectedLayers[0]

	app.beginUndoGroup('Add Opacity Cut')
						
	var op = lr.Transform.Opacity
	
	var curo = op.value;
	var didset = false
	
	/// ability to delete keyframe if necessary			
		// if setting opacity to 100, but there's a previous hold kf and it's set to 100, then just remove the current kf
		
	if (curo === 0){ 
		op.setValueAtTime(comp.time, 100)
		didset = true
		if (op.nearestKeyIndex(comp.time) > 1){ 
			// if previous KF is 100, delete this kf and didset false
			if (op.keyValue (op.nearestKeyIndex(comp.time)-1) == 100){
				op.removeKey(op.nearestKeyIndex(comp.time))
				didset = false
			}
		}
	}	
	else
	if (curo === 100){ 
		op.setValueAtTime(comp.time, 0)
		didset = true
		if (op.nearestKeyIndex(comp.time) > 1){ 
			// if previous KF is 0, delete this kf and didset false
			if (op.keyValue (op.nearestKeyIndex(comp.time)-1) == 0){
				op.removeKey(op.nearestKeyIndex(comp.time))
				didset = false
			}
		}
	}

	if (didset == true){
		op.setInterpolationTypeAtKey(op.nearestKeyIndex(comp.time), KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD)
	}

	app.endUndoGroup()

}


