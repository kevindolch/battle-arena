class Api::MarvelController < ApplicationController

  def battle_characters
    api = Marvel::Api.new()
    character_params[:characters].map do |character|
      result = api.get_characters({ name: character })
    end
    render json: { characters: characters }, status: :ok
  rescue StandardError => error
    render json: { error: error }, status: :bad_request
  end

  private

  def character_params
    params.permit(:seed, characters: [])
  end
end
