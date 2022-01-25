const Twit = require('twit')
const dotenv = require('dotenv')
const twitterContent = require('./data.js')
const chalk = require('chalk')

dotenv.config()

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const composeTweet = (twitterContent) => {
  // generates a random index value to select from array
  const randomIndex = Math.floor(Math.random() * twitterContent.length)
  const item = twitterContent[randomIndex]
  let tweet = {
    status: `${item.title} (${item.year}) ${item.url}`,
  }
  // remove item from array once used (twitter duplicate post err)
  twitterContent.splice(item, 1)
  return tweet
}

const tweetIt = (twitterContent) => {
  let newTweet = composeTweet(twitterContent)
  // callback to handle twitter response
  let tweeted = (err, data, response) => {
    if (err) {
      console.log('')
      console.log(
        chalk.bgRed(
          chalk.black('------------------------------------------------')
        )
      )
      console.log('')
      console.log('ERROR: ', err.allErrors[0].message)
      console.log('')
      console.log(
        `bot.js will attempt another post in ${intervalCount} minutes.`
      )
      console.log('')
    } else {
      console.log(
        chalk.bgGreen(
          chalk.black('------------------------------------------------')
        )
      )
      console.log('')
      console.log(
        'NEW TWEET SUCCESSFULLY POSTED @',
        new Date().toLocaleString()
      )
      console.log('')
      console.log(newTweet)
      console.log('')
      console.log('')
      console.log(`The next scheduled post is in ${intervalCount} minutes.`)
      console.log('')
    }
  }
  T.post('statuses/update', newTweet, tweeted)

  // for logging/testing purposes
  // console.log(chalk.bgGreen(chalk.black('------------------------------------------------')))
  // console.log('')
  // console.log('NEW TWEET SUCCESSFULLY POSTED @', new Date().toLocaleString())
  // console.log('')
  // console.log(newTweet)
  // console.log('')
  // console.log(`The next scheduled post is in ${intervalCount} seconds.`)
  // console.log('')
}

let intervalCount = 30

tweetIt(twitterContent)
setInterval(() => {
  tweetIt(twitterContent)
}, 1000 * 30 * 60)
setInterval(() => {
  // console.log("IC: ", intervalCount)
  if (intervalCount > 10) {
    intervalCount = intervalCount - 10
    console.log(
      chalk.bgYellow(
        chalk.black('------------------------------------------------')
      )
    )
    console.log('')
    console.log('bot.js currently running @', new Date().toLocaleString())
    console.log(`The next scheduled post is in ${intervalCount} minutes.`)
    console.log('')
  } else if (intervalCount <= 10) {
    intervalCount = 30
  }
}, 1000 * 10 * 60)

// functionality to post content relative to specific
// dates, holidays, events, etc via tags in the data array.

// FUTURE DEV

// "bot backup"

// we'll need to persist the list of indicies that have already
// been selected/posted to avoid the twitter duplicate-post issue

// we're passing our data.js to the bot and removing each random
// index from twitterContent as they're selected
// none of this data persists however and would be lost
// anytime the script is interrupted

// keep data.js as a "master list" to start but eventually migrate
// json over to a proper mongo collection via mongoose

// save array of prior random index selections
// reference against current random index (helper method)
// * if same, rerun random index generator and helper method
// * if different, set random index and compose tweet

// "data expansion"

// add "original" property to each entry as an object with
// title/year/url properties

// further data breakdown for each object for expanded
// use in other apps?

// when a random index is selected that has an "original" key
// available, compose second tweet with the original's values
// as a reply to the first tweet

// check to see if there's an id property in the "tweeted"
// callback response && can it be passed to the same
// statuses/update endpoint as a param for an automated reply?
