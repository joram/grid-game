var layers = require('./layers');
var utils = require('./utils');
var players = require('./players');
var vertices = require('./vertices');

function generateTerrainType(x, y){
	// W: water
	// U: Underground
	// G: grass
	height = vertices.getValue(x, y, "height")
	if(height < 50){
		return "W"
	}
	if(height > 150){
		return "U"
	}
	return "G"
}
vertices.setValueFunc("terrainType", generateTerrainType)

function generateIsSolid(x, y){
	delta = 100
	height = vertices.getValue(x, y, "height")
	type = vertices.getValue(x, y, "terrainType")
	if(type == "G"){
		return false
	}
	if(type == "W"){
		rgb = vertices.getValue(x, y, "RGB")
		rgb.r = Math.max(0, Math.max(0, rgb.r - delta))
		rgb.g = Math.max(0, Math.max(0, rgb.g - delta))
		rgb.b = Math.max(0, Math.min(255, rgb.b + delta))
		vertices.setValue(x, y, "RGB", rgb)
	}
	if(type == "U"){
		rgb = vertices.getValue(x, y, "RGB")
		rgb.r = Math.max(0, rgb.r/2 - 0)
		rgb.g = Math.max(0, rgb.g/3 - 20)
		rgb.b = Math.max(0, rgb.b/10 + 0)
		vertices.setValue(x, y, "RGB", rgb)
	}
	return true
}
vertices.setValueFunc("isSolid", generateIsSolid)

function generateCSSClass(x, y){
	type = vertices.getValue(x, y, "terrainType")
	if(type != "U"){
		return NaN
	}
	return "icon icon_"+79

}

function updateBoxDetails(v, recipient){
    v['solid'] = vertices.getValue(v.x, v.y, "isSolid")
    v['color'] = utils.rgbToHex(vertices.getValue(v.x, v.y, "RGB"))
    v['height']= vertices.getValue(v.x, v.y, "height")
    v['cssclass']= generateCSSClass(v.x, v.y)
    v['terrainType'] =  vertices.getValue(v.x, v.y, "terrainType")
    recipient.emit("box details", v)	
}

module.exports = {
    updateBoxDetails: updateBoxDetails
}
