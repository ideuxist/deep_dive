//class는 일급객체로서 다음과 같은 특징을 갖는다 클래스는 함수다
//1.무명의 리터럴로 생성할 수 있다 즉 런타임에 생성이 가능하다
//2.변수나 자료구조(객체,배열등)에 저장할 수 있다
//3.함수의 매개변수에게 전달할 수 있다
//4.함수의 반환값으로 사용할 수 있다
//클래스 몸체에서 정의할 수 있는 메서드는 constructor,프로토타입 메서드,정적 메서드 세가지가 있다
class Person {
    //생성자
    constructor(name) {
        this.name = name;
    }

    //프로토타입 메서드
    sayHi(){
        console.log(`Hi! My name is ${this.name}`);
    }

    //정적메서드
    static sayHello() {
        console.log('hello');
    }
}
//인스턴스 생성
const me = new Person('kwon');
console.log(me.name);//kwon
me.sayHi();//Hi! My name is kwon
Person.sayHello();//hello