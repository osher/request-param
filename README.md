request-param
=============
A connect/express middleware to enable back the `req.param(name,default)` API 
depricated in express 4

My speculation is that they did not want to get in the discussion of what 
should take precedence between routed args, query string and post body, and 
roll the policy on the application maker.

If you just want backward compatibility with express 3 or earlier - use this 
middleware.

usage
=====

```
var app = require('express')()

app.use( reqiore('request-param') )

app.post( '/some/:value', function(req,res,next) {
    req.param('value'); // returns :value, or ?value=<value>, or body.value
})
```

install
=======

`npm install request-param`

future
======

let the user configure what the order of arguments-bag to look in

contribute
==========
1. Change code
2. Add tests
3. Pass unit-tests
4. Send PR

lisence
=======
MIT