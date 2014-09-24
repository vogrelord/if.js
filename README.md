if.js
=====

If library

conditions and switches.
It shines in conjunction with react.js and es6


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
