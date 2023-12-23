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

// Variables
const express = require("express");
const app = express();
const aiModels = {
    "general": require("./models/general_model.js"),
    "strict_normal": require("./models/normal_strict_model.js"),
    "strict": require("./models/strict_model.js")
}

// Middle
app.use(express.json());

// loadTime
const loadTime = Date.now();

// Bad json format
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            status: false,
            data: null,
            message: "bad_json_format",
        })
    }
})

app.post("/api/moderation", (req, res) => {
    // Checking for body
    if (req && req["body"]) {
        // Checking for requirement
        if (req && req["body"] && req["body"]["message"] && req["body"]["aiType"]) {
            // Error
            try {
                // Require AI
                if (aiModels[req["body"]["aiType"]] !== undefined && aiModels[req["body"]["aiType"]] !== null) {
                    const aiType = aiModels[req["body"]["aiType"]];
                    return res.status(200).json({
                        status: true,
                        data: aiType.moderateText(req["body"]["message"]?.toString()),
                        message: "success"
                    })
                } else {
                    return res.status(401).json({
                        status: false,
                        data: null,
                        message: "invaild_aiType"
                    })
                }
            } catch {
                // It's the server fault
                return res.status(401).json({
                    status: false,
                    data: null,
                    message: "server_issue"
                })
            }
        } else {
            return res.status(401).json({
                status: false,
                data: null,
                message: "missing_requirements"
            })
        }
    } else {
        return res.status(401).json({
            status: false,
            data: null,
            message: "missing_body"
        })
    }
})

// Start server
const delayStartTime = Date.now();
app.listen(process.env["PORT"] || 3000, () => { console.log(`[Moderetyus]: Started on port ${process.env["PORT"] || 3000} | Load time: ${Date.now() - loadTime}ms | Delay start time: ${Date.now() - delayStartTime}ms`) })