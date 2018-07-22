var Letter = function (myLetter) {
    this.theLetter = myLetter,
    this.guessed = false,
    this.getLetter = () => {
        return (this.guessed ? this.theLetter : '_')
    },
    this.checkLetter = guessedLetter => {
        this.guessed = (guessedLetter === this.theLetter)
    }
}

module.exports = Letter
