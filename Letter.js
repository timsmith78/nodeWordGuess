var Letter = function (myLetter) {
    this.theLetter = myLetter,
        this.guessed = false,
        this.getLetter = () => {
            return (this.guessed ? this.theLetter : '_')
        },
        this.checkLetter = guessedLetter => {
            if (!this.guessed) { // Make sure we don't flip a guessed letter back to false
                this.guessed = (guessedLetter === this.theLetter)
            }
        }
}

module.exports = Letter
