let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let highScore = localStorage.getItem("highScore") || 0;
let highScoreSpan = document.querySelector("#high-score");

highScoreSpan.innerText = highScore;


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started...");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },100);

    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 100);

}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = (`Level ${level}`);

    // Random
    let randomIdx = Math.floor(Math.random()*4);
    let randomcolor = btns[randomIdx];
    let randombutton = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);
    console.log(gameseq);
    gameFlash(randombutton);
}

function checkAns(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length  == gameseq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game over! , Your score was <b>${level}</b> <br> Press any key to start`;
        //document.querySelector("body").style.backgroundcolor = "blue";
        //setTimeout(function(){
        //    document.querySelector("body").style.backgroundcolor = "grey";
        //}, 50);


        // ✅ Update High Score
        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore);
            highScoreSpan.innerText = highScore;
        }

        document.body.classList.add("game-over", "shake");

        setTimeout(() => {
        document.body.classList.remove("game-over", "shake");
        }, 200);

        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


