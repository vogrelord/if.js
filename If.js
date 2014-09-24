(function (global) {

    function _eval(val){
        if(val && val._if){
            return val.get();
        }
        if(typeof(val)=='function'){
            return val()
        } else {
            return val;
        }
    }

    global.If = function(condition){
        return {
            _if: true,
            get: function(){
                throw new Error('Need Then method');
            },
            Then: function(thenVal){
                return {
                     _if: true,
                    Else: function(elseVal){
                        return {
                            _if: true,
                            get: function(){
                                if(_eval(condition)){
                                    return _eval(thenVal);
                                } else{
                                    return _eval(elseVal);
                                }
                            }
                        }
                    },
                    get: function(){
                        if(_eval(condition)){
                            return _eval(thenVal);
                        } else{
                            return undefined;
                        }
                    } 
                }
            }
        }
    };


    global.Switch = function(condition){
        var whens = [];
        var Default = undefined;

        var _get = function(){
            for(var i = 0; i < whens.length; i++){
                var when = whens[i];
                if(_eval(when[0])){
                    return _eval(when[1])
                }
                return _eval(Default);
            }
        }

        var _default = function(value){
            Default = value;
            return {
                _if: true,
                get: _get
            }
        }

        var _when = function(condition, value){
            whens.push([condition, value]);
            return {
                _if: true,
                When: _when,
                Default: _default,
                get: _get
            }
        }

        return {
            _if: true,
            When: _when,
            Default: _default,
            get: function(){
                throw new Error('No When or Default');
            }
        }
    }


    /*
    * tests
    */
    if(If(true).Then(1).get()!=1){
        console.error('test fail: Then');
    }

    if(If(false).Then(1).Else(2).get()!=2){
        console.error('test fail: Else');
    }

    if(If(true).Then(If(true).Then(1).Else(2)).Else(2).get()!=1){
        console.error('test fail: Nested if');
    }    

    if(Switch('a').When('a', 1).When('b',2).get()!=1){
        console.error('test fail: When 1');
    }

    if(Switch('b').When('a', 1).When('b',2).Default(3).get()!=1){
        console.error('test fail: When 2');
    }

    if(Switch('b').When('a', 1).When('b',2).Default(3).get()!=1){
        console.error('test fail: When 3');
    }

})(window)
