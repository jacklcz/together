exports.a = function(){
    console.log('add');
}

function Person(name,age){
    this.name=name;
    this.age=age;
    this.sayHello = function(){
        console.log("sayHello:"+this.name);
    }
}

exports.b = function Person(name,age){
    this.name=name;
    this.age=age;
    this.sayHello = function(){
        console.log("sayHello:"+this.name);
    }
}

exports.c = function Pig(name,age,weigth){
    Person.apply(this,arguments);
    this.weigth = weigth;
    this.sayWeigth = function(){
        console.log("Weigth:"+this.weigth);
    }
}




