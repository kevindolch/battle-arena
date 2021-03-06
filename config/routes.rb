Rails.application.routes.draw do
  root 'static#index'
  get '*page', to: "static#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  namespace :api, defaults: { format: 'json' } do
    get "characters", to: "marvel#characters"
    post "fight", to: "marvel#fight"
  end

end
