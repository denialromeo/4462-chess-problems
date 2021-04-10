/**
 * "Monkey patches" Array with a method that swaps the entries at two given indices (in-place).
 * @param {number} j The first index.
 * @param {number} k The second index.
 */
Array.prototype.swap = function(j, k) {
    const t = this[j]; this[j] = this[k]; this[k] = t
}

/**
 * Returns a random number from [0, x) for a given number x.
 * @param {number} x
 */
function random(x) {
    return Math.floor(x * Math.random())
}

/**
 * Returns a random item from an array.
 * @param {Object[]} a The array to return a random entry from.
 */
function choice(a) {
    return a[random(a.length)]
}

/**
 * Shuffles an array in-place and returns it.
 * @param {Object[]} a The array to shuffle.
 */
function shuffle(a) {
    for (let i = 0; i < a.length; i += 1) {
        a.swap(i, random(i + 1))
    }
    return a
}

/**
 * Returns k random items from the given array. If k > a.length, returns shuffled a.
 * @param {Object[]} a The array to sample.
 */
function sample(a, k) {
    return shuffle(a).slice(0, k)
}

// Exports
Object.assign(exports, {
    choice: choice,
    shuffle: shuffle,
    sample: sample
})