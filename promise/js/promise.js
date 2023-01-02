const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200) {
            // console.log(JSON.parse(xhr.response))
        }else {
            // console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};
get('https://jsonplaceholder.typicode.com/posts/1');

let g = 0;
setTimeout(()=> {
    g=100;
},0);
console.log(g);//0  100이 아니라 0 
console.log(g);
setTimeout(()=>{
    console.log(g)
},0);// 100
//비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나
//상위 스코프의 변수에 할당하지 못한다

//get함수가 서버의 응답 결과를 반환하도록 수정
const get2 = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200) {
            //1. 서버의 응단을 반환한다
            return JSON.parse(xhr.response);
        }
        console.error(`${xhr.status} ${xhr.statusText}`);
    };
};
//2.id가 1인 post를 취득
const response = get2('https://jsonplaceholder.typicode.com/posts/1');
console.log(response);//undefined
//xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러의 반환문 1은
//get 함수의 반환문이 아니다 get함수의 반환문이 생략되었으므로 
//암묵적으로 undefined를 반환한다 함수의 반환값은 명시적으로 호출한 다음 캐치 할 수 있으므로
//onload 이벤트 핸들러를 get함수가 호출할 수 있다면 이벤트 핸들러의 반환값을 
//get함수가 캐치하여 다시 반환할 수도 있겠지만 onload 이벤트 핸들러는 get 함수가 호출하지 않기
//때문에 그럴 수도 없다 따라서 onload이벤트 핸들러의 반환값은 캐치할 수 없다

//그렇다면 서버의 응답을 상위 스코프의 변수에 할당하면 어떨까
let todos;
const get3 = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200) {
            //1. 서버의 응단을 반환한다
            return JSON.parse(xhr.response);
        }
        console.error(`${xhr.status} ${xhr.statusText}`);
    };
};
get3('https://jsonplaceholder.typicode.com/posts/1');
console.log(todos);//undefined
//이 또한 기대한대로 동작하지 않는다 xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한
//이벤트 핸들러는 언제너 console.lo(todos)가 종료한 이후에 호출된다
//console.log(todos)시점에는 아직 전역 변수 todos에 서버의 응답결과가 할당되기 이전
//다시 말해 처리 순서가 보장되지 않는다
//console.log가 호출되기 직전에 load이벤트가 발생했더라도 xhr.onload 이벤트 핸들러 프로퍼티에 
//바인딩한 이벤트 핸들러는 결코 console.log보다 먼저 실행되지 않는다
//서버로부터 응답이 도착하면 xhr객체에서 load이벤트가 발생한다 이때 xhr.onload 핸들러 프로퍼티에
//이때 xhr.onload 핸들러 프로퍼티에 바인딩한 이벤트 핸들러가 즉시 실행되는 것이 아니다
//xhr.onload 이벤트 핸들러는 load이벤트가 발생하면 일단 태스크 큐에 저장되어 대기하다가
//콜스택이 비면 이벤트 루프에 의해 콜스택으로 푸시되어 실행된다
//이벤트 핸들러도 함수이므로 이벤트 핸들러의 평가 => 이벤트 핸들러의 실행컨텍스트 생성
//=> 콜 스택에 푸시 => 이벤트 핸들러 실행 과정을 거친다
//따라서 xhr.onload 이벤트 핸들러가 실행되는 시점에는 콜 스택이 빈 상태여야 하므로 console.log는
//이미 종료된 이후다 만약 get 함수 이후에 console.log가 100번 호출된다 해도
//xhr.onload 이벤트 핸들러는 모든 console.log가 종료한 이후에 실행된다 
//즉, xhr.onload 이벤트 핸들러에서 상위 스코프의 변수에 서버의 응답결과를 할당하기 이전에
//console.log가 먼저 실행되어 undefined가 출력된다
//이처럼 비동기 함수는 비동기처리 결과를 외부에 반환할 수 없고 상위 스코프의 변수에 할당할 수도 없다
//따라서 비동기 함수의 처리 결과(서버의 응답등)에 대한 후석처리는 비동기 함수 내부에서 수행해야한다
//이때 비동기 함수를 범용적으로 사용하기 위해서 비동기 함수에 비동기 처리 결과에 대한 후속처리를 수행하는
//콜백 함수를 전달하는것이 일반적이다 필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수가와
//비동기 처리가 실패하면 호출될 콜백 함수를 전달할 수 있다

//get요청을 위한 비동기 함수
const get4 = (url,successCallback,failureCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            //서버의 응답을 콜백 함수에 인수로 전달하면서 호출하여 응답에 대한 후속처리를 한다
            successCallback(JSON.parse(xhr.response))
        }else {
            failureCallback(xhr.status);
        }
    };
};

get('https://jsonplaceholder.typicode.com/posts/1',console.log,console.error);
//이처럼 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리결과를 가지고
//또다시 비동기 함수를 호출해야 한다면 콟백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생하는데
//이를 콜백 헬이라 한다
//비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한것은 에러 처리가 곤란하다는 것이다
//에러는 호출자 방향으로 전파된다 try catch 블럭으로 캐치 못하는 문제 => es6에서 promise 도입

//Promise (표준 빌트인 객체)
//Promise 생성자 함수는 비동기 처리를 수행할 콜백함수 (ES에서는 executor 함수라고 부른다)를 인수로 전달받는데
//이 콜백함수는 resolve와 reject 함수를 인수로 전달받는다

//프로미스 생성
const promise = new Promise((resoleve,reject) => {
    //promise함수의 콜백함수 내부에서 비동기 처리를 수행한다
    if(true /* 비동기 처리 성공*/) {
        resoleve('result');
    }else {
        reject('failure reason');
    }
});
//앞에서 살펴본 비동기 함수 get을 프로미스를 사용해 다시 구현해보자
const promiseGet = url => {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
};
//promiseGet함수는 프로미스를 반환한다
promiseGet('https://jsonplaceholder.typicode.com/posts/1');
//비동기 함수인 promiseGet은 함수 내부에서 프로미스를 생성하고 반환한다
//비동기 처리는 Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 수행한다
//만약 비동기 처리가 성공하면 비동기 처리 결과를 resolve함수에 인수로 전달하면서 호출하고
//비동기 처리가 실패하면 에러를 reject 함수에 인수로 전달하면서 호출한다
//프로미스는 다음과 같이 비동기 처리가 어떻게 지냉되고 있는지를 나타내는 상태 정보를 갖는다
//pending 비동기 처리가 아직 수행되지 않은 상태, 프로미스가 생성된 직후 기본상태 (상태변경조건)
//fulfilled 비동기 처리가 수행된 상태(성공), resolve 함수 호출 (상태변경조건)
//rejected 비동기 처리가 수행된 상태(실패), reject 함수 호출 (상태변경조건)
//생성직후 프로미스는 기본적으로 pending 상태 이후 비동기 처리가 수행되면 비동기 처리 결과에 따라
//다음과 같이 프로미스의 상태가 변경된다
//비동기 처리 성공 : resolve 함수를 호출해 프로미스를 fulfilled 상태로 변경한다
//비동기 처리 실패 : reject 함수를 호출해 프로미스를 rejected 상태로 변경한다

//프로미스의 후속처리 메서드
//프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속처리를 해야한다 
//예를 들어 프로미스가 fulfilled 상태가 되면 프로미스의 처리 결과를 가지고 무언가를 해야되고
//프로미스가 rejected 상태가 되면 처리결과(에러)를 가지고 에러를 처리해야한다
//이를 위해 프로미스는 후속 메서드 then catch finally를 제공한다
//프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백함수가 선택적으로 호출된다
//이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달된다
//모든 후속처리 메서드는 프로미스를 반환하며 비동기로 동작한다 프로미스의 후속 처리 메서드는 다음과 같다

//1.Promise.prototype.then
//then 메서드는 두개의 콜백 함수를 인수로 전달받는다
//첫번째 콜백함수는 프로미스 fulfilled상태 (resolve 함수가 호출된 상태)가 되면 호출된다 
//이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받는다
//두번째콜백함수는 프로미스가 rejected상태(reject함수가 호출된 상태)가 되면 호출된다 이때 콜백 함수는 프로미스의 에러를 인수로 전달받는다
//즉 첫번째 콜백 함수는 비동기 처리가 성공했을때 호추로디는 성공처리 콜백함수이며, 두번째 콜백함수는 비동기 처리가 실패했으때
//호출되는 실패처리 콜백 함수다
new Promise(resolve => resolve('fulfilled')).then(v => console.log(v),e => console.error(e));//fulfilled
const promiseTest = new Promise(function(resolve,reject){
    var a = prompt('아무키나 입력하세요');
    if(a) {
        resolve(`${a}`)
    }else {
        reject('아무것도 입력되지 않았습니다');
    }
});
promiseTest.then(function(value){
    console.log(`${value}가 입력되었습니다`);1
},function(value2){
    console.log(new Error(value2));
})
//then 메서드는 언제나 프로미스를 반환한다 만약 then 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를
//그대로 반환하고 콜백 함수가 프로미가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject하여 
//프로미스를 생성해 반환한다

//2.Promise.prototype.catch
//catch메서드는 한개의 콜백 함수를 인수로 전달 받는다 catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우만 호출 된다
//rejected
new Promise((_,reject) => reject(new Error('rejected'))).catch(e=>console.log(e));//Error:rejected

//3.Promise.prototype.finally
//finally 메서드는 한개의 콜백 함수를 인수로 전달 받는다 finally 메서드의 콜백 함수는 프로미스의 성공또는 실패와 상관없이
//무조건 한번 호출된다 finally 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을때 유용하다
//finally 메서드도 then/catch 메서드와 마찬가지로 언제나 프로미스를 반환한다
console.log('line 197');
const fin = new Promise(()=>{});
fin.finally(function(){
    console.log('finally');
})
console.log(fin);
//프로미스로 구현한 비동기 함수 get을 사용해 후속 처리를 구현해보자
const promiseGet2 = url => {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status ===200) {
                //성공적으로 응답을 전달 받으면 resolve 함수를 호출한다
                resolve(JSON.parse(xhr.response));
            }else {
                //에러처리를 위해 reject 함수를 호출한다
                reject(new Error(xhr.status));
            }
        };
    });
};
//promiseGet 함수는 프로미스를 반환한다
promiseGet2('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(()=>console.log('finally'));

//프로미스의 에러처리
//then 메서드의 두번째 콜백함수로 처리
const wrongUrl = 'https://jsonplaceholder.typicode.com/xxx/1';
promiseGet2(wrongUrl).then(res => console.log(res),err=>console.log(err));//Error : 404
//catch를 사용해 처리
promiseGet2(wrongUrl).then(res=>console.log(res))
                     .catch(err=>console.log(err));//Error : 404
//catch 메서드를 호출하면 내부적으로 then(undefined,onRejected)을 호출한다 따라서 위 예제는
//내부적으로 다음과 같이 처리된다
promiseGet2(wrongUrl).then(res=>console.log(res))
                     .then(undefined,err=>console.log(err));//Error : 404
promiseGet2('https://jsonplaceholder.typicode.com/posts/1').then(res=>console.xxx(res))
                                                           .catch(err=>{
                                                            console.error(err);
                                                        });        
                                                        console.log('프로그램 종료');

//단 then 메서드의 두번째 콜백 함수는 첫번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드가 복잡해져서 가독성이 좋지 않다
promiseGet2('https://jsonplaceholder.typicode.com/posts/1').then(res=>console.xxx(res),
                                                                 err=>console.error(err));
//두번째 콜백 함수는 첫번째 콜백함수에서 발생한 에러를 캐치하지 못한다
//또한 then 메서드에 두번째 콜백함수를 전달하는 것보다 catch 메서드를 사용하는것이 가독성이 좋고 명확하다
//따라서 에러 처리는 then 메서드에서 하지말고 catch 메서드에서 하는것을 권장한다