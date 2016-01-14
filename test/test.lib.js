var mw_f = require("../")
  , mw
  , order
  , req     = {}
  , _query  = {}
  , _body   = {}
  , _params = {}
  , dv      = "default" + Math.random()
  ;

Object.defineProperties( req
  , { query : 
      { get: 
        function() {
            order.push("query");
            return _query;
        }
      }
    , body : 
      { get: 
        function() {
            order.push("body");
            return _body;
        }
      }
    , params : 
      { get: 
        function() {
            order.push("params");
            return _params;
        }
      }
    }
  )

module.exports = 
{ "request-param" : 
  { "should be a middleware factory, names 1 argument - cfg" :
    function() {
        mw_f.should.be.a.Function;
        mw_f.length.should.eql(1);
    }
  , "when used without arguments" : 
    { "should not fail" :
      function() {
          mw = mw_f()
      }   
    , "should return a middleware handler" : 
      function() {
          mw.should.be.a.Function;
          mw.length.should.eql(3);
      }
    , "when used with valid arguments" : 
      { "should not fail and call the done" : 
        function(done) {
            mw(req, null, done);
        }
      , "should decorate the request with a method 'param', names 3 args: field, default, order" : 
        function() {
            req.should.have.property('param');
            req.param.should.be.a.Function;
            req.param.length.should.eql(3);
        }
      , "using req.param(..) api " : 
        { afterEach: 
          function() {
              delete _body.field;
              delete _query.field;
              delete _params.field;
          }
        , "should search by default order(first in 'params', then in 'body', then in 'query' and last - return defaultValue)" : 
          function() {
              order = [];
              req.param("field", dv).should.eql(dv);
              order.should.eql( ["params","query","body"] );
          }
        , "should stop on the first collection that has the searched field" : 
          function test_stops_on_first() {
              order = [];
              _body.field = "body" + Math.random();
              req.param("field", dv).should.eql(_body.field);
              order.should.eql( ["params","query","body"] );

              order = [];
              _query.field = "query" + Math.random();
              req.param("field", dv).should.eql(_query.field);
              order.should.eql( ["params","query"] );

              order = [];
              _params.field = "params" + Math.random();
              req.param("field", dv).should.eql(_params.field);
              order.should.eql( ["params"] );
          }
        , "with injected order" : 
          { "should search the collections by the injeted order, ending with defaultValue" : 
            function() {
                order = [];
                req.param("no-such-field", dv, ["query", "body", "params"]).should.eql(dv);
                order.should.eql( ["query", "body", "params"] );
            }        
          }
        }
      }
    }
  , "when used with settings object with 'order' attribute as valid array of strings" : 
    { "should not fail" :
      function() {
          mw = mw_f( {order: ["body", "query", "params"] } )
      }   
    , "should return a middleware handler" : 
      function() {
          mw.should.be.a.Function;
          mw.length.should.eql(3);
      }
    , "when used with valid arguments" : 
      { "should not fail and call the done" : 
        function(done) {
            mw(req, null, done);
        }
      , "should decorate the request with a method 'param', names 3 args: field, default, order" : 
        function() {
            req.should.have.property('param');
            req.param.should.be.a.Function;
            req.param.length.should.eql(3);
        }
      , "using req.param(..) api " : 
        { afterEach: 
          function() {
              delete _body.field;
              delete _query.field;
              delete _params.field;
          }
        , "should search the collections by the order they are given" : 
          function() {
              order = [];
              req.param("no-such-field", dv).should.eql(dv);
              order.should.eql( ["body", "query", "params"] );
          }
        , "should stop on the first collection that has the searched field" : 
          function test_stops_on_first() {
              order = [];
              _params.field = "params" + Math.random();
              req.param("field", dv).should.eql(_params.field);
              order.should.eql( ["body", "query", "params"] );

              order = [];
              _query.field = "query" + Math.random();
              req.param("field", dv).should.eql(_query.field);
              order.should.eql( ["body","query"] );

              order = [];
              _body.field = "body" + Math.random();
              req.param("field", dv).should.eql(_body.field);
              order.should.eql( ["body"] );
          }
        , "with in-call injected order" : 
          { "should search the collections by the injeted order, ending with defaultValue" : 
            function() {
                order = [];
                req.param("no-such-field", dv, ["query", "body", "params"]).should.eql(dv);
                order.should.eql( ["query", "body", "params"] );
            }        
          }
        }
      }
    }
  }
}