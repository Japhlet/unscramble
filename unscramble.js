let englishWords = ['love', 'ship', 'container', 'logistics', 'a', 'great', 'industry','deal','lead','is','this','hits','leader','leadership']

let indexedWords = {}

/**
 * Based on a solution from Stackoverflow
 * http://stackoverflow.com/questions/9960908/permutations-in-javascript
 * Bug: Generates few duplications (fixed by filtering out on a later stage, but not optimal)
 */
function permute(permArr,usedChars,input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
	usedChars.push(ch);
	if (input.length == 0) {
	    permArr.push(usedChars.slice().join(''));
	}
	permute(permArr,usedChars,input);
	input.splice(i, 0, ch);
	usedChars.pop();
    }
    return permArr;
}

/** 
 * Indexing the scrambled words
 * Search in the permutation scope can be costly at each request
 * Indexing costs memory and time (~15s on the word-set above)
 * For this example probably an overshoot with performance loss
 * But.. This allows this service to be scalable via a simple lookup
 */

let time = new Date().getTime();

console.log("Building index of scrambled words...");

for(let i = 0; i < englishWords.length; ++i){
    let allVariations = permute([],[],englishWords[i].split(''));
    for(let j = 0; j < allVariations.length; ++j){
    	if(typeof indexedWords[allVariations[j]] === 'undefined'){
	    indexedWords[allVariations[j]] = [];
	}
        indexedWords[allVariations[j]].push(i);
    }
}

console.log("Index built in "+(new Date().getTime()-time)+"ms");

/**
 * Simple lookup on the indexed table
 */
module.exports = function(string){
    let results = [];
    
    if(typeof string === 'undefined' || typeof indexedWords[string] === 'undefined') return []

    for(let i = 0; i < indexedWords[string].length; ++i){
        results.push(englishWords[indexedWords[string][i]]);
    }
    /* Sorting and removing duplicates, see bug on permute() */
    return results.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
