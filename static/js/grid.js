var socket = io();

function vertexId(x, y){
    return x + "_" + y
}

function getVertex(x, y){
    return $("#"+vertexId(x, y))
}
function init_dungeon(id, character_x, character_y){
    infinitedrag = jQuery.infinitedrag("#"+id, {}, {
        width: 40,
        height: 40,
        start_col: character_x,
        start_row: character_y,
        oncreate: function($element, x, y) {
    		// $element.text("(" + x + ", " + y + ")");
    		$element.attr("id", vertexId(x, y));
    		$element.attr("y", y);
    		$element.attr("x", x);
            socket.emit("box details", {x: x, y: y})

        }
    });
    init_character(character_x, character_y)
    animatedIcon(["icon_259", "icon_260"], getVertex(14, 0), 500)
}

function set_icon(type, vertex){
    icons = {
        "U": [
            "icon_79",
            "icon_80",
            "icon_81",
            "icon_82",
            "icon_83",
            "icon_84",
            "icon_85",
            "icon_86",
            "icon_87",
            "icon_88",
            "icon_89",
            "icon_90"]
    }
    
    choices = icons[type]
    i = Math.floor(Math.random() * choices.length);
    choice = choices[i]

    vertex.addClass("icon")
    vertex.addClass(choice)
}

function animatedIcon(icons, vertex, ms){
    vertex.append("<div class='animation'/>")
    animation = vertex.children().first()
    for(i=0; i<icons.length; i++){
        icon = icons[i]
        animation.append("<div class='animatedIcon "+icon+"'/>")
    }
    function cycleAnimation(animation, i){
        children = animation.children()
        children.hide()
        $(children[i]).show()
        setTimeout(function(){ cycleAnimation(animation, (i+1) % children.length) }, ms)
    }
    cycleAnimation(animation, 0)
}

socket.on('box details', function(v){
    v.vertexId = vertexId(v.x, v.y)
    v.element = getVertex(v.x, v.y)
    vertex = getVertex(v.x, v.y)
    vertex.css( "background-color", v.color)
    if(v.terrainType == "U"){
        set_icon("U", vertex)
    }
    vertex.attr('solid', v.solid)
    vertex.attr('height', v.height)
    vertex.attr('terrainType', v.terrainType)
});