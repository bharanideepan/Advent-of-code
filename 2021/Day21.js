let player1 = { pos: 5, score: 0 }
let player2 = { pos: 10, score: 0 }
let rolls = 0
let lastPos = 0
let count = 0
while (true) {
    count++
    let temp = [lastPos + 1, lastPos + 2, lastPos + 3].map(e => {
        if (e > 100) {
            return e % 100;
        }
        return e;
    })
    lastPos = temp[2];
    let newPos = player1.pos + temp.reduce((acc, val) => acc + val)
    newPos = newPos > 10 ? newPos % 10 == 0 ? 10 : newPos % 10 : newPos
    player1.pos = newPos
    player1.score += newPos;
    rolls = rolls + 3
    if (player1.score >= 1000) {
        console.log(player2.score * rolls, "player 1 wins")
        break
    }
    temp = [lastPos + 1, lastPos + 2, lastPos + 3].map(e => {
        if (e > 100) {
            return e % 100;
        }
        return e;
    })
    lastPos = temp[2];
    newPos = player2.pos + temp.reduce((acc, val) => acc + val)
    newPos = newPos > 10 ? newPos % 10 == 0 ? 10 : newPos % 10 : newPos
    player2.pos = newPos
    player2.score += newPos;
    rolls = rolls + 3
    if (player2.score >= 1000) {
        console.log(player1.score * rolls, "player 2 wins")
        break
    }
}
