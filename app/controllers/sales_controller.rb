class SalesController < ApplicationController

  def make_a_sale
    customer = Customer.create!(name: params[:customer_name].to_s.strip, phone: params[:customer_phone].to_s.strip)
    sale = Sale.new
    sale.total = params.require(:total_amount)
    sale.payment_methode = params.require(:payment_method)
    sale.user_id = current_user.id
    sale.customer_id = customer.id
    sale.save!
    sales_data_list = params.require(:sales_data)
    sales_data_list.each do |sale_data|
      service = Service.find_by(name: sale_data[:title])
      SaleService.create!(service_id: service.id, sale_id: sale.id, qty: sale_data[:quantity], price: sale_data[:price])
    end
  end
  
  def sales_list
    # startDate, endDate = params.require(:search).permit(:date_range)[:date_range].split("to").map{|e| Date.parse(e)}
    # @sales = Sale.includes(:customer, :user, sale_services: :service).where(created_at: startDate..endDate)
    searchDate = Date.parse(params.require(:search).values.join("/")) rescue Date.today
    @sales = Sale.includes(:customer, :user, sale_services: :service).where("DATE(created_at) =  '#{searchDate}'")
  end


end
