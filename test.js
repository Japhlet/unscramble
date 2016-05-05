expect = require('expect')

unscramble = require('./unscramble.js')
unscrambleSentence = require('./unscrambleSentence.js')

expect(unscramble('olve')).toEqual(['love'])
expect(unscramble('ship')).toEqual(['ship'])
expect(unscramble('elda')).toEqual(['deal','lead'])
expect(unscrambleSentence('loitscsgisiagteraindustry')).toEqual(['logistics is a great industry'])
