/*
    Moderetyus
    Copyright (C) 2023 Itzporium

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Training data
const trainingData_path = "../trainingData/strict";
const trainingData = {
    "nsfw": require(`${trainingData_path}/nsfw.json`),
    "age": require(`${trainingData_path}/age.json`),
    "suicide": require(`${trainingData_path}/suicide.json`),
    "illegal_activities": require(`${trainingData_path}/illegal_activities.json`),
    "rude": require(`${trainingData_path}/rude.json`),
    "leakingPersonal": require(`${trainingData_path}/leakingPersonal.json`),
}

// Main function
module.exports = {
    "moderateText": (text_requested) => {
        // Parse message
        const text = text_requested?.toString().toLowerCase().replaceAll(" ", "").replaceAll(".", "").replaceAll("_", "").replaceAll("-", "").replaceAll("+", "").replaceAll("=", "");
      
        // Check for underage users
        const ageRequirement = 13;
        const ageMatch = text.match(/\b\d+\b/);
        if (ageMatch && parseInt(ageMatch[0]) < ageRequirement) {
            return {
                "server_message": "underage_message",
                "server_message_detail": "underage_message",
                "user_message": text_requested,
                "detected_word": text_requested,
                "message": `Content flagged: Underage (Age: ${ageMatch[0]})`
            };
        }
      
        // Check for IP address leaking
        if (/\b(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\b/.test(text_requested?.toString().toLowerCase().replaceAll(" ", "").replaceAll("_", "").replaceAll("-", "").replaceAll("+", "").replaceAll("=", ""))) {
            return {
                "server_message": "personal_information_leaking",
                "server_message_detail": "leaking_information_ip",
                "user_message": text_requested,
                "detected_word": text_requested,
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
                "detected_word": personalInfoKeywords_detector,
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
                "detected_word": suicideKeywords_detector,
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
                "detected_word": nsfwKeywords_detector,
                "message": "Content flagged: Illegal activities"
            };
        }
    
        // Check for NSFW text
        const nsfwKeywords = trainingData["nsfw"];
        const nsfwKeywords_detector = Object.keys(nsfwKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));
        if (nsfwKeywords_detector) {
            return {
                "server_message": "nsfw_message",
                "server_message_detail": nsfwKeywords[nsfwKeywords_detector],
                "user_message": text_requested,
                "detected_word": nsfwKeywords_detector,
                "message": "Content flagged: NSFW"
            };
        }
      
        // Check for rude language
        const rudeKeywords = trainingData["rude"];
        const rude_detector = Object.keys(rudeKeywords).find(keyword => text?.toString().toLowerCase().includes(keyword));
        if (rude_detector) {
            return {
                "server_message": "rude_message",
                "server_message_detail": rudeKeywords[rude_detector],
                "user_message": text_requested,
                "detected_word": rude_detector,
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
}