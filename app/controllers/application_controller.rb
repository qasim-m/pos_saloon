class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  skip_before_action :verify_authenticity_token
   
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :username])
      devise_parameter_sanitizer.permit(:sign_in) do |user_params|
        user_params.permit(:username, :email)
    end
  end
end
