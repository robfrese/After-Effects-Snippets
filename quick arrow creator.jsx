// quick arrow creator
// had a series of projects where i kept having to create simple arrows
// run it to create a shape layer arrow with controls
// also adds a zorro-esque tag, bc that's just how i roll
// 040815 _ 0242PM

bq_QuickArrow();

function bq_QuickArrow()
{
	var comp = app.project.activeItem

	if (comp == null)
	return;

	newName = 'Arrow 01'

	app.beginUndoGroup('bq_QuickArrow')
	
	// add empty shape
	var shapeLayer = comp.layers.addShape()
	shapeLayer.label = 2;
	
	// rename
	shapeLayer.name = newName
	/*VARS FOR EFFECT NAMES*/
	var namefillColor = 'Color--FILL'
	var namefillOpacity = 'Opacity--FILL'
	var namestrokeColor = 'Color--STROKE'
	var namestrokeWidth = 'Width--STROKE'
	var namestrokeOpacity = 'Opacity--STROKE'
	var nametipPosition = 'Position--TIP'
	var nametipSize = 'Size--TIP'
	var nametipIn = 'In--TIP (Rad,Rot)'
	var nametipOut = 'Out--TIP (Rad,Rot)'
	var namebasePosition = 'Position--BASE'
	var namebaseSize = 'Size--BASE'
	var namebaseRoundness = 'Round--BASE'
	
	
	var namestarRadius = 'Radius--TIP (i,o)'
	var namestarRoundness = 'Round--TIP (i,o)'
	
	
	/// add effect controls
	var c = new Object () // control object
	
		/// GROUPED BETTER 
		// COLOR
		c.fillColor = shapeLayer.Effects.addProperty("ADBE Color Control");
			c.fillColor.name = namefillColor
			c.fillColor.property('Color').setValue([0,0,0,0])
		c.strokeColor = shapeLayer.Effects.addProperty("ADBE Color Control");
			c.strokeColor.name = namestrokeColor
			c.strokeColor.property('Color').setValue([0,0,0,0])
			
		// STROKE WIDTH
		c.strokeWidth = shapeLayer.Effects.addProperty("ADBE Slider Control");
			c.strokeWidth.name = namestrokeWidth
			c.strokeWidth.property('Slider').setValue(0)		
			
		// POSITION
		c.starPosition = shapeLayer.Effects.addProperty("ADBE Point Control");
			c.starPosition.name = nametipPosition
			c.starPosition.property('Point').setValue([0,0])
		c.rectPosition = shapeLayer.Effects.addProperty("ADBE Point Control");
			c.rectPosition.name = namebasePosition
			c.rectPosition.property('Point').setValue([0,150])
			
		// SIZE	
		c.starSize = shapeLayer.Effects.addProperty("ADBE Point Control");
			c.starSize.name = nametipSize
			c.starSize.property('Point').setValue([100,100])
		c.rectSize = shapeLayer.Effects.addProperty("ADBE Point Control");
			c.rectSize.name = namebaseSize
			c.rectSize.property('Point').setValue([75,200])
			
		// OPACITY
		c.fillOpacity = shapeLayer.Effects.addProperty("ADBE Slider Control");
			c.fillOpacity.name = namefillOpacity
			c.fillOpacity.property('Slider').setValue(100)
		c.strokeOpacity = shapeLayer.Effects.addProperty("ADBE Slider Control");
			c.strokeOpacity.name = namestrokeOpacity
			c.strokeOpacity.property('Slider').setValue(100)
			
				
			
			
		// ROUNDNESS
		c.rectRoundness = shapeLayer.Effects.addProperty("ADBE Slider Control");
			c.rectRoundness.name = namebaseRoundness
			c.rectRoundness.property('Slider').setValue(0)
// 		c.starIn = shapeLayer.Effects.addProperty("ADBE Point Control");
// 			c.starIn.name = nametipIn	
// 			c.starIn.property('Point').setValue([69.2116,0])
// 		c.starOut = shapeLayer.Effects.addProperty("ADBE Point Control");
// 			c.starOut.name = nametipOut
// 			c.starOut.property('Point').setValue([138.4233,0])	


		c.starRoundness = shapeLayer.Effects.addProperty("ADBE Point Control");
			c.starRoundness.name = namestarRoundness
			c.starRoundness.property('Point').setValue([0,0])	

			
		c.starRadius = shapeLayer.Effects.addProperty("ADBE Point Control");
			c.starRadius.name = namestarRadius	
			c.starRadius.property('Point').setValue([69.2116,138.4233])
	
			
	/// add shape groups and paths and expressions
	
	// add outer group
	
	var outerGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
	outerGroup.name = 'Arrow Group'
	
		// add star group
		var starGroup = outerGroup.property("Contents").addProperty("ADBE Vector Group");
		starGroup.name = 'Arrow Tip'
			// add star path
			var starPath = starGroup.property("Contents").addProperty("ADBE Vector Shape - Star");
				// set type to star
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Type').setValue(1)
				// set poitns to 3
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Points').setValue(3)
				/*add expressions*/
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Position').expression = 'effect("'+nametipPosition+'")("Point")'
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Transform')('Scale').expression = 'effect("'+nametipSize+'")("Point")'
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Inner Radius').expression = 'effect("'+namestarRadius+'")("Point")[0]'
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Inner Roundness').expression = 'effect("'+namestarRoundness+'")("Point")[0]'
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Outer Radius').expression = 'effect("'+namestarRadius+'")("Point")[1]'
				shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Tip')('Contents')('Polystar Path 1')('Outer Roundness').expression = 'effect("'+namestarRoundness+'")("Point")[1]'

		// add rect group
		var rectGroup = outerGroup.property("Contents").addProperty("ADBE Vector Group");
		rectGroup.name = 'Arrow Base'
			// add rect path
			var rectPath = rectGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
			/*add expressions*/
			shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Base')('Contents')('Rectangle Path 1')('Size').expression = 'effect("'+namebaseSize+'")("Point")'
			shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Base')('Contents')('Rectangle Path 1')('Position').expression = 'effect("'+namebasePosition+'")("Point")'
			shapeLayer('Contents')('Arrow Group')('Contents')('Arrow Base')('Contents')('Rectangle Path 1')('Roundness').expression = 'effect("'+namebaseRoundness+'")("Slider")'

		// add merge paths
		var mergePaths = outerGroup.property("Contents").addProperty("ADBE Vector Filter - Merge");
			// set merge paths
			shapeLayer('Contents')('Arrow Group')('Contents')('Merge Paths 1')('Mode').setValue(2)
		// add stroke and fill
		var addStroke = outerGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
			/*add expressions*/
			shapeLayer('Contents')('Arrow Group')('Contents')('Stroke 1')('Color').expression = 'effect("'+namestrokeColor+'")("Color")'
			shapeLayer('Contents')('Arrow Group')('Contents')('Stroke 1')('Opacity').expression = 'effect("'+namestrokeOpacity+'")("Slider")'
			shapeLayer('Contents')('Arrow Group')('Contents')('Stroke 1')('Stroke Width').expression = 'effect("'+namestrokeWidth+'")("Slider")'
		var addFill = outerGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
			/*add expressions*/
			shapeLayer('Contents')('Arrow Group')('Contents')('Fill 1')('Color').expression = 'effect("'+namefillColor+'")("Color")'
			shapeLayer('Contents')('Arrow Group')('Contents')('Fill 1')('Opacity').expression = 'effect("'+namefillOpacity+'")("Slider")'
		
	
	/// finish up
	
	// add arrow tag
	shapeLayer.comment = 'Arrow'
	var addmarker = new MarkerValue('Arrow');
	shapeLayer.property("Marker").setValueAtTime(0, addmarker);

}