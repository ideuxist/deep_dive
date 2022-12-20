//this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기참조변수다 
//this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다
//함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다
//arguments,this 지역변수처럼 사용가능
//단, this가 가리키는 값 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다

const circle = {
    radius:5,
    getDiameter() {
        //this는 메서드를 호출한 객체를 가리킨다
        return 2*this.radius;
    }
};
console.log(circle.getDiameter(5));

//생성자 함수
function Circle(radius){
    //this는 생성자 함수가 생성할 인스턴스를 가리킨다
    this.radius = radius;
}

Circle.prototype.getDiameter = function(){
    return 2*this.radius;
};

//인스턴스 생성
const circle2 = new Circle(5);
console.log(circle2.getDiameter());//10

//생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다 이처럼 this는 상황에따라 가리키는 대상이 다르다

//this는 어디서든지 참조가능하다
//전역에서 this는 전역객체 window를 가리킨다
console.log(this);//window

function square(number){
    //일반함수 내부에서 this는 전역객체 window를 가리킨다
    console.log(this);//window
    return number*number;
}

const person = {
    name:'Lee',
    getName(){
        //메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다
        console.log(this);//{name:"Lee",getName:f}
        return this.name;
    }
};
console.log(person.getName());//Lee

function Person(name){
    this.name = name;
    //생성자함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다
    console.log(this);//Person{name:"Lee"}
}
const me = new Person('Lee');

//strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩 된다 일반함수 내부에서 this를 사용할 필요가 없기 때문이다
//this 바인딩은 함수호출 방식 즉 함수가 어떻게 호출뙤었는지에 따라 동적으로 결정된다
//1.일반함수호출 2.메서드호출 3.생성자함수 호출 4.Function.prototype.apply/call/bind 메서드에 의한 간접호출

const foo = function() {
    console.log(this);
}

//동일한 함수도 다양한 방식으로 호출

//1.일반함수 호출
foo();//window

//2.메서드 호출
const obj = {test:foo};
obj.test();//{test:f} foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다

//3.생성자 함수 호출
const fooObj = new foo();//foo{} 생성자 함수가 생성한 인스턴스를 가리킨다
console.log(fooObj)//foo{}

//4.Function.prototype.apply/call/bind 메서드에 의한 간접 호출
//foo 함수 내부의 this는 인수에 의해 결정된다
const bar = {name:'bar'};
foo.call(bar);//bar
foo.apply(bar);//bar
foo.bind(bar)();//bar


//1.일반 함수 호출
//기본적으로 this에는 전역 객체가 바인딩 된다
function foo2() {
    console.log("foo's this: ", this); //window
    function bar() {
        console.log("bar's this: ", this); //window
    }
    bar();
}
foo2();
//전역함수는 물론, 중첩함수를 일반함수로호출하면 함수 내부의 this에는 전역객체가 바인딩
//strict mode가 적용된 일반함수내부의 this에는 undefined가 바인딩된다

//메서드 내에서 정의한 중첩함수도 일반함수로 호출되면 중첩함수내부의 this에는 전역 객체가 바인딩된다
//콜백함수가 일반함수로 호출된다면 콜백 함수의 내부의 this에도 전역객체가 바인딩된다
//어떠한 함수라도 일반함수로 호출되면 this에 전역 객체가 바인딩된다

var value = 1;
const obj2 = {
    value :100,
    foo(){
        console.log("foo's this: ", this);//{value:100, foo:f}
        //콜백함수 내부의 this에는 전역 객체가 바인딩된다

        setTimeout(function(){
            console.log("callback's this : ", this);//window
            console.log("callback's this.value ", this.value);//1
        },100)
    }
}
obj2.foo();

//메서드 내의 중첩함수 또는 콜백 함수의 this가 전역객체를 바인딩하는것은 문제가 있다
//중첩함수 또는콜백함수는 외부 함수를 돕는 헬퍼 함수의 역할을 하므로
//외부함수의 일부로직을 대신하는 경우가 대부분 => 중첩함수 또는 콜백함수를 헬퍼함수로 동작하기 어렵게 만든다
//메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한방법
var value2 = 10;
const obj3 = {
    value:100,
    foo(){
        //this 바인딩(obj)을 변수 that에 할당한다
        const that = this;
        //콜백 함수 내부에서 this대신 that을 참조한다
        setTimeout(function(){
            console.log(that.value);
        },100)
    }
}
obj3.foo();
//=>위 방법 외에도 this를 명시적으로 바인딩할 수 있는
//Function.prototype.apply,Function.prototype.call,Function.prototype.bind 메서드를 제공한다

//화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다
var value3 = 99;
const obj4 = {
    value:9,
    foo(){
        setTimeout(()=>console.log(this.value),100)
    }
}
obj4.foo();

//메서드 내부의 this에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름앞으 마침표 연산자 앞에
//기술한 객체가 바인딩된다 주의할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 
//메서드를 호출한 객체에 바인딩된다는 것이다
const person2 = {
    name:'Lee',
    getName2(){
        //메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다
        return this.name;
    }
};
//메서드 getName을 호출한 객체는 persion2이다
console.log(person2.getName2());//Lee 
//위 예제의 getName 메서드는 person 객체의 메서드로 정의되었다 메서드는 프로퍼티에 바인딩된 함수다
//즉 person 객체의 getName 프로퍼티가가리키는 함수 객체는 person 객체에 포함된것이 아니라 독립적으로 존재하는 
//별도의 객체다 getName  프러퍼티가 함수객체를 가리키고 있을뿐이다
//따라서 getName 프로퍼티가 가리키는 함수객체 즉 getName 메서드는 다른 객체의 프로퍼티에 할당하는것으로
//다른 객체의 메서드가 될수도 있고 일반변수에 할당하여 일반 함수로 호출 될 수도 있다
const anotherPerson = {
    name:'Kim'
}
//getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person2.getName2;
//getName 메서드를 호출한 객체는 anotherPerson이다
console.log(anotherPerson.getName());//Kim

//getName메서드를 변수에 할당
//일반함수로 호출된 getName 함수 내부의 this.name은 브라우저환경에서 window.name과 같다
const getName = person2.getName2;
console.log(getName());//''
//메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다
//프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다

//생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다
function Circle2(radius){
    //생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다
    this.radius =radius;
    this.getDiameter = function(){
        return 2 * this.radius;
    };
}

const circle3 = new Circle(5);
const circle4 = new Circle(10);

console.log(circle3.getDiameter());
console.log(circle4.getDiameter());