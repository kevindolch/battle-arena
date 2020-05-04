module Marvel
  class Api
    def initialize
      self.public_key = ENV["MARVEL_PUBLIC_KEY"]
      self.private_key = ENV["MARVEL_PRIVATE_KEY"]
      self.connection = Faraday.new(
        url: "http://gateway.marvel.com",
        params: auth
      )
    end

    def get_characters(options = {})
      response = connection.get("/v1/public/characters", options)
      JSON.parse(response.body)
    end

    private
    attr_accessor :public_key, :private_key, :connection

    def auth
      { ts: timestamp, apikey: public_key, hash: Digest::MD5.hexdigest(timestamp + private_key + public_key)  }
    end

    def timestamp
      @_timestamp ||= Time.now.to_s
    end
  end
end
