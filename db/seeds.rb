# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])

User.create(first_name: "Muhammad", last_name: "usman", email: "usman123@gmail.com", password: "123@Najim789", admin: true)
User.create(first_name: "User", last_name: "A", email: "user456a@gmail.com", password: "user456a@")
User.create(first_name: "User", last_name: "B" ,email: "user123b@gmail.com", password: "user123b@")
User.create(first_name: "User", last_name: "C", email: "user567c@gmail.com", password: "user567c@")