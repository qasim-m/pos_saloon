class ServicesController < ApplicationController
  before_action :set_service, only: %i[ show edit update destroy ]
  # skip_before_action :authenticate_user! [:test_rote_fun]

  # GET /services or /services.json


  def index
    @services = Service.all
  end

  # GET /services/1 or /services/1.json
  def show
  end

  # GET /services/new
  def new
    @service = Service.new
  end

  # GET /services/1/edit
  def edit
    @service = Service.find(params[:id])
  end

  def update
    @service = Service.find(params[:id])
    if @service.update(service_params)
      flash[:notice] = "Service updated"
      redirect_to services_url
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # POST /services or /services.json
  def create
    @service = Service.new(service_params)

    if @service.save
      redirect_to services_url
    else
      render :new, status: :unprocessable_entity
    end
  end



  # DELETE /services/1 or /services/1.json
  def destroy
    @service.destroy
    flash[:notice] = "Service deleted"
    redirect_to services_url
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_service
      @service = Service.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def service_params
      params.require(:service).permit(:name,:description,:price, :image)
    end
end
