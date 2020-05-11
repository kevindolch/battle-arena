Rails.application.routes.draw do
  root 'static#index'
  get '*page', to: "static#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  namespace :api, defaults: { format: 'json' } do
    put "characters", to: "marvel#characters"
    post "fight", to: "marvel#fight"
    get "fight_records", to: "marvel#fight_records"
  end

end
