/*
  USAGE:
    Create a new prompt for the user like this;
      var askuser = new $.Prompt();

    Then add header, message, responses etc like this;
      askuser.setTitle('This is the title');
      askuser.setMessage('This is the body text');
      askuser.addResponseBtn('Hello', function() {
        alert('action');
        askuser.hide();
      });

    Change the look and feel with CSS, like a bawhs.
    I use CSS3 transition, and don't really care for browsers who
    don't support this.

*/

$(function()
{
    // Create AJAX Area
    $('body').append('<div class="ajaxarea"></div>');
    var ajaxarea = $('.ajaxarea');

    // jQuery selector for elements to hide when prompt
    // this could be java applets like Jmol
    var hideElements = $('.canvas');


    /*
     * Center object in vertical alignment
     * because that is still not possible with
     * CSS only.
     */
    jQuery.fn.center = function ()
    {
        var top_margin = Math.max(($(window).height() - $(this).outerHeight() )/ 2);
        this.css('margin-top',top_margin+'px');
        return this;
    }


    /**
     * Prompt gives the user a prompt message to respond too.
     */
    jQuery.Prompt = function Prompt()
    {
        // Define the parent block
        var stamp = new Date().getTime();
        this.stamp = stamp;
        this.parentblock = $('<div></div>');
        this.parentblock.attr('id', stamp);
        this.parentblock.hide();
        ajaxarea.append(this.parentblock);

        // Define some HTML Blocks
        var background  = $('<div class="prompt-container"></div>');
        var box         = $('<div class="prompt-box"></div>');
        var boxHeader   = $('<div class="prompt-header"></div>');
        var boxMessage  = $('<div class="prompt-message"></div>');
        var boxFooter   = $('<div class="prompt-respond"></div>');

        // Hide Elements by default
        boxHeader.hide();
        boxFooter.hide();

        // Define the class variables
        this.title    = "&nbsp;";
        this.message  = "&nbsp;";
        this.response = "&nbsp;";
        this.responselist = $('<ul></ul>');

        this.addClass = function addClass() {}
        this.removeClass = function removeClass() {}

        this.setMessage = function addMessage(message)
        {
            this.message = message;
        }

        this.setTitle = function addTitle(title)
        {
            this.title = title;
            boxHeader.show();
        }

        this.setType = function setType(type)
        {
            // Set the type of message, ask-prompt or tell-prompt.
            // Default should be ask.
        }

        this.addResponseBtn = function addResponseBtn(msg, action)
        {
            boxFooter.show();

            var btn = $('<a class="button">'+msg+'</a>');
            btn.click(action);
            this.responselist.append($('<li></li>').append(btn));
            return btn;
        }

        this.addCancelBtn = function addCancelBtn(msg)
        {
            msg = typeof msg !== 'undefined' ? msg : "Cancel";
            this.addResponseBtn(msg, function()
            {
                hide();
            });
        }

        this.getStamp = function getStamp()
        {
            return this.stamp;
        }

        this.show = function show()
        {
            //if(this.responselist.find('li').size() > 0)
            //{
            this.response = this.responselist;
            //}

            // Insert Variable
            boxMessage.append(this.message);
            boxFooter.html('<div></div>');
            boxFooter.append(this.response);
            boxFooter.append('<div class="clean"></div>');

            // Filling
            var html = box;

            html.append(boxHeader.html($('<strong></strong>').html(this.title)));
            html.append(boxMessage.html(this.message));
            html.append(boxFooter);

            html = background.append(html);

            hideElements.hide();

            this.parentblock.html(html);
            this.parentblock.show();

            box.center();

            $(window).resize(function() {
            box.center();
            });

        }

        function hide()
        {
            $('#'+stamp).fadeOut(100, function()
            {
                hideElements.show();
            });

            // Unbind window resize
            $(window).unbind('resize');
        }

        this.cancel = function cancel()
        {
            hide();
        }

    } // Prompt

});

