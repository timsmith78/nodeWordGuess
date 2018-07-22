const Word = require('./Word')
const inquirer = require('inquirer')
const chalk = require('chalk')
const datamuse = require('datamuse')

var wordList = []

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
        }).then( json => {
            wordList = []
            json.forEach( wordObj => wordList.push(wordObj.word))
            playOneWord()
        })
    })
}

function playOneWord() {
    const theWordStr = wordList.shift() // Returns the word most related to the topic due to API sorting
    if (typeof theWordStr === 'undefined') {
        console.log("You have played all the words related to the last topic.")
        getTopic()
    }
    let theWordObjArr = []
    theWordStr.split(/\s+/).forEach( phraseWord => theWordObjArr.push(new Word(phraseWord))) // Use 'atlanta' as a topic to test multi-word phrases
    console.log(theWordObjArr)
}
getTopic()
