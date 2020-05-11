class CreateCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.text :description
      t.string :thumbnail_url
      t.string :url
      t.timestamps
    end
  end
end
