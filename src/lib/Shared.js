export function roll(rollString) {
    let rollArray = rollString.split("+");
    let dice = rollArray[0].split("D");
    let diceCount = parseInt(dice[0]);
    let diceSize = parseInt(dice[1]);
    let modifier = parseInt(rollArray[1]);
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * diceSize) + 1;
    }
    total += modifier;
    return total;
}
