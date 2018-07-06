/**
 * Created by Sergey on 05.07.2018.
 */
function listen(time){
    time = time || 0;
    var data = {time: time};
    $.ajax({
        type: "GET",
        data: data,
        url: "http://lp.local/server/server.php",
        success: function (response) {
            response = JSON.parse(response);
            $("#chat").html(response.data);
            listen(response.time);
        }
    });
}

$(function(){
   listen();
});