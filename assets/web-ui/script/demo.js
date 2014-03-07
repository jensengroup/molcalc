/*

    JavaScript for the DEMO Page

*/

$(function()
{

    var promptLink = $('.promptBoxDemo');

    promptLink.click(function ()
    {
        // Initialize prompt
        var promptBox = new $.Prompt()

        // Set message
        // Can be string...
        promptBox.setMessage('<p>A message string</p>');

        // or more advanced HTML object
        objHtml = $('<p></p>');
        objHtml.html('Hahaha ');
        objHtml.append($('<strong>More</strong>'));
        promptBox.setMessage(objHtml);

        // Set title
        promptBox.setTitle('Another annoying message box');


        // Set response
        promptBox.addResponseBtn('Alert Hello', function() {
            alert('Hello World');
        });

        // Add cancel button, also with a different string
        promptBox.addCancelBtn();

        // Finally Show the result
        promptBox.show()


        return false;
    });

});
