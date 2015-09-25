// add controller for selected props
// select props, it'll add expression controllers to the layer and link them to them
// does not currently copy keyframes -- that to come

linkSelectedPropsToControllers()
function linkSelectedPropsToControllers(){

	var comp = app.project.activeItem;

	if (comp == null) return;
	if (!(comp instanceof CompItem)) return;
	if (comp.numLayers === 0) return;
	if (comp.selectedProperties.length === 0) return;

	app.beginUndoGroup('Prop Control')

	// loop
	for (var i=comp.selectedProperties.length-1; i>=0; i--){
		var prop = comp.selectedProperties[i];
		if (prop.canSetExpression)
			linkPropToController(prop)
	}

	app.endUndoGroup()

	function linkPropToController(prop){
		
		var cname = null;
		
		if (prop.canSetExpression == false) return;
		
		// cannot add controller
		if (prop.propertyValueType == PropertyValueType.NO_VALUE
		|| prop.propertyValueType == PropertyValueType.CUSTOM_VALUE
		|| prop.propertyValueType == PropertyValueType.MARKER
		|| prop.propertyValueType == PropertyValueType.LAYER_INDEX
		|| prop.propertyValueType == PropertyValueType.MASK_INDEX
		|| prop.propertyValueType == PropertyValueType.SHAPE
		|| prop.propertyValueType == PropertyValueType.TEXT_DOCUMENT)
		return;
		
		// get layer
		var lr = prop.propertyGroup(prop.propertyDepth);
		
		// get name array
		var pname = prop.name;
		var parname = prop.parentProperty.name;
		if (parname == 'Contents' || parname == 'Transform') parname = prop.parentProperty.parentProperty.name
		if (prop.parentProperty.propertyDepth == 1)
			parname = ''
		
		
		// 3d or 3d spatial	=	3d point
		if (prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL
		|| prop.propertyValueType == PropertyValueType.ThreeD)
			cname = 'Point3D'		

		// 2d or 2d spatial	=	point
		if (prop.propertyValueType == PropertyValueType.TwoD_SPATIAL
		|| prop.propertyValueType == PropertyValueType.TwoD)
			cname = 'Point'	

		// 1d	=	slider
		if (prop.propertyValueType == PropertyValueType.OneD)
			cname = 'Slider'	

		// color	=	color
		if (prop.propertyValueType == PropertyValueType.COLOR)
			cname = 'Color'	
			
		// ------------------------------------
		
		if (cname == null) return;
		
		// ------------------------------------
		
		// add controler
		var ctrl = lr.Effects.addProperty('ADBE '+cname+' Control');
		
		// name controller
		if (parname == '')
			ctrl.name = pname;
		else
			ctrl.name = parname+' > '+pname;
			
		/// set value
		// no keys
		if (prop.numKeys == 0)
			ctrl.property(1).setValue(prop.value)
			
		if (prop.numKeys > 0){
			// set value to first value
			ctrl.property(1).setValue(prop.valueAtTime(comp.time, true))
		}
		

		// adjust cname for expression
		if (cname == 'Point3D') cname = '3D Point';
		
		// add expression
		prop.expression = '// Linked to '+cname.toUpperCase()+' :: "'+ctrl.name+'"\rthisLayer.effect("'+ctrl.name+'")("'+cname+'")'
		
	}



}