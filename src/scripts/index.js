const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        life: document.querySelector("#life"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        gameVelocity: 900,
        hitPosition: 0,
        result: 0,
        lifes: 5,
        timeRound: 10,
    },
}
function randonBox(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })
    let randonNumber = Math.floor(Math.random() * 9)
    let randonEnemyBox = state.view.squares[randonNumber]
    randonEnemyBox.classList.add("enemy")
    state.values.hitPosition = randonEnemyBox.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randonBox, state.values.gameVelocity)
}

function soundClick(){
    let sound = new Audio("./src/sounds/click.mp3");
    sound.volume = 0.5
    sound.play();
}

function countDown(temp) {
    let restantTime = temp;
    
    let interval = setInterval(() => {        
        restantTime--;
        let min = Math.floor(restantTime / 60);
        let seg = restantTime % 60;

        state.view.time.textContent = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
        
        if (restantTime < 1) {
          state.values.lifes--;
          restantTime = state.values.timeRound;
          state.view.life.textContent = state.values.lifes;
          console.log(min, seg)
          state.view.time.textContent = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`; 
          alert("Tempo esgotado!!");
          
          clearInterval(interval);
        } else if(state.view.life < 1){
            
          alert("Tempo esgotado!!");
        }
    }, 1000);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {square.addEventListener("mousedown", () => {
        if(square.id === state.values.hitPosition){
            soundClick();
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
        }
    })})
}
function init(){
    moveEnemy()
    addListenerHitBox()
    
    countDown(state.values.timeRound)
 
}

init()