class Api::MarvelController < ApplicationController

  def characters
    characters = params[:characters].map do |character_name|
      character_list = character_exact(character_name)
      character_list = character_fuzzy(character_name) if character_list.length == 0
      character_list.map do |c|
        character = Character.find_or_initialize_by(name: c["name"])
        character.description = ActionView::Base.full_sanitizer.sanitize(c["description"])
        character.thumbnail_url = "#{c["thumbnail"]["path"]}.#{c["thumbnail"]["extension"]}"
        character.url = c["urls"].first["url"]
        character.save!
        character
      end
    end
    render json: { characters: characters }, status: :ok
  rescue StandardError => error
    render json: { error: error }, status: :bad_request
  end

  def fight
    seed = character_params[:seed].to_i
    character_1 = Character.find(character_params[:id_1])
    character_2 = Character.find(character_params[:id_2])
    result = character_1.fight(character_2, seed)

    Match.create(character_1_id: character_1.id, character_2_id: character_2.id, result: result)
    render json: { result: result }, status: :ok
  rescue StandardError => error
    render json: { error: error }, status: :bad_request
  end

  def fight_records
    records = Character.match_records
    render json: { records: records }, status: :ok
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
    "tie"
  end

  def api
    Marvel::Api.new()
  end

  def character_params
    params.require(:marvel).permit(:seed, :id_1, :id_2)
  end
end
