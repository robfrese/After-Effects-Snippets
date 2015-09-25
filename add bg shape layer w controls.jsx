// adds a 1920x1080 shape layer with controls that let you easily customize color, etc
// also adds an "change bg color at marker" expression, but turns it off

addBgShapeLayer()

function addBgShapeLayer(){
	var comp = app.project.activeItem;
	if (comp == null) return;
	if (!(comp instanceof CompItem)) return;
	
	app.beginUndoGroup('Add Shape Layer BG')
	
	// add shape
	var lr = comp.layers.addShape();
	lr.name = 'BG';
	lr.label = 0;
	lr.moveToEnd();
	var c = lr.Contents;
	// add group
	var g = c.addProperty('ADBE Vector Group');
	g.name = 'BG GROUP';
	// turn 3d on and off to get rid of "material options" glitch
	lr.threeDLayer = !(lr.threeDLayer); lr.threeDLayer = !(lr.threeDLayer);
	// add props
	var r = g.Contents.addProperty('ADBE Vector Shape - Rect');
	var s = g.Contents.addProperty('ADBE Vector Graphic - Stroke');
	var f = g.Contents.addProperty('ADBE Vector Graphic - Fill');
	// add effects -- stroke width, fill color, stroke color, show fill, show stroke;
	var showFill = lr.Effects.addProperty('ADBE Checkbox Control'); showFill.name = 'Fill';
	var fillColor = lr.Effects.addProperty('ADBE Color Control'); fillColor.name = 'Fill Color';		
	var showStroke = lr.Effects.addProperty('ADBE Checkbox Control'); showStroke.name = 'Stroke';
	var strokeColor = lr.Effects.addProperty('ADBE Color Control'); strokeColor.name = 'Stroke Color';
	var strokeWidth = lr.Effects.addProperty('ADBE Slider Control'); strokeWidth.name = 'Stroke Width';
	// set effect values
	lr.Effects.property('Fill').property('Checkbox').setValue(true);
	//lr.Effects.property('Fill Color').property('Color').setValue([1,1,1,1]);
	lr.Effects.property('Stroke').property('Checkbox').setValue(false);
	lr.Effects.property('Stroke Color').property('Color').setValue([0,0,0,0]);
	lr.Effects.property('Stroke Width').property('Slider').setValue(2);
	// set expressions
	f.property('ADBE Vector Fill Opacity').expression = 'if (effect("Fill")("Checkbox") == false) 0; if (effect("Fill")("Checkbox") == true) 100;';
	f.property('ADBE Vector Fill Color').expression = 'effect("Fill Color")("Color")';
	lr.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Color").expression = 'effect("Stroke Color")("Color")';
	lr.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Opacity").expression = 'if (effect("Stroke")("Checkbox") == false) 0; if (effect("Stroke")("Checkbox") == true) 100;';
	lr.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Width").expression = 'effect("Stroke Width")("Slider")';
	// set shape size
	lr.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property('ADBE Vector Shape - Rect').property('ADBE Vector Rect Size').setValue([1920,1080]);
	
	
	// add random color at markers effect and expression BUT disable
	var eff = lr.Effects.addProperty('ADBE Color Balance (HLS)');
	eff.enabled = false
	eff.property('Hue').expression = 
'// RANDOM COLOR CHANGE AT MARKER / TRANSITION\
markerLayer = thisLayer;\
randomNumber1 = 81.79;\
randomNumber2 = 7.77;\
numFrames = 10\
\
//------------------------------------\
\
tRamp = numFrames*thisComp.frameDuration;\
m = markerLayer.marker;\
n = 0;\
\
if (m.numKeys > 0){\
  n = m.nearestKey(time).index;\
  if (m.key(n).time > time) n--;\
}\
\
seedRandom(n,true);\
\
c1 = random([n*randomNumber1],[n*n*randomNumber2]);\
\
if (n > 0){\
  seedRandom(n-1,true);\
  c0 = random([(n-1)*randomNumber1],[(n-1)*(n-1)*randomNumber2]);\
  t = time - m.key(n).time;\
  linear(t,0,tRamp,c0,c1)\
}else{\
  c1\
}\
'

	
	app.endUndoGroup()
}