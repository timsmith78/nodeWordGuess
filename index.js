const Word = require('./Word')
const inquirer = require('inquirer')
const chalk = require('chalk')
const datamuse = require('datamuse')

var wordList = [] // Random words retrieved from the API related to user-specified topic
var usedLetters = []
var wrongGuessesRemaining = 0

// Get array of 10 random words related to a user-given topic
function getTopic() {
    inquirer.prompt([{
        type: 'input',
        name: 'topic',
        message: 'Enter a topic to which your puzzles will be loosely related: ',

    }]).then(topicPhrase => {
        datamuse.words({
            topics: topicPhrase.topic,
            max: 10
        }).then(json => {
            wordList = []
            json.forEach(wordObj => wordList.push(wordObj.word))
            playOneWord()
        })
    })
}

// Play one word from the API's list
function playOneWord() {
    const theWordStr = wordList.shift() // Returns the word most related to the topic due to API sorting
    if (typeof theWordStr === 'undefined') {
        console.log("You have played all the words related to the last topic.")
        getTopic()
    }
    let theWordObjArr = []
    theWordStr.split(/\s+/).forEach(phraseWord => theWordObjArr.push(new Word(phraseWord))) // Use 'atlanta' as a topic to test multi-word phrases
    usedLetters = []
    wrongGuessesRemaining = 10
    getNextGuess(theWordObjArr, theWordStr)
}

// Get and process each guess
function getNextGuess(currPuzzle, rawAnswer) {

    // Display the puzzle
    let puzzleStr = ""
    currPuzzle.forEach(puzzleWord => { puzzleStr += (puzzleWord.getWord() + '   ') })
    console.log(puzzleStr)
    console.log(chalk.grey("Used letters: ") + usedLetters)
    console.log(chalk.grey("Incorrect guesses remaining: " + wrongGuessesRemaining))

    // Check if the user won
    let answer = rawAnswer.split('').join(' ')
    if (puzzleStr.trim() === answer.trim()) {
        console.log(chalk.yellow('YOU WIN!!!!!'))
        nextGame()
        return
    }

    // Get the next guess from the player
    inquirer.prompt([{
        type: 'input',
        name: 'guess',
        message: 'Guess a letter: ',
        validate: (guessedLetter) => {
            if (guessedLetter.length > 1) {
                return "Please enter only one letter"
            } else {
                return true
            }
        }
    }]).then(resp => {
        usedLetters.push(resp.guess) // Track used letters for input validation
        let newPuzzleStr = "" // String to test if guess was correct
        currPuzzle.forEach(puzzleWord => {
            puzzleWord.guessLetter(resp.guess)
            newPuzzleStr += (puzzleWord.getWord() + '   ')
        })
        if (puzzleStr === newPuzzleStr) {
            // no change => incorrect
            console.log(chalk.red("INCORRECT!!!"))
            wrongGuessesRemaining--
            if (wrongGuessesRemaining === 0) {
                console.log(chalk.yellow("YOU LOSE!!!"))
                console.log("The correct answer was: ")
                console.log(rawAnswer)
                nextGame()
                return
            }
        } else {
            console.log(chalk.green("CORRECT!!!"))
        }
        getNextGuess(currPuzzle, rawAnswer)
    })
}

// When the game ends, display a menu to let the player decide what to do next
function nextGame() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "Please choose one of the following:",
        choices: [{
            name: "Play another puzzle from this topic",
            value: 1
        },
        {
            name: "Play another puzzle from another topic",
            value: 2
        },
        {
            name: "Exit",
            value: 3
        }]
    }).then(answer => {
        switch (answer.options) {
            case 1:
            playOneWord()
            break
            case 2:
            getTopic()
            break
            case 3:
            return
            default:
            return
        }
    })
}

// Start the game from scratch
getTopic()
