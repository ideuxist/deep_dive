//함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다
//이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다

const create = (id,content) => ({id, content});
console.log(create(1,'javascript'));

const create2 = function(id,content){
    return {id,content}
    
}
console.log(create2(2,'javascript'));

const create3 = {
    id :3,
    content:'javascript'
}
console.log(create3);

const arrow = () => {const x = 1;}
console.log(arrow()) //undefined
const arrow2 = () => {return  x = 1;};
console.log(arrow2()); //1

//화살표 함수의 this는 일반 함수의 this와 다르게 동작한다 이는 콜백함수 내부의 this문제
//즉 콜백함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해
//의도적으로 설계된것
//this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정

class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }
     add(arr) {
        //add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다
        return arr.map(function(item){
            return this.prefix + item;
            // TypeError : Cannot read property 'prefix' of undefined
        });
     }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition','user-select']))