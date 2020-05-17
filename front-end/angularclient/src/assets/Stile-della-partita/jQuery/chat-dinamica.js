


function chat(){

$(document).ready(function () {

    $("button i.fa-comment-dots").click(function () {
        $(".chat").show();
    });

    $(".chat button.close-chat").click(function () {
        $(".chat").hide();
    });

});
}