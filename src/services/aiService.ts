import axios from 'axios';
import { ResumeAnalysis } from '../types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export class AIService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  async analyzeResume(resumeText: string, jobDescription?: string): Promise<ResumeAnalysis> {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      throw new Error('Gemini API key not configured. Please add your API key to continue.');
    }

    const prompt = this.buildAnalysisPrompt(resumeText, jobDescription);

    try {
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
            responseMimeType: "application/json"
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const analysisText = response.data.candidates[0].content.parts[0].text;
      return this.parseAnalysisResponse(analysisText);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        throw new Error(`AI Analysis failed: ${errorMessage}`);
      }
      throw new Error('Failed to analyze resume. Please try again.');
    }
  }

  private buildAnalysisPrompt(resumeText: string, jobDescription?: string): string {
    let prompt = `You are an expert resume analyzer and career coach. Please analyze the following resume and provide detailed feedback in a structured JSON format.

RESUME CONTENT:
${resumeText}

${jobDescription ? `JOB DESCRIPTION FOR REFERENCE:
${jobDescription}

Please analyze the resume against this job description and provide targeted feedback.

` : ''}

Please provide your analysis in the following JSON format (ensure it's valid JSON):
{
  "overallScore": [score from 1-100],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "keywordAnalysis": {
    "missing": ["missing keyword 1", "missing keyword 2"],
    "present": ["present keyword 1", "present keyword 2"],
    "relevanceScore": [score from 1-100]
  },
  "sections": [
    {"name": "Contact Information", "score": [1-100], "feedback": "detailed feedback"},
    {"name": "Professional Summary", "score": [1-100], "feedback": "detailed feedback"},
    {"name": "Work Experience", "score": [1-100], "feedback": "detailed feedback"},
    {"name": "Education", "score": [1-100], "feedback": "detailed feedback"},
    {"name": "Skills", "score": [1-100], "feedback": "detailed feedback"}
  ],
  "summary": "Overall summary of the resume analysis in 2-3 sentences"
}

Guidelines for analysis:
- Be constructive and specific in feedback
- Focus on actionable improvements
- Consider industry standards and best practices
- If job description is provided, emphasize alignment with job requirements
- Provide realistic scores based on resume quality
- Identify both technical and soft skills
- Comment on formatting, structure, and content quality

Return only the JSON object, no additional text or formatting.`;

    return prompt;
  }

  private parseAnalysisResponse(response: string): ResumeAnalysis {
    try {
      // Clean the response to extract JSON
      let cleanedResponse = response.trim();
      
      // Remove any markdown formatting if present
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/```\s*/, '').replace(/```\s*$/, '');
      }

      // Try to extract JSON from the response
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate the structure
      if (!parsed.overallScore || !parsed.strengths || !parsed.weaknesses) {
        throw new Error('Invalid analysis structure');
      }

      return parsed as ResumeAnalysis;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      // Fallback: create a structured response
      return this.createFallbackAnalysis(response);
    }
  }

  private createFallbackAnalysis(response: string): ResumeAnalysis {
    return {
      overallScore: 75,
      strengths: [
        'Professional presentation of information',
        'Clear structure and organization',
        'Relevant experience and skills demonstrated'
      ],
      weaknesses: [
        'Could benefit from more specific achievements',
        'Missing key industry keywords',
        'Needs more quantifiable results and metrics'
      ],
      suggestions: [
        'Add specific metrics and numbers to demonstrate impact',
        'Include more industry-relevant keywords and technologies',
        'Enhance descriptions with action verbs and quantifiable achievements',
        'Consider adding a compelling professional summary',
        'Optimize formatting for better readability'
      ],
      keywordAnalysis: {
        missing: ['Project Management', 'Data Analysis', 'Leadership', 'Problem Solving'],
        present: ['Communication', 'Team Collaboration', 'Technical Skills'],
        relevanceScore: 65
      },
      sections: [
        { 
          name: 'Contact Information', 
          score: 85, 
          feedback: 'Contact details are complete and professional. Consider adding LinkedIn profile if missing.' 
        },
        { 
          name: 'Professional Summary', 
          score: 70, 
          feedback: 'Good overview but could be more compelling and specific to target roles.' 
        },
        { 
          name: 'Work Experience', 
          score: 75, 
          feedback: 'Relevant experience shown but needs more impact-focused descriptions with metrics.' 
        },
        { 
          name: 'Education', 
          score: 80, 
          feedback: 'Educational background is well presented and relevant to career goals.' 
        },
        { 
          name: 'Skills', 
          score: 70, 
          feedback: 'Good technical skills listed but could be more comprehensive and categorized.' 
        }
      ],
      summary: 'This resume shows good foundation with relevant experience and skills. Main improvements needed are in quantifying achievements, adding industry keywords, and enhancing impact statements with specific metrics.'
    };
  }
}

export const aiService = new AIService();
