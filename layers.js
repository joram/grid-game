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


// generating functions
function generateLayer1Value(x, y){ return layer1.get(x, y) }
function generateLayer2Value(x, y){ return layer2.get(x, y) }
function generateLayer3Value(x, y){ return layer3.get(x, y) }
function generateRGB(x, y){
    return {
        r: layer1.get(x, y),
        g: layer2.get(x, y),
        b: layer3.get(x, y)
    } 
}

// register for caching
vertices.setValueFunc("PerlinValue1", generateLayer1Value)
vertices.setValueFunc("PerlinValue2", generateLayer2Value)
vertices.setValueFunc("PerlinValue3", generateLayer3Value)
vertices.setValueFunc("PerlinRGB", generateRGB)
