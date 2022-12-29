//논리합 논리곱 연산자 표현식의 평가 결과는 불리언 값이 아닐수도 있다
//논리합 또는 논리곱 연산자 표현식은 언제나 2개의 피연사자 중 어느 한쪽으로 평가된다
//Dog && Cat =>"Cat"반환
//논리곱 연산자는 논리 연산의 결과를 결정하는 두번째 피연산자를 그대로 반환한다
//Dog || Cat =>"Dog"반환
//"Dog"은 Truthy 값이므로 true로 평가 두번째 연산자까지 평가해보지 않아도 위 표현식 평가 가능
//논리 연산의 결과를 결정한 첫번째 피연산자 "Dog" 그대로 반환
//논리곱 연산자와 논리합 연산자는 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환
//이를 단축 평가라한다 단축평가는 표현식을 평가하는 도중에 평가결과가 확정된 경우 
//나머지 평가 과정을 생략하는것을 말한다

//단축 평가를 사용하면 if문을 대체할 수 있다 어떤 조건이 Truthy 값일때 무언가를 해야한다면
//논리곱 연산자 표현식으로 if문을 대체 할 수 있다
var done = true;
var message = '';
//주어진 조건이 true일때
if(done) message='완료';
//if문은 단축평가로 대체 가능하다
message = done && '완료';
console.log(message);//완료
//조건이 Falsy값 일때 무언가를 해야한다면
//논리합 연산자 표현식으로 if문을 대체 할 수 있다
done = false;
if(!done) message = '미완료';
message = done || '미완료';
console.log(message);//미완료
//삼항연산자는 if else문을 대체 할 수 있다
done = true;
message = '';
if(done) message = '완료';
else message = '미완료';
console.log(message);//완료
message = done ? '완료' : '미완료';
console.log(message);//완료

//객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조 할때
//객체를 가리키기를 기대하는 변수의 값이 객체가 아니라 null 또는 undefined인 경우 객체의 프로퍼티를 참조하면
//타입에러 발생 프로그램 강제종료
var elem = null;
//var value = elem.value //TypeError: Cannot read property 'value' of null
//이때 단축평가를 사용하면 에러를 발생시키지 않는다
//elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
//elem값이 Truthy 값이면 elem.value로 평가된다
var value = elem && elem.value;

//함수 매개변수에 기본값을 설정할때
//함수를 호출할때 인수를 전달하지 않으면 매개변수에는 undefined가 할당
//이때 단축평가를 사용해 매개변수의 기본값을 설정하면 undefined로 인해 발생하는 에러 방지 가능
function getStringLength(str){
    str = str || '';
    return str.length;
}
console.log(getStringLength());//0
console.log(getStringLength('apple'));//5 아래에 의해 6으로 바뀜
//es6의 매개변수의 기본값 설정
function getStringLength(str =''){
    return str.length +1;
}
getStringLength('apple');

//옵셔널 체이닝 연산자 .? 좌항의 피연산자가 null또는 undefinded인 경우 undefinded 반환
//그렇지 않으면 우항의 프로퍼티 참조를 이어간다