const bgColorChoice = "#c4c4c4";
//querySelectorAll mengembalikan array / variablenya berisi array
const userChoice = document.querySelectorAll(".user-choices .choice");
const comChoice = document.querySelectorAll(".com-choices .choice");
const userChoiceImg = document.querySelectorAll(".user-choices .choice img");
//getElements paten s akan mngembalikan array meskipun isinya cuma satu
const reset = document.getElementsByClassName("reset")[0];
const hasil = document.getElementsByClassName("hasil")[0];
const textHasil = document.getElementsByClassName("text-hasil")[0];
const vs = document.getElementsByClassName("text-vs")[0];

// membuat f u/ merubah tampilan hasil
function player1Win(){
    vs.style.display = "none";
    hasil.style.display = "block";
    textHasil.innerHTML = "player 1 <br>win";
}
function comWin(){
    vs.style.display = "none";
    hasil.style.display = "block";
    textHasil.innerHTML = "com <br>win";
}
function draw(){
    vs.style.display = "none";
    hasil.style.display = "block";
    hasil.style.backgroundColor = "#035b0c";
    textHasil.innerHTML = "draw";
}

// membuat f yang akan dipanggil saat menambahkan event click pd user choice
const gameSuit = function(){//ketika dijalankan akan...
    let player1 = "";
    let com = "";

    for (const e of userChoiceImg){
        e.style.animation = "none"; //menghilangkan animasi img player1
    }
    this.style.backgroundColor = bgColorChoice; //merubah bgColor player1 yg di click
    player1 = this.getAttribute("value"); //mengambil value pilihan player1 dari html
    
    let random = Math.floor(Math.random()*3); //mengacak angka 0,1,2
    if (random === 0){ //merubah angka menjadi string dan dimasukkan ke com
        com = "batu";
    } else if (random === 1){
        com = "kertas";
    } else {
        com = "gunting";
    }
    comChoice[random].style.backgroundColor = bgColorChoice; //merubah bgColor com yg terpilih

    if (player1 === com) { // membuat peraturan game & merubah tampilan hasil dgn memanggil f
        draw();
    } else if (player1 === "batu") {
        (com === "kertas") ? comWin() : player1Win();
    } else if (player1 === "kertas") {
        (com === "gunting") ? comWin() : player1Win();
    } else if (player1 === "gunting") {
        (com === "batu") ? comWin() : player1Win();
    }

    if (player1){ //menghilangkan event click pd user choice & menambah event click pd reset
        for (let i = 0; i <= 2; i++){
            userChoice[i].removeEventListener("click", gameSuit);
            userChoice[i].style.cursor = "default"
        }
        reset.addEventListener("click", ()=>{location.reload()});
        reset.style.cursor = "pointer";  
    }
}

// membuat event click pd user choice yang akan menjalankan f gameSuit saat di click
for (let i = 0; i <= 2; i++){
    userChoice[i].addEventListener("click", gameSuit);
}