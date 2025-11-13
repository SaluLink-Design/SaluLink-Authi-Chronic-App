// Authi 1.0 - Clinical Note Analysis Engine
// Converted from Python to JavaScript

const medicalEntities = {
  'Cardiac Failure': [
    'heart failure',
    'congestive heart failure',
    'CHF',
    'cardiac decompensation',
    'dyspnea',
    'shortness of breath',
    'orthopnea',
    'paroxysmal nocturnal dyspnea',
    'PND',
    'edema',
    'swelling in legs',
    'fluid retention',
    'fatigue',
    'weakness',
    'palpitations',
    'chest pain',
    'arrhythmia',
    'cardiomyopathy',
    'myocardial infarction',
    'heart attack',
    'family history of heart disease',
    'FHx heart disease'
  ],
  'Hypertension': [
    'high blood pressure',
    'HTN',
    'elevated blood pressure',
    'BP elevated',
    'hypertensive',
    'essential hypertension',
    'secondary hypertension',
    'headache',
    'dizziness',
    'nosebleeds',
    'epistaxis',
    'family history of hypertension',
    'FHx HTN'
  ],
  'Diabetes Insipidus': [
    'DI',
    'diabetes insipidus',
    'excessive thirst',
    'polydipsia',
    'excessive urination',
    'polyuria',
    'dehydration',
    'vasopressin deficiency',
    'ADH deficiency',
    'nephrogenic diabetes insipidus',
    'central diabetes insipidus'
  ],
  'Diabetes Mellitus Type 1': [
    'DM1',
    'type 1 diabetes',
    'insulin-dependent diabetes',
    'juvenile diabetes',
    'autoimmune diabetes',
    'polyuria',
    'polydipsia',
    'polyphagia',
    'unexplained weight loss',
    'fatigue',
    'blurred vision',
    'diabetic ketoacidosis',
    'DKA',
    'family history of type 1 diabetes',
    'FHx DM1'
  ],
  'Diabetes Mellitus Type 2': [
    'DM2',
    'type 2 diabetes',
    'non-insulin-dependent diabetes',
    'adult-onset diabetes',
    'insulin resistance',
    'polyuria',
    'polydipsia',
    'polyphagia',
    'fatigue',
    'blurred vision',
    'slow-healing sores',
    'frequent infections',
    'neuropathy',
    'retinopathy',
    'nephropathy',
    'family history of type 2 diabetes',
    'FHx DM2'
  ]
};

/**
 * Identifies mentions of medical entities in a clinical note
 * @param {string} clinicalNoteText - The raw clinical note text
 * @param {Object} medicalEntitiesDict - Dictionary of conditions and their associated terms
 * @returns {Object} Dictionary mapping identified conditions to found entities
 */
const matchEntities = (clinicalNoteText, medicalEntitiesDict = medicalEntities) => {
  const identifiedConditionsAndEntities = {};
  const noteTextLower = clinicalNoteText.toLowerCase();

  Object.entries(medicalEntitiesDict).forEach(([condition, termsList]) => {
    const foundEntitiesForCondition = new Set();

    termsList.forEach(term => {
      if (noteTextLower.includes(term.toLowerCase())) {
        foundEntitiesForCondition.add(term);
      }
    });

    if (foundEntitiesForCondition.size > 0) {
      identifiedConditionsAndEntities[condition] = 
        Array.from(foundEntitiesForCondition).sort();
    }
  });

  return identifiedConditionsAndEntities;
};

/**
 * Main Authi 1.0 analysis function
 * Analyzes clinical notes and returns identified conditions with their terms
 * @param {string} clinicalNoteText - The raw clinical note text
 * @returns {Object} Analysis results with identified conditions and terms
 */
export const authiAnalyzeNote = (clinicalNoteText) => {
  if (!clinicalNoteText || clinicalNoteText.trim() === '') {
    return {
      success: false,
      message: 'No clinical note provided',
      identifiedConditions: {}
    };
  }

  const identifiedData = matchEntities(clinicalNoteText, medicalEntities);

  return {
    success: true,
    message: Object.keys(identifiedData).length > 0 
      ? 'Analysis complete' 
      : 'No conditions identified',
    identifiedConditions: identifiedData,
    originalNote: clinicalNoteText
  };
};

/**
 * Get all medical entities dictionary
 * @returns {Object} The medical entities dictionary
 */
export const getMedicalEntities = () => {
  return medicalEntities;
};

/**
 * Get terms for a specific condition
 * @param {string} condition - The condition name
 * @returns {Array} Array of terms for the condition
 */
export const getTermsForCondition = (condition) => {
  return medicalEntities[condition] || [];
};

export default authiAnalyzeNote;

