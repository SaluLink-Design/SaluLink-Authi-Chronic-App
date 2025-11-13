import React, { useState, useEffect } from 'react';
import { getTreatmentsForCondition } from '../data/treatments';

const Stage3TreatmentProtocol = ({ claimData, onTreatmentConfirm, onBack }) => {
  const [treatments, setTreatments] = useState({ diagnostic: [], ongoing: [] });
  const [selectedDiagnostic, setSelectedDiagnostic] = useState([]);
  const [selectedOngoing, setSelectedOngoing] = useState([]);

  useEffect(() => {
    const treatmentData = getTreatmentsForCondition(claimData.condition);
    setTreatments(treatmentData);
  }, [claimData.condition]);

  const toggleDiagnosticSelection = (treatment) => {
    setSelectedDiagnostic(prev => {
      const exists = prev.find(item => item.code === treatment.code && item.description === treatment.description);
      if (exists) {
        return prev.filter(item => !(item.code === treatment.code && item.description === treatment.description));
      } else {
        return [...prev, { ...treatment, frequency: 1 }];
      }
    });
  };

  const toggleOngoingSelection = (treatment) => {
    setSelectedOngoing(prev => {
      const exists = prev.find(item => item.code === treatment.code && item.description === treatment.description);
      if (exists) {
        return prev.filter(item => !(item.code === treatment.code && item.description === treatment.description));
      } else {
        return [...prev, { ...treatment, frequency: 1 }];
      }
    });
  };

  const updateFrequency = (type, code, description, newFrequency) => {
    const setter = type === 'diagnostic' ? setSelectedDiagnostic : setSelectedOngoing;
    
    setter(prev => prev.map(item => {
      if (item.code === code && item.description === description) {
        return { ...item, frequency: Math.max(1, Math.min(newFrequency, item.coverage || 10)) };
      }
      return item;
    }));
  };

  const handleConfirmTreatments = () => {
    if (selectedDiagnostic.length === 0 && selectedOngoing.length === 0) {
      alert('Please select at least one treatment before continuing');
      return;
    }

    if (onTreatmentConfirm) {
      onTreatmentConfirm({
        ...claimData,
        selectedDiagnostic,
        selectedOngoing
      });
    }
  };

  const renderTreatmentCard = (treatment, type, idx) => {
    const selectedList = type === 'diagnostic' ? selectedDiagnostic : selectedOngoing;
    const toggleFunction = type === 'diagnostic' ? toggleDiagnosticSelection : toggleOngoingSelection;
    
    const selected = selectedList.find(item => 
      item.code === treatment.code && item.description === treatment.description
    );
    const isSelected = !!selected;

    return (
      <div
        key={idx}
        className={`border-2 rounded-lg p-4 transition-all ${
          isSelected
            ? 'border-primary bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6 mt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleFunction(treatment)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1">{treatment.description}</h4>
                <p className="text-sm text-gray-600 font-mono">{treatment.code}</p>
              </div>
              
              {isSelected && (
                <span className="bg-primary text-white px-2 py-1 rounded text-xs font-semibold ml-3">
                  Selected
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Coverage:</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  {treatment.coverage || 'N/A'} {treatment.coverage ? 'per year' : ''}
                </span>
              </div>
              
              {treatment.specialists && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Specialists:</span>
                  <span className="bg-purple-100 px-3 py-1 rounded-full text-sm font-semibold text-purple-800">
                    {treatment.specialists}
                  </span>
                </div>
              )}
            </div>

            {isSelected && (
              <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Frequency (times to perform):
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateFrequency(type, treatment.code, treatment.description, selected.frequency - 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={selected.frequency}
                    onChange={(e) => updateFrequency(type, treatment.code, treatment.description, parseInt(e.target.value) || 1)}
                    min="1"
                    max={treatment.coverage || 10}
                    className="w-20 text-center border-2 border-gray-300 rounded-lg p-2 font-semibold"
                  />
                  <button
                    onClick={() => updateFrequency(type, treatment.code, treatment.description, selected.frequency + 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">
                    (max: {treatment.coverage || 'unlimited'})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Stage 3: Treatment Protocol Selection</h2>
        <p className="text-blue-100">Select diagnostic and ongoing management tests for {claimData.condition}</p>
      </div>

      {/* Condition & ICD Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Treatment for:</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="text-xl font-bold text-gray-800 mb-2">{claimData.condition}</h4>
          <div className="flex flex-wrap gap-2">
            {claimData.selectedICDs.map((icd, idx) => (
              <span key={idx} className="bg-white px-3 py-1 rounded-lg text-sm font-semibold text-gray-700 border border-gray-200">
                {icd.icdCode}: {icd.description}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostic Basket */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Diagnostic Basket</h3>
            <p className="text-sm text-gray-500 mt-1">
              Initial tests required to confirm the diagnosis ({selectedDiagnostic.length} selected)
            </p>
          </div>
          
          {selectedDiagnostic.length > 0 && (
            <button
              onClick={() => setSelectedDiagnostic([])}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear All
            </button>
          )}
        </div>

        {treatments.diagnostic.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-700">No diagnostic tests available for this condition.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {treatments.diagnostic.map((treatment, idx) => 
              renderTreatmentCard(treatment, 'diagnostic', idx)
            )}
          </div>
        )}
      </div>

      {/* Ongoing Management Basket */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Ongoing Management Basket</h3>
            <p className="text-sm text-gray-500 mt-1">
              Tests and procedures for ongoing patient management ({selectedOngoing.length} selected)
            </p>
          </div>
          
          {selectedOngoing.length > 0 && (
            <button
              onClick={() => setSelectedOngoing([])}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear All
            </button>
          )}
        </div>

        {treatments.ongoing.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-700">No ongoing management tests available for this condition.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {treatments.ongoing.map((treatment, idx) => 
              renderTreatmentCard(treatment, 'ongoing', idx)
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-md"
        >
          Back to ICD Codes
        </button>
        
        <button
          onClick={handleConfirmTreatments}
          disabled={selectedDiagnostic.length === 0 && selectedOngoing.length === 0}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
        >
          Confirm Treatments & Continue ({selectedDiagnostic.length + selectedOngoing.length} total)
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
              Select appropriate tests from the diagnostic basket (initial diagnosis) and ongoing management basket 
              (regular monitoring). Specify the frequency for each test based on coverage limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage3TreatmentProtocol;

