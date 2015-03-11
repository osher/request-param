request-param [![Build Status](https://secure.travis-ci.org/osher/request-param.png?branch=master)](http://travis-ci.org/osher/request-param)

request-param
=============

It started as a connect/express middleware to enable back the `req.param(name,default)` API 
depricated in express 4.

My speculation is that they did not want to get in the discussion of what 
should take precedence between routed args, query string and post body, and 
roll the policy on the application maker.

But it actually does a little more than that.

If you just want backward compatibility with express 3 or earlier - you can use 
this middleware.

But read on - you can do a little more :)

usage
=====

```
var app = require('express')()

app.use( require('request-param')() )

app.post( '/some/:value', function(req,res,next) {
    req.param('value', 'dff'); // returns :value from path
                               // or ?value=<value> from query
                               // or body.value from body
                               // or 'dff' as default value
})
```

Determine default order on our own
----------------------------------

If you would like to determine the order in which collections are searched:

```
app.use( require('request-param')({ order: ["body","params","query"] } ) )
```

You can name whatever collection is found on the request object, including 
objects initiated by other middlewares:

```
app.use( require('request-param')({ order: ["query","body","sessData"] } ) )
```

Inject exceptional order on the fly
-----------------------------------

if you want to override the order given to the middleware constructor 
specifically for one place - give your exceptional order as 3rd parameter

```
app.post( '/some/:value', function(req,res,next) {
    req.param('value', 'dff', ["query","sessData","cfg"] ); // works too!
})
```

Note
====
This middleware is an abstraction layer that hides the actual source from which 
parameters are retrieved.

The benefits of it is - that you don't really care. You can change the protocol
as you like, and move parameters from path to query, from get to POST - the handler
will not care - it will just work, for the cost of few CPU cycles spent on checks.

*Do mind the pitfal:* if you always take your parameters from the sane single source, 
for example - always from request.params (path parameters), or from request.query 
(query-string) there is no real motive to use this abstraction layer, and spend these 
CPU cycles needlessly...

install
=======

`npm install request-param`

contribute
==========
1. Change code
2. Add tests
3. Pass unit-tests
4. Send PR

lisence
=======
MIT

last word
=========
have fun :)