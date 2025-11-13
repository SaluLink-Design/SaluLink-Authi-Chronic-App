import React from 'react';

const Sidebar = ({ savedCases, onSelectCase, onCloseSidebar, isOpen }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onCloseSidebar}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Case Library</h2>
            <button
              onClick={onCloseSidebar}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cases List */}
          {savedCases.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 font-semibold mb-1">No saved cases yet</p>
              <p className="text-sm text-gray-500">Complete and save a claim to see it here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  onClick={() => {
                    onSelectCase(caseItem);
                    onCloseSidebar();
                  }}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{caseItem.condition}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      Saved
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {caseItem.selectedICDs.length} ICD code{caseItem.selectedICDs.length !== 1 ? 's' : ''} • 
                    {' '}{caseItem.selectedDiagnostic.length + caseItem.selectedOngoing.length} treatment{(caseItem.selectedDiagnostic.length + caseItem.selectedOngoing.length) !== 1 ? 's' : ''} • 
                    {' '}{caseItem.selectedMedicines.length} medication{caseItem.selectedMedicines.length !== 1 ? 's' : ''}
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    Saved: {new Date(caseItem.savedDate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

