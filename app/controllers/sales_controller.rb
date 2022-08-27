class SalesController < ApplicationController

  def make_a_sale
    customer = Customer.create!()
    sale = Sale.new
    sale.total = params.require(:total_amount)
    sale.payment_methode = params.require(:payment_method)
    sale.user_id = current_user.id
    sale.customer_id = customer.id
    sale.save!
    sales_data_list = params.require(:sales_data)
    sales_data_list.each do |sale_data|
      service = Service.find_by(name: sale_data[:title])
      SaleService.create!(service_id: service.id, sale_id: sale.id)
    end
  end
  
end
