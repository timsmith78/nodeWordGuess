const Letter = require("./Letter")

var Word = function(myWord) {
    this.LetterArray = []
    myWord.split('').forEach( letter => { this.LetterArray.push(new Letter(letter)) } )
    this.getWord = () => {
        let hiddenWord = []
        this.LetterArray.forEach( letter => { hiddenWord.push(letter.getLetter()) } )
        return hiddenWord.join('')
    }
    this.guessLetter = guessLetter => {
        this.LetterArray.forEach( letter => { letter.checkLetter(guessLetter) } )
    }
}

module.exports = Word

/* test code
var cat = new Word("cat")
console.log(cat)
console.log("Hidden cat: " + cat.getWord())
cat.guessLetter('c')
console.log("After guess: " + cat.getWord())
*/