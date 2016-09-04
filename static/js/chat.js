var socket = io();

$('form').submit(function(){
    msg = $('#m').val();
    $('#m').val('');
    name = $('#name').val();
    msg_body = {
        'msg': msg,
        'name': name
    }
    socket.emit('chat message', msg_body);
    return false;
});

socket.on('chat message', function(msg){
    content = "<div class='message'>"
    content += "<div class='message-name'>" + msg['name'] + ":</div>"
    content += "<div class='message-content'>" + msg['msg'] + "</div>"
    content += "</div>"
    $('#messages').append($('<li>').html(content));
});
