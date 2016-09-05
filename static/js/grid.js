var socket = io();

function init_dungeon(id){
    infinitedrag = jQuery.infinitedrag("#"+id, {}, {
        width: 50,
        height: 50,
        start_col: 0,
        start_row: 0,
        oncreate: function($element, col, row) {
            id = "box_" + row + "_" + col
    		$element.text("(" + row + ", " + col + ")");
    		$element.attr("id", id);
    		$element.attr("col", col);
    		$element.attr("row", row);
            socket.emit("box details", {'x': row, 'y': col, 'id': id})

        }
    });
    infinitedrag.center(0,0);
}

socket.on('box details', function(msg){
    $("#"+msg['id']).css( "background-color", msg['color'])
});