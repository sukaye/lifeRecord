# app.rb
require "sinatra"
require "sinatra/activerecord"
require "sinatra/json"
require "./models.rb"

Time.zone = "Beijing"
ActiveRecord::Base.default_timezone = :local

set :port, 8088
set :database, "sqlite3:lr.sqlite3"

get '/' do
  redirect 'index.html'
end

# get all
get '/liferecords' do
  json LifeRecord.order(updated_at: :desc).all
end

# create
post '/liferecord' do
  @lifeRecord = LifeRecord.create(title: params[:title], content: params[:content], user_id: 1)
  json @lifeRecord
end

# update
put '/liferecord/:id' do
  @lifeRecord = LifeRecord.find(params[:id])
  @lifeRecord.update(title: params[:title], content: params[:content])
  json @lifeRecord
end

# delete
delete '/liferecord/:id' do
  @lifeRecord = LifeRecord.find(params[:id])
  @lifeRecord.destroy
end