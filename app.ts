const { App } = require("@slack/bolt");
require('dotenv').config();

const app = new App({
  token: process.env.TOKEN ,
  signingSecret: process.env.SIGNING_SECRET,
  socketMode: true, 
  appToken: process.env.APP_TOKEN
  
});


//displays a message tagging the user
app.message(/^suto (hey|hi|hello)$/, async ({ message, say } :  {message : {user: string},say : Function}) => {
  await say(`Hey there <@${message.user}>!`);
});

//displays a list of commands
app.message(/^suto help$/, async ({ message, say }: {message : {user: string},say : Function}) => {
  await say({
    blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "these are the list of commands \n `Hey` - _greets back to the user_  \n `Help` - _displays the list of commands_ \n `echo` - _throws back user's message_"
      }
    }]
})
})

// repeats what the user said
app.message(/^suto echo/, async ({ message, say } :  {message :  string,say : Function}) => {
  var text = JSON.stringify(message)
  var obj = JSON.parse(text)
  var test = obj.text
  const final = test.replace("suto echo " , "")
  await say(final)
});





(async () => {
  await app.start(3000);
  console.log('suto is running!');
})();



