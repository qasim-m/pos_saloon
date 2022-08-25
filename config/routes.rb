Rails.application.routes.draw do
  resources :services
  devise_for :users
  post "test_rote/", to: "services#test_rote_fun"

  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root "homepage#home_page"
end
