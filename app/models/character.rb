class Character < ApplicationRecord
  validates_presence_of :name
  has_many :matches

  MAGIC_WORDS = ["gamma", "radioactive"].freeze

  def fight(character_2, seed)
    description_2 = character_2.description
    words_1 = description.split(" ")
    words_2 = description_2.split(" ")

    if short_description?(words_1, words_2, seed)
      short_description_decision(words_1, words_2, seed)
    else
      raw_word_1 = words_1[seed-1]
      raw_word_2 = words_2[seed-1]
      word_1 = sanitize_word(raw_word_1)
      word_2 = sanitize_word(raw_word_2)
      if magic_words?(word_1, word_2)
         magic_word_decision(word_1, word_2)
      else
        normal_decision(word_1, word_2)
      end
    end
  end

  private

  def short_description?(words_1, words_2, seed)
    words_1.length < seed || words_2.length < seed
  end

  def magic_words?(word_1, word_2)
    MAGIC_WORDS.include?(word_1) || MAGIC_WORDS.include?(word_2)
  end

  def short_description_decision(words_1, words_2, seed)
    if words_1.length < seed && words_2.length >= seed
      :character_2_wins
    elsif words_2.length < seed && words_1.length >= seed
      :character_1_wins
    else
      :tie
    end
  end

  def magic_word_decision(word_1, word_2)
    if MAGIC_WORDS.include?(word_1) && MAGIC_WORDS.include?(word_2)
      :tie
    elsif MAGIC_WORDS.include?(word_1)
      :character_1_wins
    else
      :character_2_wins
    end
  end

  def normal_decision(word_1, word_2)
    if word_1.length > word_2.length
      :character_1_wins
    elsif word_2.length > word_1.length
      :character_2_wins
    else
      :tie
    end
  end

  def sanitize_word(word)
    word.gsub(/[^\w\s]|_/, "").gsub(/\s+/, " ").downcase
  end
end
