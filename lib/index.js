var hasOwnProperty = Object.prototype.hasOwnProperty;
var defaults = 
    { order : ["params", "query", "body" ]
    }
  ;
module.exports = param_mw_fctry;

function param_mw_fctry(cfg) { 
    if (!cfg) cfg = defaults;
    return function param_mw(req, res, next) {
        req.param = param;
        next()
    }

    function param(name, defaultValue, order) {
        var i, value;
        if (!order) order = cfg.order;

        for (i = 0; i < order.length; i++ )
            if (valueIn( this[ order[i] ]) ) 
                return value;

        return defaultValue;

        //TRICKY: has side effects - assigns result to `value`
        function valueIn(obj) {
            //TODO: find out why in originaly express 2.0 they had to chek for params.hasOwnProperty??
            return obj && null != (value = obj[name]) && hasOwnProperty.call(obj, name)
        }
    }
}