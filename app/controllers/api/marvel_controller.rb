class Api::MarvelController < ApplicationController

  def characters
    characters = params[:characters].map do |character_name|
      character_list = character_exact(character_name)
      character_list = character_fuzzy(character_name) if character_list.length == 0
      character_list.map do |character|
        { id: character["id"], name: character["name"], description: character["description"], thumbnail: character["thumbnail"], url: character["urls"].first["url"] }
      end
    end
    render json: { characters: characters }, status: :ok
  rescue StandardError => error
    render json: { error: error }, status: :bad_request
  end

  def fight
    seed = character_params[:seed].to_i
    character_1 = character_params[:character_1]
    character_2 = character_params[:character_2]

    winner = determine_winner(character_1, character_2, seed)
    render json: { winner: winner }, status: :ok
  rescue StandardError => error
    render json: { error: error }, status: :bad_request
  end

  private

  def character_exact(name)
    response = api.get_characters({ name: name })
    response["data"]["results"]
  end

  def character_fuzzy(name)
    response = api.get_characters({ nameStartsWith: name })
    response["data"]["results"]
  end

  def determine_winner(character_1, character_2, seed)
    description_1 = character_1[:description]
    description_2 = character_2[:description]

    words_1 = description_1.split(" ")
    words_2 = description_2.split(" ")

    return character_2[:name] if words_1.length < seed && words_2.length >= seed
    return character_1[:name] if words_2.length < seed && words_1.length >= seed
    return "tie" if words_1.length < seed && words_2.length < seed

    raw_word_1 = words_1[seed-1]
    raw_word_2 = words_2[seed-1]

    # gets rid of punctation and normalizes capitalization
    word_1 = raw_word_1.gsub(/[^\w\s]|_/, "").gsub(/\s+/, " ").downcase
    word_2 = raw_word_2.gsub(/[^\w\s]|_/, "").gsub(/\s+/, " ").downcase

    if word_1 == "gamma" || word_1 == "radioactive"
        return "tie" if word_2 == "gamma" || word_2 == "radioactive"
        return character_1[:name]
    end

    return character_2[:name] if word_2 == "gamma" || word_2 == "radioactive"
    return character_1[:name] if word_1.length > word_2.length
    return character_2[:name] if word_2.length > word_1.length
    "tie"
  end

  def api
    Marvel::Api.new()
  end

  def character_params
    params.require(:marvel).permit(:seed, character_1: {}, character_2: {})
  end
end
