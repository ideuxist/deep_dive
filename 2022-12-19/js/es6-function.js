const base = {
    name : 'Lee',
    sayHi() {
        return `Hi! ${this.name}`
    }
};

const derived= {
    __proto__:base,
    //sayHi는 es6 메서드다 es6메서드는 [[HomeObject]]를 갖는다
    //sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 derived를 가리키고
    //super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킨다
    sayHi() {
        return `${super.sayHi()}. how are you doing?`
    }
};

console.log(base.sayHi());
console.log(derived.sayHi());

const derived2 = {
    __proto__:base,
    //sayHi는 es6 메서드가 아니다
    //따라서 sayHi는 [[HomeObject]]를 갖지 않으므로 super 키워드를 사용할 수 없다
    sayHi:function() {
        //SyntaxError : 'super'Keyword unexpected here
        return `${super.sayHi()}`
    }
};
//=> 메서드를 정의할때 프로퍼티 값으로 익명 함수 펴현식을 할당하는 es6 이전 방식은 사용하지 않는것이 좋다