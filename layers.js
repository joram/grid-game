var perlin = require('pf-perlin');
var utils = require('./utils');
var vertices = require('./vertices');

var layer1 = perlin({
    name:"1",
    dimensions: 2,
    seed: 1,
    wavelength: 10,
    min: 0,
    max: 255
});

var layer2 = perlin({
    name:"2",
    dimensions: 2,
    seed: 2,
    wavelength: 10,
    min: 0,
    max: 255
});

var layer3 = perlin({
    dimensions: 2,
    seed: 3,
    wavelength: 10,
    min: 0,
    max: 255
});

var layer4 = perlin({
    dimensions: 2,
    seed: 4,
    wavelength: 100,
    min: 0,
    max: 255
});


// generating functions
function generateLayer1Value(x, y){ return Math.floor(layer1.get(x, y)) }
function generateLayer2Value(x, y){ return Math.floor(layer2.get(x, y)) }
function generateLayer3Value(x, y){ return Math.floor(layer3.get(x, y)) }
function generateLayer4Value(x, y){ return Math.floor(layer4.get(x, y)) }
function generateRGB(x, y){
    return {
        r: Math.floor(layer1.get(x, y)),
        g: Math.floor(layer2.get(x, y)),
        b: Math.floor(layer3.get(x, y))
    } 
}

// register for caching
vertices.setValueFunc("R", generateLayer1Value)
vertices.setValueFunc("G", generateLayer2Value)
vertices.setValueFunc("B", generateLayer3Value)
vertices.setValueFunc("height", generateLayer4Value)
vertices.setValueFunc("RGB", generateRGB)
