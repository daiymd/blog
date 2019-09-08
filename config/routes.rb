Rails.application.routes.draw do
  devise_for :users
  root to: 'articles#index'
  # get 'tags/:tag', to: 'articles#index', as: :tag
  resources :articles do
    resources :comments, only: [:create]
  end
  resources :users,only: [:show, :edit, :update]
end
