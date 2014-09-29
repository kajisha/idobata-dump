var addDumpButton = function(){
  setTimeout(function(){
    if ($('#dump').length == 0){
      $('.message-form textarea').before('<button id="dump" class="btn attach-file-text"><img src="' + chrome.extension.getURL('images/btn-dump.png')+'"></button>');
      var contents = '<div id="dump_contents" class="modal fade" aria-hidden="true" style="display: none;"><div class="modal-header"><button class="close" data-dismiss="modal" type="button">×</button><h3>pick dump</h3></div><div class="modal-body">';
      contents += '<img class="dump" src="https://avatars2.githubusercontent.com/u/1160522?v=2&s=400#.png" title="dany1468 the developer">';
      contents += '<img class="dump" src="https://idobata.s3.amazonaws.com/uploads/attachment/image/6406/967d853a-2b9c-4e1f-95b9-749ddc078092/ldtm.png" title="LDTM">';
      contents += '<img class="dump" src="http://rlv.zcache.com/i_love_turbans_mouse_pads-r183d36020faa4aa1981c57d1975875cb_x74vi_8byvr_324.jpg" title="I LOVE Turban">';
      contents += '<img class="dump" src="http://ss-tribe.c.blog.so-net.ne.jp/_images/blog/_a58/ss-tribe/1386349129-0657-001.jpg" title="Columbia">';
      contents += '<img class="dump" src="https://idobata.s3.amazonaws.com/uploads/attachment/image/24697/1b2ae1cd-8b71-4c18-9999-18e2c1693ba2/image.jpg" title="Dump Kamiyama">';
      contents += '<img class="dump" src="http://pbs.twimg.com/media/BtHBXczCIAIy_so.jpg" title="newgame_dameda">';
      contents += '<img class="dump" src="https://idobata.s3.amazonaws.com/uploads/attachment/image/35648/4d397ab0-a43a-4462-94ca-6ec93a560879/image.jpg" title="dump pepper">';
      contents += '</div></div>';
      $('body').append(contents);
    }
  }, 500)
}

$(function(){
  addDumpButton();
});

$(document).on('click', '.ember-view.room', function(ev){
  addDumpButton();
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
