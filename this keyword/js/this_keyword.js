const circle = {
    radius: 5,
    getDiameter() {
        return 2 * circle.radius
    }
};
console.log(circle.getDiameter());//10

//생성자 함수 내부에서는 프로퍼티 또는 메서드를 추가하기 위해 자신이 생성할 인스턴스를 ㅊ마조할 수 있어야 한다
//this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다 함수를 호출하면
//arguments 객체와 this가 암묵적으로 ㅎ마수 내부에 전달된다
//단, this가 가리키는 값 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다

//객체 리터럴
const circleObj = {
    radius: 5,
    getDiameter() {
        return 2 * this.radius;
    }
};
console.log(circleObj.getDiameter());//10
//객체 리터럴 메서드 내부에서의 this는 메서드를 호출한 객체 즉 circle을 가리킨다

//생성자 함수 
function Circle(radius) {
    //this는 생성자 함수가 생성할 인스턴스를 가리킨다
    this.radius = radius;
}
Circle.prototype.getDiameter = function () {
    //this는 생성자 함수가 생성할 인스턴스를 가리킨다
    return 2 * this.radius;
}
const circle3 = new Circle(5);
console.log(circle3.getDiameter());//10
//this바인딩은 동적으로 결정(호출되는 방식 or strict mode)

//일반함수 내부에서 this는 전역객체 window를 가리킨다
//메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다
//생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다

//함수 호출 방식과 this 바인딩 (동일한 함수도 다양한 방식으로 호출 가능함에 주의)
//1.일반 함수 호출
//2.메서드 호출
//3.생성자 함수 호출
//Function.prototype.apply/call/bind 메서드에 의한 간접 호출
const foo = function () {
    console.dir(this);
}
//1.일반 함수 호출
foo();//window
const obj = { foo };
//2.메서드 호출
obj.foo();//obj
//3.생성자 함수 호출
new foo();//foo{}
//4.Function.prototype.apply/call/bind 메서드에 의한 간접 호출
//foo 함수 내부의 this는 인수에 의해 결정된다
const bar = { name: 'bar' };
foo.call(bar);//bar
foo.apply(bar);//bar
foo.bind(bar)();//bar


//1.일반함수호출 
function foo2() {
    console.log("foo2's this :", this);
    function bar2() {
        console.log("bar2's this :", this);
    }
    bar2();
}
foo2();//window,window
//주의 strict mode가 적용된 일반함수 내부의 this에는 undefined가 바인딩됨
function foo3() {
    'use strict';
    console.log("foo3's this :", this);//undefined
    function bar3() {
        console.log("bar3's this :", this);//undefined
    }
    bar3();
}
foo3();
//메서드 내에서 정의한 중첩함수도 일반함수로 호출되면 중첩함수 내부의 this에는 전역객체가 바인딩된다
var value2 = 2;
const obj2 = {
    value2: 200,
    foo4() {
        console.log("foo's this :", this);//{value2:200,foo:f}
        console.log("foo;s this.value :", this.value);//100

        function bar4() {
            console.log("bar's this", this);//window
            console.log("bar's this.value :", this.value);//1
        }
        bar4();
    }
}
obj2.foo4();
//콜백함수가 일반함수로 호출된다면 콜백함수 내부의 this에도 전역 객체가 바인딩된다
//어떠한 함수라도 일반함수로 호출되면 this에 전역객체가 바인딩된다
var value3 = 3;
const obj3 = {
    value3: 300,
    foo() {
        console.log("foo's this :", this);//{value3:300,foo:f}
        //콜백함수 내부의 this에는 전역 객체가 바인딩된다
        setTimeout(function () {
            console.log("callback's this", this)//window
            console.log("callback's this.value3", this.value3)//3
        }, 500)
    }
};
obj3.foo();
//중첩함수 또는 콜백 함수는 외부함수를 돕는 헬퍼 함수의 역할을 하므로 외부 함수의 일부 로직을 대신하는 경우가 대부분
//외부함수인 메서드와 중첩 함수 또는 콜백함수의 this가 일치하지 않는다는것은
//중첩함수 또는 콜백함수를 헬퍼 함수로 동작하기 어렵게 만든다
//메서드 내부의 중첩함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치 시키기 위한 방법
var value4 = 4;
const obj4 = {
    value4: 400,
    foo() {
        const that = this;
        //콜백 함수 내부에서 this대신 that을 참조한다
        setTimeout(function () {
            console.log(that.value4);
        }, 500)
    }
}
obj4.foo();
//위 방법 외에도 자바스크립트는 this를 명시적으로 바인딩 할 수 있는
//Function.prototype.apply/call/bind 메서드를 제공한다
//또는 화살표 함수를 사용해서 this 바인딩을 일치시킬수도 있다
var value5 = 5;
const obj5 = {
    value: 500,
    foo() {
        setTimeout(() => {
            console.log(this.value5)//500 화살표 함수의 this는 상위 스코프의 this를 가리킨다
        })
    }
}

//2.메서드 호출
const person = {
    name: 'lee',
    getName() {
        //메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다
        return this.name;
    }
}
//메서드 getName을 호출한 객체는 person이다
console.log(person.getName());//lee
//위 예제의 getName메서드는 person 객체의 메서드롲 ㅓㅇ의되었다 메서드는 프로퍼티에 바인딩된 함수다
//즉 person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된것이 아니라 독립적으로
//존재하는 별도의 객체다 getName 프로퍼티가 함수 객체를 가리키고 있을뿐이다
//따라서 getName 프로퍼티가 가리키는 함수객체, 즉 getName메서드는 다른 객체의 프로퍼티에 할당하는것으로
//다른 객체의 메서드가 될수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다
const anotherPerson = {
    name: 'kim',
}
anotherPerson.getName = person.getName;
console.log(anotherPerson.getName());//kim getName메서드를 호출한 객체는 anotherPerson이다
const getName= person.getName;
console.log(getName())//'' 일반함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경의 window.name과 같다
//브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다
//메서드 내부의 this는 프로퍼티로 메서드를 가리키고있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다
//프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다
function Person2(name){
    this.name = name;
}
Person2.prototype.getName=function(){
    return this.name;
}
Person2.prototype.name = 'kim';
const me = new Person2('gwon');
console.log(me.getName())//'gwon'
console.log(Person2.prototype.getName());//'kim'
console.log(me.name);//gwon
console.log(me.__proto__.name);//prototype 학습후
console.log(me.__proto__.__proto__);//prototype 학습후

//3.생성자함수 호출
//생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다 
function Circle4(radius){
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    }
}
//반지름이 5인 Circle4 객체 생성
const circle5 = new Circle4(5);
//반지름이 10인 Circle4 객체 생성
const circle10 = new Circle4(10);
console.log(circle5.getDiameter());//10
console.log(circle10.getDiameter());//20
//new 연산자와 함께 호출하지 않으면 일반함수로 호출
const circle15 = Circle4(15);
console.log(circle15);//undefined
console.log(radius);//15 일반함수로 호출된 Circle4 내부의 this는 전역객체를 가리킨다

//4.Function.prototype.apply/call/bind 메서드에 의한 간접호출
//apply,call,bind 메서드는 Function.prototype의 메서드다 즉 이들 메서드는 모든함수가 상속받아 사용할 수 있다
//apply call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다
function getThisBinding(){
    return this;
}
//this로 사용할 객체
const thisArg = {a:1};
console.log(getThisBinding());//window
//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다
console.log(getThisBinding.apply(thisArg));//{a:1}
console.log(getThisBinding.call(thisArg));//{a:1}
//apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다 apply와 call메서드는 함수를 호출하면
//첫번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다
//함수를 호출하면서 인수를 전달
function getThisBinding2(){
    console.log(arguments);
    return this;
}
const thisArg2={a:1};
//apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다
console.log(getThisBinding2.apply(thisArg2,[1,2,3]));//Arguments(3)[1,2,3,callee:f,Symbol(Symbol.iterator):f] {a:1}
//call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다
console.log(getThisBinding2.call(thisArg2,1,2,3));//Arguments(3)[1,2,3,callee:f,Symbol(Symbol.iterator):f] {a:1}
//apply와 call 메서드의 대표적인 용도는 argumnets 객체와 같은 유사배열객체에 배열 메서드를 사용하는 경우다
//arguments 객체는 배열이 아니기 때문에 Array.prototype.slice같은 배열의 메서드를 사용할 수 없으나
//apply와 call 메서드를 이용하면 가능하다
function convertArgsToArray(){
    console.log(arguments);
    //argument객체를 배열로 변환
    //Array.prototype.slice를 인수없이 호출하면 배열의 복사본을 생성한다
    const arr = Array.prototype.slice.call(arguments);
    // const arr = Array.prototype.slice.apply(arguments);
    console.log(arr);
    return arr;
}
convertArgsToArray(1,2,3);//[1,2,3]
//Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않는다 다만 첫번째 인수로 전달한 값으로
//this 바인딩이 교체된 함수를 새롭게 생성해 반환한다
function getThisBinding2(){
    return this;
}
//this로 사용할 객체
const thisArg3 = { a: 1};
//bind 메서드는 첫번째 인수로 전달한 thisArg3로 this 바인딩이 교체된
//getThisBinding2 함수를 새롭게 생성ㅎ해 반환한다
console.log(getThisBinding2.bind(thisArg3));//getThisBinding
//bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야한다
console.log(getThisBinding2.bind(thisArg3)());//{a:1}
//bind 메서드는 메서드의 this와 메서드 내부의 중첩함수 또는 캘백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다
const person3 = {
    name:'Lee',
    foo(callback){
        //1
        setTimeout(callback,500);
    }
};
person3.foo(function(){
    console.log(`Hi! my name is ${this.name}.`);//Hi! my name is .
});
//person.foo의 콜백 함수가 호출되기 이전인 1의 시점에서 this는 foo메서드를 호출한 객체
//즉 person 객체를 가리킨다 그러나 person.foo의 콜백 함수가 일반 함수로서 호출된 2의 시점에서 
//this는 전역객체 window를 가리킨다
 