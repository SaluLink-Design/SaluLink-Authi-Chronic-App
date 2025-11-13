import React, { useState, useEffect } from 'react';
import { getICDCodesForCondition } from '../data/conditions';

const Stage2ICDMapping = ({ condition, terms, originalNote, onICDConfirm, onBack }) => {
  const [icdCodes, setIcdCodes] = useState([]);
  const [selectedICDs, setSelectedICDs] = useState([]);

  useEffect(() => {
    const codes = getICDCodesForCondition(condition);
    setIcdCodes(codes);
  }, [condition]);

  const toggleICDSelection = (icdCode) => {
    setSelectedICDs(prev => {
      if (prev.find(item => item.icdCode === icdCode)) {
        return prev.filter(item => item.icdCode !== icdCode);
      } else {
        const icdObject = icdCodes.find(item => item.icdCode === icdCode);
        return [...prev, icdObject];
      }
    });
  };

  const handleConfirmICDs = () => {
    if (selectedICDs.length === 0) {
      alert('Please select at least one ICD-10 code before continuing');
      return;
    }

    if (onICDConfirm) {
      onICDConfirm({
        condition,
        terms,
        originalNote,
        selectedICDs
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Stage 2: Condition Confirmation & ICD-10 Mapping</h2>
        <p className="text-blue-100">Select the appropriate ICD-10 codes for the identified condition</p>
      </div>

      {/* Condition Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmed Condition</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-2xl font-bold text-gray-800">{condition}</h4>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Confirmed
            </span>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4">
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
      </div>

      {/* ICD-10 Codes Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">ICD-10 Codes</h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedICDs.length} of {icdCodes.length} code{icdCodes.length !== 1 ? 's' : ''} selected
            </p>
          </div>
          
          {selectedICDs.length > 0 && (
            <button
              onClick={() => setSelectedICDs([])}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear Selection
            </button>
          )}
        </div>

        {icdCodes.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-700">
              No ICD-10 codes found for this condition.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {icdCodes.map((icd, idx) => {
              const isSelected = selectedICDs.find(item => item.icdCode === icd.icdCode);
              
              return (
                <div
                  key={idx}
                  onClick={() => toggleICDSelection(icd.icdCode)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center h-6 mt-1">
                      <input
                        type="checkbox"
                        checked={!!isSelected}
                        onChange={() => {}}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-bold text-primary text-lg">
                          {icd.icdCode}
                        </span>
                        {isSelected && (
                          <span className="bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {icd.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Original Clinical Note Reference */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Original Clinical Note</h3>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {originalNote}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-md"
        >
          Back to Analysis
        </button>
        
        <button
          onClick={handleConfirmICDs}
          disabled={selectedICDs.length === 0}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
        >
          Confirm ICD Codes & Continue ({selectedICDs.length} selected)
        </button>
      </div>

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
              Select one or multiple ICD-10 codes that best describe the patient's condition. 
              These codes will be used for claim processing and treatment protocol selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage2ICDMapping;

