const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings") //해당 클래스 태그를 가져오는건가?

const USER_LS = "currentUser", //키값
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text); 
    /* 텍스트인 인자를 받아와서, 로컬 스토리지에 
    키값을 currentUser로 하여 받아온 값을 set한다*/
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN); //이름 입력 폼 보여주기
    form.addEventListener("submit", handleSubmit); //제출 이벤트 시 함수 실행
}    

function paintGreeting(text){ //유저네임 넘겨주고
    form.classList.remove(SHOWING_CN); //폼 삭제
    greeting.classList.add(SHOWING_CN); //그리팅 클래스에 showing추가
    greeting.innerText = `Hello, ${text}!`; //그리팅 내부 텍스트 '헬로 유저네임'으로 바꿔줌
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){ //스토리지에 유저 null인 경우
        askForName();
    } else {
        paintGreeting(currentUser); //스토리지에 유저네임 있으면
    }
}

function init(){
    loadName();
}

init(); 