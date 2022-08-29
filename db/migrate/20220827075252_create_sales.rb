class CreateSales < ActiveRecord::Migration[7.0]
  def change
    create_table :sales do |t|
      t.integer :total
      t.string "payment_methode", default: "cash", null: false
      t.timestamps
    end
  end
end
