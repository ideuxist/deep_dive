const set = new Set();
console.log(set);//set(0){size:0}
//Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체를 생성한다 
//이때 이터러블의 중복된 값은 Set 객체의 요소로 저장되지 않는다
const set1 = new Set([1,2,3,3]);
console.log(set1);//Set(3){1,2,3}
const set2 = new Set('hello');
console.log(set2);//Set(4){"h","e","l","o"}
//중복을 허용하지 않는 Set 객체의 특성을 활용하여 배열에서 중복된 요소를 제거할 수 있다
//배열의 중복 요소 제거
const uniq = array => array.filter((v,i,self)=>self.indexOf(v)===i);
console.log(uniq([2,1,2,3,4,3,4]));//[2,1,3,4]
//Set을 사용한 배열의 중복 요소 제거
const uniq2 = array => [...new Set(array)];
console.log(uniq([2,1,2,3,4,3,4]));//[2,1,3,4]

//요소 순회
//Set객체의 요소를 순회하려면 Set.prototype.forEach 메서드를 사용한다 Set.prototype.forEach메서드는
//Array.prototype.forEach 메서드와 유사하게 콜백 함수와 forEach 메서드의 콜백 함수 내부에서 this로
//사용될 객체(옵션)를 인수로 전달한다
//첫번째인수:현재 순회중인 요소값, 두번째인수:현재 순회중인 요소값, 세번째인수:현재 순회중인 Set객체 자체
//첫번째 인수와 두번째 인수는 같은 값이다 Array.prototype.forEach와 인터페이스를 통일하기 위함
const set3 = new Set([1,2,3]);
set3.forEach((v,v2,set) => console.log(v,v2,set));//1 1 Set(3){1,2,3} /2 2 Set(3){1,2,3}/3 3 Set(3){1,2,3}
//Set객체는 이터러블이다 따라서 for...of 문으로 순회할 수 있으며
//스프레트 문법과 배열 디스트럭처링의 대상이 될 수도 있다
const set4 = new Set([1,2,3]);
//Set객체는 Set.prototype의 Symbol.iterator 메서드를 상속 받는 이터러블이다
console.log(Symbol.iterator in set);//true
//이터러블인 Set객체는 for ... of 문으로 순회할 수 있다
for (const value of set4){
    console.log(value);//1 2 3
}
//이터러블인 Set객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...set]);//[1,2,3]
//이터러블인 Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다
const [a, ...rest] = set4;
console.log(1,rest);//1,[2,3]
//Set 객체는 요소의 순서에 의미를 갖지 않지만 Set객체를 순회하는 순서는 요소가추가된 순서를 따른다
//ES사양에 규정되어 있지는 않지만 다른 이터러블의 순회와 호환성을 유지하기위함이다

//집합연산
//Set객체는 수학적 집합을 구현하기 위한 자료구조다 따라서 Set 객체를 통해
//교집합 합집합 차집합 등을 구현할 수 있다
//집합연산을 구현하는 프로토타입 메서드를 구현하면 다음과 같다

//1.교집합
Set.prototype.intersection = function(set){
    const result = new Set();
    for(const value of set) {
        //2개의 set의 요소가 공통되는 요소이면 교집합의 대상이다
        if(this.has(value)) result.add(value);
    }
    return result;
}
const setA= new Set([1,2,3,4]);
const setB = new Set([1,3]);
//setA 와 setB의 교집합
console.log(setA.intersection(setB));//Set(2){1,3}
//setB 와 setA의 교집합
console.log(setB.intersection(setA));//Set(2){1,3}
//또는 다음과 같은 방법으로도 가능하다
Set.prototype.intersection2 = function(set) {
    return new Set([...this].filter(v=>set.has(v)));
}
const setC = new Set([1,2,3,4]);
const setD = new Set([2,4]);
//setC 와 setD의 교집합
console.log(setC.intersection2(setD));//Set(2){2,4}
//setD 와 setC의 교집합
console.log(setD.intersection2(setC));//Set(2){2,4}

//2.합집합 집합A 와 집합B 중복없는 모든 요소
Set.prototype.union = function(set){
    const result = new Set(this);
    for(const value of set){
        result.add(value);
    }
    return result;
}
const setE = new Set([1,2,3,4]);
const setF = new Set([5,6]);
//setE와 setF의 합집합
console.log(setE.union(setF));//Set(6){1,2,3,4,5,6}
//setF와 setE의 합집합
console.log(setF.union(setE));//Set(6){5,6,1,2,3,4}
//또는 다음과 같은 방법으로도 가능하다
Set.prototype.union2 = function(set){
    return new Set([...this,...set])
};
const setG = new Set([1,2,3,4]);
const setH = new Set([2,4]);
//setE와 setF의 합집합
console.log(setG.union(setH));//Set(4){1,2,3,4}
//setF와 setE의 합집합
console.log(setH.union(setG));//Set(4){2,4,1,3}

//3.차집합 집합A에는 존재 집합B에는 존재하지 않는 요소
Set.prototype.difference = function(set){
    //this(Set객체)를 복사
    const result = new Set(this);
    for(const value of set) {
        //차집합은 어느 한쪽 집합에는 존재하지만 다른 한쪽 집합에는 존재하지 않는 요소로 구성된다
        result.delete(value)
    }
    return result;
}
const setI = new Set([1,2,3,4]);
const setJ = new Set([2,4]);
//setI에대한 setJ의 차집합
console.log(setI.difference(setJ));//Set(2){1,3}
//setJ에대한 setI의 차집합
console.log(setJ.difference(setI));//Set(0){size:0}
//또는 다음과 같은 방법으로도 가능하다
Set.prototype.difference2 = function(set){
    return new Set([...this].filter(v=>!set.has(v)));
}
const setK = new Set([1,2,3,4]);
const setL = new Set([1,3]);
//setI에대한 setJ의 차집합
console.log(setK.difference(setL));//Set(2){2,4}
//setJ에대한 setI의 차집합
console.log(setL.difference(setK));//Set(0){size:0}

//4.부분집합과 상위집합
//집합A가 집합B에 포함되는 경우 집합A는 집합B의 부분 집합이며 집합B는 집합 A의 상위 집합이다
//this가 subset의 상위 집합인지 확인한다
Set.prototype.inSuperset = function(subset){
    for(const value of subset) {
        //superset의 모든 요소가 subset의 모든 요소를 포함하는지 확인
        if(!this.has(value)) return false;
    }
    return true;
}
const setM = new Set([1,2,3,4]);
const setN = new Set([1,2]);
//setM이 setN의 상위 집합인지 확인한다
console.log(setM.inSuperset(setN));//true
//setN이 setM의 상위 집합인지 확인한다
console.log(setN.inSuperset(setM));//false
//또는 다음과 같은 방법으로도 가능하다
Set.prototype.inSuperset2 = function(subset){
    const supersetArr = [...this];
    return [...subset].every(v=>supersetArr.includes(v));
}
const setO = new Set([1,2,3,4]);
const setP = new Set([2,3]);
//setM이 setN의 상위 집합인지 확인한다
console.log(setM.inSuperset2(setN));//true
//setN이 setM의 상위 집합인지 확인한다
console.log(setN.inSuperset2(setM));//false