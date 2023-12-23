# Moderetyus
- Moderation AI by Itzporium.
- Please star this Github Repo. Thanks for visiting!

# How to use
`index.js` file is for demo, and test.

Some moderation models are:
`general_model` is now the first model; require it and call the moderateText function to check the message.\
`normal_strict` is a bit strict, recommend for the user in the range of 13 - 17 years old.\
`strict` is strict, recommend for the user < 13 years old.

You can use with rest API like expressjs to host!\
My server hosted CodeSandbox, if you want to try: https://7pt93c-3000.csb.app/

If you want to host, start "express_server.js" by running:
```sh
node index.js
```

To use send post request to https://{yourServer}/api/moderation/

POST this:
```json
{
	"message": "Hello world",
	"aiType": "strict"
}
```

Replace "Hello world" with text, there are three ai type, I mentioned it in #How to use.

# How to train?
- Go to path `trainingData`
- Each model with have its name.
- You can create new folder and train it.
- All files with its meaning:\
**age.json**: Detect message leaking ages.\
**illegal_activites.json**: Detect message is illegal, like selling drugs, or scamming people.\
**leakingPersonal.json**: leaking personal information like IP address, house/home address, phone number, etc.\
**rude.json**: Rude message that causes negative impact.\
**suicide.json**: Encourage suicide and self-harm.

> [!WARNING]
> All the training data inside these json data, must not have any space, and no uppercase allowed (Example: "I like this", must be: "ilikethis").
> And must format like this:  { "text_message": "detail_message" }

# JSON data (with Explains)
```json
{
    "server_message": "..._message", // This one  is for return back to make the request person know what type of this
    "server_message_detail": "message_break_rule...",// Explain detail if someone use this for reporting, so you can just ban your user, and explain reason. Reason here is writing for machine. You have to write by your own.,
    "user_message": text_requested, // The user's message
    "message": "Content flagged: ..." // Message return if you want for a clear view for the moderator or admin.
}
```
