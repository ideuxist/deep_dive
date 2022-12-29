//이터러블인지 확인하는 함수 
const isIterable = function (v) {
    return v !== null && typeof v[Symbol.iterator] === 'function'; //단축평가
}
console.log(isIterable([]));
//배열,문자열,Map,Set등은 이터러블이다
console.log(isIterable({}));//false
//예를 들어 배열은 Array.prototype의 Symbol.iterator 메서드를 상속 받는 이터러블이다
//이터러블은 for...of문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다
//일반객체는 이터러블 프로토콜을 준수한 이터러블이 아니다 for...of 순회 불가 디스트럭처링 할당대상 사용불가

//이터레이터 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다
//이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다
const array = [1, 2, 3];//배열은 이터러블 프로토콜을 준수한 이터러블
const iterator = array[Symbol.iterator]();//Symbol.iterarot 메서드는 이터레이터를 반환한다
console.log('next' in iterator)//true Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다
//이터레이터의 next메서드는 이러터블의 각 요소를 순회하기 위한 포이넡 역할을 한다
//즉 next 메서드를 호출하면 이터러블을 순차적으로 한단계씩 순회하며 결과를 나타내는 이터레이터 리절트 객체를 반환한다
console.log(iterator.next());//{value: 1, done: false}
console.log(iterator.next());//{value: 2, done: false}
console.log(iterator.next());//{value: 3, done: false}
console.log(iterator.next());//{value: undefined, done: true}
//이터레이터의 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 
//현재 순회중인 이터러블의 값을 나타내며 done 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다

//빌트인 이터러블 : Array String Map Set TypedArray arguments DOM컬렉션

//for...of 문 
//for...in 문 for...in문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 
//프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거한다
//이때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다
//for...of 문은 내부적으로 이터레이터의 next메서드를 호출하여 이터러블을 순회하며 next메서드가 반환한
//이터레이터 리절트 객체의 value프로퍼티값을 for...of 문의 변수에 할당한다 그리고 이터레이터 리절트 객체의
//done 포로퍼티의 값이 false이면 이터러블의 순회를 계속하고 true이면 이터러블의 순회를 중단한다
const iterable = [1, 2, 3, 4];
const iterator2 = iterable[Symbol.iterator]();
while (true) {
    const res = iterator2.next();
    if (res.done) break;
    const item = res.value;
    console.log(item);//1,2,3,4
}

//이터러블과 유사배열객체
//유사배열객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다
//유사배열객체는 length 프로퍼티를 갖기 때문에 for문으로 순회할 수 있고 인덱스를 나타내는 숫자 형식의 
//문자열을 프로퍼티 키로 가지므로 마치 배열처럼 인덱스로프로퍼티 값에 접근 할 수 있다
console.log('===========================');
console.log(length);
const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}
for (let i = 0; i < arrayLike.length; i++) {
    console.log(length)
    console.log(arrayLike[i]);//1,2,3
}
console.log(arrayLike[2]);//3
console.log(arrayLike[length]);//1 ??뭐지 window에 length 프로퍼티와 name 프로퍼티가 존재한다 length 0 name ""
console.log(arrayLike.length);//3
console.log(arrayLike);
//유사배열객체는 이터러블이 아닌 일반 객체다 
//따라서 유사배열객체에는 Symbol.iterator 메서드가 없기 때문에 for...of문으로 순회할 수 없다
//단 arguments, Nodelist, HTMLCollection 은 유사배열객체이면서 이터러블이다

//사용자 정의 이터러블
//피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
    //Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수한다
    [Symbol.iterator]() {
        let [pre, cur] = [0, 1];//배열 디스트럭처링 할당
        const max = 10;//수열의 최대값

        //Symbol.iterator 메서드는 next메서드를 소유한 이터레이터를 반환해야하고
        //next 메서드는 이터레이터 리절트 객체를 반환해야 한다
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                //이터레이터 리절트 객체를 반환한다
                return { value: cur, done: cur >= max };
            }
        };
    }
};

for (const num of fibonacci) {
    console.log(num);//1,2,3,5,8
}
//이터러블은 스프레드 문법의 대상이 될 수 있다
const arr = [...fibonacci];
console.log(arr);//[1,2,3,5,8];
//이터러블은 배열 디스트럭처링 할당의 대상이 될 수 있다
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest);// 1 2 [3,5,8]
//이터러블을 생성하는 함수
//fibonacci 이터러블은 내부에 수열의 최대값 max를 가지고 있다
//수열의 최대값을 외부에서 전달 할 수 있도록 수정해보자 최대값을 인수로 전달받아 이터러블을 반환하는 함수를 만들면 된다
const fibonacciFunc = function (max) {
    let [pre, cur] = [0, 1];
    //Symbol.iterator 메서드를 구현한 이터러블을 반환한다

    return {
        [Symbol.iterator]() {
            return {
                next() {
                    [pre, cur] = [cur, pre + cur];
                    return { value: cur, done: cur >= max }
                }
            };
        }
    };
};
for (const num of fibonacciFunc(10)) {
    console.log(num);//1,2,3,5,8
}
const iterable3 = fibonacciFunc(5);//fibonacciFunc 는 이터러블을 반환
const iterator3 = iterable3[Symbol.iterator]();//이터러블의 Symbol.iterator 메서드는 이터레이터를 반환
console.log(iterator3.next());//{value: 1, done: false}
console.log(iterator3.next());//{value: 2, done: false}
console.log(iterator3.next());//{value: 3, done: false}
console.log(iterator3.next());//{value: 5, done: true}
console.log(iterator3.next());//{value: 8, done: true}

//이터러블이면서 이터레이터인 객체
//이터레이터를 반환하는 Symbol.iterator 메서드와 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다
// {
//     [Symbol.iterator]() { return this;},
//     next(){
//         return {value:any, done:boolean};
//     }
// }
//앞에서 살펴본 fibonacciFunc 함수를 이터러블이면서 이터레이터인 객체를 생성하여 반환하는 함수로 변겨앻보자
const fibonacciFunc2 = function (max) {
    let [pre, cur] = [0, 1];
    //Symbol.iterator 메서드와 next 메서드를 소유한 이터러블이면서 이터레이터인 객체를 반환
    return {
        [Symbol.iterator]() { return this; },
        next() {
            [pre, cur] = [cur, pre + cur];
            return { value: cur, done: cur >= max }
        }
    };
};
let iter = fibonacciFunc2(10);
//iter는이터레이터이므로 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다
console.log(iter.next());//{value: 1, done: false}
console.log(iter.next());//{value: 2, done: false}
console.log(iter.next());//{value: 3, done: false}
console.log(iter.next());//{value: 5, done: false}
console.log(iter.next());//{value: 8, done: false}
console.log(iter.next());//{value: 13, done: true}
console.log(iter.next());//{value: 21, done: true}

//무한 이터러블과 지연평가
//무한 이터러블을 생성하는 함수를 정의해보자 이를 통해 무한 수열을 간단히 구현할 수 있다
const fibonacciFunc3 = function () {
    let [pre, cur] = [0, 1];
    return {
        [Symbol.iterator]() { return this; },
        next() {
            [pre, cur] = [cur, pre + cur];
            //무한을 구현해야 하므로 done 프로퍼티는 생략한다
            return { value: cur };
        }
    };
};
//fibonacciFunc3 함수는 무한 이터러블을 생성한다
for (const num of fibonacciFunc3()) {
    if (num > 10000) break;
    console.log(num);
}
const computer = {
    cpu:"i5",
    ram:"samsung"
}
console.log(computer.hdd)//undefined
console.log(computer.hdd ? "하드있음":"하드없음");//164라인 참고

//배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급한다 
//하지만 위의 예제의 이터러블은 지연 평가를 통해 데이터를 생성한다
//지연평가는 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가 
//데이터가 필요한 시점이 되면 그때야 비로소 데이터를 생성하는 기법이다
//즉 평가 결과가 필요할때까지 평가를 늦추는 기법이 지연평가이다
//불필요한 데이터를 ㅁ리ㅣ 생성하지 않고 필요한 데이터를 필요한 순간에 생성
//빠른 실행속도를 기대 할 수 있고 불필요한 메모리 소비하지 않으며
//무한도 표현할 수 있다는 장점이 있다