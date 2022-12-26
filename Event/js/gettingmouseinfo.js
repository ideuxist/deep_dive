const box = document.querySelector('.box');
console.log(box)
//드래그 시작시 마우스 좌표값
const initialMousePos = {x:0,y:0};
//오프셋:이동할 거리
const offset = {x:0,y:0}
//mousemove 이벤트 핸들러
const move = (e) => {
    offset.x = e.clientX - initialMousePos.x;
    offset.y = e.clientY - initialMousePos.y;
    
    //translate3d는 GPU를 사용하므로 absolute의 top, left를 사용하는것 보다 빠르다
    //top,left는 레이아웃에 영향을 준다
    console.log(offset.x);
    box.style.transform = `translate3d(${offset.x}px, ${offset.y}px,0)`;
}
    //mousedown 이벤트가 발생하면 드래그 시작 시점의 마우스 포인터 좌표를 저장한다
    box.addEventListener('mousedown',e=>{
        initialMousePos.x = e.clientX - offset.x;
        initialMousePos.y = e.clientY - offset.y;

        document.addEventListener('mousemove',move);
       
    });

    document.addEventListener('mouseup',()=>{
        document.removeEventListener('mousemove',move);
        

    })



