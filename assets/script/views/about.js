/**********************************************************************
about.js

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the MolCalc project.

MolCalc is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

MolCalc is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/
$(function(){
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
    $('.view_navigation li a').removeClass('active');
    $('.view_navigation li.'+hash+' a').addClass('active');
  }
	
	// Tabs
  $('.view_navigation a').each(function ()
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
      $('.section').hide();
      that.addClass(active);
      content.show();

      // Set URL
      setHash(type);
      return false;
    });

  });

});
