const $input = document.getElementById('user');
$input.oninput = function(){
    console.log('value property',$input.value);
    console.log('value attribute',$input.getAttribute('value'));
}
const $checkBox = document.getElementById('checkbox');
console.log($checkBox.checked);
console.log($checkBox.getAttribute('checked'));

const $fruits = document.getElementById('fruits');
const $fruits2 = document.getElementsByTagName('ul');
console.log($fruits.childNodes);
console.log($fruits.children);
console.log($fruits);
console.log($fruits2);