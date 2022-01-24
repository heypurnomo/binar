const userChoices = document.querySelectorAll(".user-choices .choice");
const comChoices = document.querySelectorAll(".com-choices .choice");
const reset = document.getElementsByClassName("reset")[0];
const hasil = document.getElementsByClassName("hasil")[0];
const textHasil = document.getElementById("text-hasil");
const vs = document.getElementsByClassName("text-vs")[0];
const userScore = document.getElementsByClassName("user-score")[0];
const comScore = document.getElementsByClassName("com-score")[0];

class Player {
    constructor(element = userChoices[0]) {
        this.element = element;
        this.pilihan = this.element.getAttribute("value");
        this.bgColorChoice = "#c4c4c4";
    }
    ubahBgColor() {
        this.element.style.backgroundColor = this.bgColorChoice;
    }
    matikanAnimasi() {
        for (const userChoice of userChoices) {
            userChoice.classList.remove("hover");
        }
    }
    hidupkanAnimasi() {
        for (const userChoice of userChoices) {
            userChoice.classList.add("hover");
        }
    }
}

class Computer {
    constructor() {
        this.acak = Math.floor(Math.random() * 3);
        this.pilihan = "";
    }
    acakPilihan() {
        if (this.acak === 0) {
            this.pilihan = "batu";
        } else if (this.acak === 1) {
            this.pilihan = "kertas";
        } else {
            this.pilihan = "gunting";
        }
    }
}

let playerPoint = 0;
let comPoint = 0;
class GameLogic {
    constructor(player1Pilihan, comPilihan, comAcak) {
        this.player1Win = "player 1 <br>win";
        this.comWin = "com <br>win";
        this.draw = "draw";
        this.bgColorWin = "#4c9654";
        this.bgColorDraw = "#035b0c";
        this.bgColorChoice = "#c4c4c4";
        this.animasiAcakCom = 12 + comAcak;
        this.player1 = player1Pilihan;
        this.com = comPilihan;
    }
    hasilGame(text, bgColor = this.bgColorWin) {
        vs.style.display = "none";
        hasil.style.display = "block";
        hasil.style.backgroundColor = bgColor;
        textHasil.innerHTML = text;
        if (text === this.player1Win) {
            playerPoint++;
            if (playerPoint < 10) {
                userScore.innerHTML = "0" + playerPoint;
            } else {
                userScore.innerHTML = playerPoint;
            }
        } else if (text === this.comWin) {
            comPoint++;
            if (comPoint < 10) {
                comScore.innerHTML = "0" + comPoint;
            } else {
                comScore.innerHTML = comPoint;
            }
        }
    }
    jalankanGameLogic() {
        for (let i = 0; i <= this.animasiAcakCom; i++) {
            setTimeout(() => {
                // animasi acak pilihan com
                comChoices[i % 3].style.backgroundColor = this.bgColorChoice;
                if (i % 3 === 0) {
                    comChoices[2].style.backgroundColor = "transparent";
                } else {
                    comChoices[(i % 3) - 1].style.backgroundColor = "transparent";
                }
                // game logic
                if (i === this.animasiAcakCom) {
                    if (this.player1 === this.com) {
                        this.hasilGame(this.draw, this.bgColorDraw);
                    } else if (this.player1 === "batu") {
                        (this.com === "kertas") ? this.hasilGame(this.comWin) : this.hasilGame(this.player1Win);
                    } else if (this.player1 === "kertas") {
                        (this.com === "gunting") ? this.hasilGame(this.comWin) : this.hasilGame(this.player1Win);
                    } else if (this.player1 === "gunting") {
                        (this.com === "batu") ? this.hasilGame(this.comWin) : this.hasilGame(this.player1Win);
                    }
                }
            }, i * 50);
        }
    }
    resetOn() {
        reset.style.cursor = "pointer";
        reset.style.animation = "rotasi-reset 2s infinite";
        reset.addEventListener("click", function mulaiUlang() {
            vs.style.display = "block";
            hasil.style.display = "none";
            reset.removeEventListener("click", mulaiUlang)
            reset.style.cursor = "default";
            reset.style.animation = "none";
            for (const comChoice of comChoices) {
                comChoice.style.backgroundColor = "transparent";
            }
            for (const userChoice of userChoices) {
                userChoice.style.backgroundColor = "transparent";
                userChoice.style.cursor = "pointer";
                userChoice.addEventListener("click", jalankanGame);
            }
            const player1 = new Player();
            player1.hidupkanAnimasi();
        });
    }
}

function jalankanGame() {
    // menghilangkan event click pada user choice
    for (const userChoice of userChoices) {
        userChoice.removeEventListener("click", jalankanGame);
        userChoice.style.cursor = "default";
    }
    // this disini adalah element yang di click, soalnya function ini dipanggil di event click
    const player1 = new Player(this);
    player1.ubahBgColor();
    player1.matikanAnimasi();

    const com = new Computer;
    com.acakPilihan();

    const game = new GameLogic(player1.pilihan, com.pilihan, com.acak);
    game.jalankanGameLogic();

    setTimeout(() => {
        game.resetOn()
    }, 1500);
}

// membuat event click pd user choice yang akan menjalankan f gameSuit saat di click
for (const userChoice of userChoices) {
    userChoice.addEventListener("click", jalankanGame);
}
