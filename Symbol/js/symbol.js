//Symbol은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값
//심벌값은 다른 값과 중복되지 않는 유일무이한 값
//따라서 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다
//프로퍼티 키로 사용할 수 있는 값은 빈 문자열을 포함하는 모든 문자열 또는 심벌값이다
const person = {
    name :'kim',
    '':20,
    address:'seoul'
}
var property = 'name';
var property2 = '';
console.log(person[name]);//kim ??? 원래 안나와야되는데 deprecated?
console.log(person[property]);
console.log(person.name);
console.log('==================')
console.log(person['']);
console.log(person[property2]);
console.log('==================')
// console.log(person[address]);//person[name]과 달리 에러발생

//심벌값은 Symbol 함수를 호출하여 생성한다 다른 원시값 즉 문자열 숫자 불리언 undefinded null 타입 값은
//리터럴 표기법을 통해 값을 생성할 수 있지만 심벌값은 Symbol 함수를 호출하여 생성해야한다
//다음에 학습