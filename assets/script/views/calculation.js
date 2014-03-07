$(function()
{

    // VARIABLES
    // MOLECULEID - Molecule System ID (hash)

    // For the direct urls etc
    function setHash(loc)
    {
        window.location.hash = "#/"+loc;
    }


    function getHash()
    {
        return window.location.hash.replace("#/", "");
    }


    // View the current 'tab'
    if(getHash() != "")
    {
        var hash = getHash();
        $('.calculation-specific .view_navigation li a').removeClass('active');
        $('.calculation-specific .view_navigation li.'+hash+' a').addClass('active');
    }


    // Tabs
    $('.calculation-specific .view_navigation a').each(function ()
    {
        var active = "active";
        var that = $(this);
        var type = that.parent().attr('class');
        var content = $('div.'+type);

        // Hide contents
        if(!that.hasClass(active)) content.hide();

        that.click(function()
        {
            if(that.hasClass(active)) return false;
            $('.view_navigation a.active').removeClass(active);
            $('.calculationtype').hide();
            that.addClass(active);
            content.show();

            // JHJ, Calculate the input right away
            content.find('.button.calculate-now').hide().click();

            // Set URL
            setHash(type);
            return false;
        });

    });


    // Calculation Types
    $('.calculationtype').each(function()
    {
        var thistype = $(this);
        var caltype = thistype.attr('class').replace('calculationtype ','');
        var caltitle = $('.view_navigation li.'+caltype+' a').html();

        var button = thistype.find('.button.calculate-now');

        // Run a calculation
        button.click(function()
        {
            var calPrompt = new $.Prompt();
            calPrompt.setTitle('Calculating '+caltitle);

            var loading_bar = $('<div class="bar"></div>');
            var loading_nom = $('<div class="nom">0%</div>');
            var loading_message = $('<div class="msg">Starting Calculation</div>');
            var loading = $('<div class="loading_bar"></div>');
            var tmp = $('<div class="highHlp"></div>').append(loading_nom);
            var loading_nomp = $('<div class="high"></div>').append(tmp)
            loading.append(loading_nomp);
            loading.append(loading_bar);

            var message = $('<div></div>').append(loading);
            message.append(loading_message);

            calPrompt.setMessage(message);

            var timer;

            // Set procent of loader
            function setPct(pct)
            {
                clearInterval(timer);
                time = parseInt(loading_nom.html().replace("%", ""))

                timer = setInterval(function()
                {
                    if(time >= pct)
                    {
                        clearInterval(timer);
                        return false;
                    }

                    time += 1;
                    loading_nom.html(time+"%");
                    loading_bar.css('width', time+'%');
                    loading_nomp.css('left', time+'%');

                }, 100);
            }

            calPrompt.show();

            function callCalculation(step)
            {
                // Time for ajax
                var req = $.ajax(
                {
                    type: "POST",
                    url: caltype, // calculation is already included in path
                    data: {'calculation': caltype,
                           'step': step,
                           'moleculeid': MOLECULEID,
                           'ajax': true},
                    dataType: "text"
                });

                req.done(function(data) {
                    // Parse JSON
                    try {
                        var json    = $.parseJSON(data);
                        var message = json['next_msg'];
                        var step    = json['next_step'];
                        var pct     = json['next_pct'];

                        // Update interface
                        loading_message.html(message);
                        setPct(pct);

                        // Call next step
                        if(step == 0)
                        {
                            // Done
                            setPct(90);
                            loading_message.html('Reloading page');
                            document.location.reload(true);
                        }
                        else
                        {
                            callCalculation(step);
                        }

                    } catch (e) {
                        var errPrompt = new $.Prompt();
                        errPrompt.setMessage(data);
                        errPrompt.addCancelBtn('Okay');
                        errPrompt.show();
                        calPrompt.cancel();
                    }
                });

                req.fail(function() {
                    var errPrompt = new $.Prompt();
                    errPrompt.setMessage('Something went wrong. Please check your internet connection.');
                    errPrompt.addCancelBtn('Okay');
                    errPrompt.show();
                    calPrompt.cancel();
                });

                // req ajax
            }

            var step = 0;
            callCalculation(0);

            return false;
        });

    });


});
