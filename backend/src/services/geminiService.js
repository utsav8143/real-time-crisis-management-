import { GoogleGenAI, SchemaType } from "@google/genai";
import SchemaType from "@google/genai";``

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const severitySchema = {
    type: SchemaType.OBJECT,
    properties: {
        severity: {
            type: SchemaType.STRING,
            enum: ["critical", "high", "medium", "low"],
            description:"Overall severity of the incident based on the information provided. Choose from critical, high, medium, or low."
        },
        summary:{
            type:SchemaType.STRING,
            description:"One-sentence summary for responder scanning dashboard. Keep it concise and informative."
        },
        reasoning:{
            type:SchemaType.STRING,
            description:"Brief reasoning behind the severity assessment. Explain the factors considered and how they influenced the severity determination."
        }
    },
    required: ["severity", "summary", "reasoning"],
};


const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  generationConfig: {
    responseMimeType:"application/json",
    responseSchema: severitySchema,
    temperature: 0.2,
  },
});

const prompt=`You are a triage assistant for a crisis management platform. You classify incident reports by severity so human responders can prioritize their attention.

Severity guide:
- low: minor inconvenience, no immediate danger to people (e.g. a downed tree blocking a sidewalk)
- medium: property risk or moderate disruption, no immediate life-threatening danger
- high: significant risk to people or property, needs prompt response
- critical: immediate danger to life, requires urgent response right now

Be conservative: if a report is ambiguous or lacks detail, lean toward the higher severity rather than assuming the best case — human responders can always downgrade after verifying, but a missed critical report can cost lives.`

export async function classifyIncident(title, description, category) {
    const prompt=`Incident category: ${category}
Title: ${title}
Description: ${description}

Classify this incident.`;

try{
    const result=await model.generateContent({
        contents:[{role:"user", parts:[{text:prompt}]}],
        systemInstruction:SYSTEM_INSTRUCTION,
    });

    const parsed=JSON.parse(result.response.text());
    return parsed;
} catch(err){
    console.log("Error classifying incident:", err.message);
    return {
        severity:"medium",
        summary:title,
        reasoning:"AI classification failed, defaulting to medium severity."
    };
}
}