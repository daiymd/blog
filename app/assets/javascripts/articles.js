$(function(){

  function searchArticle(article) {
    article.text.length > 20 ? article_text = `${article.text.slice(0,20)}...` : article_text = article.text
    var html = `<div class="left-article">
                  <div class="article">
                    <div class="article__image">
                      <img src="${article.image}" width="220" height="200">
                    </div>
                    <div class="article__title">
                      <a class="article__title_link" href="/articles/${article.id}">${article.title}</a>
                    </div>
                    <div class="article__latest-text">${article_text}</div>
                    <div class="article__user-name">
                      <a class="name_link" href="/users/${article.user_id}">${article.name}</a>
                    </div>
                    <div class="article__created-day">${article.created_at}</div>
                    <div class="article__tags">
                    <a class="tag_link" href="/articles?tag_name=${article.tag_list}">${article.tag_list}</a>
                  </div>
                </div>`
    $(".left-content__articles").append(html);
  }

  $(".title-search").on("keyup", function(e){
    e.preventDefault();
    var input = $(".title-search").val();
    $.ajax({
      type: 'get',
      url: `/articles`,
      data: { search_title: input },
      dataType: 'json'
    })

    .done(function(articles){
      $(".left-article").empty();
      if (articles.length !== 0) {
        articles.forEach(function(article){
          searchArticle(article);
        });

      }
    })
    .fail(function(){
      console.log("aa");
    })
  })
})
