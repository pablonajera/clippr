var BASE_URL = "https://o2uzqo7yv2.execute-api.us-east-1.amazonaws.com/prod/";
var QUESTION_INFO_URL = BASE_URL + "get_question_info?question_id=";
var S3_URL = BASE_URL + "/get_s3_get_url_web?type=";
var QUESTION = "question";
var ANSWER = "answer";
var FILENAME_PARAM = "&filename=";
var request = require('request');

exports.display = function (req, res) {
    var id = req.params.id;
    request(QUESTION_INFO_URL + id, function(err, response) {
        if (err) return res.redirect('/');
        else {
            var data = JSON.parse(response.body);
            //console.log(data);
            if (data.answer != undefined) {
                request(S3_URL + ANSWER + FILENAME_PARAM + data.answer.filename, function(err, response){
                    if (err) return res.redirect('/');
                    else {
                        var answer_url = JSON.parse(response.body);
                        data.answer_url = answer_url;
                        if (data.question != undefined ) {
                            if (data.question.type === 'video') {
                                request(S3_URL + QUESTION + FILENAME_PARAM + data.question.filename, function(err, response){
                                    if (err) return res.redirect('/');
                                    else {
                                        var question_url = JSON.parse(response.body);
                                        data.question_url = question_url;
                                        res.render('question', { data : data });
                                    }
                                });
                            } else {
                                console.log(data);
                                res.render('question', { data : data, isText: true})
                            }
                        } else {
                            res.render('question', { data : data});
                        }
                    }
                });
            } else {
                return res.redirect('/');
            }
        }
    })
};

exports.display_fb = function (req, res) {
    var id = req.params.id;
    request(QUESTION_INFO_URL + id, function(err, response) {
        if (err) return res.redirect('/');
        else {
            var data = JSON.parse(response.body);
            console.log(data);
            if (data.answer != undefined) {
                request(S3_URL + ANSWER + FILENAME_PARAM + data.answer.filename, function(err, response){
                    if (err) return res.redirect('/');
                    else {
                        var answer_url = JSON.parse(response.body);
                        data.answer_url = answer_url;
                        if (data.question != undefined ) {
                            if (data.question.type === 'video') {
                                request(S3_URL + QUESTION + FILENAME_PARAM + data.question.filename, function(err, response){
                                    if (err) return res.redirect('/');
                                    else {
                                        var question_url = JSON.parse(response.body);
                                        data.question_url = question_url;
                                        res.render('question_fb', { data : data });
                                    }
                                });
                            } else {
                                res.render('question_fb', { data : data, isText: true})
                            }
                        } else {
                            res.render('question_fb', { data : data});
                        }
                    }
                });
            } else {
                return res.redirect('/');
            }
        }
    })
};

exports.twitter = function (req, res) {
    var id = req.params.id;
    request(QUESTION_INFO_URL + id, function(err, response) {
        if (err) return res.render('404');
        else {
            var data = JSON.parse(response.body);
            if (data.question != undefined) {
                request(S3_URL + QUESTION + FILENAME_PARAM + data.question.filename, function(err, response){
                    if (err) return res.render('404');
                    else {
                        var question_url = JSON.parse(response.body);
                        data.question_url = question_url;
                        if (data.answer != undefined) {
                            request(S3_URL + ANSWER + FILENAME_PARAM + data.answer.filename, function(err, response){
                                if (err) return res.render('404');
                                else {
                                    var answer_url = JSON.parse(response.body);
                                    data.answer_url = answer_url;
                                    res.render('twitter', { data : data });
                                }
                            });
                        } else {
                            res.render('twitter', { data : data});
                        }
                    }
                });
            } else {
                res.render('404');
            }
        }
    })
};