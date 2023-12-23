// This first script generated from chatgpt
// This one got me idea to make an ai to moderate
function moderateText(text) {
    // Check for NSFW text
    const nsfwKeywords = ['explicit', 'adult', 'NSFW'];
    if (nsfwKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      return "Content flagged: NSFW";
    }
  
    // Check for underage users
    const ageRequirement = 13;
    const ageMatch = text.match(/\b\d+\b/);
    if (ageMatch && parseInt(ageMatch[0]) < ageRequirement) {
      return `Content flagged: Underage (Age: ${ageMatch[0]})`;
    }
  
    // Check for IP address leaking
    if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(text)) {
      return "Content flagged: IP address leaking";
    }
  
    // Check for leaking real-life information
    const personalInfoKeywords = ['name', 'address', 'ip', 'phone', 'email'];
    if (personalInfoKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      return "Content flagged: Leaking personal information";
    }
  
    // Check for suicide mentions
    const suicideKeywords = ['suicide', 'kill yourself'];
    if (suicideKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      return "Content flagged: Suicide mention";
    }
  
    // Check for illegal activities
    const illegalKeywords = ['sell drugs', 'illegal goods', 'hacks', 'cheat', 'phishing', 'malicious links'];
    if (illegalKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      return "Content flagged: Illegal activities";
    }
  
    // Check for rude language
    const rudeKeywords = ['fuck you', 'kill you'];
    if (rudeKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      return "Content flagged: Rude language";
    }
  
    // No issues found
    return "Content is okay";
  }
  
  // Example usage
  const userInput = prompt("Enter text:");
  const result = moderateText(userInput);
  console.log(result);
  