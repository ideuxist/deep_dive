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
//특정어트리뷰트 존재확인
const inputTag = document.getElementById('user');
console.log(inputTag.hasAttribute('type'));//true
inputTag.removeAttribute('value')//value삭제
//HTML 어트리뷰트 vs DOM 프로퍼티
//요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티(DOM 프로퍼티)가 존재한다
//DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있다
//요소 노드는 2개의 상태 즉 초기상태와 최신상태를 관리해야 한다
//요소 노드의 초기 상태는 어트뷰트 노드가 관리하며 
//요소 노드의 최신 상태는 DOM 프로퍼티가 관리한다
//사용자가 input 요소의 입력 필드에 값을 입력할때마다 input 요소노드의 value 프로퍼티 값
//즉 최신 상태값을 취득한다 value 프로퍼티값은 사용자의 입력에 의해 동적으로 변경된다
//setAttribute 메서드는 어트리뷰드 노드에서 관리하는 HTML 요소에 지정한 어트리뷰트 값, 
//즉 초기 상태값을 변경한다
inputTag.setAttribute('value','ideuxist');//초기 상태값 변경
inputTag.oninput = () => {
    console.log('value 프로퍼티 값 ',inputTag.value);
}
inputTag.value = 'kkw1691';//최신 상태값
console.log(inputTag.getAttribute('value'));//ideuxist (위에서 kkw1691로 변경했음에도)
//DOM 프로퍼티에 값을 할당하는 것은 HTML 요소의 최신 상태값을 변경하는 것을 의미한다
//즉 사용자가 상태를 변경하는 행위와 같다
//이때 HTML 요소에 지정한 어트리뷰트 값에는 어떠한 영향도 주지않는다
//모든 DOM 프로퍼티가 사용자의 입력에 의해 변경되 최신상태를 관리하는것은 아니다
//사용자 입력에 의한 상태 변화와 관계없는 id 어트리뷰트와 id 프로터피는 
//사용자 입력과 관계없이 항상 동일한 값을 유지한다
//즉 id어트리뷰트 값이 변하면 id 프로퍼티 값도 변하고 그 반대도 마찬가지다
const checkBox = document.getElementById('checkTest');
console.log(checkBox);
console.log(checkBox.id);//checkTest
console.log(checkBox.getAttribute('id'))//checkTest
checkBox.id = 'testedBox';
console.log(checkBox.id);//testedBox
console.log(checkBox.getAttribute('id'))//testedBox
///대부분의 HTML 어트리뷰트는 HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티와 1:1로 대응한다
//언제나 1:1로 대응하는것은 아니며 키가 반드시 일치하는것도 아니다
//class 어트리뷰트는 className,classList 프로퍼티와 대응
//td요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 존재하지 않는다
//textContent 프로퍼티는 대응하는 어트리뷰트가 존재하지 않는다
//어트리뷰트는 대소문자 구별x 프로퍼티 키는 카멜케이스를 따른다
//DOM 프로퍼티 값의 타입
//getAttribute 메서드로 취득한 어트리뷰트 값은 언제나 문자열이다 하지만 DOM 프로퍼티로 
//취득한 최신 상태값은 문자열이 아닐수도 있다 예를 들어 checkbox 요소의 checked 어트리뷰트 값은
//문자열이지만 checked 프로퍼티 값은 불리언 타입이다
console.log(checkBox.getAttribute('checked'));//checked
console.log(checkBox.checked);//true
//data 어트리뷰트와 dataset 프로퍼티
//data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 
//자바스크립트간에 데이터를 교환할 수 있다
//data 어트리뷰트는 data-user-id, data-role과 같이 data-접두사 다음에 임의의 이름을 붙여서 
//사용한다
//data어트리뷰트 값은 HTMLElement.dataset 프로퍼티로 취득할 수 있다 dataset 프로퍼티는 HTML
//요소의 모든 data 어트리뷰트 정보를 제공하는 DOMStringMap 객체를 반환한다 DOMStringMap 객체는
//data 어트리뷰트의 data-접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고있다
//이 프로퍼티로 data 어트리뷰트의 값을 취득하거나 변경할 수 있다
const users =document.querySelector('.users').children; 
const users2 = [...document.querySelector('.users').children];
console.log(users);//[li#1,li#2] HTMLCollection
console.log(users2);//[li#1,li#2] prototype Array
const user = users2.find(user=>user.dataset.userId ==='7621');
console.log(user);//<li id="1" data-user-id="7621" data-role="admin">Lee</li>
console.log(user.dataset.role);//admin
user.dataset.role='subscriber';
console.log(user.dataset)//DOMStringMap {userId:'7621',role:'subscriber'}
//data 어트리뷰트의 data-접두사 다음에 존재하지 않는 이름을 키로 사용하여 
//dataset 프로퍼티에 값을 할당하면 HTML 요소에 data 어트리뷰트가 추가된다
//이때 dataset 프로퍼티에 추가한 카멜케이스 프로퍼티 키는 data 어트리뷰트의 data-접두사
//다음에 케밥케이스로 자동 변경되어 추가된다
user.dataset.userPassword ='asdf1234!!';
console.log(user.dataset);
console.log(user);//<li id="1" data-user-id="7621" data-role="subscriber" data-user-password="asdf1234!!">Lee</li>

//스타일
//인라인 스타일 조작
//HTMLElement.prototype.style 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서
//요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경한다
const square = document.querySelector('.square');
console.log(square.style.width==='');//true 인라인 스타일만 취득
//css 프로퍼티는 케밥 케이스를 따른다 ex.background-color => backgoundColor
//케밥 케이스를 그대로 사용하려면 [background-color] 대괄호 표기법 사용
//class 어트리뷰트에 대응하는 DOM 프로퍼티는 class가 아니라 
//className 과 classList 다 자바스크립트에서 class는 예약어이기때문
//className
//Element.prototype.className class어트리뷰트 값을 취득하거나 변경
console.log(square.className);//square yellow
//className은 문자열을 반환하므로 공백으로 구분된 여러개의 클래스를
//반환하는 경우 다루기가 불편하다
//classList 
//Element.prototype.classList 프로퍼티는 class 어트리뷰트의 정보를 담은
//DOMTokenList객체를 반환한다
//DOMTokenList 객체는 class 어트리뷰트의 정보를 나타내는 컬렉션 객체로서 
//유사배열객체이면서 이터러블이다 다음과 같은 유용한 메서드 제공
//add(...className) 인수로 전달한 1개 이상의 문자열을 추가 
//remove(...className) 인수로 전달한 1개 이상의 문자열과 일치하는 클래스 삭제 없으면 에러없이 무시
//item(index) 인수로 전달한 값에 해당하는 클래스를 반환 0이면 첫번째 클래스 1이면 두번째 클래스
//contains(className) 인수로 전달한 문자열과 일치하는 클래스가 포함되어있는지 확인
//replace(oldClassName,newClassName) 첫번째 인수로 전달한 문자열을 두번째 인수로 전달한 문자열로 변경
//toggle(className[,force]) toggle메서드는 인수로 전달한 문자열과 일치하는 클래스가
//존재하면 제거하거 존재하지 않으면 추가한다
//두번째 인수로 불리언 값으로 평가되는 조건식을 전달할 수 있다
//이때 조건식 평가결과가 true이면 class 어트리뷰트에 강제로 첫번째 인수로 전달받은
//문자열을 추가하고 false 이면 첫번째 인수로 전달받은 문자열을 제거한다
console.log(square.classList);//DOMTokenList(2)['square','yellow',value:'square yellow']
//DOMTokenList 객체는 forEach, entries, keys,values,supports 메서드를 제공한다
const userInfo = {
    name:'kim',
    age:20,
    address:'daegu'

}
//추후 더 학습해야됨
console.log(Object.entries(userInfo));
console.log(square.classList.entries(square.classList.values));//??
square.classList.forEach(val=>console.log(val));
console.log(square.classList.keys(square.classList));
//style 프로퍼티는 인라인 스타일만 반환한다 따라서 클래스를 적용한 스타일이나 상속을 통해 암묵적으로
//적용된 스타일은 style 프로퍼티로 참조 할 수 없다 HTML 요소에 적용되어 있는 모든 CSS 스타일을 
//참조해야 할 경우 getComputedStyle 메서드를 사용한다
//window.getComputedStyle(element[, pseudo])메서드는 첫번째 인수로 전달한 요소 노드에 적용되어있는
//평가된 스타일을 CSSStyleDeclaration 객체에 담아 반환한다 평가된 스타일이란 요소 노드에 적용되어 있는
//모든 스타일 링크,인라인,자바스크립트,상속 스타일 등 모든 스타일이 조합되어 
//최종적으로 적용된 스타일을 말한다
const computedStyle = window.getComputedStyle(square);
console.log(computedStyle);//CSSStyleDeclaration 객체 
console.log(computedStyle.justifyContent);//center
//두번째 인수로(pseudo)로 :after :before 와 같은 의사 요소를 지정하는 문자열을 지정할수있다
//일반요소의 경우 생략

