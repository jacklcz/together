var a = require('./a').a();
var b = require('./a').b;
var c = require('./a').c;
var bb = new b("jack",25);
var cc = new c("jack",28,1000);
bb.sayHello();
cc.sayWeigth();
cc.sayHello();




