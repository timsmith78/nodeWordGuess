const Word = require('./Word')
const inquirer = require('inquirer')
const chalk = require('chalk')
const datamuse = require('datamuse')

function getTopic() {
    inquirer.prompt([{
        type: 'input',
        name: 'topic',
        message: 'Enter a topic to which your puzzles will be loosley related (5 words max): ',
    }])
}
datamuse.words({
    topics: "kanye west",
    max: 10
}).then( json => {
    console.log(json)
})