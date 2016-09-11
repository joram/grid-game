var layers = require('./layers');
var utils = require('./utils');
var players = require('./players');
var vertices = require('./vertices');

function generateIsSolid(x, y){
	val = vertices.getValue(x, y, "PerlinValue2")
	empty = val < 145
	if(!empty){
		rgb = vertices.getValue(x, y, "PerlinRGB")
		delta = 100
		rgb.r = Math.max(0, rgb.r - delta)
		rgb.g = Math.max(0, rgb.g - delta)
		rgb.b = Math.max(0, rgb.b - delta)
		vertices.setValue(x, y, "PerlinRGB", rgb)
	}
	return !empty
}
vertices.setValueFunc("isSolid", generateIsSolid)

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

module.exports = {
    GetDetails: getDetails,
    updateBoxDetails: updateBoxDetails
}