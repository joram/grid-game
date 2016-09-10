var vertices = {}

defaultValues = {
	solid: true
}

module.exports = {
    getValue: function(x, y, key){
    	if(x in vertices){
			if(y in vertices[x]){
				if(key in vertices[x][y]){
					return vertices[x][y][key]
				}
			}
    	}
    	return defaultValues[key]
    },
    setValue: function(x, y, key, value){
    	if(!(x in vertices){
    		vertices[x] = {}
    	}
    	if(!(y in vertices[y]){
    		vertices[x][y] = {}
    	}
    	vertices[x][y][key] = value
    }
}