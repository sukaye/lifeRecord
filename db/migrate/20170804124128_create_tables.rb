class CreateTables < ActiveRecord::Migration[5.1]
  def change
      
      create_table :users do |t|
          t.string :username, null: false
          t.string :password, null: false
          t.datetime :created_at, null: false
          t.datetime :updated_at, null: false
      end

      create_table :life_records do |t|
          t.string :title
          t.text :content
          t.datetime :created_at, null: false
          t.datetime :updated_at, null: false
          t.integer :user_id, null: false
      end
      
  end
end
