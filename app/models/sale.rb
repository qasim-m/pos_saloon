class Sale < ApplicationRecord
    belongs_to :user 
    belongs_to :customer 
    has_many :sale_services
end
