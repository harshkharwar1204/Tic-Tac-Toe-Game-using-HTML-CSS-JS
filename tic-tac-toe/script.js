let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-game-button");
let winmsg = document.getElementById("winmsg");
let msg = document.getElementById("msg");

let turn0 = true;
let gameEnded = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && !gameEnded) {
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
            checkDraw();
        }
    });
});

const checkWinner = () => {
    for (const patterns of winPatterns) {
        let pos1val = boxes[patterns[0]].innerText;
        let pos2val = boxes[patterns[1]].innerText;
        let pos3val = boxes[patterns[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                displayWinner(pos1val);
                gameEnded = true;
                resetbtn.style.display = "none"; // Hide reset button when game ends
                break;
            }
        }
    }
};

const checkDraw = () => {
    if ([...boxes].every((box) => box.innerText !== "") && !gameEnded) {
        displayDraw();
        gameEnded = true;
        resetbtn.style.display = "none"; // Hide reset button when game ends
    }
};

const displayWinner = (winner) => {
    document.querySelector(".container").style.display = "none";
    winmsg.style.display = "flex";
    msg.innerHTML = `<div style="text-align: center;">
                        <span style="font-size: 5rem; color: #4F6D7A; font-weight: bold;">${winner}</span><br>
                        <span style="font-size: 5rem; color: #4F6D7A; font-weight: bold;">WINNER!</span>
                    </div>`;
};


const displayDraw = () => {
    document.querySelector(".container").style.display = "none";
    winmsg.style.display = "flex";
    msg.innerHTML = `<div style="text-align: center;">
                        <span style="font-size: 3rem; font-weight: bold;">XO</span><br>
                        <span style="font-size: 2.5rem; color: #4a4a4a; font-weight: bold;">DRAW!</span>
                    </div>`;
};

resetbtn.addEventListener("click", () => {
    resetGame();
});

newGameBtn.addEventListener("click", () => {
    resetGame();
});

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    document.querySelector(".container").style.display = "grid";
    winmsg.style.display = "none";
    turn0 = true;
    gameEnded = false;
    resetbtn.style.display = "block"; // Show the reset button for a new game
};
