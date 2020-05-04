class Api::MarvelController < ApplicationController

  def battle_characters
    characters = character_params[:characters].map do |character_name|
      character_list = character_exact(character_name)
      character_list = character_fuzzy(character_name) if character_list.length == 0
      character_list.map do |character|
        { id: character["id"], name: character["name"], description: character["description"], thumbnail: character["thumbnail"] }
      end
    end
    render json: { characters: characters }, status: :ok
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

  def api
    Marvel::Api.new()
  end

  def character_params
    params.permit(:seed, characters: [])
  end
end
