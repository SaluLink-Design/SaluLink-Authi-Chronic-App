import React from 'react';
import { jsPDF } from 'jspdf';

const Stage5ClaimSummary = ({ claimData, onSave, onNewClaim, onBack }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('SaluLink Chronic Treatment Claim', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Date
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Section 1: Clinical Note
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('1. Clinical Note', 15, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const noteLines = doc.splitTextToSize(claimData.originalNote, pageWidth - 30);
    doc.text(noteLines, 15, yPosition);
    yPosition += (noteLines.length * 5) + 5;

    // Section 2: Confirmed Condition
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('2. Confirmed Condition', 15, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(claimData.condition, 20, yPosition);
    yPosition += 7;
    
    doc.text('Identified Terms:', 20, yPosition);
    yPosition += 5;
    claimData.terms.forEach(term => {
      doc.text(`• ${term}`, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 3;

    // Section 3: ICD-10 Codes
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('3. ICD-10 Codes', 15, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    claimData.selectedICDs.forEach(icd => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${icd.icdCode}: ${icd.description}`, 20, yPosition);
      yPosition += 5;
    });
    yPosition += 3;

    // Section 4: Diagnostic Tests
    if (claimData.selectedDiagnostic.length > 0) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('4. Diagnostic Tests', 15, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      claimData.selectedDiagnostic.forEach(test => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${test.description} (${test.code})`, 20, yPosition);
        yPosition += 5;
        doc.text(`  Frequency: ${test.frequency}x`, 25, yPosition);
        yPosition += 5;
        
        const key = `${test.code}_${test.description}`;
        const documentation = claimData.treatmentDocumentation[key];
        if (documentation && documentation.notes) {
          doc.text(`  Notes: ${documentation.notes}`, 25, yPosition);
          yPosition += 5;
        }
        yPosition += 2;
      });
      yPosition += 3;
    }

    // Section 5: Ongoing Management Tests
    if (claimData.selectedOngoing.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('5. Ongoing Management Tests', 15, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      claimData.selectedOngoing.forEach(test => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${test.description} (${test.code})`, 20, yPosition);
        yPosition += 5;
        doc.text(`  Frequency: ${test.frequency}x`, 25, yPosition);
        yPosition += 5;
        
        const key = `${test.code}_${test.description}`;
        const documentation = claimData.treatmentDocumentation[key];
        if (documentation && documentation.notes) {
          doc.text(`  Notes: ${documentation.notes}`, 25, yPosition);
          yPosition += 5;
        }
        yPosition += 2;
      });
      yPosition += 3;
    }

    // Section 6: Medications
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('6. Prescribed Medications', 15, yPosition);
    yPosition += 7;
    
    if (claimData.selectedPlan) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'italic');
      doc.text(`Plan: ${claimData.selectedPlan}`, 20, yPosition);
      yPosition += 7;
    }
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    claimData.selectedMedicines.forEach(med => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${med.medicineName}`, 20, yPosition);
      yPosition += 5;
      doc.text(`  Active Ingredient: ${med.activeIngredient}`, 25, yPosition);
      yPosition += 5;
      doc.text(`  Class: ${med.medicineClass}`, 25, yPosition);
      yPosition += 5;
      doc.text(`  CDA: ${med.cdaCore} / ${med.cdaExecutive}`, 25, yPosition);
      yPosition += 7;
    });

    // Section 7: Medication Registration Note
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('7. Medication Registration Note', 15, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const noteRegLines = doc.splitTextToSize(claimData.medicationNote, pageWidth - 30);
    doc.text(noteRegLines, 20, yPosition);

    // Save the PDF
    const fileName = `SaluLink_Claim_${claimData.condition.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

  const handleSave = () => {
    if (onSave) {
      const savedClaim = {
        ...claimData,
        id: Date.now(),
        savedDate: new Date().toISOString()
      };
      onSave(savedClaim);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Stage 5: Claim Summary</h2>
        <p className="text-blue-100">Review and export the complete claim documentation</p>
      </div>

      {/* Success Banner */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-2xl font-bold text-green-800">Claim Completed Successfully!</h3>
        </div>
        <p className="text-green-700">
          Your claim documentation is ready for review and export. All information has been captured according to PMB guidelines.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h4 className="text-sm text-gray-600 uppercase font-semibold mb-1">Condition</h4>
          <p className="text-2xl font-bold text-gray-800">{claimData.condition}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h4 className="text-sm text-gray-600 uppercase font-semibold mb-1">ICD Codes</h4>
          <p className="text-2xl font-bold text-gray-800">{claimData.selectedICDs.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h4 className="text-sm text-gray-600 uppercase font-semibold mb-1">Treatments</h4>
          <p className="text-2xl font-bold text-gray-800">
            {claimData.selectedDiagnostic.length + claimData.selectedOngoing.length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h4 className="text-sm text-gray-600 uppercase font-semibold mb-1">Medications</h4>
          <p className="text-2xl font-bold text-gray-800">{claimData.selectedMedicines.length}</p>
        </div>
      </div>

      {/* Detailed Summary Sections */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Clinical Note</h3>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{claimData.originalNote}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmed Condition & Terms</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="text-lg font-bold text-gray-800 mb-3">{claimData.condition}</h4>
          <div className="flex flex-wrap gap-2">
            {claimData.terms.map((term, idx) => (
              <span key={idx} className="bg-white border border-blue-300 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Selected ICD-10 Codes</h3>
        <div className="space-y-2">
          {claimData.selectedICDs.map((icd, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start gap-3">
              <span className="font-mono font-bold text-primary">{icd.icdCode}</span>
              <span className="text-gray-700">{icd.description}</span>
            </div>
          ))}
        </div>
      </div>

      {claimData.selectedDiagnostic.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Diagnostic Tests</h3>
          <div className="space-y-3">
            {claimData.selectedDiagnostic.map((test, idx) => {
              const key = `${test.code}_${test.description}`;
              const doc = claimData.treatmentDocumentation[key];
              
              return (
                <div key={idx} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{test.description}</h4>
                      <p className="text-sm text-gray-600 font-mono">{test.code}</p>
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {test.frequency}x
                    </span>
                  </div>
                  {doc && doc.notes && (
                    <div className="mt-3 bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Notes:</p>
                      <p className="text-gray-700">{doc.notes}</p>
                    </div>
                  )}
                  {doc && doc.hasImage && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      Image attached
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {claimData.selectedOngoing.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ongoing Management Tests</h3>
          <div className="space-y-3">
            {claimData.selectedOngoing.map((test, idx) => {
              const key = `${test.code}_${test.description}`;
              const doc = claimData.treatmentDocumentation[key];
              
              return (
                <div key={idx} className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{test.description}</h4>
                      <p className="text-sm text-gray-600 font-mono">{test.code}</p>
                    </div>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {test.frequency}x
                    </span>
                  </div>
                  {doc && doc.notes && (
                    <div className="mt-3 bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Notes:</p>
                      <p className="text-gray-700">{doc.notes}</p>
                    </div>
                  )}
                  {doc && doc.hasImage && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      Image attached
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Prescribed Medications</h3>
        {claimData.selectedPlan && (
          <p className="text-sm text-gray-600 mb-4">Plan: <strong>{claimData.selectedPlan}</strong></p>
        )}
        <div className="space-y-3">
          {claimData.selectedMedicines.map((med, idx) => (
            <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">{med.medicineName}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Active Ingredient:</span>
                  <p className="font-semibold text-gray-800">{med.activeIngredient}</p>
                </div>
                <div>
                  <span className="text-gray-600">Class:</span>
                  <p className="font-semibold text-gray-800">{med.medicineClass}</p>
                </div>
                <div>
                  <span className="text-gray-600">CDA Core/Priority/Saver:</span>
                  <p className="font-semibold text-gray-800">{med.cdaCore}</p>
                </div>
                <div>
                  <span className="text-gray-600">CDA Executive/Comprehensive:</span>
                  <p className="font-semibold text-gray-800">{med.cdaExecutive}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Medication Registration Note</h3>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{claimData.medicationNote}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-md"
        >
          Back to Documentation
        </button>
        
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
        >
          Save to Case Library
        </button>
        
        <button
          onClick={generatePDF}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Export as PDF
        </button>
        
        <button
          onClick={onNewClaim}
          className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
        >
          Start New Claim
        </button>
      </div>

      {/* Info Panel */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              This claim is complete and ready for submission. You can save it to the case library for future reference, 
              export it as a PDF for medical scheme submission, or start a new claim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage5ClaimSummary;

