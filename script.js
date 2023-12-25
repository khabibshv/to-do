$(document).ready(function () {
    for (var x = 0; x < Object.keys(localStorage).length; x += 1){
        $("#todoContainer").append("<div class=todoItem>" + localStorage.getItem(x.toString()) + "</div>");
    }
    Sortable.create(todoContainer, { animation: 150, chosenClass: "todoItemSelect"});

    if ($('#todoContainer').children().length !== 0) {
        $("#noNotes").hide();
    }
    $("#txtNewEntry").bind("enterKey", function () {
        addNote();
    });
    $("#txtNewEntry").keyup(function (e) {
        if (e.keyCode === 13) {
            $(this).trigger("enterKey");
        }
    });
    // remove by event delegation
    $("#todoContainer").on("click", ".todoItem", function () {
        $(this).remove();
        $("#txtNewEntry").focus();
        if ($('#todoContainer').children().length === 0) {
            $("#noNotes").show();
        }
    });
    function addNote() {
        if ($("#txtNewEntry").val().length > 0) {
            if ($('#todoContainer').children().length === 0) {
                $("#noNotes").hide();
            }
            $("#todoContainer").prepend("<div class=todoItem>" + $("#txtNewEntry").val() + "</div>");
            $("#txtNewEntry").val("");
            $("#txtNewEntry").focus();
        }
    }

    $(document).keyup(function (e) {
        if (e.keyCode === 13) {
            $("#txtNewEntry").focus();
        }
        if (e.keyCode === 27) {
            $("#txtNewEntry").blur();
        }
    });
});
window.onbeforeunload = function () {
    localStorage.clear();
    $(".todoItem").each(function (index) {
        localStorage.setItem(index, $(this).text());
    });
};