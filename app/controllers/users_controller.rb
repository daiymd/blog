class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @articles = @user.articles.page(params[:page]).per(9).order("created_at DESC")
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if current_user == @user
      @user.update(user_params)
      redirect_to user_path(@user)
    end
  end

  private

  def user_params
    params.require(:user).permit(:text, :name, :image)
  end
end
