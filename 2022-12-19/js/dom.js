//html 요소에 id 어트리뷰트 부여하면 id값과 동일한 이름의 전역변수가 암묵적으로 선언되고
//해당 노드 객체가 할당되는 부수 효과가있다
console.log(h1Tag);
console.log(h1Tag===document.getElementById('h1Tag'));
//단 id값과 동일한 이름의 전역변수가 이미 선언되어 있으면 이 전역변수에 노드 객체가 재할당되지 않는다

console.log(document.getElementById('ulTag'));

//getElementsByTagNames => HTMLCollection 객체 반환
//HTMLCollection 갹체는 유사배열객체 이면서 이터러블
//Document.prototype에 정의된 메서드와 (DOM 전체에서 요소 노드를 탐색하여 반환)
//Element.prototype에 정의된 메서드가 있다(특정 요소 노드의 자손노드 중에서 요소노드를 탐색하여 반환)

console.log(document.getElementsByTagName('input'));
console.log(typeof document.getElementsByTagName('input'));
const arr = [1,2,3];
console.log(typeof arr);//object

//css선택자 문법을 사용하는 querySelector querySelectorAll메서드는 getElementBy*** 메서드보다 다소 느린것으로 알려져있다
//그러나 사용권장(id인경우 getElementById) 구체적으로 선택가능,일관된 방식을 취득가능하므로

//특정요소노드를 취득 할 수 있는지 확인
const $apple=document.querySelector('.apple');
console.log($apple)
console.log($apple.matches('.apple'));//true
//이벤트 위임을 사용할때 유용

//HTMLCollection vs NodeLise
//1.HTMLCollection
const $elems = document.getElementsByClassName('red');
// for(let i = 0; i<$elems.length; i++){
//     $elems[i].className = 'blue';
//     console.log($elems[i]);
// }
console.log($elems);//red class 1개 남아 있음
//HTMLCollection 객체는 실시간으로 노드 객체의 상태 변경을 반영하여 요소를 제거할 수 있기때문에
//for문으로 순회하면서 노드 객체의 상태를 변경할때 주의해야한다
//for문을 역방향으로 순회하는 방법으로 회피할 수 있다 
//혹은 while문 사용하여 노드 객체가 남아있지 않을때까지 반복하여 회피 할 수 있다
//더 간단한 해결책은 부작용을 발생시키는 원인인 HTMLCollection 객체를 사용하지 않는것이다
//유용한 배열의 고차 함수(forEach, map, filter, reduce등)를 사용할 수 있다
[...$elems].forEach(function(val){
    console.log(val);
});
// 스프레드 문법쓸때는 ; 주의 세미콜론 자동 삽입 과정에서 오류 남

//2.NodeList
//NodeList 객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는 객체이다
//하지만 childNodes 프로퍼티가 반환하는 NodeList 객체는 
//HTMLCollection 객체와 같이 실시간으로 노드 객체의 상태 변경을 반영하는 live객체로 동작하므로 주의
//안전하게 DOM 컬렉션을 사용하려면 배열로 변환하여 사용하는것을 권장
//스프레드 문법이나 Array.from메서드를 사용하여 간다닣 배열로 변환할 수 있다.

const $fruits = document.getElementById('fruits');

const {childNodes} = $fruits;
console.log($fruits.childNodes)
console.log($fruits)
console.log({childNodes});

function parseURL(url=''){
    const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
    console.log(parsedURL);
    if(!parsedURL) return {};
    const [,protocol,host,path] = parsedURL;
    return {protocol,host,path};

}
const parsedURL = parseURL('https://developer.mozilla.org/ko/docs/Web/JavaScript');
console.log(parsedURL);