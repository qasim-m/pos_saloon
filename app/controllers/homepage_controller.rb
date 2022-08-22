class HomepageController < ApplicationController
    
  def home_page
      @services = Service.all
  end

end
