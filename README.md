# Twit-Bot

Twit-Bot is a Node script that will randomly select an item from an array of objects to post as a status update to a Twitter account at a set interval (set to 30 seconds by default).

In my use case, I'm importing YouTube links and their correponsing data as objects from an array (data.js) and using their values to construct each Twitter post.  The composeTweet function in bot.js can easily be modified to pass whatever values you opt to import for your own posts.

Twit-Bot uses the Twit and dotenv packages.  You'll need to create a .env file in your local directory with your own Twitter dev credentials.  The T const in bot.js indicates which values you'll need to secure within it.

Marcus McBride, 2022.