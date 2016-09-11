var socket = io();

function vertexId(x, y){
    return x + "_" + y
}

function getVertex(x, y){
    return $("#"+vertexId(x, y))
}
function init_dungeon(id){
    infinitedrag = jQuery.infinitedrag("#"+id, {}, {
        width: 50,
        height: 50,
        start_col: 0,
        start_row: 0,
        oncreate: function($element, x, y) {
    		// $element.text("(" + x + ", " + y + ")");
    		$element.attr("id", vertexId(x, y));
    		$element.attr("y", y);
    		$element.attr("x", x);
            socket.emit("box details", {x: x, y: y})

        }
    });
    infinitedrag.center(-10, -11);
}

socket.on('box details', function(v){
    v.vertexId = vertexId(v.x, v.y)
    v.element = getVertex(v.x, v.y)
    console.log(v)
    vertex = getVertex(v.x, v.y)
    vertex.css( "background-color", v.color)
    vertex.attr('solid', v.solid)
});