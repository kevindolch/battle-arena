class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.integer :character_1_id
      t.integer :character_2_id
      t.integer :result
      t.timestamps
    end
    add_index :matches, :character_1_id
    add_index :matches, :character_2_id
  end
end
