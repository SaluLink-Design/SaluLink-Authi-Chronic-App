// Cardiovascular and Endocrine Treatments Data
// Parsed from Cardiovascular and Endocrine Treatments.csv

export const treatmentsData = {
  "Cardiac Failure": {
    diagnostic: [
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "ECG – Electrocardiogram", code: "(1228+1230) or (1229+1231) or 1232 or 1233 or 1234 or 1235 or 1236", coverage: 1 },
      { description: "Echocardiography", code: "3620 & 3621 & 3622 & 3623 & 3624 & 3625", coverage: 1 },
      { description: "B-Type natriuretic peptide", code: "4488", coverage: 1 },
      { description: "Creatinine", code: "4032 or 4221 or 4223", coverage: 1 },
      { description: "C-reactive protein", code: "3947", coverage: 1 },
      { description: "Full blood count", code: "3755", coverage: 1 },
      { description: "Troponin isoforms", code: "4161", coverage: 1 },
      { description: "Total cholesterol", code: "4027", coverage: 1 },
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 1 },
      { description: "Glucose – random/fasting", code: "4050 or 4057", coverage: 1 },
      { description: "X-ray of the chest two views, PA and lateral", code: "30110", coverage: 1 },
      { description: "Thyrotropin (TSH)", code: "4507", coverage: 1 }
    ],
    ongoing: [
      { description: "U & E only", code: "4171", coverage: 4, specialists: 2 },
      { description: "ECG – Electrocardiogram", code: "(1228+1230) or 1232", coverage: 3 },
      { description: "ECG – Electrocardiogram", code: "(1229+1231) or 1233 or 1234 or 1235 or 1236", coverage: 1 },
      { description: "Echocardiography", code: "3620 & 3621 & 3622 & 3623 & 3624 & 3625", coverage: 2 },
      { description: "B-Type natriuretic peptide", code: "4488", coverage: 1 },
      { description: "Creatinine", code: "4032 or 4221 or 4223", coverage: 4 },
      { description: "Drug level in biological fluid", code: "4081 or 4370 or 4493", coverage: 3 },
      { description: "Threshold testing: own equipment", code: "1268", coverage: 1 },
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 4 },
      { description: "Programming of the Atrioventricular sequential pacemaker", code: "1270 or 75075", coverage: 1 },
      { description: "X-ray of the chest two views, PA and lateral", code: "30110", coverage: 1 }
    ]
  },
  "Hypertension": {
    diagnostic: [
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 1 },
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "24 Hour ambulatory blood pressure", code: "1237", coverage: 1 }
    ],
    ongoing: [
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 1 },
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "24 Hour ambulatory blood pressure", code: "1237", coverage: 1 }
    ]
  },
  "Diabetes Insipidus": {
    diagnostic: [
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "Creatinine", code: "4032 or 4221 or 4223", coverage: 1 },
      { description: "Osmolality: Serum or urine", code: "4093", coverage: 1 }
    ],
    ongoing: [
      { description: "U & E only", code: "4171", coverage: 3, specialists: 1 },
      { description: "Creatinine", code: "4032 or 4221 or 4223", coverage: 3 },
      { description: "Osmolality: Serum or urine", code: "4093", coverage: 1 }
    ]
  },
  "Diabetes Mellitus Type 1": {
    diagnostic: [
      { description: "ECG – Electrocardiogram", code: "1232 or 1233 or 1236", coverage: 1 },
      { description: "Microalbuminuria", code: "4261 or 4262", coverage: 1 },
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 1 },
      { description: "LDL cholesterol", code: "4026", coverage: 1 },
      { description: "HDL cholesterol", code: "4028", coverage: 1 },
      { description: "Total cholesterol", code: "4027", coverage: 1 },
      { description: "Triglycerides", code: "4147", coverage: 1 },
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "Serum creatinine", code: "4032 or 4223", coverage: 1 },
      { description: "Urine creatinine", code: "4221", coverage: 1 },
      { description: "Two-hour glucose- OGTT", code: "4049", coverage: 1 },
      { description: "Glucose – random/fasting", code: "4057", coverage: 1 }
    ],
    ongoing: [
      { description: "ECG – Electrocardiogram", code: "1232 or 1233 or 1236", coverage: 1, specialists: "1 (Ophthalmologist) 4 (Other Specialist)" },
      { description: "Microalbuminuria", code: "4261 or 4262", coverage: 2 },
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 4 },
      { description: "LDL cholesterol", code: "4026", coverage: 1 },
      { description: "HDL cholesterol", code: "4028", coverage: 1 },
      { description: "Total cholesterol", code: "4027", coverage: 1 },
      { description: "Triglycerides", code: "4147", coverage: 1 },
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "Serum creatinine", code: "4032 or 4223", coverage: 1 },
      { description: "Urine creatinine", code: "4221", coverage: 1 },
      { description: "HbA1c", code: "4064", coverage: 4 },
      { description: "Tonometry", code: "3014", coverage: 1 },
      { description: "Basic capital equipped in own rooms by ophthalmologists", code: "3009", coverage: 1 },
      { description: "Dietitian", code: "84200 or 84201 or 84202 or 84203 or 84204 or 84205", coverage: 1 },
      { description: "Fundus examination", code: "3003 or 3004 or 3027", coverage: 1 },
      { description: "Podiatrist", code: "68301 or 68302 or 68303 or 68304", coverage: 1 },
      { description: "Diabetes Educator", code: "DFSC1", coverage: null },
      { description: "Diabetes Educator", code: "DEDUT or DEDU1", coverage: 2 }
    ]
  },
  "Diabetes Mellitus Type 2": {
    diagnostic: [
      { description: "ECG – Electrocardiogram", code: "1232 or 1233 or 1236", coverage: 1 },
      { description: "Microalbuminuria", code: "4261 or 4262", coverage: 1 },
      { description: "HDL cholesterol", code: "4028", coverage: 1 },
      { description: "Total cholesterol", code: "4027", coverage: 1 },
      { description: "LDL cholesterol", code: "4026", coverage: 1 },
      { description: "Triglycerides", code: "4147", coverage: 1 },
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 1 },
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "Urine creatinine", code: "4221", coverage: 1 },
      { description: "Glucose – random/fasting", code: "4057", coverage: 1 },
      { description: "Serum creatinine", code: "4032 or 4223", coverage: 1 },
      { description: "Two-hour glucose- OGTT", code: "4049", coverage: 1 }
    ],
    ongoing: [
      { description: "ECG – Electrocardiogram", code: "1232 or 1233 or 1236", coverage: 1, specialists: "1 (Ophthalmologist) 1 (Other Specialist)" },
      { description: "Microalbuminuria", code: "4261 or 4262", coverage: 2 },
      { description: "HDL cholesterol", code: "4028", coverage: 1 },
      { description: "Total cholesterol", code: "4027", coverage: 1 },
      { description: "LDL cholesterol", code: "4026", coverage: 1 },
      { description: "Triglycerides", code: "4147", coverage: 1 },
      { description: "Urine analysis (dipstick)", code: "4188", coverage: 4 },
      { description: "U & E only", code: "4171", coverage: 1 },
      { description: "Urine creatinine", code: "4221", coverage: 1 },
      { description: "HbA1c", code: "4064", coverage: 4 },
      { description: "Serum creatinine", code: "4032 or 4223", coverage: 1 },
      { description: "Tonometry", code: "3014", coverage: 1 },
      { description: "Basic capital equipped in own rooms by ophthalmologists", code: "3009", coverage: 1 },
      { description: "Fundus examination", code: "3003 or 3004 or 3027", coverage: 1 },
      { description: "Podiatrist", code: "68301 or 68302 or 68303 or 68304", coverage: 1 },
      { description: "Diabetes Educator", code: "DFSC1", coverage: null },
      { description: "Dietitian", code: "84200 or 84201 or 84202 or 84203 or 84204 or 84205", coverage: 1 },
      { description: "Diabetes Educator", code: "DEDUT or DEDU1", coverage: 2 }
    ]
  }
};

/**
 * Get treatments for a specific condition
 * @param {string} condition - The condition name
 * @returns {Object} Object containing diagnostic and ongoing treatment baskets
 */
export const getTreatmentsForCondition = (condition) => {
  return treatmentsData[condition] || { diagnostic: [], ongoing: [] };
};

/**
 * Get all conditions with treatments
 * @returns {Array} Array of condition names
 */
export const getAllTreatmentConditions = () => {
  return Object.keys(treatmentsData);
};

export default treatmentsData;

