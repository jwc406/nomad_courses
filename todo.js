const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"); //html 투두리스트

const TODOS_LS = "toDos"; //문자열 오타 방지를 위해 문자열 자체를 변수로 정해줌    

let toDos = [];
let idNumbers = 1;

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const index = parseInt(li.id); // 지워줄 id를 가져옵니다.
    toDos.splice(index, 1); //배열에서 인덱스 번호 그 요소 하나만 지웁니다
    console.log(toDos); //콘솔에서 확인해보세요
    saveToDos(); // 그대로 다시 저장해줍니다.
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length;
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    delBtn.innerHTML = "X";
    delBtn.style = "border: none; background-color:rgba(0,0,0,0); color:white; margin-left:20px;"
    li.appendChild(span); //(안에거)를 파더 요소에 넣는 함수 : 스팬을 li에 넣음
    li.appendChild(delBtn); //delBtn을 li에 넣음li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = { //투두리스트 객체생성, 넘겨받은 텍스트와 배열 첨자 id를 가짐 
        text: text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //Enter후 todo 생성하고, form 에 있는 value 값 없애기
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    } 
}
//toDos 가져옴 -> 가져온것 오브젝트로 변환 -> 이를 각각 출력

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();