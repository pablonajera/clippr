
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var question = require('./routes/question');
var user = require('./routes/user');
var influencer = require('./routes/influencer');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon()); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', influencer.info);
app.get('/ask', routes.ask);
app.get('/q/:id', question.display)
   .get('/q/:id/the_q', question.display_fb)
   .get('/q/twitter/:id', question.twitter);
app.get('/experts', influencer.info)
   .get('/influencer', influencer.info)
   .post('/influencer/access', influencer.access)
   .post('/influencer/add', influencer.add_info)
   .post('/influencer/update_profile_picture', influencer.update_profile_picture);
app.get('/free', routes.free)
   .post('/free', routes.add_user_to_free);
app.get('/paid', routes.paid)
   .post('/paid', routes.add_user_to_paid);
app.get('/u/:id', user.display)
app.get('/profile', routes.profile);
app.get('/update', routes.update)
app.get('*', function(req, res){
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
