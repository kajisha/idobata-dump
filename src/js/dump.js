var addSushiButton = function(){
  setTimeout(function(){
    if ($('#dump').length == 0){
      $('.message-form textarea').before('<button id="dump" class="btn attach-file-text"><img src="'+chrome.extension.getURL('images/btn-dump.png')+'"></button>')
      var contents = '<div id="dump_contents" class="modal fade" aria-hidden="true" style="display: none;"><div class="modal-header"><button class="close" data-dismiss="modal" type="button">×</button><h3>pick dump</h3></div><div class="modal-body">'
      contents += '<img class="dump" src="https://avatars2.githubusercontent.com/u/1160522?v=2&s=400">'
      contents += '</div></div>'
      $('body').append(contents)
    }
  }, 500)
}

$(function(){
  addSushiButton();
});

$(document).on('click', '.ember-view.room', function(ev){
  addSushiButton();
});

$(document).on('click', '#dump', function(ev){
  ev.preventDefault();
  $('#dump_contents').modal();
});

$(document).on('click', 'img.dump', function(ev){
  $('#dump_contents').modal('hide');
  var imageUrl = $(ev.target).attr('src');
  var matches = $('.primary-sidebar a.active').attr('href').match(/organization\/([^\/]+)\/room\/([^\/]+)/)
  var params = {
    organization_slug: matches[1],
    room_name:         matches[2]
  }
  $.get("https://idobata.io/api/rooms", params, function(data) {
    var roomId = data.rooms[0].id
    params = {
      'message[room_id]': roomId,
      'message[source]':  imageUrl
    }
    $.ajax({
      type: "POST",
      url:  "https://idobata.io/api/messages",
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(msg) {
        console.log(msg);
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  });
});
