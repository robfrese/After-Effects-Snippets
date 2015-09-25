// SWITCH POSITIONS
// GRAB 2 LAYERS, HAVE THEM SWITCH POSITION VALUES
// SET FOR 2 LAYERS 

// note: has to use a convoluted thing where we convert the value to a string then pull it back out with split(',') BECAUSE otherwise it tries to pull the current value (which has been changed), even when i put it in a var, which is weird bc i don't think it's suppossed to do that but it's doing that

switchPositions()

function switchPositions(){

app.beginUndoGroup('Switch Positions')

var comp = app.project.activeItem;
if (comp == null) return;
if (!(comp instanceof CompItem)) return;
if (comp.selectedLayers.length == 0) return;
if (comp.selectedLayers.length == 1) return;

// layers
var lr1 = comp.selectedLayers[0]
var lr2 = comp.selectedLayers[1]

// values
var l1p = lr1.Position.value
var l1a = lr1.anchorPoint.value
var l2p = lr2.Position.value
var l2a = lr2.anchorPoint.value

// as strings
var pos1st = l1p.toString()
var anc1st = l1a.toString()
var pos2st = l2p.toString()
var anc2st = l2a.toString()

// set first
lr2.Position.setValue(l1p)
lr2.anchorPoint.setValue(l1a)

// pull strings to set 2nd
var p2pullp = pos2st.split(',')
var p2pulla = anc2st.split(',')

lr1.Position.setValue(p2pullp)
lr1.anchorPoint.setValue(p2pulla)

}