/* 
    js array study
 */

/* push 와 pop */
var arr = [1,2,3];
console.log(arr.length);//3
arr.push(4);
console.log(arr.length);//4
arr.pop();



/* 
현재 length property 보다 작은 숫자값을 할당하면 배열의 길이가 줄어든다.
큰값을 할당하는경우 property값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다 
*/
arr = [1,2,3];
arr.length = 10;
console.log(arr.length); //10
console.log(arr); // [1,2,3,비어있음x7]
//값이 없어 비어있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않는다
console.log(Object.getOwnPropertyDescriptors(arr));

/* 
배열의 요소가 연속적으로 위치하지않고 일부가 비어있는 배열을 희소 배열이라 한다. 
자바스크립트는 희소배열을 문법적으로 허용
위의 예제와 달리 중간이나 앞부분이 비어 있을 수도 있다 
*/
const sparse = [,2,,4];
console.log(sparse);//[비어있음,2,비어있음,4]
console.log(sparse.length);//4

const obj = {
    name : 'kim',
    age : 20
}
console.log(obj.address);//undefined 없는 property undefined 반환 

/* 
1.Array.of =>전달된 인수를 요소로 갖는 배열을 생성한다 
2.Array.from =>ES6 유사배열객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환 
*/
const likeObject = {
    length:2,
    0:'a',
    1:'b'
}
const arr2 = Array.from(likeObject); //유사배열객체를 변환하여 배열을 생성
console.log(arr2);
console.log(arr2.length);//2
console.log(typeof arr2);//object 자바스크립트 배열은 객체

console.log(Array.from('Hello'));//이터러블을 변환하여 배열을 생성한다

/* 
유사배열객체와 이터러블객체
유사배열객체 
*/
const arrayLike = {
    0:'apple',
    1:'banana',
    2:'orange',
    length:3
};

//유사배열객체는 마치 배열처럼 for문으로 순회가능
for(let i = 0; i<arrayLike.length;i++) {
    console.log(arrayLike[i]);
}

const person = {
 'name':'kim',
 age:20,
 address:'daegu'
}
console.log(person.name);//kim

//객체의 프로퍼티를 동적으로 추가할 수 있는것처럼 배열에도 요소를 동적으로 추가할 수 있다
//존재하지 않는 인텍스를 사용해 값을 할당하면 새로운 요소가 추가된다
//이때 length property는 자동갱신



//인덱스는 요소의 위치를 나타내므로 반드시 0이상의 정수를 사용해야한다
//만약 정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는것이 아니라 property가 생성된다
//이때 추가된 property는 length값에 영향을 주지 않는다
const testArr = [1,2,3];
console.log(testArr.length)
testArr['name']='kim';
console.log(testArr);//[1,2,3,name:'kim']
console.log(testArr.length);//3

//배열 요소의 삭제
//배열은 사실 객체이기 때문에 배열의 특정요소를 삭제하기 위해 delete 연산자를 사용 할 수 있다
const delArr = [1,2,3];
console.log(delArr[1]);//2
console.log(delArr['1']);//2
delete delArr['1'];
console.log(delArr);//[1,비어있음,3]
// delete delArr[1];
// console.log(delArr);
//이때 배열은 희소 배열이 되며 length property값은 변하지 않는다 따라서
//희소배열 만드는 delete는 사용하지 않는것이 좋다
//희소배열을 만들지 않으면서 배열의 특정요소를 완전히 삭제하려면 Array.prototype.splice 메서드를 사용한다
delArr[1] = 2;
console.log(delArr);//[1,2,3]
delArr.splice(1,1) //delArr[1]부터 1개의 요소를 제거
console.log(delArr);//[1,3]
console.log(delArr.length);//2 length property 자동 갱신

//배열관련 메서드에는 원본배열을 직접변경하는 메서드와 원본 배열을 직접 변경하지않고 새로운 배열을 생성하여
//반환하는 메서드가 있다
const originalArr = [1,2,3];
originalArr.push('추가');
console.log(originalArr); //직접변경
const copyArr = originalArr.concat('다시추가');
console.log(originalArr); //영향없음
console.log(copyArr); //새로운배열 반환

console.log(originalArr.indexOf(3));//2 반환
console.log(originalArr.indexOf(2,1));//두번째 인수는 검색을 시작할 인덱스 생략하면 처음부터
console.log(originalArr.indexOf('이건없어'));//없는 요소는 -1 반환
console.log(originalArr.includes('이건없어'));//없는 요소 false 반환 ES7

//push 메서드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length property값을 반환한다
console.log(originalArr.push('새롭게추가','더새롭게추가'));//6반환
console.log(originalArr);

//pop 메서드는 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환
console.log(originalArr.pop());// 더새롭게추가 반환

//unshift 메서드는 인수로 전달받은 모든값을 원본 배열의 선두에 요소로 추가하고 변경된 length property값을 반환한다
//unshift 메서드는 원본 배열을 직접 변경한다
const orgArr = [1,2,3];
console.log(orgArr.unshift(4,5))
console.log(orgArr);
//unshift 메서드는 원본 배열을 직접 변경하는 부수효과가 있다 따라서 unshift메서드보다는 ES6의 스프레드 문법을
//사용하는 편이 좋다 함수 호출 없이 표현식으로 선두에 요소를 추가 할 수 있으며 부수효과도 없다
var newArr = [6,7,...orgArr];
console.log(newArr);

//shift 메서드는 원본 배열에서 첫번째 요소를 제거하고 제거한 요소를 반환한다 원본배열이 빈 배열이면 undefined를 반환한다
//shift 메서드는 원본 배열을 직접 변경한다
const shiftArr=[1,2];
let result = shiftArr.shift();
console.log(result);//1
console.log(shiftArr);//[2]

//concat 메서드는 인수로 전달된 값들(배열 또는 원시값) 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다
//인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다 원본배열은 변경되지 않는다
const concatArr=[1,2];
const concatArr2=[3,4];
result = concatArr.concat(concatArr2);
console.log(result);//[1,2,3,4]
//배열 concatArr2와 숫자를 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다
result = concatArr.concat(concatArr2,999);
console.log(result);//[1,2,3,4,999]
//push 와 unshift 메서드는 concat 메서드로 대체할 수 있다 push와 unshift메서드는 concat 메서드와 유사하게 동작하지만
//미묘한 차이가있다
//push와 unshift 메서드는 원본 배열을 직접 변경하지만 concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다
//push와 unshift는 원본 배열을 반드시 변수에 저장해 두어야하며 concat 메서드는 반환값을 변수에 할당 받아야한다
//unshift와 push 메서드는 인수로 전달받은 배열을 그대로 원본배열의 요소로 추가하낟
const unshiftPushArr = [1,2];
unshiftPushArr.unshift([3,4]);
unshiftPushArr.push([5,6]);
console.log(unshiftPushArr);//[[3,4],1,2,[5,6]]
//스프레드 문법으로 대체 가능
result = [...[1,2],...[3,4]];
console.log(result);[1,2,3,4] // 스프레드 문법을 일관성있게 사용권장

//splice 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice메서드를 사용한다 
//splice 메서드는 3개의 매개변수가 있으며 원본 배열을 직접 변경한다
const spliceArr = [1,2,3,4];
//원본 배열의 인덱스 1부터 2개의 요소를 삭제하고 그 자리에 새로운요소 10,20,30을 삽입
result = spliceArr.splice(1,2,10,20,30);
//제거한 요소가 배열로 반환
console.log(result);
//splice메서드는 원본 배열을 직접 변경한다
console.log(spliceArr);//[1,10,20,30,4]
//제거할 요소의 개수를 0으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소들을 삽입한다
spliceArr.splice(1,0,100);
console.log(spliceArr);//[1,100,10,20,30,4] 지정한 자리에 새로운 요소가 삽입된다
//추가할 요소들의 목록을 전달하지 않으면 원본 배열에서 지정된 요소를 제거하기만 한다
//제거할 요소의 개수를 생략하면 첫번째 인수로 전달달된 인덱스부터 끝까지 제거

//배열에서 특정요소를 제거 하려면 indexOf 메서드를 통해 특정 요소의 인덱스를 취득한다음
//splice 메서드를 사용한다
const deleteArr = [1,2,3,4,5,1,2];
//배열에서 item 요소제거 item 요소가 여러개 존재하면 첫번째 요소만 제거한다
function remove(array,item) {
    //제거할 item요소의 인덱스를 취득한다
    const index = array.indexOf(item);
    //제거할 item 요소가 있다면 제거한다
    if(index!==-1) array.splice(index,1);
    return array;
}
console.log(remove(deleteArr,2));//[1,3,4,5,1,2];//첫번째로 나타나는 2 제거

//filter 메서드를 사용하여 특정 요소를 제거할 수도 있다 하지만 특정 요소가 중복된 경우 모두 제거된다
const filterArr = [1,2,3,1,2,1,2];
//배열에서 모든 item요소를 제거한다
function removeAll(array,item) {
    // return array.filter(v=>v !== item );
    return array.filter(function(v){
        return  v !== item
    })
}
console.log(removeAll(filterArr,2));//[1,3,1,1]

//slice 메서드는 인수로 전달된 범위의 요소들을 복사하여 배열로 반환한다 원본 배열은 변경되지 않는다
//splice 메서드는 원본배열을 변경한다 
const sliceArr = [1,2,3,4,5];
console.log(sliceArr.slice(0,1));//0부터 1이전까지 (sliceArr[1]미포함)복사하여 반환 =>[1]
console.log(sliceArr.slice(1,2));//1부터 2이전까지 (sliceArr[2]미포함)복사하여 반환 =>[2]
console.log(sliceArr.slice(0));//0부터 이후의 모든 요소를 복사하여 반환 => [1,2,3,4,5]
console.log(sliceArr);//[1,2,3,4,5] 원본은 변경되지 않는다
//첫번째 인수가 음수인 경우 배열의 끝에서부터 요소를 복사하여 배열로 반환
console.log(sliceArr.slice(-3)) //끝에서부터 3개의 요소 복사하여 반환
//slice 메서드의 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다 이때 생성된 복사본은 얕은 복사를 통해 생성
const todos = [
    {id:1,content:'html',completed:false},
    {id:2,content:'css',completed:false},
    {id:3,content:'javascript',completed:true},
];
//얕은복사 
const _todos = todos.slice();
//const _todos = [...todos];
//_todos와 todos는 참조값이 다른 별개의 객체
console.log(todos===_todos)//false
//배열요소의 참조값이 같다 즉, 얕은 복사되었다
console.log(_todos[0]===todos[0])//true
//객체를 프로퍼티 값으로 갖는 개체의 경우 얕은 복사는 한단계까지만 복사, 깊은 복사는 객체에 중첩되어 있는 개체까지 모두 복사하는것을 말한다
//slice,스프레드 문법,Object.assign메서드는 모두 얕은 복사
//깊은 복사를 위해서는 Lodash 라이브러리의 cloneDeep 메서드 사용추천
//slice 메서드가 복사본을 생성하는것을 이용하여 arguments,HTMLCollection,NodeList 같은 유사 배열 객체를 배열로 변환할 수 있다

//join 메서드는 원본 배열의 모든 요소를 문자열로 변환한후 인수로 전달받은 문자열
//즉 구분자로 연결한 문자열을 반환한다 구분자는 생략가능 기본구분자는 ,(콤마)
const joinArr = [1,2,3,4];
console.log(typeof joinArr.join()); //string
console.log(joinArr.join());//1,2,3,4

//reverse 메서드는 원본 배열의 순서를 반대로 뒤집는다 이때 원본배열이 변경된다 반환값은 변경된 배열이다
const reverseArr = [1,2,3,4,5];
result = reverseArr.reverse();
console.log(result);//반환된 값은 원본배열
console.log(reverseArr);//직접 변경됨

//fill 메서드는 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다 이때 원본배열이 변경된다
const fillArr = [1,2,3];
fillArr.fill(0);
console.log(fillArr);//[0,0,0]
//두번째 인수로 채우기 시작할 인덱스를 전달할 수 있다
console.log(fillArr.fill(1,1));//[0,1,1]
//세번째 인수로 채우기를 멈출 인덱스를 전달할 수 있다
//인수로 전달받은 값 3을 인덱스2부터 3이전(3은 미포함)까지 채운다
console.log(fillArr.fill(3,2,3));//[0,1,3] 
//fill 메서드를 사용하면 배열을 생성하면서 특정 값으로 요소를 채울수 있다
const fillArr2 = new Array(5);
console.log(fillArr2);
console.log(fillArr2.fill('A'));//['A','A','A','A','A'] fill 메서드는 원본배열을 직접변경, 변경된 원본 배열을 반환

//ES7 도입 includes는 배열내에 특정요소가 포함되어 있는지 확인하여 true 또는 false를 반환
//첫번째 인수로 검색할 대상을 지정
const includesArr = [1,2,3];
console.log(includesArr.includes(3));//true
console.log(includesArr.includes('a'));//false
//두번째 인수로 검색을 시작할 인덱스를 전달할 수 있다 생략할 경우 기본값 0
//두번째 인수에 음수를 전달하면 length 프로퍼티 값고 음수인덱스를 합산하여 검색 시작 인덱스를 설정한다
console.log(includesArr.includes(1,1));//false
console.log(includesArr.includes(3,-1));//true =>3이 포함되어있는지 includesArr.length - 1 부터 확인한다
//배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환하면 indexOf메서드를 사용하여도 배열내에 특정요소가 포함되어 있는지 확인가능
//indexOf 메서드를 사용하면 반환값이 -1인지 확인해야하고 배열에 NaN이 포함되어 있는지 확인할 수 없다는 문제가 있다

//ES10 도입 flat 메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다
const flatArr = [1,[2,[3,[4]]]];
console.log(flatArr.flat(1));//[1,2,[3,[4]]];
console.log(flatArr.flat());//[1,2,[3,[4]]];//평탄화 깊이 기본값 1
console.log(flatArr.flat(Infinity));[1,2,3,4];//중첩배열을 모두 평탄화한다
 
/* 
배열고차함수 
고차함수란 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다
*/

//sort 메서드는 배열의 요소를 정렬한다 원본배열을 직접 변경하며 정렬된 배열을 반환한다
//sort 메서드는 기본적으로 오름차순으로 요소를 정렬한다
const fruits = ['Banana','Orange','Apple'];
fruits.sort();
console.log(fruits);//['Apple','Banana','Orange'] 한글도 오름차순 가능
//내림차순으로 요소를 정렬하려면 sort() 메서드를 사용하여 오름차순으로 정렬한 후 
//reverse메서드를 사용하여 요소의 순서를 뒤집는다
console.log(fruits.reverse());//['Orange','Banana','Apple']
//기본정렬 순서는 유니코드 코드포인트 순서 배열의 요소가 숫자타입이라 할지라도 배열의 요소를 일시적으로
//문자열로 변환한 후 유니코드 코드 포인트의 순서를 기준으로 정렬한다
//예를 들어 문자열 '1'의 유니코드 코드포인트는 U+0031 문자열 '2'는 U+0032
//문자열 유니코드 코드포인트도 '1'이 '2'보다 앞서므로 오름차순 정렬가능
//sort메서드는 배열의 요소를 일시적으로 문자열로 변환한 후 정렬하므로 
//숫자배열[2,1]을 sort메서드로 정렬해도 [1,2]로 정렬
//하지만 문자열 '10'의 유니코드 코드 포인트는 U+0031U+0030 이다 따라서 문자열 배열 ['2','10']을
//sort 메서드로 정렬하면 문자열 '10'의 유니코드 코드포인트 U+0031U+0030가 
//문자열 '2'의 유니코드 코드포인트 U+0032보다 앞서므로 ['10','2']로 정렬된다 
//숫자의 경우도 일시적으로 문자열로 변환한후 정렬하므로 동일
//=>따라서 숫자요소를 정렬할때는 정렬 순서를 정의하는 비교함수를 인수로 전달해야한다
//비교함수는 양수나 음수 또는 0을 반환 음수면 첫번째인수를 우선하여 정렬 양수면 두번째 인수를 우선하여 정렬
const points = [11,22,100,22,1,87,95,23];
points.sort(function(a,b){
    return a-b;
})
console.log(points);//[1,11,22,22,23,87,95,100] 
//숫자 배열에서 최소/최대값 취득
console.log(points[0],points[points.length-1]);//1,100
//숫자 배열의 내림차순정렬 음수면 첫번째인수를 우선하여 정렬 양수면 두번째 인수를 우선하여 정렬
points.sort((a,b)=>b-a);
console.log(points);//[100,9,87,23,22,22,11,1]
//객체를 요소로 갖는 배열을 정렬하는 예제
const objArr = [
    {id:4,content:'javascript'},
    {id:1,content:'html'},
    {id:2,content:'css'}
];
//비교함수 매겨변수 key는 프로퍼티 key다
function compare(key){
    //프로퍼티 값이 문자열인 경우 -산술연산으로 비교하면 NaN이 나오므로 비교연산을 사용한다
    //비교함수는 양수/음수/0을 반환하면 되므로 -산술연산 대신 비교연산을 사용할 수 있다
    return (a,b)=>(a[key] > b[key] ? 1 :(a[key] < b[key] ? -1 : 0)); 
}
//id를 기준으로 오름차순 정렬
objArr.sort(compare('id'));
console.log(objArr);//id 1,2,4 순으로 정렬
//content를 기준으로 오름차순 정렬
objArr.sort(compare('content'));
console.log(objArr);//content css html javascript 순으로 정렬

//forEach 메서드는 for문을 대체할 수 있는 고차 함수다 forEach 메서드는 자신의 내부에서
//반복문을 실행한다 즉 forEach 메서드는 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해
//자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복호출한다
//forEach 메서드의 메서드를 호출한 배열의 요소값과 인덱스,메서드를 호출한 배열을 순차적으로 전달한다
[1,2,3].forEach((item,idx,arr)=>{
    arr[idx] = item**2; //최종 [1,4,9]
    console.log(`요소값 : ${item}, 인덱스 : ${idx}, this : ${JSON.stringify(arr)}`);
})
//콜백함수의 세번째 매개변수 arr은 원본배열을 가리킨다
//따라서 콜백 함수의 세번째 매개변수를 직접변경하면 원본 배열이 변경된다
class Numbers {
    numberArray=[];
    multiply(arr){
        arr.forEach(function(item){
            this.numberArray.push(item*item);
        },this);//forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
    }
}
const numbers = new Numbers();
numbers.multiply([1,2,3]);
console.log(numbers.numberArray);//[1,4,9]
//화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다
//따라서 화살표 함수 내부에서 this를 참조하면 상위스코프 this를 그대로 참조한다
class Numbers2 {
    numberArray=[];
    multiply(arr) {
        arr.forEach(item=>
            this.numberArray.push(item*item));
    }
}
const numbers2 = new Numbers2();
numbers2.multiply([1,2,3]);
console.log(numbers2.numberArray);//[1,4,9]
//forEach 메서드는 for문과 달리 break continue 문을 사용할수없다 
//배열의 모든 요소를 빠짐없이 순회 중간에 순회를 중단 할 수 없다
//희소배열
const hArr = [1,,3];
console.log(hArr.length);//3
for(let i = 0; i<hArr.length;i++) {
    console.log(hArr[i]);
}//1,undefined,3
//forEach 메서드는 희소 배열의 존재하지 않는 요소를 순회대상에서 제외한다
//map,filter,reduce 메서드등에서도 동일
hArr.forEach(item=>console.log(item))//1,3

//map 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복호출한다
//그리고콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다, 이때 원본 배열은 변경되지 않는다
const mapNumber = [1,4,9];
const roots = mapNumber.map(item => Math.sqrt(item));
console.log(roots);//콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다
//map 메서드가 생성하여 반환하는 새로운 배열의 length 프로퍼티 값은
//map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치한다 
//즉 map 메서드를 호출한 배열과 map 메서드가 생성하여 반환한 배열은 1:1 매핑한다
[1,2,3].map((item,index,arr)=>{
    console.log(`요소값 : ${item}, 인덱스 : ${index}, this : ${JSON.stringify(arr)}`);
    return item;
})
//forEach 메서드와 마찬가지로 map 메서드의 두번째 인수로 map 메서드의 콜백함수 내부에서 
//this로 사용할 객체를 전달 할 수 있다

//filter 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백함수를 반복호출한다
//콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다 
//이때 원본배열은 변경되지 않는다
const filterNumber=[1,2,3,4,5,6,7,8,9,10];
const odds = filterNumber.filter(item=>item%2);//1은 true로 평가
console.log(odds);
const odds2 = filterNumber.filter((item,index,arr) => {
    console.log(`요소값 : ${item}, 인덱스 : ${index}, this : ${JSON.stringify(arr)}`);
    return item%2;
})
console.log(odds2);//[1,3,5,7,9]
//filter 메서드는 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용할 수도 있다
class Users {
    constructor(){
        this.users=[
            {id:1,name:'Lee'},
            {id:2,name:'Kim'}
        ]
    }
    //요소 추출
    findById(id) {
        //id가 일치하는 사용자만 반환한다
        return this.users.filter(user=>user.id===id);
    }

    //요소제거
    remove(id){
        //id 가 일치하지 않는 사용자를 제거한다
        this.users = this.users.filter(user=>user.id !==id)
    }
}

const users = new Users();
let user = users.findById(1);
console.log(user);//[{id:1,name:'Lee'}]
//id가 1인 사용자를 제거한다
users.remove(1);
user=users.findById(1);
console.log(user);//[]
//filter 메서드를 사용해 특정 요소를 제거할 경우 특정 요소가 중복되어 있다면 중복된 요소가 모두 제거된다
//특정 요소 하나만 제거하려면 indexOf 메서드를 통해 특정요소의 인덱스를취득한 다음 splice 메서드를 사용한다

//reduce 메서드는 자신을 호출한 배열의 모든 요소를 순회하며 인수로 전달받은 콜백함수를 반복 호출한다
//그리고 콜백함수의 반환값을 다음 순회시에 콜백함수의 첫번째 인수로 전달하면서
//콜백함수를 호출하여 하나의 결과값을 만들어 반환한다 이때 원본배열은 변경되지 않는다
//reduce 메서드는 첫번째 인수로 콜백함수,두번째 인수로 초기값을 전달 받는다
//콜백함수에는 4개의 인수, 초기값 또는 코랙 함수의 이전반환값
//reduce 메서드를 호출한 배열의 요소값과 인덱스,reduce 메서드를 호출한 배열 자체, 즉 this가 전달된다
const sum = [1,2,3,4].reduce((accumulator,currentValue,index,array) => accumulator + currentValue,0);
console.log(sum);//10
//reduce 메서드는 초기값과 배열의 첫번째 요소값을 콜백 함수에게 인수로 전달하면서 호출하고 다음 순회에는
//콜백함수의 반환값과 두번째 요소값을 콜백 함수의 인수로 전달하면서 호출한다 
//이러한 과정을 반복하여 reduce메서드는 하나의 결과값을 반환한다
//reduce 메서드는 자신을 호출한 배열의 모든 요소를 순회하며 하나의 결과값을 구해야 되는 경우에 사용한다
//평균,최대,중복횟수,중첩배열 평탄화,중복요소 제거
//최대값 구할때는 reduce보다 Math.max메서드를 사용하는 방법이 더 직관적이다

//some, every 
//some => 콜백 반환값이 한번이라도 참이면 true
//every => 콜백 반환값이 모두 참 true 한번이라도 거짓이면 false 빈배열일 경우 언제나 true

//ES6 find 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 
//콜백함수를 호출하여 반환값이 true인 첫번째 요소를 반환한다
//true인 요소가 존재하지 않는다면 undefined를 반환한다
const users2 = [
    {id:1,name:'Lee'},
    {id:2,name:'Kim'},
    {id:3,name:'Choi'},
    {id:4,name:'Park'}
];
console.log(users2.find(user=>user.id===2));//{id:2,name:'Kim'}
//filter 메서드는 콜백 함수의 호출 결과가 true인 요소만 추출한 새로운 배열을 반환한다
//따라서 filter 메서드의 반환값은 언제나 배열이다
//하지만 find메서드는 콜백 함수의 반환값이 true인 첫번째 요소를 반환하므로 배열이 아닌 해당요소값이다

//ES6 findIndex 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된
//콜백 함수를 호출하여 반환값이 true인 첫번째 요소의 인덱스를 반환한다
//true인 요소가 존재하지 않는다면 -1을 반환한다

//ES10 flatMap 메서드는 map 메서드를 통해 생성된 새로운 배열을 평탄화 한다