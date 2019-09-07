json.array! @articles do |article|
  json.title article.title
  json.image article.image.url
  json.text article.text
  json.id article.id
  json.user_id article.user_id
  json.name article.user.name
  json.created_at article.created_at.strftime("%Y/%m/%d %H:%M")
  json.tag_list article.tag_list
end