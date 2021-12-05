const bgColorChoice = "#c4c4c4";
const bgColorWin = "#4c9654";
const bgColorDraw = "#035b0c";

const userChoice = document.querySelectorAll(".user-choices .choice");
const comChoice = document.querySelectorAll(".com-choices .choice");
const reset = document.getElementsByClassName("reset")[0];
const hasil = document.getElementsByClassName("hasil")[0];
const textHasil = document.getElementsByClassName("text-hasil")[0];
const vs = document.getElementsByClassName("text-vs")[0];

// membuat f animasi pada user
// keyframes rotasi sudah dibuat di file games.css
const animationUserOn = "rotasi 2s infinite"; 
const animationUserOff = "none"
function animationUser(onOff){
    function imgAnimation(){
        this.getElementsByTagName("img")[0].style.animation = onOff;
    }
    function imgAnimationOff(){
        this.getElementsByTagName("img")[0].style.animation = "none";
    }
    for (const e of userChoice){
        e.addEventListener("mouseover", imgAnimation);
        e.addEventListener("click", imgAnimationOff);
        e.addEventListener("mouseout", imgAnimationOff);
    }
}
animationUser(animationUserOn);

// membuat f u/ merubah tampilan hasil
const player1Win = "player 1 <br>win";
const comWin = "com <br>win";
const draw = "draw";
function hasilGame(text, bgColor = bgColorWin){
    vs.style.display = "none";
    hasil.style.display = "block";
    hasil.style.backgroundColor = bgColor;
    textHasil.innerHTML = text; 
}

// membuat f yang akan dipanggil saat menambahkan event click pd user choice
function gameSuit(){
    let player1 = "";
    let com = "";

    // merubah tampilan pada user
    animationUser(animationUserOff);
    this.style.backgroundColor = bgColorChoice;
    //mengambil value pilihan player1 dari html
    player1 = this.getAttribute("value"); 
    
    //mengacak angka 0,1,2 u/ pilihan com
    let random = Math.floor(Math.random()*3);
    if (random === 0){
        com = "batu";
    } else if (random === 1){
        com = "kertas";
    } else {
        com = "gunting";
    }
    //merubah bgColor com yg terpilih
    comChoice[random].style.backgroundColor = bgColorChoice; 

    // membuat peraturan game & merubah tampilan hasil dgn memanggil f hasilGame
    if (player1 === com) { 
        hasilGame(draw, bgColorDraw);
    } else if (player1 === "batu") {
        (com === "kertas") ? hasilGame(comWin) : hasilGame(player1Win);
    } else if (player1 === "kertas") {
        (com === "gunting") ? hasilGame(comWin) : hasilGame(player1Win);
    } else if (player1 === "gunting") {
        (com === "batu") ? hasilGame(comWin) : hasilGame(player1Win);
    }

    //menghilangkan event click pd user choice & menambah event click pd reset
    if (player1){ 
        for (const e of userChoice){
            e.removeEventListener("click", gameSuit);
            e.style.cursor = "default"
        }
        reset.addEventListener("click", mulaiUlang);
        reset.style.cursor = "pointer";  
    }
}

// membuat event click pd user choice yang akan menjalankan f gameSuit saat di click
for (const e of userChoice){
    e.addEventListener("click", gameSuit);
}

// membuat f u/ memulai ulang game
function mulaiUlang(){
    vs.style.display = "block";
    hasil.style.display = "none";
    for (const e of userChoice){
        e.style.backgroundColor = "transparent";
        e.style.cursor = "pointer";
    }
    for (const e of comChoice){
        e.style.backgroundColor = "transparent";
    }
    reset.style.cursor = "default";
    for (const e of userChoice){
        e.addEventListener("click", gameSuit);
    }
    animationUser(animationUserOn);
}