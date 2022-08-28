class AddColumnsInSaleService < ActiveRecord::Migration[7.0]
  def change
    add_column :sale_services , :qty, :integer
    add_column :sale_services , :price, :integer
  end
end
