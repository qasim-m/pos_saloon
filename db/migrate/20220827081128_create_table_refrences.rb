class CreateTableRefrences < ActiveRecord::Migration[7.0]
  def change
    add_reference :sales, :user, foreign_key: true
    add_reference :sales, :customer, foreign_key: true
    add_reference :sale_services, :sale, foreign_key: true
    add_reference :sale_services, :service, foreign_key: true
  end
end
