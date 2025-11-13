import React, { useState } from 'react';
import { authiAnalyzeNote } from '../utils/authi';

const Stage1Analysis = ({ onAnalysisComplete }) => {
  const [clinicalNote, setClinicalNote] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!clinicalNote.trim()) {
      alert('Please enter a clinical note before analyzing');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const results = authiAnalyzeNote(clinicalNote);
      setAnalysisResults(results);
      setIsAnalyzing(false);
    }, 500);
  };

  const handleConfirmCondition = (condition) => {
    if (onAnalysisComplete) {
      onAnalysisComplete({
        condition,
        terms: analysisResults.identifiedConditions[condition],
        originalNote: clinicalNote
      });
    }
  };

  const sampleNote = `Patient presents with a history of high blood pressure (HTN) and recent complaints of shortness of breath (SOB). Family history includes FHx heart disease. Recent labs show elevated glucose levels, indicating possible DM2. Patient also reports excessive urination and polydipsia.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Stage 1: Clinical Note Analysis</h2>
        <p className="text-blue-100">Powered by Authi 1.0 - Clinical Note Interpretation Engine</p>
      </div>

      {/* Clinical Note Input */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Clinical Note
        </label>
        <textarea
          value={clinicalNote}
          onChange={(e) => setClinicalNote(e.target.value)}
          placeholder="Paste or type patient clinical note here..."
          className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
        />
        
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !clinicalNote.trim()}
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              'Analyze with Authi 1.0'
            )}
          </button>
          
          <button
            onClick={() => setClinicalNote(sampleNote)}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-md"
          >
            Load Sample Note
          </button>
          
          <button
            onClick={() => {
              setClinicalNote('');
              setAnalysisResults(null);
            }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-md"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h3>
          
          {Object.keys(analysisResults.identifiedConditions).length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    No conditions identified in the clinical note. Please review the note or try a different one.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Identified {Object.keys(analysisResults.identifiedConditions).length} potential condition(s)
                    </p>
                  </div>
                </div>
              </div>

              {Object.entries(analysisResults.identifiedConditions).map(([condition, terms]) => (
                <div key={condition} className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{condition}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {terms.length} term{terms.length !== 1 ? 's' : ''} identified
                      </p>
                    </div>
                    <button
                      onClick={() => handleConfirmCondition(condition)}
                      className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Confirm Condition
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Identified Terms:</p>
                    <div className="flex flex-wrap gap-2">
                      {terms.map((term, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info Panel */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Authi 1.0</strong> analyzes clinical notes for: Cardiac Failure, Hypertension, Diabetes Insipidus, 
              Diabetes Mellitus Type 1, and Diabetes Mellitus Type 2. The engine identifies relevant medical terminology, 
              symptoms, and family history indicators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage1Analysis;

