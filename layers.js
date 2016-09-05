var perlin = require('pf-perlin');

var layer1 = perlin({
    dimensions: 2,
    seed: 1,
    wavelength: 10,
    min: 0,
    max: 255
});

var layer2 = perlin({
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

function getPerlinValue(p, x, y){
    return p.get(x, y)
}

function getPerlinColor(p, x, y){
    v = getPerlinValue(p, x, y)
    c = Math.floor(v)
    return rgbToHex(c, c, c)
}


module.exports = {

    // Layer 1
    getLayer1Value: function (x, y){ return getPerlinValue(layer1, x, y) },
    getLayer2Value: function (x, y){ return getPerlinValue(layer2, x, y) },
    getLayer3Value: function (x, y){ return getPerlinValue(layer3, x, y) },

    getColor: function (x, y){
      return rgbToHex({
        r: getPerlinValue(layer1, x, y),
        g: getPerlinValue(layer2, x, y),
        b: getPerlinValue(layer3, x, y)
      })
    },
    getLayer1Color: function (x, y){
      return rgbToHex({
        r: getPerlinValue(layer1, x, y),
        g: 0,
        b: 0
      })
    },
    getLayer2Color: function (x, y){
      return rgbToHex({
        r: 0,
        g: getPerlinValue(layer2, x, y),
        b: 0
      })
    },
    getLayer3Color: function (x, y){
      return rgbToHex({
        r: 0,
        g: 0,
        b: getPerlinValue(layer3, x, y)
      })
    }

}