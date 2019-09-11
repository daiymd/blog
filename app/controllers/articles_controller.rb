class ArticlesController < ApplicationController
    before_action :ranking

  def index
    if params[:search_title]
      @articles = Article.where('title LIKE ?', "%#{params[:search_title]}%").page(params[:page]).per(9).order("created_at DESC")
      respond_to do |format|
        format.html
        format.json
      end
    else
      @articles = Article.page(params[:page]).per(9).order("created_at DESC")
    end
    
    if params[:tag_name]
      @articles = @articles.tagged_with("#{params[:tag_name]}")
    end

  end

  def show
    @article = Article.find(params[:id])
    impressionist(@article, nil, :unique => [:session_hash])
    @comments = @article.comments.includes(:user)
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    article = Article.find(params[:id])
    article.destroy if article.user_id == current_user.id
    redirect_to articles_path
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    article = Article.find(params[:id])
    if article.user_id == current_user.id
      article.update(article_params)
      redirect_to articles_path
    end
  end

  def ranking
    @view_rank = Article.order('impressions_count DESC').take(3)
  end

  private

  def set_user
    @user = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:text, :image, :title, :tag_list).merge(user_id: current_user.id)
  end
end
