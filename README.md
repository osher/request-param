request-param
=============
A connect/express middleware to enable back the `req.param(name,default)` API 
depricated in express 4

My speculation is that they did not want to get in the discussion of what 
should take precedence between routed args, query string and post body, and 
roll the policy on the application maker.

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

If you would like to determine the order in which collections are searched:

```
app.use( require('request-param')({ order: ["body","params","query"] } ) )
```

You can name whatever collection is found on the request object, including 
objects initiated by other middlewares:

```
app.use( require('request-param')({ order: ["query","body","sessData"] } ) )
```

if you want to override the order given to the middleware constructor 
specifically for one place - give your exceptional order as 3rd parameter

app.post( '/some/:value', function(req,res,next) {
    req.param('value', 'dff', ["query","sessData","cfg"] ); // works too!
})



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