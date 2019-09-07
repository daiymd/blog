$(function(){
  function buildHTML(comment){
    var html = `<div class="comments-data">
                  <div class="comments_user-name">${comment.name}</div >
                  <div class="comments_text">: ${comment.text}</div>
                </div>`
    return html;
  }


  $('#new-comment').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".comment__list").append(html)
      $(".comment-form").val('')
      $('.comment-submit').removeAttr("disabled");
      $('#new-comment')[0].reset();
    })
    .fail(function(){
      $('.comment-submit').removeAttr("disabled");
      alert('error');
    })
  })
})