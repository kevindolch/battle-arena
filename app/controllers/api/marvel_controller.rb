class Api::MarvelController < ApplicationController
  def characters
    render json: { characters: [
      { name: "Spiderman", description: "pretty cool guy"}
      ]}
  end
end
