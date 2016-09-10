var layers = require('./layers');
var utils = require('./utils');
var players = require('./players');

var origin = {x:0, y:0}
var tunnelEndpoints = [origin]
var carvedVertices = [origin]

function isSolid(p){
	for(i=0; i<carvedVertices.length; i++){
		v = carvedVertices[i]
		if(utils.isEquivalent(p, v)){
			console.log("("+v.x+", "+v.y+") is empty")
			return false
		}
	}
	// console.log(p.x + ", " + p.y + " is solid")
	return true
}

function carveVertex(v){
	console.log("carving "+v.x+", "+v.y)
	carvedVertices.push(v)
	updateBoxDetails(v, players.getSocket())		
}

function carveTunnel(p){
	l = Math.floor(layers.getLayer1Value(p.x, p.y)/10)
	d = Math.floor(layers.getLayer2Value(p.x, p.y) % 4)
	d = utils.directions[d]
	d_delta = utils.directionDeltas[d]
	console.log("carving tunnel from " + p + "of length " + l + "in direction: " + d)
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
	p = {x:x, y:y}
	solid = isSolid(p)
	if(!solid){
		console.log("something is not solid!")

	}
	rgb = layers.getRGB(x, y)
	delta = 100
	if(!solid){
		rgb.r = Math.max(0, rgb.r - delta)
		rgb.g = Math.max(0, rgb.g - delta)
		rgb.b = Math.max(0, rgb.b - delta)
	}
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

setInterval(carveDungeon, 5000);
module.exports = {
    GetDetails: getDetails,
    updateBoxDetails: updateBoxDetails
}