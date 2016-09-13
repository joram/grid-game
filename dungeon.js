var layers = require('./layers');
var utils = require('./utils');
var players = require('./players');
var vertices = require('./vertices');

function generateIsSolid(x, y){
	delta = 100
	height = vertices.getValue(x, y, "height")
	isWater = height < 50
	isUnderground = height > 150
	isSolid = isWater || isUnderground
	if(isWater){
		rgb = vertices.getValue(x, y, "RGB")
		rgb.r = Math.max(0, Math.max(0, rgb.r - delta))
		rgb.g = Math.max(0, Math.max(0, rgb.g - delta))
		rgb.b = Math.max(0, Math.min(255, rgb.b + delta))
		vertices.setValue(x, y, "RGB", rgb)
	}
	if(isUnderground){
		rgb = vertices.getValue(x, y, "RGB")
		rgb.r = Math.max(0, rgb.r/2 - 0)
		rgb.g = Math.max(0, rgb.g/3 - 20)
		rgb.b = Math.max(0, rgb.b/10 + 0)
		vertices.setValue(x, y, "RGB", rgb)
	}
	return isSolid
}
vertices.setValueFunc("isSolid", generateIsSolid)

function updateBoxDetails(v, recipient){
    v['solid'] = vertices.getValue(v.x, v.y, "isSolid")
    v['color'] = utils.rgbToHex(vertices.getValue(v.x, v.y, "RGB"))
    v['height']= vertices.getValue(v.x, v.y, "height")
    recipient.emit("box details", v)	
}

module.exports = {
    updateBoxDetails: updateBoxDetails
}