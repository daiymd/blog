$(function(){

  function searchArticle(article) {
    article.text.length > 20 ? article_text = `${article.text.slice(0,20)}...` : article_text = article.text
    article.title.length > 10 ? article_title = `${article.title.slice(0,10)}...` : article_title = article.title
    if (!article.image) {
      article_image = "http://design-ec.com/d/e_others_50/l_e_others_501.png"
    }
    else {
      article_image = article.image
    }
    var html = `<div class="left-article">
                  <div class="article">
                    <div class="article__image">
                      <img src="${article_image}" width="220" height="200">
                    </div>
                    <div class="article__title">
                      <a class="article__title_link" href="/articles/${article.id}">${article_title}</a>
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
