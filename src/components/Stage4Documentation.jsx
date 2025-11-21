import React, { useState, useEffect } from 'react';
import { getMedicinesForCondition, filterMedicinesByPlan, planTypes } from '../data/medicines';

const Stage4Documentation = ({ claimData, onDocumentationComplete, onBack }) => {
  const [medicines, setMedicines] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicationNote, setMedicationNote] = useState('');
  const [treatmentDocumentation, setTreatmentDocumentation] = useState({});

  useEffect(() => {
    const medicineData = getMedicinesForCondition(claimData.condition);
    const filtered = selectedPlan ? filterMedicinesByPlan(medicineData, selectedPlan) : medicineData;
    setMedicines(filtered);
  }, [claimData.condition, selectedPlan]);

  useEffect(() => {
    // Initialize documentation state for all selected treatments
    const initialDocs = {};
    [...claimData.selectedDiagnostic, ...claimData.selectedOngoing].forEach(treatment => {
      const key = `${treatment.code}_${treatment.description}`;
      if (!treatmentDocumentation[key]) {
        initialDocs[key] = { notes: '', hasImage: false };
      }
    });
    if (Object.keys(initialDocs).length > 0) {
      setTreatmentDocumentation(prev => ({ ...prev, ...initialDocs }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimData.selectedDiagnostic, claimData.selectedOngoing]);

  const updateTreatmentDocumentation = (code, description, field, value) => {
    const key = `${code}_${description}`;
    setTreatmentDocumentation(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const toggleMedicineSelection = (medicine) => {
    if (medicine.isExcluded) return;

    setSelectedMedicines(prev => {
      const exists = prev.find(item => 
        item.medicineName === medicine.medicineName && 
        item.activeIngredient === medicine.activeIngredient
      );
      if (exists) {
        return prev.filter(item => 
          !(item.medicineName === medicine.medicineName && 
            item.activeIngredient === medicine.activeIngredient)
        );
      } else {
        return [...prev, medicine];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedMedicines.length === 0) {
      alert('Please select at least one medication before continuing');
      return;
    }

    if (!medicationNote.trim()) {
      alert('Please enter a medication registration note');
      return;
    }

    if (onDocumentationComplete) {
      onDocumentationComplete({
        ...claimData,
        treatmentDocumentation,
        selectedMedicines,
        medicationNote,
        selectedPlan
      });
    }
  };

  const groupedMedicines = medicines.reduce((acc, medicine) => {
    const className = medicine.medicineClass;
    if (!acc[className]) {
      acc[className] = [];
    }
    acc[className].push(medicine);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Stage 4: Treatment Documentation & Medication Selection</h2>
        <p className="text-blue-100">Document test results and select appropriate medications</p>
      </div>

      {/* Treatment Documentation Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Treatment Documentation</h3>
        <p className="text-sm text-gray-600 mb-4">Document results for each selected test</p>

        <div className="space-y-4">
          {claimData.selectedDiagnostic.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 text-lg">Diagnostic Tests</h4>
              {claimData.selectedDiagnostic.map((treatment, idx) => {
                const key = `${treatment.code}_${treatment.description}`;
                const doc = treatmentDocumentation[key] || { notes: '', hasImage: false };

                return (
                  <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 mb-3">
                    <div className="mb-3">
                      <h5 className="font-semibold text-gray-800">{treatment.description}</h5>
                      <p className="text-sm text-gray-600 font-mono">{treatment.code}</p>
                      <p className="text-xs text-gray-500 mt-1">Frequency: {treatment.frequency}x</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Results / Notes:
                        </label>
                        <textarea
                          value={doc.notes}
                          onChange={(e) => updateTreatmentDocumentation(treatment.code, treatment.description, 'notes', e.target.value)}
                          placeholder="Enter test results or clinical notes..."
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                          rows="3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Attach Image/Document:
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateTreatmentDocumentation(treatment.code, treatment.description, 'hasImage', true)}
                            className={`flex-1 py-2 px-4 border-2 rounded-lg font-semibold transition-colors ${
                              doc.hasImage 
                                ? 'bg-green-50 border-green-500 text-green-700' 
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {doc.hasImage ? '✓ Image Attached' : 'Upload Image'}
                          </button>
                          {doc.hasImage && (
                            <button
                              onClick={() => updateTreatmentDocumentation(treatment.code, treatment.description, 'hasImage', false)}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {claimData.selectedOngoing.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3 text-lg">Ongoing Management Tests</h4>
              {claimData.selectedOngoing.map((treatment, idx) => {
                const key = `${treatment.code}_${treatment.description}`;
                const doc = treatmentDocumentation[key] || { notes: '', hasImage: false };

                return (
                  <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 mb-3">
                    <div className="mb-3">
                      <h5 className="font-semibold text-gray-800">{treatment.description}</h5>
                      <p className="text-sm text-gray-600 font-mono">{treatment.code}</p>
                      <p className="text-xs text-gray-500 mt-1">Frequency: {treatment.frequency}x</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Results / Notes:
                        </label>
                        <textarea
                          value={doc.notes}
                          onChange={(e) => updateTreatmentDocumentation(treatment.code, treatment.description, 'notes', e.target.value)}
                          placeholder="Enter test results or clinical notes..."
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                          rows="3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Attach Image/Document:
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateTreatmentDocumentation(treatment.code, treatment.description, 'hasImage', true)}
                            className={`flex-1 py-2 px-4 border-2 rounded-lg font-semibold transition-colors ${
                              doc.hasImage 
                                ? 'bg-green-50 border-green-500 text-green-700' 
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {doc.hasImage ? '✓ Image Attached' : 'Upload Image'}
                          </button>
                          {doc.hasImage && (
                            <button
                              onClick={() => updateTreatmentDocumentation(treatment.code, treatment.description, 'hasImage', false)}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Medication Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Medication Selection</h3>

        {/* Plan Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Medical Aid Plan (optional filter):
          </label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
          >
            <option value="">All Plans</option>
            {planTypes.map(plan => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Selecting a plan will show which medicines are excluded for that plan
          </p>
        </div>

        {/* Selected Medicines Summary */}
        {selectedMedicines.length > 0 && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">
              Selected Medications ({selectedMedicines.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedMedicines.map((med, idx) => (
                <span key={idx} className="bg-white border border-green-300 text-green-800 px-3 py-1 rounded-lg text-sm">
                  {med.medicineName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Medicines by Class */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(groupedMedicines).map(([className, meds]) => (
            <div key={className} className="border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-3 text-lg">{className}</h4>
              <div className="space-y-2">
                {meds.map((medicine, idx) => {
                  const isSelected = selectedMedicines.find(item => 
                    item.medicineName === medicine.medicineName && 
                    item.activeIngredient === medicine.activeIngredient
                  );

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleMedicineSelection(medicine)}
                      className={`border rounded-lg p-3 transition-all ${
                        medicine.isExcluded
                          ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'bg-blue-50 border-primary cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center h-6">
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            disabled={medicine.isExcluded}
                            onChange={() => {}}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-800">{medicine.medicineName}</span>
                            {medicine.isExcluded && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                                Excluded
                              </span>
                            )}
                            {isSelected && !medicine.isExcluded && (
                              <span className="bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{medicine.activeIngredient}</p>
                          <div className="flex gap-3 text-xs">
                            <span className="text-gray-600">
                              <strong>Core/Priority/Saver:</strong> {medicine.cdaCore}
                            </span>
                            <span className="text-gray-600">
                              <strong>Executive/Comprehensive:</strong> {medicine.cdaExecutive}
                            </span>
                          </div>
                          {medicine.planExclusions && (
                            <p className="text-xs text-red-600 mt-1">
                              {medicine.planExclusions}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medication Registration Note */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Medication Registration Note</h3>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Enter note for chronic medication registration:
        </label>
        <textarea
          value={medicationNote}
          onChange={(e) => setMedicationNote(e.target.value)}
          placeholder="Document the medication registration details, patient instructions, and any relevant clinical notes..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
          rows="4"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-md"
        >
          Back to Treatments
        </button>
        
        <button
          onClick={handleConfirm}
          disabled={selectedMedicines.length === 0 || !medicationNote.trim()}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
        >
          Complete Documentation & Continue
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
              Document test results for each treatment. Select medications from the formulary based on the patient's 
              medical aid plan. Generic medicines remain selectable even if a plan excludes certain medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage4Documentation;

