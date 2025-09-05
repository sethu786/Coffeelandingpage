import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp, Target, Hash, FileText } from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Overall Resume Score</h2>
          <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
            {analysis.overallScore}/100
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className={`h-3 rounded-full ${
              analysis.overallScore >= 80 ? 'bg-green-500' :
              analysis.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${analysis.overallScore}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FileText className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Analysis Summary</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {analysis.weaknesses.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{weakness}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Improvement Suggestions</h3>
        </div>
        <ul className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start p-3 bg-blue-50 rounded-lg"
            >
              <Target className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{suggestion}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Keyword Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Hash className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Keyword Analysis</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(analysis.keywordAnalysis.relevanceScore)} ${getScoreColor(analysis.keywordAnalysis.relevanceScore)}`}>
            {analysis.keywordAnalysis.relevanceScore}% Relevance
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Keywords Present</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordAnalysis.present.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordAnalysis.missing.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Scores */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Section Analysis</h3>
        <div className="space-y-4">
          {analysis.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{section.name}</h4>
                <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                  {section.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    section.score >= 80 ? 'bg-green-500' :
                    section.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${section.score}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                />
              </div>
              <p className="text-gray-600 text-sm">{section.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
