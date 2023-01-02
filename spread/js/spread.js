//스프레드 문법을 사용할 수 있는 대상은 Array, String, Map, Set, DOM컬렉션(NodeList, HTMLCollection),
//arguments와 같이 for...of문으로 순회할 수 있는 이터러블에 한정된다
//...[1,2,3]은 [1,2,3]을 개별요소로 분리한다(1,2,3)
console.log(...[1,2,3]); 
//문자열은 이터러블이다
console.log(...'hello');//h e l l o
//Map 과 Set은 이터러블이다
console.log(...new Map([['a',1],['b',2]]));//['a', 1] ['b', 2]
console.log(...new Set([1,2,3]));//1 2 3 
//이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다
//위 예제에서 ...[1,2,3]은 이터러블인 배열을 펼쳐서 요소들을 개별적인 값들의 목록 1 2 3 으로 만든다
//이때 1 2 3 은 값이 아니라 값들의 목록이다 즉 스프레드 문법의 결과는 값이 아니다
//스프레드 문법 ...이 피연산자를 연산하여 값을 생성하는 연산자가 아님을 의밈한다 
//따라서 스프레드 문법의 결과는 변수에 할당 할 수 없다
//스프레드 문법의 결과물은 값으로 사용 할 수 없고 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용 할 수 있다
//함수 호출문의 인수목록, 배열 리터럴의 요소목록, 객체 리터럴의 프로퍼티 목록
// const list = ...[1,2,3]; SyntaxError :Unexoected toke...

//함수호출문의 인수 목록에서 사용하는 경우
let arr = [1,2,3];
let max = Math.max(arr);//배열을 전달하면 NaN을 반환
console.log(max);//NaN 
//Math.max는 매개변수 개수를 확정할 수 없는 가변 인자 함수
console.log(Math.max(1));//1
console.log(Math.max(1,2));//2
console.log(Math.max(1,2,3));//3
console.log(Math.max());//-Infinity
//스프레드 문법 이전
max = Math.max.apply(null,arr);
console.log(max);//3
max = Math.max(...arr);
console.log(max);//3
//Rest파라미터와 형태가 동일하여 혼동할 수 있으므로 주의
//Rest 파라미터는 함쉥 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수이름앞에 ...을 붙이는것이다
//스프레드 문법은 여러개의 값이 하나로 뭉쳐있는 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만드는 것이다
//따라서 Rest 파라미터와 스프레드 문법은 서로 반대의 개념이다
//Rest 파라미터는 인수들의 목록을 배열로 전달받는다
function foo(...rest) {
    console.log(rest);
}
foo(1,2,3);//[1,2,3]
//스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만드다
foo(...[1,2,3]);//[1,2,3]

//배열 리터럴 내부에서 사용하는 경우
//스프레드 문법을 배열 리터럴에서 사용하면 ES5 대비 간결 가독성 이점
//concat
//ES5
arr = [1,2].concat([3,4]);
console.log(arr);//[1,2,3,4]
//ES6
arr = [...[1,2],...[3,4]];
console.log(arr);//[1,2,3,4]
//splice 배열 중간에 다른 배열의 요소들을 추가하거나 제거하려면 splice메서드를 사용한다
//이때 splice메서드의 세번째 인수로 배열을 전달하면 배열 자체가 추가된다
var arr1 = [1,4];
var arr2 = [2,3];
// arr1.splice(1,0,arr2);
console.log(arr1);//[1,[2,3],4] [1,2,3,4]로 만들기위해서는 2,3으로 해체하여 전달해야 한다
Array.prototype.splice.apply(arr1,[1,0].concat(arr2));
//apply메서드의 두번째 인수는 apply메서드가 호출하는 함수에 해체되어 전달된다다
console.log(arr1);//[1,2,3,4]
//ES6
arr1=[1,4];
arr2=[2,3]
arr1.splice(1,0,...arr2);
console.log(arr1);//[1,2,3,4]
//ES5에서 배열을 복사하려면 slice메서드를 사용한다
//ES5
var origin = [1,2];
var copy = origin.slice();
console.log(copy);//[1,2]
console.log(origin === copy);//false
var copy2 = origin;
console.log(origin===copy2);//true
origin=[1,2];
console.log(origin===copy2);//false
//ES6
origin = [1,2,3,4];
copy = [...origin];
console.log(copy);//[1,2,3,4]
console.log(copy===origin);//false

//이터러블을 배열로 변환
function sum() {
    //이터러블이면서 유사 배열 객체인 arguments를 배열로 변환
    return [...arguments].reduce((pre,cur)=>pre+cur,0)
}
console.log(sum(1,2,3));//6 단 이터러블이 아닌 유사배열객체는 스프레드 문법의 대상이 될 수 없다
//Array.form은 유사배열객체 또는 이터러블을 배열로 변환한다

