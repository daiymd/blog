class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comments_params)
    if @comment.save
      respond_to do |format|
        format.html
        format.json
      end
    else
      redirect_to article_path(params[:article.id])
    end
  end

  private
  def comments_params
    params.permit(:text, :article_id).merge(user_id: current_user.id)
  end
end
