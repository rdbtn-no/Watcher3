$(document).ready(function () {
    $thinker = $("div#thinker");
    $thinker.show();

    $.post(url_base + "/ajax/server_status", {
        mode: 'restart'
    });

    /*
    This repeats every 3 seconds to check. Times out after 10 attempts and
        shows span.error message.
    */
    var try_count = 0
    var check = setInterval(function(){
        if(try_count < 10){
            try_count += 1;
            $.post(url_base + "/ajax/server_status", {
                mode: "online",
            })
            .done(function(r){
                if(r != "states.STOPPING"){
                    window.location = url_base+"/library/status/";
                }
            });
        } else {
            clearInterval(check);
            $.notify({title: "<u>Timout Exceeded</u><br/>", message: "Watcher is taking too long to restart. Please check your logs and restart manually."}, {type: "warning", delay: 0})
            $thinker.css("opacity", 0);
        }
    }, 3000);
});