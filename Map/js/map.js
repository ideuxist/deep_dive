const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
//Map 생성자 함수는 이터러블을 인수로 전달받아 Map객체를 생성한다
//이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다
//const map2 = new Map([1,2]);//TypeError:Iterator value 1 is not an entry object at new Map
//Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다
//따라서 Map객체에는 중복된 키를 갖는 요소가 존재할 수 없다
const map2 = new Map([['key1', 'value1'], ['key1', 'value2']]);
console.log(map2);//Map(1){'key'=>'value2'}
const map3 = new Map([['person', { name: 'kim' }]]);//가능 이터러블을 인수로 받고 이터러블은 키와 값의 쌍으로 이루어져야한다
console.log(map3);
//요소갯수를 확인
console.log(map2.size);//1 size는 getter 함수만 존재하는 접근자 프로퍼티
//요소추가 Map.prototype.set 메서드 사용
//set 메서드는 새로운 요소가 추가된 Map 객체를 반환 따라서 연속적으로 호출 가능
const map4 = new Map();
map4.set('key1', 'value1')
    .set('key2', 'value2');
console.log(map4);//Map(2) {'key1' => 'value1', 'key2' => 'value2'}
//키 중복시 에러없이 덮어써진다
//일치연산자의 경우 NaN === NaN false로 평가 그러나 Map은 같다고 평가 +0 -0 마찬가지 중복추가 허용안함
//객체는 문자열 또는 심벌값만 키로 사용가능 하지만 Map객체는 키 타입에 제한이 없다
//따라서 객체를 포함한 모든 값을 키로 사용 가능 Map객체와 일반 객체의 가장 두드러지는 차이점
//요소 취득 Map.prototype.get 해당 키를 갖는 요소가 존재하지 않으면 undefined 반환
console.log(map4.get('key1'));//value1
//요소 존재 여부 확인 Map.prototype.has 특정요소의 존재 여부 boolean값 반환
console.log(map4.has('key1'));//true
//요소 삭제 Map.prototype.delete 삭제 성공여부를 나타내는 boolean값 반환
console.log(map4.delete('key1'));//true 존재하지 않으면 에러없이 무시
//요소 일괄 삭제 Map.prototype.clear 객체의 요소 일괄 삭제언제나 undefined 반환
console.log(map4.clear());//undefined
console.log(map4);//Map(0){size:0}
//요소 순회 Map.prototype.forEach
//첫번째 인수:현재 순회중인 요소값,두번째 인수:현재 순회중인 요소키,세번째 인수:현재 순회중인 Map 객체 자체
const lee = { name: 'Lee' };
const kim = { name: 'kim' };
const map5 = new Map([[lee,'developer'],[kim,'designer']]);
map5.forEach((v,k,map)=>console.log(v,k,map));//developer {name: 'Lee'} Map(2) {{…} => 'developer', {…} => 'designer'}
                                              //designer {name: 'kim'} Map(2) {{…} => 'developer', {…} => 'designer'}
//Map객체는 이터러블이다 따라서 for ... of 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상이 될 수도있다
console.log(Symbol.iterator in map5);//true
for(const entry of map5){
    console.log(entry);//(2) [{name:'Lee'}, 'developer'] (2) [{name:'kim}, 'designer']
}  
console.log([...map5]);//[Array(2), Array(2)]
const [a,b] = map5
console.log(a,b);//[{name:'Lee','developer}] [{name:'kim',desingner}]
//Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다
//Map.prototype.keys 요소키를 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환
//Map.prototype.values 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환
//Map.prototype.entries 요소키와 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환
//Map 객체는 요소의 순서에 의미를 갖지 않지만 Map 객체를 순회하는 순서는 요소가 추가된 순서를 따른다
//이는 ES사양에 규정되어 있지는 않지만 다른 이터러블의 순회화 호환성을 유지하기 위함이다