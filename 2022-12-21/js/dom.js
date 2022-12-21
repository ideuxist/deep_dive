//document.getElementById 와 document.getElementsByTagName
const ulTag = document.getElementsByTagName('ul');
const ulTag2 = document.getElementById('fruits');
console.log(ulTag);
console.log(ulTag2);

//자식 노드 가져오기 둘다 node를 가져온다
console.log(ulTag[0].firstChild);
console.log(ulTag2.firstChild);

//특정 요소 노드를 취득할 수 있는지 확인- 이벤트 위임시 용이
const idAppleTag = document.getElementById('apple');
const result = idAppleTag.matches('#fruits > #apple');
console.log(result);

//HTMLCollection vs NodeList
const liTags = document.getElementsByTagName('li');
console.log(liTags.length);
// liTags.forEach(function(){
//     console.log('a');
// })forEach 사용불가
const liTags2 = document.querySelectorAll('#fruits > li');
liTags2.forEach(function(){
    console.log('forEach가능')
})
//forEach 사용가능 childNodes객체는 live 객체로 동작

//but 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 
//객체를 배열로 변환하여 사용하는것을 권장한다
//HTMLCollection 과 NodeList 객체는 모두 유사배열객체이면서 이터러블이다
//따라서 스프레드 문법이나 Array.from 메서드를 사용하여 간단히 배열로 변환 가능

//parentNode, previousSibling, firstChild, childNodes 프로퍼티는 Node.prototype이 제공
//previousElementSibling,nextElementSibling,children 프로퍼티는 Element.prototype이 제공
//노드탐색 프로퍼티는 모두 접근자 프로퍼티
//단, 노드탬색 프로퍼티는 setter없이 getter만 존재하여 참조만 가능한 읽기전용접근자 프로퍼티
//읽기 전용 접근자 프로퍼티에 값을 할당하면 아무런 에러 없이 무시
console.log(liTags[0].firstChild);//apple
//liTags[0].firstChild는 text노드 
liTags[0].firstChild='읽기전용에 값 할당하기';//읽기전용 접근자 프로퍼티이므로 값 할당 에러없이 무시
console.log(liTags[0].firstChild);//apple 값할당안되고 에러없이 무시

//공백 텍스트 노드 주의 HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백문자는 텍스트 노드를 생성

//자식노드 탐색
const fruits = document.getElementById('fruits');
const fruits2 = document.getElementsByTagName('ul');
console.log(fruits);
console.log(fruits2);
//childNodes 자식노드를 모두 탐색하여 NodeList에 담아 반환
//요소노드뿐만 아니라 텍스트 노드도 포함되어 있을 수 있다
console.log(fruits.childNodes);
//children 자식 노드 중에서 요소 노드만 모두 탐색하여 HTMLCollection에 담아 반환
console.log(fruits.children);

//자식노드 존재확인 hasChildNodes메서드 이용 true / false 반환
//텍스트 노드를 포함하여 자식 노드의 존재를 확인한다
const apple = document.getElementById('apple');
console.log(apple.hasChildNodes());//true 텍스트 노드로 apple을 가지기 때문
//자식 노드중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인 하려면 
//hasChildNodes 대신 children.length 또는 childElementCount 프로퍼티를 사용한다
console.log(apple.children.length);//0 요소노드를 반환 요소노드가 없으므로 0
console.log(apple.childElementCount);//0 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인

//요소노드의 텍스트 노드 탐색
//요소노드의 텍스트 노드는 요소 노드의 자식 노드
//firstChild 프로퍼티가 반환한 노드는 텍스트 노드 이거나 요소노드다

//요소노트의 텍스트조작
//1.nodeValue 노드 객체의 값을 반환 노드 객체의 값이란 텍스트 노드의 텍스트
//따라 텍스트 노드가 아닌 노드 즉 문서노드나 요소노드의 nodeValue 프로퍼티를 참조하면 null 반환
console.log(document.nodeValue);//null
console.log(document.getElementById('foo').nodeValue);//null
console.log(document.getElementById('foo').firstChild);
console.log(document.getElementById('foo').firstChild.nodeValue);//Hello

//2.textContent Node.prototype.textContent 프로퍼티는 setter와 getter 모두 존재
//요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다
//요소 노드의 textContent 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역(시작태그와 종료태그 사이)
//내의 모든 콘텐츠를 반환 다시말해 요소노드의 childNodes 프로퍼티가 반환한 모든 노드들의 텍스트노드의값
//즉 텍스트를 모두 반환한다 이때 HTML 마크업은 무시된다
const foo3 = document.getElementById('foo3');
console.log(foo3.textContent === foo3.firstChild.nodeValue);//true
console.log(foo2.textContent);//Hello2world! 텍스트 모두 반환 (HTML마크업은 무시)
//요소노드의 textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고
//할당한 문자열이 텍스트로 추가 된다 이때 할당한 문자열에 HTML 마크업이 포함되어 있더라도
//문자열 그대로 인식되어 텍스트로 취급된다 즉 HTML마크업은 파싱되지 않는다
//참고로 textContent 프로퍼티와 유사한 동작을 하는 innerText 프로퍼티가 있다
console.log(foo2.innerText);//Hello2world2
//innerText 프로퍼티는 다음과 같은 이유로 사용하지 않는 것이 좋다
//innerText 프로퍼티는 css에 순종적이다 예를 들어 css에 의해 비표시로 지정된 요소 노드의
//텍스트를 반환하지 않는다 =>css를 고려해야 하므로 textContent 프로퍼티 보다 느리다

//DOM조작 (새로운 노드 생성 dom에 추가,기존 노드 삭제 또는 교체)
//리플로우와 리페인트가 발생하므로 성능에 영향
//1.innerHTML 요소노드의 HTML 마크업을 취득하거나 변경
//요소노드의 콘텐츠 영역(시작태그와 종료태그 사이)내에 포함된 모든 HTML마크업을 문자열로 반환
console.log(foo2.innerHTML);//Hello2<span>world!</span>
//textContent 프로퍼티를 참조하면HTML 마크업을 무시하고 텍스트만 반환하지만
//innerHTML 프로퍼티는 HTML 마크업이 포함된 문자열을 그대로 반환한다
//요소노드의 innerHTML 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식노드가 제거되고
//할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소노드의 자식노드 DOM에 반영된다
foo2.innerHTML = 'Bye<span>world~</span>';//
console.log(foo2.innerHTML);//'Bye<span>wordl~</span>
//사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티로 할당하는것은 
//크로스 사이트 스크립팅 공격에 취약 HTML5는 실행하지 않음
//하지만 스크립트 요소없이도 공격은 가능
//DOMPUrufy 라이브러리 사용 새니티제이션
//사용자로부터 입력받은 데이터에 의해 발생할 수 있는 xss 공격 예방
//innerHTML 프로퍼티의 또 다른 단점은 요소노드의 innerHTML 프로퍼티에 HTML 마크업 문자열을 
//할당하는 경우 요소 노드의 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여
//DOM을 변경한다는 것이다
const city = document.getElementById('city');
city.innerHTML += '<li class="city">daejoen</li>';
city.innerHTML = city.innerHTML + '<li class="city">daejoen</li>';
//daejoen만 추가 될거 같지만 모든 자식 노드를 제거하고 
//새롭게 seoul,daegu,busan,daejeon이 생성된다 이는 효율적이지 않다
//또 새로운 요소를 삽입할때 삽입 위치를 지정할 수 없다는 단점도 있다

//2.insertAdjacentHTML(position,DOMString) 메서드
//두번째 인수로 전달한 HTML 마크업 문자열(DOMString)을 파싱하고 
//그 결과로 생성된 노드를 첫번째 인수로 전달한 위치에 삽입하여 DOM에 반영한다
//첫번째 인수로 전달할수있는 문자열은 beforebegin afterbegin beforeend afterend 4가지다
//HTML 마크업 문자열을 파싱하므로 xss에는 취약

//1.요소노드생성
//createElement 메서드로 생성한 요소노드는 기존 DOM에 추가되지 않고 홀로 존재하는 상태
const liTag = document.createElement('li');
//2.텍스트 노드 생성
//createTextNode(text)메서드는 텍스트 노드를 생성하여 반환 , 홀로 존재하는 상태
const textNode = document.createTextNode('gwangju');
//3.텍스트 노드를 요소 노드의 자식 노드로 추가
//아직 기존 DOM에 추가되지 않은 상태
//요소 노드에 자식노드가 없는 경우 텍스트노드를 생성하여 추가하는것보다
//textContent 프로퍼티를 사용하는편이 간편하다(자식노드가 있는경우 제거되고
//할당한 문자열이 텍스트로 추가되므로 주의해야한다)
liTag.appendChild(textNode);
//4.요소노드를 DOM에 추가
city.append(liTag);
// city.appendChild(liTag);
//=>리플로우 리페인트 발생

//복수의 노드 생성과 추가
const movie = document.getElementById('movie');
['spiderMan','dr.strange','ironMan'].forEach(text=>{
    //1.요소노드생성
    const liTag = document.createElement('li');
    //2.텍스트 노드 생성
    const textNode = document.createTextNode(text);
    //3.텍스트 노드를 li요소의 자식요소로 추가
    liTag.appendChild(textNode);
    //4.li 요소를 movie요소의 마지막 자식요소로 추가
    movie.appendChild(liTag);
})
//=>DOM에 3번 추가하므로 리플로우 리페인트 3번발생 비효율적이다
//컨테이너 요소의 사용으로 회피 할 수 있다(그러나 불필요한 요소가 DOM에 추가되는 부작용이 있다)

//=>이러한 문제는 DocumentFragment노드를 통해 해결할수 있다
//DocumentFragment 노드는 문서,요소,어트리뷰트,텍스트노드와 같은 노드 객체의 일종으로
//부모노드가 없어서 기존 DOM과는 별도로 존재한다
//또한 DocumentFragment 노드는 기존 DOM과 별도로 존재하므로 자식노드를 추가 하여도
//기존 DOM에는 어떠한 변경도 발생하지 않는다 또한DOM에 추가하면 자신의 제거되고
//자신의 자식 노드만 DOM에 추가된다
const language = document.getElementById('language');
//DocumentFagment 노드생성
const fragment = document.createDocumentFragment();
['java','javascript','c#','python'].forEach(text=>{
    //1.요소노드생성
    const liTag = document.createElement('li');
    //2.텍스트노드 생성
    liTag.textContent = text;
    //3.li요소를 DocumentFragment노드의 마지막 자식노드로 추가
    fragment.appendChild(liTag);
})
//4.language노드의 마지막 자식노드에 fragment노드 추가
language.appendChild(fragment);
//=>리플로우와 리페인트한번만 발생 효율적

//지정한 위치에 노드 삽입
//Node.prototype.insertBefore(newNode,childNode) 메서드는 첫번째 인수로 전달받은 노드를
//두번째 인수로 전달받은 노드 앞에 삽입한다 두번째 인수로 전달받은 노드는 반드시
//insertBefore 메서드를 호출한 노드의 자식 노드이어야한다 그렇지 않으면 DOMException 발생
const c = document.createElement('li');
c.textContent ='c';
language.insertBefore(c,document.querySelector('#language > li'))//맨앞에 c 삽입
//두번째 인수로 전달받은 노드가 null이면 첫번째 인수로 전달받은 노드를 insertBefore메서드를
//호출한 노드의 마지막 자식노드로 추가된다 즉 appendChild 메서드처럼 동작한다

//노드이동
//DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메서드를 사용하여 DOM에 다시 추가하면
//현재 위치에서 노드를 제거하고 새로운 이치에 노드를 추가한다 즉 노드가 이동한다
fruits.appendChild(document.getElementById('apple'));//#apple fruits 마지막 자식으로 이동
fruits.insertBefore(document.getElementById('banana'),document.getElementById('apple'));
//banana가 apple앞으로 이동

//노드복사
//Node.prototype.cloneNode([deep:true | false]) 메서드는 노드의 사본을 생성하여 반환한다
//매개변수 deep에 true인수로 전달하면 노드를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성하고
//false인수로 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 사본을 생성한다
//얕은 복사로 생성된 요소 노드는 자손 노드를 복사하지 않으므로 텍스트 노드도 없다
const cloneFruits = fruits.cloneNode();
console.log(cloneFruits);//어트리뷰트까지 복사됨(id="fruits")
document.body.appendChild(cloneFruits);
console.log(document.querySelectorAll('#fruits'));//2개 가져옴
const cloneFruits2 = fruits.cloneNode(true);
console.log(cloneFruits2);//완전한 복제 됨

//노드교체
//Node.prototype.replaceChild(newChild,oldChild)메서드는 
//자신을 호출한 노드의 자식노드를 다른 노드로 교체한다
//첫번쩨 매개변수에 새로운노드를 인수로 전달하고 두번째 매개변수에 이미 존재하는 교체될 노드를 전달한다
//oldChild 매개변수에 인수로 전달한 노드는 replaceChild메서드를 호출한 노드의 자식 노드이어야한다
//oldChild 노드는 DOM에서 제거된다
//apple을 melon으로 교체해보자
const melon = document.createElement('li');
melon.textContent = 'melon';
fruits.replaceChild(melon,document.getElementById('apple'));//apple이 melon으로 교체

//노드 삭제
//Node.prototype.removeChild(child) 메서드는 child 매개변수에 전달한 노드를 DOM에서
//삭제한다 인수로전달한 노드는 removeChild 메서드를 호출한 노드의 자식 노드이어야한다
//python 삭제해보자
const python = document.querySelector('#language').lastChild;
document.querySelector('#language').removeChild(python);//python 제거됨

//어트리뷰트
//attribute 프로퍼티는 getter만 존재하는 읽기전용접근자 프로퍼티
//요소노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap객체를 반환한다

//HTML 어트리뷰트 조작
