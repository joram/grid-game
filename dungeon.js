var layers = require('./layers');
var utils = require('./utils');
var players = require('./players');
var vertices = require('./vertices');

var origin = {x:0, y:0}
var tunnelEndpoints = [origin]
var carvedVertices = []

function generateIsSolid(x, y){
	for(i=0; i<carvedVertices.length; i++){
		v = carvedVertices[i]
		if(utils.isEquivalent({x:x, y:y}, v)){
			return false
		}
	}
	return true
}
vertices.setValueFunc("isSolid", generateIsSolid)

function carveVertex(v){
	console.log("carving "+v.x+", "+v.y)
	carvedVertices.push(v)
	vertices.resetVertex(v.x, v.y)
	
	rgb = vertices.getValue(v.x, v.y, "PerlinRGB")
	delta = 100
	rgb.r = Math.max(0, rgb.r - delta)
	rgb.g = Math.max(0, rgb.g - delta)
	rgb.b = Math.max(0, rgb.b - delta)
	vertices.setValue(v.x, v.y, "PerlinRGB", rgb)

	updateBoxDetails(v, players.getSocket())		
}

function carveTunnel(p){
	l = Math.floor(vertices.getValue(p.x, p.y, "PerlinValue1")/10)
	d = Math.floor(vertices.getValue(p.x, p.y, "PerlinValue2") % 4)
	d = utils.directions[d]
	d_delta = utils.directionDeltas[d]
	console.log("carving tunnel from (" + p.x + ", " + p.y + ") of length " + l + ", in direction: " + d)
	x = p.x
	y = p.y
	for(i=0; i<l; i++){
		x += d_delta.x
		y += d_delta.y
		carveVertex({x:x, y:y})
	}

}

function carveDungeon(io){
	if(tunnelEndpoints.length > 0){
		carveTunnel(tunnelEndpoints.pop())
	}
}

function getDetails(x, y){
	solid = vertices.getValue(x, y, "isSolid")
	rgb = vertices.getValue(x, y, "PerlinRGB")
  	return {
    	color: utils.rgbToHex(rgb),
        solid: solid
    }
}

function updateBoxDetails(v, recipient){
	extra_details = getDetails(v.x, v.y)
    v['color'] = extra_details['color']
    v['solid'] = extra_details['solid']
    recipient.emit("box details", v)	
}

carveVertex(origin)
carveDungeon()
setInterval(carveDungeon, 5000);
module.exports = {
    GetDetails: getDetails,
    updateBoxDetails: updateBoxDetails
}