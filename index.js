// Training data
const trainingData_path = "./trainingData";
const trainingData = {
    "nsfw": require(`${trainingData_path}/nsfw.json`),
    "age": require(`${trainingData_path}/age.json`),
    "suicide": require(`${trainingData_path}/suicide.json`),
    "illegal_activities": require(`${trainingData_path}/illegal_activities.json`),
    "rude": require(`${trainingData_path}/rude.json`),
    "leakingPersonal": require(`${trainingData_path}/leakingPersonal.json`),
}


// Main function
const moderateText = (text_requested) => {
    // Parse message
    const text = text_requested?.toString().toLowerCase().replaceAll(" ", "");

    // Check for NSFW text
    const nsfwKeywords = trainingData["nsfw"];
    const nsfwKeywords_detector = Object.keys(nsfwKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));
    if (nsfwKeywords_detector) {
        return {
            "server_message": "nsfw_message", // This one  is for return back to make the request person know what type of this
            "server_message_detail": nsfwKeywords[nsfwKeywords_detector],// Explain detail if someone use this for reporting, so you can just ban your user, and explain reason. Reason here is writing for machine. You have to write by your own.,
            "user_message": text_requested, // The user's message
            "message": "Content flagged: NSFW" // Message return if you want for a clear view for the moderator or admin.
        };
    }
  
    // Check for underage users
    const ageRequirement = 13;
    const ageMatch = text.match(/\b\d+\b/);
    if (ageMatch && parseInt(ageMatch[0]) < ageRequirement) {
        return {
            "server_message": "underage_message",
            "server_message_detail": "underage_message",
            "user_message": text_requested,
            "message": `Content flagged: Underage (Age: ${ageMatch[0]})`
        };
    }
  
    // Check for IP address leaking
    if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(text)) {
        return {
            "server_message": "personal_information_leaking",
            "server_message_detail": "leaking_information_ip",
            "user_message": text_requested,
            "message": "Content flagged: IP address leaking"
        };
    }
  
    // Check for leaking real-life information
    const personalInfoKeywords = trainingData["leakingPersonal"];
    const personalInfoKeywords_detector = Object.keys(personalInfoKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));
    if (personalInfoKeywords_detector) {
        return {
            "server_message": "personal_information_leaking",
            "server_message_detail": personalInfoKeywords[personalInfoKeywords_detector],
            "user_message": text_requested,
            "message": "Content flagged: Leaking personal information"
        };
    }
  
    // Check for suicide mentions
    const suicideKeywords = trainingData["suicide"];
    const suicideKeywords_detector = Object.keys(suicideKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));

    if (suicideKeywords_detector) {
        return {
            "server_message": "suicide_message",
            "server_message_detail": suicideKeywords[suicideKeywords_detector],
            "user_message": text_requested,
            "message": "Content flagged: Suicide mention"
        };
    }
  
    // Check for illegal activities
    const illegalKeywords = trainingData["illegal_activities"];
    const illegalKeywords_detector = Object.keys(illegalKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));
    if (illegalKeywords_detector) {
        return {
            "server_message": "illegal_activities",
            "server_message_detail": illegalKeywords[illegalKeywords_detector],
            "user_message": text_requested,
            "message": "Content flagged: Illegal activities"
        };
    }
  
    // Check for rude language
    const rudeKeywords = trainingData["rude"];
    const rude_detector = Object.keys(rudeKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));
    if (rude_detector) {
        return {
            "server_message": "personal_information_leaking",
            "server_message_detail": rudeKeywords[rude_detector],
            "user_message": text_requested,
            "message": "Content flagged: Rude language"
        };
    }
  
    // No issues found
    return {
        "server_message": "content_vaild",
        "server_message_detail": "content_vaild",
        "user_message": text_requested,
        "message": "Content is okay"
    }
}

// Example usage
/*
const userInput = "Hello world";
const result = moderateText(userInput);
console.log(result);
*/