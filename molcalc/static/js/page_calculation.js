$(document).ready(function() {

// View the current 'tab'

firstHash = getHash();

$menu = $('.mc-content .calc-menu');
$menu_items = $('.mc-content .calc-menu a');
$sections = $('.mc-content');

if(firstHash != "")
{
    $menu.find('a').removeClass('active');
    $menu.find('a.'+firstHash).addClass('active');

    $sections.find(".calc").removeClass('active');
    $sections.find('.calc.tab-'+firstHash).addClass('active');
}


var $sidebars = $('.sidebar');

$('.calc-menu ul a').each(function ()
{
    var active = "active";
    var that = $(this);
    var type = that.attr('class');
    type = type.replace(" active", "");
    var content = $('.calc.tab-'+type);

    that.click(function()
    {
        if(that.hasClass(active)) return false;

        $menu_items.removeClass(active);
        that.addClass(active);
        $sections.find('.calc').removeClass(active);
        $sections.find(".calc.tab-"+type).addClass(active);

        setHash(type);

        $sidebars.removeClass("active");

        return false;
    });

});



// ******************************************************************





// ******************************************************************



});
