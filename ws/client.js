/**
 * Created by Sergey on 06.07.2018.
 */
if (!window.WebSocket){
    alert('Not supported');
}

var webSocket = new WebSocket("ws://localhost:8081");

document.getElementById("chat_form").addEventListener('submit', function (event) {
    var textMessage = {
        username: this.username.value,
        message: this.message.value
    };
    textMessage = JSON.stringify(textMessage);
    webSocket.send(textMessage);
    this.message.value = "";
    document.getElementsByName('username')[0].disabled = true;
    event.preventDefault();
    return false;
});

webSocket.onmessage = function (event){
    var data = event.data;
    var messageContainer = document.createElement("div");
    var textNode = document.createTextNode(data);
    messageContainer.appendChild(textNode);
    document.getElementById("root_chat").appendChild(messageContainer);
}