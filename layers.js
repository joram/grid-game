var perlin = require('pf-perlin');
var utils = require('./utils');

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




function getPerlinValue(p, x, y){
    return p.get(x, y)
}

function getPerlinColor(p, x, y){
    v = getPerlinValue(p, x, y)
    c = Math.floor(v)
    return utils.rgbToHex(c, c, c)
}

function getRGB(x, y){
  return {
    r: getPerlinValue(layer1, x, y),
    g: getPerlinValue(layer2, x, y),
    b: getPerlinValue(layer3, x, y)
  }
}

module.exports = {

    // Layer 1
    getLayer1Value: function (x, y){ return getPerlinValue(layer1, x, y) },
    getLayer2Value: function (x, y){ return getPerlinValue(layer2, x, y) },
    getLayer3Value: function (x, y){ return getPerlinValue(layer3, x, y) },
    getRGB:getRGB,
    getColor: function (x, y){
      return utils.rgbToHex(getRGB(x, y))
    },
    getLayer1Color: function (x, y){
      return utils.rgbToHex({
        r: getPerlinValue(layer1, x, y),
        g: 0,
        b: 0
      })
    },
    getLayer2Color: function (x, y){
      return utils.rgbToHex({
        r: 0,
        g: getPerlinValue(layer2, x, y),
        b: 0
      })
    },
    getLayer3Color: function (x, y){
      return utils.rgbToHex({
        r: 0,
        g: 0,
        b: getPerlinValue(layer3, x, y)
      })
    }

}