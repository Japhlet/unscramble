let englishWords = ['love', 'ship', 'container', 'logistics', 'a', 'great', 'industry','deal','lead']

let indexedWords = {}

/**
 * Based on a solution from Stackoverflow
 * http://stackoverflow.com/questions/9960908/permutations-in-javascript
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
};

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

module.exports = function(string){
    let results = [];
    
    if(typeof string === 'undefined' || typeof indexedWords[string] === 'undefined') return []

    for(let i = 0; i < indexedWords[string].length; ++i){
        results.push(englishWords[indexedWords[string][i]]);
    }
    return results.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
