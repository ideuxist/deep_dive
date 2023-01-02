console.log('시작');
try{
    foo();
}catch(error){
    console.log('에러 발생');
}
console.log('끝');

function test() {
    console.log('a');
}
// var test = 0;//함수와 중복시 덮어씀
// let test = 0;// 재선언안됨
// const test =0;//재선언안됨
const result = typeof test;
console.log(result);
console.log(typeof result);

const foo = () => {throw Error('foo 에서 발생한 에러');}
const bar = () => {foo();};
const baz = () => {bar();};
try {
    baz();
}catch (err) {
    console.error(err);
}
//baz함수를 호출하면 bar함수가 호출되고 foo함수가 호출되고 foo함수는 에러를 던진다
//이때 foo함수가 throw한 에러는 다음과 같이 호출자에게 전파되어 전역에서 캐치된다
//foo실행 컨텍스트 => bar실행 컨텍스트 => baz실행 컨텍스트 => 전역 실행 컨텍스트
//이처럼 throw된 에러를 캐치하지 않으면 호출자 방향으로 전파된다 
//이때 throw된 에러를 채키하여 적절히 대응하면 프로그램을 강제종료시키지 않고 코드의 실행 흐름을 복구할 수 있다
//throw된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제종료
//주의할것은 비동기 함수의 setTimeout이나 프로미스 후속처리 메서드의 콜백 함수는 호출자가 없다는것이다
//setTimeout 이나 프로미스 후속 처리 메서드의 콜백함수는 태스크 큐나 마이크로태스크 큐에 일시저장 되었다가
//콜 스택이 비면 이벤트 루프에 의해 콜스택으로 푸시되어 실행된다
//이때 콜스택에 푸시된 콜백함수의 실행 컨텍스트는 콜 스택 가장 하부에 존재하게 된다 
//따라서 에러를 전파할 호출자가 존재하지 않는다 