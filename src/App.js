import React, { useState, useEffect } from 'react';
import Stage1Analysis from './components/Stage1Analysis';
import Stage2ICDMapping from './components/Stage2ICDMapping';
import Stage3TreatmentProtocol from './components/Stage3TreatmentProtocol';
import Stage4Documentation from './components/Stage4Documentation';
import Stage5ClaimSummary from './components/Stage5ClaimSummary';
import Sidebar from './components/Sidebar';

const STAGES = {
  ANALYSIS: 1,
  ICD_MAPPING: 2,
  TREATMENT_PROTOCOL: 3,
  DOCUMENTATION: 4,
  CLAIM_SUMMARY: 5
};

const App = () => {
  const [currentStage, setCurrentStage] = useState(STAGES.ANALYSIS);
  const [claimData, setClaimData] = useState(null);
  const [savedCases, setSavedCases] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load saved cases from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('salulink_cases');
    if (saved) {
      try {
        setSavedCases(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved cases:', e);
      }
    }
  }, []);

  // Save cases to localStorage whenever they change
  useEffect(() => {
    if (savedCases.length > 0) {
      localStorage.setItem('salulink_cases', JSON.stringify(savedCases));
    }
  }, [savedCases]);

  const handleAnalysisComplete = (data) => {
    setClaimData(data);
    setCurrentStage(STAGES.ICD_MAPPING);
  };

  const handleICDConfirm = (data) => {
    setClaimData(data);
    setCurrentStage(STAGES.TREATMENT_PROTOCOL);
  };

  const handleTreatmentConfirm = (data) => {
    setClaimData(data);
    setCurrentStage(STAGES.DOCUMENTATION);
  };

  const handleDocumentationComplete = (data) => {
    setClaimData(data);
    setCurrentStage(STAGES.CLAIM_SUMMARY);
  };

  const handleSaveClaim = (claim) => {
    setSavedCases(prev => [claim, ...prev]);
    alert('Claim saved to case library successfully!');
  };

  const handleNewClaim = () => {
    setClaimData(null);
    setCurrentStage(STAGES.ANALYSIS);
  };

  const handleSelectCase = (caseItem) => {
    setClaimData(caseItem);
    setCurrentStage(STAGES.CLAIM_SUMMARY);
  };

  const handleBack = () => {
    if (currentStage > STAGES.ANALYSIS) {
      setCurrentStage(currentStage - 1);
    }
  };

  const getStageLabel = (stage) => {
    switch (stage) {
      case STAGES.ANALYSIS:
        return 'Clinical Note Analysis';
      case STAGES.ICD_MAPPING:
        return 'ICD-10 Mapping';
      case STAGES.TREATMENT_PROTOCOL:
        return 'Treatment Protocol';
      case STAGES.DOCUMENTATION:
        return 'Documentation & Medication';
      case STAGES.CLAIM_SUMMARY:
        return 'Claim Summary';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SaluLink Chronic Treatment App</h1>
                <p className="text-sm text-gray-600">Powered by Authi 1.0</p>
              </div>
            </div>
            
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Cases
              {savedCases.length > 0 && (
                <span className="bg-white text-primary px-2 py-1 rounded-full text-xs font-bold">
                  {savedCases.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((stage) => (
              <React.Fragment key={stage}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStage === stage
                        ? 'bg-primary text-white shadow-lg scale-110'
                        : currentStage > stage
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStage > stage ? (
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      stage
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 text-center max-w-24 ${
                      currentStage === stage
                        ? 'text-primary'
                        : currentStage > stage
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {getStageLabel(stage)}
                  </span>
                </div>
                {stage < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStage > stage ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {currentStage === STAGES.ANALYSIS && (
          <Stage1Analysis onAnalysisComplete={handleAnalysisComplete} />
        )}

        {currentStage === STAGES.ICD_MAPPING && claimData && (
          <Stage2ICDMapping
            condition={claimData.condition}
            terms={claimData.terms}
            originalNote={claimData.originalNote}
            onICDConfirm={handleICDConfirm}
            onBack={handleBack}
          />
        )}

        {currentStage === STAGES.TREATMENT_PROTOCOL && claimData && (
          <Stage3TreatmentProtocol
            claimData={claimData}
            onTreatmentConfirm={handleTreatmentConfirm}
            onBack={handleBack}
          />
        )}

        {currentStage === STAGES.DOCUMENTATION && claimData && (
          <Stage4Documentation
            claimData={claimData}
            onDocumentationComplete={handleDocumentationComplete}
            onBack={handleBack}
          />
        )}

        {currentStage === STAGES.CLAIM_SUMMARY && claimData && (
          <Stage5ClaimSummary
            claimData={claimData}
            onSave={handleSaveClaim}
            onNewClaim={handleNewClaim}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Sidebar */}
      <Sidebar
        savedCases={savedCases}
        onSelectCase={handleSelectCase}
        onCloseSidebar={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 SaluLink. All rights reserved. Powered by Authi 1.0 Clinical Note Interpretation Engine.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

