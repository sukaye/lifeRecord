## Sinatra App Demo  
Sinatra + ActiveRecord + Sqlite3
### Install Ruby and Sinatra
For example, on Ubuntu 12.04
```shell
$sudo apt-get update
$sudo apt-get install curl
$\curl -L https://get.rvm.io | bash -s stable
$source ~/.rvm/scripts/rvm
$rvm requirements
$rvm install ruby
$rvm use ruby --default
$rvm rubygems current
$gem install sinatra
$gem install thin
$gem install bundle
```
### Run App
```shell
$git clone https://github.com/sukaye/lifeRecord.git
$cd lifeRecord
$bundle install
$ruby app.rb
```
### Screenshot
![](screenshot/2017-08-05-1-25074830.jpg)  
![](screenshot/2017-08-05-2-96654836.jpg) 

---
[Sinatra Getting Started](http://www.sinatrarb.com/intro.html)  
[Sinatra/ActiveRecord/sqlite3 App](https://github.com/shannonjen/sinatra_crud_tutorial)
