$character = $('<img class="character" id="character" class="square">');

L = 37
U = 38
R = 39
D = 40
DIRECTIONS ={
    U: {x: 0, y:-1},
    D: {x: 0, y: 1},
    L: {x:-1, y: 0},
    R: {x: 1, y: 0}
}


function place_character(x, y, img_url){
    $character.attr('src', img_url);
    $parent = $('div[row="'+y+'"][col="'+x+'"]');
    $character.detach().appendTo($parent);
}

function is_solid(x, y){
    return false;
}

function can_move(x,y){
    return !is_solid(x, y)
}

function get_character_position(){
    x = parseInt($character.parent().attr('col'));
    y = parseInt($character.parent().attr('row'));
    return {x:x, y:y}
}

function move_character(direction){
    offset = DIRECTIONS[direction]
    pos = get_character_position()
    x = pos['x'] + offset['x'];
    y = pos['y'] + offset['y'];
    if(can_move(x, y)){
        place_character(x, y);
    }
    infinitedrag.center(x, y);
}

function init_character(){
    place_character(0,0, '/images/characters/character.png');
    document.onkeydown = function( event ) {
      if(event.which == L){move_character('L');}
      if(event.which == R){move_character('R');}
      if(event.which == U){move_character('U');}
      if(event.which == D){move_character('D');}
    };
}