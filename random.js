function random(x) {
    return Math.floor(x * Math.random());
}

function choice(array) {
    return array[random(array.length)];
}

// Exports
module.exports = {
    choice,
};