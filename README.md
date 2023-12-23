# Moderetyus
- Moderation AI by Itzporium.

# How to use
`index.js` file is for the main file.
Use `index.js` at last line, there's "Example usage" comment. Uncomment all the think below,
or Copy this and paste:
```js
const userInput = "Hello world";
const result = moderateText(userInput);
console.log(result);
```

You can use with rest API like expressjs to host!

# How to train?
- Go to path `trainingData`
- All files with its meaning:
age.json: Detect message leaking ages.
illegal_activites.json: Detect message is illegal, like selling drugs, or scamming people.
leakingPersonal.json: leaking personal information like IP address, house/home address, phone number, etc.
rude.json: Rude message that causes negative impact.
suicide.json: Encourage suicide, and self-harm.

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
};
```