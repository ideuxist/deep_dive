const person = { name : 'Lee'};
console.log(person.hasOwnProperty('__proto__'));//false 
//__proto__접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라
//Object.prototype의 프로퍼티이다
//모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티를 사용할수 있다
console.log(Object.getOwnPropertyDescriptor(Object.prototype,'__proto__'))
console.log(person);