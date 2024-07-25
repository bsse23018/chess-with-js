class chess {
    let
    turn;
    let
    array = [];
    let
    guider = [];
    let
    CurrSelectionX = -1;
    let
    CurrSelectionY = -1;
    let
    DestinationX = -1;
    let
    DestinationY = -1;

    constructor() {
        this.turn = 'w';
        this.array = Array.from({length: 8}, () => Array(8).fill(0));
        this.guider = Array.from({length: 8}, () => Array(8).fill(0));
        for (let i = 0; i < 8; i++) {
            this.array[1][i] = 'wp'; // White pawns
            this.array[6][i] = 'bp'; // Black pawns
        }
        this.array[0][0] = this.array[0][7] = 'wr'; // White rooks
        this.array[7][0] = this.array[7][7] = 'br'; // Black rooks

        this.array[0][1] = this.array[0][6] = 'wn'; // White knights
        this.array[7][1] = this.array[7][6] = 'bn'; // Black knights

        this.array[0][2] = this.array[0][5] = 'wb'; // White bishops
        this.array[7][2] = this.array[7][5] = 'bb'; // Black bishops

        this.array[0][3] = 'wq'; // White queen
        this.array[7][3] = 'bq'; // Black queen

        this.array[0][4] = 'wk'; // White king
        this.array[7][4] = 'bk'; // Black king


    }

    InitilaizeGuider() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.guider[i][j] = 0;
            }
        }
    }

    MoveGuider() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.DestinationX = i;
                this.DestinationY = j;
                if (this.MoveDecider()) {
                    if (this.array[this.DestinationX][this.DestinationY] !== 0) {
                        if (this.array[this.DestinationX][this.DestinationY] !== this.turn) {
                            this.guider[i][j] = 2;
                        }
                    } else {
                        this.guider[i][j] = 1;
                    }
                }
            }
        }
        this.DestinationX = -1;
        this.DestinationY = -1;
    }

    MoveDecider() {
        if (obj.turn !== this.array[this.CurrSelectionX][this.CurrSelectionY][0]) {
            return false;
        }
        switch (this.array[this.CurrSelectionX][this.CurrSelectionY][1]) {
            case "p": {
                return this.Prone();
            }
            case "k": {
                return this.King();
            }
            case "b": {
                return this.Bishop();
            }

            case "n": {
                return this.Knight();
            }
            case 'r': {
                return this.Rock();
            }
            case "q": {
                return this.Queen();
            }
        }
    }


    Rock() {
        if (this.array[this.CurrSelectionX][this.CurrSelectionY][0] !== this.array[this.DestinationX][this.DestinationY][0]) {
            //(1);
            if (!((this.CurrSelectionX === this.DestinationX) && (this.CurrSelectionY === this.DestinationY))) {
                //(2);
                if ((this.CurrSelectionX === this.DestinationX) || (this.CurrSelectionY === this.DestinationY)) {
                    //(3);
                    if (this.CurrSelectionX === this.DestinationX) {
                        //(4);
                        if (this.CurrSelectionY < this.DestinationY) {
                            //(5);
                            for (let i = this.CurrSelectionY + 1; i < this.DestinationY; ++i) {
                                if (this.array[this.CurrSelectionX][i] !== 0) {
                                    //(6);
                                    return false;
                                }
                            }
                            return true;
                        } else if (this.CurrSelectionY > this.DestinationY) {
                            //(7);
                            for (let i = this.CurrSelectionY - 1; i > this.DestinationY; --i) {
                                //(8);
                                if (this.array[this.CurrSelectionX][i] !== 0) {
                                    //(9);
                                    return false;
                                }
                            }
                            return true;
                        }
                    } else if (this.CurrSelectionY === this.DestinationY) {
                        //(10);
                        if (this.CurrSelectionX < this.DestinationX) {
                            //(11);
                            for (let i = this.CurrSelectionX + 1; i < this.DestinationX; ++i) {
                                if (this.array[i][this.CurrSelectionY] !== 0) {
                                    //(12);
                                    return false;
                                }
                            }
                            return true;
                        } else if (this.CurrSelectionX > this.DestinationX) {
                            //(13);
                            for (let i = this.CurrSelectionX - 1; i > this.DestinationX; --i) {
                                if (this.array[i][this.CurrSelectionY] !== 0) {
                                    //(14);
                                    return false;
                                }
                            }
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    Bishop() {
        for (let i = this.CurrSelectionX, j = this.CurrSelectionY; j < 8; ++j, ++i) {
            if (i === this.DestinationX && j === this.DestinationY) {
                if (((this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'b') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'w' || this.array[this.DestinationX][this.DestinationY] === 0)) ||
                    (
                        (this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'w') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'b' || this.array[this.DestinationX][this.DestinationY] === 0)

                    )) {
                    for (let k = this.CurrSelectionX + 1, l = this.CurrSelectionY + 1; k < this.DestinationX || l < this.DestinationY; ++k, ++l) {
                        if (this.array[k][l] !== 0) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        for (let i = this.CurrSelectionX, j = this.CurrSelectionY; j >= 0 || i < 8; ++i, --j) {
            if (i === this.DestinationX && j === this.DestinationY) {
                if (((this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'b') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'w' || this.array[this.DestinationX][this.DestinationY] === 0)) ||
                    (
                        (this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'w') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'b' || this.array[this.DestinationX][this.DestinationY] === 0)
                    )) {

                    for (let k = this.CurrSelectionX + 1, l = this.CurrSelectionY - 1; k < this.DestinationX || l > this.DestinationY; ++k, --l) {
                        if (this.array[k][l] !== 0) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        for (let i = this.CurrSelectionX, j = this.CurrSelectionY; i >= 0; --i, --j) {
            if (i === this.DestinationX && j === this.DestinationY) {
                if (((this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'b') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'w' || this.array[this.DestinationX][this.DestinationY] === 0)) ||
                    (
                        (this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'w') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'b' || this.array[this.DestinationX][this.DestinationY] === 0)
                    )) {

                    for (let k = this.CurrSelectionX - 1, l = this.CurrSelectionY - 1; k > this.DestinationX || l > this.DestinationY; --k, --l) {
                        if (this.array[k][l] !== 0) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        for (let i = this.CurrSelectionX, j = this.CurrSelectionY; i >= 0 || j < 8; --i, ++j) {
            if (i === this.DestinationX && j === this.DestinationY) {
                if (((this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'b') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'w' || this.array[this.DestinationX][this.DestinationY] === 0)) ||
                    (
                        (this.array[this.CurrSelectionX][this.CurrSelectionY][0] === 'w') &&
                        (this.array[this.DestinationX][this.DestinationY][0] === 'b' || this.array[this.DestinationX][this.DestinationY] === 0)
                    )) {

                    for (let k = this.CurrSelectionX - 1, l = this.CurrSelectionY + 1; k > this.DestinationX || l < this.DestinationY; --k, ++l) {
                        if (this.array[k][l] !== 0) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }

    King() {
        if ((this.array[this.DestinationX][this.DestinationY] !== 0) || (this.array[this.DestinationX][this.DestinationY][0] === this.array[this.CurrSelectionX][this.CurrSelectionY][0])) {
            return false;
        }
        if (this.CurrSelectionX === this.DestinationX) {
            if ((this.CurrSelectionY + 1 === this.DestinationY) || (this.CurrSelectionY - 1 === this.DestinationY)) {

                return true;
            }
        }
        if (this.CurrSelectionY === this.DestinationY) {
            if ((this.CurrSelectionX + 1 === this.DestinationX) || (this.CurrSelectionX - 1 === this.DestinationX)) {
                return true;
            }
        }
        if (((this.CurrSelectionX + 1 === this.DestinationX) && (this.CurrSelectionY + 1 === this.DestinationY)) || ((this.CurrSelectionX - 1 === this.DestinationX) && (this.CurrSelectionY - 1 === this.DestinationY))) {
            return true;
        }
        if (((this.CurrSelectionX + 1 === this.DestinationX) && (this.CurrSelectionY - 1 === this.DestinationY)) || ((this.CurrSelectionX - 1 === this.DestinationX) && (this.CurrSelectionY + 1 === this.DestinationY))) {
            return true;
        }
        return false;
    }

    Queen() {
        if (this.Bishop()) {
            return true;
        }
        if (this.Rock()) {
            return true;
        }
        return false;
    }

    Knight() {
        if (this.array[this.CurrSelectionX][this.CurrSelectionY][0] === this.array[this.DestinationX][this.DestinationY][0]) {
            return false;
        }
        if ((this.CurrSelectionX + 2 === this.DestinationX && this.CurrSelectionY - 1 === this.DestinationY) || (this.CurrSelectionX + 2 === this.DestinationX && this.CurrSelectionY + 1 === this.DestinationY)) {
            return true;
        }
        if ((this.CurrSelectionX - 1 === this.DestinationX && this.CurrSelectionY + 2 === this.DestinationY) || (this.CurrSelectionX + 1 === this.DestinationX && this.CurrSelectionY + 2 === this.DestinationY)) {
            return true;
        }
        if ((this.CurrSelectionX - 2 === this.DestinationX && this.CurrSelectionY - 1 === this.DestinationY) || (this.CurrSelectionX - 2 === this.DestinationX && this.CurrSelectionY + 1 === this.DestinationY)) {
            return true;
        }
        if ((this.CurrSelectionX - 1 === this.DestinationX && this.CurrSelectionY - 2 === this.DestinationY) || (this.CurrSelectionX + 1 === this.DestinationX && this.CurrSelectionY - 2 === this.DestinationY)) {
            return true;
        }

        return false;
    }

    Prone() {
        if (this.array[this.CurrSelectionX][this.CurrSelectionY] === "bp") {
            //for single diagnol move to kill
            if (this.CurrSelectionX - 1 === this.DestinationX && ((this.CurrSelectionY - 1 === this.DestinationY) || (this.CurrSelectionY + 1 === this.DestinationY))) {
                if (this.array[this.DestinationX][this.DestinationY][0] === 'w') {
                    return true;
                }
            }
            //straight move
            if ((this.CurrSelectionX === 6) && (this.CurrSelectionY === this.DestinationY)) {
                if ((this.CurrSelectionX - 2 === this.DestinationX) && (this.CurrSelectionY === this.DestinationY)) {
                    if (this.array[this.DestinationX][this.DestinationY] === 0) {
                        return true;
                    }
                }
            }
            if (this.CurrSelectionY === this.DestinationY) {
                if (this.CurrSelectionX - 1 === this.DestinationX) {
                    if (this.array[this.DestinationX][this.DestinationY] === 0) {
                        return true;
                    }
                }
            }
        } else if (this.array[this.CurrSelectionX][this.CurrSelectionY] === "wp") {
            if (this.CurrSelectionX + 1 === this.DestinationX && ((this.CurrSelectionY - 1 === this.DestinationY) || (this.CurrSelectionY + 1 === this.DestinationY))) {
                if (this.array[this.DestinationX][this.DestinationY][0] === 'b') {
                    return true;
                }
            }
            if (this.CurrSelectionX === 1 && this.CurrSelectionY === this.DestinationY) {
                if (this.CurrSelectionX + 2 === this.DestinationX && this.CurrSelectionY === this.DestinationY) {
                    if (this.array[this.DestinationX][this.DestinationY] === 0) {
                        return true;
                    }
                }
            }
            if (this.CurrSelectionY === this.DestinationY) {
                if (this.CurrSelectionX + 1 === this.DestinationX) {
                    if (this.array[this.DestinationX][this.DestinationY] === 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


}

function removeClick() {
    let container = document.getElementsByClassName('box');
    for (let i = 0; i < container.length; i++) {
        if (container[i].classList.contains("click")) {
            container[i].classList.remove("click");
            container[i].style.backgroundColor = '';

        }
    }
}

let obj = new chess;
let count = 2;

function displayBoard() {
    document.getElementById("chessboard").innerHTML = '';
    for (let i = 0; i < 8; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', `row row${i}`);
        for (let j = 0; j < 8; j++) {
            let box = document.createElement('div');
            box.setAttribute('class', `box ${((i + j) % 2 === 0) ? 'black' : ''}`);
            box.setAttribute('id', `box${i}${j}`);
            box.setAttribute('data-index', `${i}${j}`);
            if (obj.guider[i][j] === 1) {
                box.style.backgroundColor = '#02fcdf';
            } else if (obj.guider[i][j] === 2) {
                box.style.backgroundColor = 'red';
            }
            console.log(obj.guider);

            row.append(box);
            if (obj.array[i][j] !== 0) {
                let img = document.createElement('img');
                img.src = obj.array[i][j] + ".png";
                box.append(img);
            }
        }
        document.querySelector(".container").append(row);
    }

    // Attach event listener to all boxes
    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("click", e => {
            if (count % 2 === 0) {
                obj.CurrSelectionX = parseInt(e.currentTarget.dataset.index[0]);
                obj.CurrSelectionY = parseInt(e.currentTarget.dataset.index[1]);
                obj.MoveGuider();
                displayBoard();
            } else {
                obj.InitilaizeGuider();
                removeClick();
                obj.DestinationX = parseInt(e.currentTarget.dataset.index[0]);
                obj.DestinationY = parseInt(e.currentTarget.dataset.index[1]);
                if (obj.MoveDecider()) {
                    if (obj.turn === 'b')
                        obj.turn = 'w'
                    else
                        obj.turn = 'b'
                    if (obj.array[obj.DestinationX][obj.DestinationY]==="wk"){
                        alert("Black wins");
                        obj=new chess();
                        displayBoard();
                    }else if (obj.array[obj.DestinationX][obj.DestinationY]==="bk"){
                        alert("White wins")
                        obj=new chess();
                        displayBoard();
                    }else{
                        obj.array[obj.DestinationX][obj.DestinationY] = obj.array[obj.CurrSelectionX][obj.CurrSelectionY]
                        obj.array[obj.CurrSelectionX][obj.CurrSelectionY] = 0;
                    }
                }
                displayBoard();
            }
            count++;
        });
    });
}


async function main() {
    alert("White Turn First");
    displayBoard();
}

main();


