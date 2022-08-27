Rails.application.routes.draw do

  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
  end
  root "homepage#home_page"
  resources :services
  devise_for :users
  post "make_a_sale/", to: "sales#make_a_sale"

end
