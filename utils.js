function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(values) {
    r = Math.floor(values['r'])
    g = Math.floor(values['g'])
    b = Math.floor(values['b'])
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function isEquivalent(a, b) {
	matches = a.x == b.x && a.y == b.y
	return matches
}

directions = ["L", "R", "U", "D"]
directionDeltas = {
    U: {x: 0, y:-1},
    D: {x: 0, y: 1},
    L: {x:-1, y: 0},
    R: {x: 1, y: 0}
}
module.exports = {
	rgbToHex:rgbToHex,
	isEquivalent:isEquivalent,
	directions: directions,
	directionDeltas: directionDeltas
}