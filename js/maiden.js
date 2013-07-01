$(function() {
    var documentHeight = $(document).height();
    var container = $('#container');
    var containerHeight = container.height();
    container.css('margin-top', (documentHeight - containerHeight)/2);
});