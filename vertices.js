var vertices = {}

valueGeneratingFunctions = {}


function initVertex(x, y){
    if(!(x in vertices)){
        vertices[x] = {}
    }
    if(!(y in vertices[x])){
        vertices[x][y] = {}
    }   
}

module.exports = {
    getValue: function(x, y, key){

        // get cached version
    	if(x in vertices){
			if(y in vertices[x]){
				if(key in vertices[x][y]){
					return vertices[x][y][key]
				}
			}
    	}

        // cache miss
        initVertex(x, y)
        value = valueGeneratingFunctions[key](x, y)
        vertices[x][y][key] = value
    	return value
    },
    setValue: function(x, y, key, value){
    	initVertex(x, y)
    	vertices[x][y][key] = value
    },
    resetVertex: function(x, y){
        initVertex(x, y)
        delete vertices[x][y]
    },
    setValueFunc: function(key, func){
        valueGeneratingFunctions[key] = func
    }
}