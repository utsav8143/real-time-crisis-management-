import { GoogleGenAI, Type } from '@google/genai';

// Picks up GEMINI_API_KEY from process.env automatically
const ai = new GoogleGenAI({});

const SEVERITY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    severity: {
      type: Type.STRING,
      enum: ['low', 'medium', 'high', 'critical'],
      description: 'Overall severity of the incident',
    },
    summary: {
      type: Type.STRING,
      description: 'One-sentence summary for a responder scanning a dashboard',
    },
    reasoning: {
      type: Type.STRING,
      description: 'Brief internal reasoning for the severity level, one sentence',
    },
  },
  required: ['severity', 'summary', 'reasoning'],
  propertyOrdering: ['severity', 'summary', 'reasoning'],
};

const SYSTEM_INSTRUCTION = `You are a triage assistant for a crisis management platform. You classify incident reports by severity so human responders can prioritize their attention.

Severity guide:
- low: minor inconvenience, no immediate danger to people
- medium: property risk or moderate disruption, no immediate life-threatening danger
- high: significant risk to people or property, needs prompt response
- critical: immediate danger to life, requires urgent response right now

Be conservative: if a report is ambiguous or lacks detail, lean toward the higher severity rather than assuming the best case.`;

export async function classifyIncident(title, description, category) {
  const prompt = `Incident category: ${category}
Title: ${title}
Description: ${description}

Classify this incident.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseJsonSchema: SEVERITY_SCHEMA,
        temperature: 0.2,
      },
    });

    return JSON.parse(response.text);
  } catch (err) {
    console.error('Gemini classification failed:', err.message);
    return {
      severity: 'medium',
      summary: title,
      reasoning: 'AI classification unavailable — defaulted to medium for manual review.',
    };
  }
}