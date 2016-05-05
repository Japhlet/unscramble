let unscramble = require('./unscramble.js')

/**
 * Searches possible matches using a recursive tree
 * Stacks possible combinations to form a sentence
 * If a combination fits the entire string it is added to results
 */
function treeSearch(sentence,stack,results){
    if(typeof sentence === 'undefined' || sentence.length == 0){
	results.push(stack.slice())
	return
    }
    for(let i = 0; i <= sentence.length; ++i){
        let currentWords = unscramble(sentence.substring(0,i))
        for(let j = 0; j < currentWords.length; ++j){
	    let newStack = stack.slice()
	    newStack.push(currentWords[j])
	    treeSearch(sentence.substring(i),newStack,results)
	}
    }
}

/**
 * Triggers the tree search and composes sentences with results
 */
module.exports = function(string){
    let results = []
    treeSearch(string,[],results)
    let sentences = []
    for(let i = 0; i < results.length; ++i){
    	if(results[i].length > 0){
	    sentences.push(results[i].join(' '))
	}
    }
    return sentences
}
