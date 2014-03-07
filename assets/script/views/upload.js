/**********************************************************************
upload.js

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

  $('.button.upload').click(function () {
    var askuser = new $.Prompt();
    askuser.setTitle('Upload');
    askuser.setMessage('Are you sure you want to upload?<br />You wont be able to edit anything after upload.');
    askuser.addResponseBtn('Yes', function() {
      askuser.cancel();
      $('#upload_form').submit();
      return false;
    });
    askuser.addCancelBtn('No');
    askuser.show();
    return false;
  });

  $('#upload_form').submit(function() {
//    alert('form "submitted"');
//    return false;
  });

});
