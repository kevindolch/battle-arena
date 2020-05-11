# Marvel Combat Arena

This is a Rails App that pits two user selected characters against each other

## Setup

Clone this repo then run bundle install and yarn install in root

This app expects MARVEL_PUBLIC_KEY and MARVEL_PRIVATE_KEY environment variables.  These can bet set in a .env file in root.

Run rails s and then head to localhost:3000.

Ruby 2.7.1 is required

Use master branch for base project.  Use record-wins-losses for fight leaderboards.  This will require a database migration.

## Assumptions

This app assumes a few things when comparing fighters.  word lengths are compared without punctuation.  If word lengths are the same the result is a tie.  For automatic win words if both characters have them the result is a tie.  If a character does not have a description or the description is fewer words than the seed number, the character with a word at that position wins, otherwise if both don't it's a tie.
