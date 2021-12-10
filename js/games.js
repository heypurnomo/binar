const bgColorChoice = "#c4c4c4";
const bgColorWin = "#4c9654";
const bgColorDraw = "#035b0c";

const userChoices = document.querySelectorAll(".user-choices .choice");
const comChoices = document.querySelectorAll(".com-choices .choice");
const reset = document.getElementsByClassName("reset")[0];
const hasil = document.getElementsByClassName("hasil")[0];
const textHasil = document.getElementById("text-hasil");
const vs = document.getElementsByClassName("text-vs")[0];
const userScore = document.getElementsByClassName("user-score")[0];
const comScore = document.getElementsByClassName("com-score")[0];

// membuat f animasi pada img user
// keyframes rotasi-user sudah dibuat di file games.css
const animationUserOn = "rotasi-user 2s infinite"; 
const animationUserOff = "none"

function animationUser(onOff){
    function imgAnimation(){
        this.getElementsByTagName("img")[0].style.animation = onOff;
    }
    function imgAnimationOff(){
        this.getElementsByTagName("img")[0].style.animation = "none";
    }
    for (const userChoice of userChoices){
        userChoice.addEventListener("mouseover", imgAnimation);
        userChoice.addEventListener("click", imgAnimationOff);
        userChoice.addEventListener("mouseout", imgAnimationOff);
    }
}
animationUser(animationUserOn);

// membuat f yang akan dipanggil saat menambahkan event click pd user choice
function gameSuit(){
    let player1 = "";
    let com = "";

    //menghilangkan event click pd user choice 
    for (const userChoice of userChoices){
        userChoice.removeEventListener("click", gameSuit);
        userChoice.style.cursor = "default"
    }

    // merubah tampilan pada user
    animationUser(animationUserOff);
    this.style.backgroundColor = bgColorChoice;
    //mengambil value pilihan player1 dari html
    player1 = this.getAttribute("value"); 
    
    //mengacak angka 0,1,2 u/ pilihan com
    let random = Math.floor(Math.random() * 3);
    if (random === 0){
        com = "batu";
    } else if (random === 1){
        com = "kertas";
    } else {
        com = "gunting";
    }

    //memberi animasi mengacak pilihan com & menampilkan hasil game
    let pengulangan = 12 + random;
    for (let i = 0; i <= pengulangan; i++){
        setTimeout(() => {
            // animasi acak pilihan com
            comChoices[i % 3].style.backgroundColor = bgColorChoice;
            if (i % 3 === 0){
                comChoices[2].style.backgroundColor = "transparent";  
            } else {
                comChoices[(i % 3) - 1].style.backgroundColor = "transparent";
            }
            // membuat peraturan game & merubah tampilan hasil dgn memanggil f hasilGame
            if (i === pengulangan){
                if (player1 === com) { 
                    hasilGame(draw, bgColorDraw);
                } else if (player1 === "batu") {
                    (com === "kertas") ? hasilGame(comWin) : hasilGame(player1Win);
                } else if (player1 === "kertas") {
                    (com === "gunting") ? hasilGame(comWin) : hasilGame(player1Win);
                } else if (player1 === "gunting") {
                    (com === "batu") ? hasilGame(comWin) : hasilGame(player1Win);
                }
            }
        }, i * 50 );
    }

    //menambah event click pd reset
    setTimeout(() => {
        resetBtn(resetOn);
    }, 1500);
}

// membuat f u/ merubah tampilan hasil & score
const player1Win = "player 1 <br>win";
const comWin = "com <br>win";
const draw = "draw";
let userPoint = 0;
let comPoint = 0;

function hasilGame(text, bgColor = bgColorWin){
    vs.style.display = "none";
    hasil.style.display = "block";
    hasil.style.backgroundColor = bgColor;
    textHasil.innerHTML = text;
    if (text === player1Win){
        userPoint++;
        if (userPoint < 10){
            userScore.innerHTML = "0" + userPoint;
        } else {
            userScore.innerHTML = userPoint;
        }
    } else if (text === comWin){
        comPoint++;
        if (comPoint < 10){
            comScore.innerHTML = "0" + comPoint;
        } else {
            comScore.innerHTML = comPoint;
        }
    }
}

// membuat f u/ on off tombol reset
// keyframes rotasi-reset sudah dibuat di file games.css
const resetOn = ["on", "pointer", "rotasi-reset 2s infinite"];
const resetOff = ["off", "default", "none"];

function resetBtn(onOff){
    if (onOff[0] === "on") {
        reset.addEventListener("click", mulaiUlang);  
    } else {
        reset.removeEventListener("click", mulaiUlang);
    }
    reset.style.cursor = onOff[1];
    reset.style.animation = onOff[2];
}

// membuat f u/ memulai ulang game
function mulaiUlang(){
    vs.style.display = "block";
    hasil.style.display = "none";
    resetBtn(resetOff);
    for (const comChoice of comChoices){
        comChoice.style.backgroundColor = "transparent";
    }
    for (const userChoice of userChoices){
        userChoice.style.backgroundColor = "transparent";
        userChoice.style.cursor = "pointer";
        userChoice.addEventListener("click", gameSuit);
    }
    animationUser(animationUserOn);
}

// membuat event click pd user choice yang akan menjalankan f gameSuit saat di click
for (const userChoice of userChoices){
    userChoice.addEventListener("click", gameSuit);
}