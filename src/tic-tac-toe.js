class TicTacToe {
    constructor() {
        this.area = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.gamePlayers = {
            player1:'x',
            player2: 'o',
        };
        this.currentPlayer = 'x';
        this.gameFinish = false;
        this.gameWinner = null;

        this.getCurrentPlayerSymbol = this.getCurrentPlayerSymbol.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.isFinished = this.isFinished.bind(this);
        this.getWinner = this.getWinner.bind(this);
        this.noMoreTurns = this.noMoreTurns.bind(this);
        this.isDraw = this.isDraw.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this._getAreaZero = this._getAreaZero.bind(this);
        this._checkWinerThisPlayer = this._checkWinerThisPlayer.bind(this);
    }

    // return x or o
    getCurrentPlayerSymbol() {
        return this.currentPlayer;
    }

    //  update class state (change current player, update marks storage etc.)
    nextTurn(rowIndex, columnIndex) {

        // game finished
        if (this.gameFinish) return `sorry, but player ${this.currentPlayer} has won`;
        // don't zero in area
        if (!this._getAreaZero()) return 'don\'t area';
        // if area employed
        if(this.area[rowIndex][columnIndex] !== null) return 'no no no'

        this.area[rowIndex][columnIndex] = this.currentPlayer;

        this._checkWinerThisPlayer();
        this.isDraw();

        this.currentPlayer = (this.currentPlayer === 'x') ? 'o' : 'x';

        return 'ok';
    }

    // return true if game is finished (e.g. there is a winner or it is a draw)
    isFinished() {
        return this.gameFinish;
    }

    // return winner symbol (x or o) or null if there is no winner yet
    getWinner() {
        return this.gameWinner;
    }

    // return true if there is no more fields to place a x or o
    noMoreTurns() {
        return !this._getAreaZero();
    }

    // return true if there is no more turns and no winner
    isDraw() {
        if (!this._getAreaZero() && this.gameWinner === null) {
            this.gameFinish = true;
            return true

        } else {
            return false;
        }
    }

    // return matrix[row][col] value (if any) or null
    getFieldValue(rowIndex, colIndex) {
        return this.area[rowIndex][colIndex];
    }

    // return null if null in area
    _getAreaZero() {
        let newArr = [];
        this.area.map(el => {
            newArr.push(...el)
        });

        return newArr.some(el => el === null);
    }

    // check winner player or not
    _checkWinerThisPlayer() {
        if (
            this.area[0][0] == this.currentPlayer && this.area[0][1] == this.currentPlayer && this.area[0][2] == this.currentPlayer
            || this.area[1][0] == this.currentPlayer && this.area[1][1] == this.currentPlayer && this.area[1][2] == this.currentPlayer
            || this.area[2][0] == this.currentPlayer && this.area[2][1] == this.currentPlayer && this.area[2][2] == this.currentPlayer
            || this.area[0][0] == this.currentPlayer && this.area[1][1] == this.currentPlayer && this.area[2][2] == this.currentPlayer
            || this.area[2][0] == this.currentPlayer && this.area[1][1] == this.currentPlayer && this.area[0][2] == this.currentPlayer
            || this.area[0][0] == this.currentPlayer && this.area[1][0] == this.currentPlayer && this.area[2][0] == this.currentPlayer
            || this.area[0][1] == this.currentPlayer && this.area[1][1] == this.currentPlayer && this.area[2][1] == this.currentPlayer
            || this.area[0][2] == this.currentPlayer && this.area[1][2] == this.currentPlayer && this.area[2][2] == this.currentPlayer
        ) {

            this.gameWinner = this.currentPlayer;
            this.gameFinish = true;

            return true;
        }
    }
}



module.exports = TicTacToe;
