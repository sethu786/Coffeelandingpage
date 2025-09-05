import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Loader } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <Brain className="h-16 w-16 text-blue-600" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing Your Resume
        </h3>
        <p className="text-gray-600 mb-4">
          Our AI is carefully reviewing your resume and generating insights...
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <Loader className="h-4 w-4 animate-spin text-blue-600" />
          <span className="text-sm text-blue-600">This may take a few moments</span>
        </div>
      </motion.div>
    </div>
  );
};
