class CreateSaleDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :sale_services do |t|
      t.timestamps
    end
  end
end
