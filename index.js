"use strict";

//
// include modules
//
const cookieSession = require("cookie-session");
const express = require("express");

//
// start server
//
const app = express();
const port = 5000;
app.listen(port);
console.log("Port: " + port);

//
// work with session
//
app.use(cookieSession({
    name: 'session',
    keys: ['aaa', 'bbb', 'ccc', 'xxx', 'yyy', 'zzz'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

//
// set headers
//
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Author", "Kolotovkin Maxim");
    next();
});

//
// set man
// push name of user to session
//
app.get('/man', (request, response) => {
    const dictionary = request.query;
    request.session.man = dictionary['man'];
    response.end(JSON.stringify({
        man: request.session.man,
        result: "OK",
    }));
});

//
// set number
// change number of visiting if name of user exists
//
app.get('/number', (request, response) => {
    if(request.session.man) {
        let number = request.session.number;
        number = parseInt(number);
        if(!number) number = 0;
        number++;
        request.session.number = number.toString();
        response.end(JSON.stringify({
            number: number,
            man: request.session.man,
            result: "OK",
        }));
    } else {
        response.end(JSON.stringify({           
            result: "ERROR",
        }));
    }
});

// 
// exit from session
//
app.get('/exit', (request, response) => {
    request.session = null;
    response.end(JSON.stringify({  
        exit: "OK",         
        result: "OK",
    }));
});

