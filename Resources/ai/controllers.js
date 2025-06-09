const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    baseURL: process.env.OPENAI_ENDPOINT,
    apiKey: process.env.OPENAI_API_KEY
});

const Controllers = {
    postHelper: async (req, res) => {
        const { paragraph } = req.body;

        const prompt = `
You are a social media content creator for an actor hiring management system. Your job is to take user draft posts and rewrite them to be more engaging, professional, and persuasive — suitable for this platform's audience. Keep it cordial and professional, not overly promotional or casual.

Here are some examples of user drafts and how you would enhance them:

User draft:
"I'm looking for actors for my new film. Apply soon!"
Enhanced post:
"We're excited to invite talented actors to join our upcoming film project. Don’t miss your chance to apply and be part of something special."

User draft:
"Our app helps actors find casting calls."
Enhanced post:
"Find the best casting opportunities effortlessly with our app, designed to connect you directly with casting directors."

Now, please enhance this draft post:

"${paragraph}"

Respond with only the enhanced post text. Also no quotes please.
`;
        console.log(prompt);

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 300,
                temperature: 0.7,
            });
            res.json({ enhancedPost: completion.choices[0].message.content });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getData: async (req, res) => {
        try {
            const { resume } = req.body;
            const prompt = `
            Extract the following details from the resume and return a JSON object matching this structure:

            {
                "full_name": "string (max 25 chars)",
                "profession": "string (max 8 chars, required, default: 'actor')",
                "years_of_experience": "integer",
                "rating": "decimal (4,2, default: 5.00)",
            }

            Resume: 
            """${resume}"""

            Instructions:
            1. If any data is not given, you can assume it as null.
            2. Ensure all enum fields match the allowed values exactly.
            3. Whatever is inferrable from the paragraph, please fill it. 
            4. Years of experience can be set as 1 if not given.

            JSON:
`;

            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                temperature: 0
            });

            const match = response.choices[0].message.content.match(/\{[\s\S]*\}/);
            if (match) {
                const survivorObject = JSON.parse(match[0]);
                return res.json(survivorObject);
            } else {
                return res.status(400).json({ error: 'No JSON found in OpenAI response' });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }

    }
}
module.exports = Controllers