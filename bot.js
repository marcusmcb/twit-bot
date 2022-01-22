const Twit = require('twit')
const dotenv = require('dotenv')
const twitterContent = require('./data.js')

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
      console.log('ERROR: ', err)
    } else {
      console.log('* * * * * * * * * * * * * * * * *')
      console.log('Successfully posted: ')          
      console.log(newTweet)      
    }
  }
  T.post('statuses/update', newTweet, tweeted)  
}

tweetIt(twitterContent)
setInterval(() => {
  tweetIt(twitterContent)
}, 1000 * 30)

// functionality to post content relative to specific
// dates, holidays, events, etc via tags in the data array.
