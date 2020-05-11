class Match < ApplicationRecord
  belongs_to :character_1, class_name: "Character"
  belongs_to :character_2, class_name: "Character"
  validates_presence_of :character_1_id, :character_2_id, :result
  enum result: { character_1_wins:  0, character_2_wins: 1, tie: 2 }
end
