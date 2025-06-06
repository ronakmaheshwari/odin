import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import fs from "fs";
import z from "zod"
import ReactBasePrompt from "./defaults/react.js";
import { BASE_PROMPT, getSystemPrompt } from "./prompts.js";
import nodeBasePrompt from "./defaults/node.js";
import AstroBasePrompt from "./defaults/astro.js";
import NextBasePrompt from "./defaults/next.js";
import { log } from "console";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const anthropic = new Anthropic();

const TemplateCheck = z.object({
    template:z.string()
})

export default async function tokenChecker(prompt: string) {
  const token = await anthropic.messages.countTokens({
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(token);
  return token;
}

app.get("/", async (req, res) => {
  res.json({ message: "Hello Tester" });
});

app.post("/template", async (req: any, res: any) => {
    const {success} = TemplateCheck.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Wrong Inputs Provided"
        })
    }
    const message = req.body.template;
    const tokenResult = await tokenChecker(message);
    const tokens = (tokenResult as any)?.total_tokens ?? 20;

    const response = await anthropic.messages.create({
        messages: [{ role: "user", content: message }],
        model: "claude-opus-4-20250514",
        max_tokens: tokens,
        system: "Return either node or react based on what do you think this project should be, Only return node, react, next, astro a single word nothing else",
    });

    const answer = ((response.content[0] as TextBlock).text || "").trim().toLowerCase();
    const knownFrameworks = {
    react: ReactBasePrompt,
    node: nodeBasePrompt,
    astro: AstroBasePrompt,
    next: NextBasePrompt,
    };

    if (answer in knownFrameworks) {
    const basePrompt = knownFrameworks[answer as keyof typeof knownFrameworks];
    return res.status(200).json({
        prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [basePrompt],
        });
    }

    return res.status(403).json({ message: "You can't access this." });
});

app.post("/chat",async(req:any,res:any)=>{
  const messages = req.body.messages;
  const tokenResult = await tokenChecker(messages);
  const tokens = (tokenResult as any)?.total_tokens ?? 8000;
  console.log(tokens);
  const response = await anthropic.messages.stream({
        messages:  messages,
        model: "claude-opus-4-20250514",
        max_tokens: tokens,
        system: getSystemPrompt(),
    }).on('text', (text) => {
    console.log(text);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
