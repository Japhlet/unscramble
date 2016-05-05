expect = require('expect')

unscramble = require('./unscramble.js')
unscrambleSentence = require('./unscrambleSentence.js')

/* Empty cases */
expect(unscramble()).toEqual([])
expect(unscramble('')).toEqual([])
expect(unscramble('inexistent')).toEqual([])

/* Single word cases */
expect(unscramble('olve')).toEqual(['love'])
expect(unscramble('ship')).toEqual(['ship'])
expect(unscramble('loitscsgi')).toEqual(['logistics'])
expect(unscramble('si')).toEqual(['is'])
expect(unscramble('a')).toEqual(['a'])
expect(unscramble('gtera')).toEqual(['great'])
expect(unscramble('industry')).toEqual(['industry'])
expect(unscramble('leadership')).toEqual(['leadership'])

/* Multiple word cases */
expect(unscramble('elda')).toEqual(['deal','lead'])
expect(unscramble('this')).toEqual(['hits','this'])


/* Empty cases */
expect(unscrambleSentence()).toEqual([])
expect(unscrambleSentence('')).toEqual([])
expect(unscrambleSentence('notasingleword')).toEqual([])
expect(unscrambleSentence('loitscsgisiagternot')).toEqual([])

/* Simple case */
expect(unscrambleSentence('loitscsgisiagter')).toEqual(['logistics is great'])

/* Word ambiguity cases */
expect(unscrambleSentence('leadership')).toEqual(['leader ship','leadership'])
expect(unscrambleSentence('lrdaeepish')).toEqual(['leader ship','leadership'])
expect(unscrambleSentence('lehpersaid')).toEqual(['leadership'])

/* Sentence ambiguity case */
expect(unscrambleSentence('loitscsgisiagteraindustry')).toEqual(['logistics is a great industry','logistics is great a industry'])

/* Multiplicity case */
expect(unscrambleSentence('hitssidlae')).toEqual(['hits is deal','hits is lead','this is deal','this is lead'])

console.log("All tests were executed sucessfully!")
