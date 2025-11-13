// Cardiovascular and Endocrine Conditions Data
// Parsed from Cardiovascular and Endocrine Conditions.csv

export const conditionsData = [
  { condition: "Cardiac Failure", icdCode: "I11.0", description: "Hypertensive heart disease with (congestive) heart failure" },
  { condition: "Cardiac Failure", icdCode: "I13.0", description: "Hypertensive heart and renal disease with (congestive) heart failure" },
  { condition: "Cardiac Failure", icdCode: "I13.2", description: "Hypertensive heart and renal disease with both (congestive) heart failure and renal failure" },
  { condition: "Cardiac Failure", icdCode: "I50.0", description: "Congestive heart failure" },
  { condition: "Cardiac Failure", icdCode: "I50.1", description: "Left ventricular failure" },
  { condition: "Cardiac Failure", icdCode: "I50.9", description: "Heart failure, unspecified" },
  { condition: "Hypertension", icdCode: "I10", description: "Essential (primary) hypertension" },
  { condition: "Hypertension", icdCode: "I11.0", description: "Hypertensive heart disease with (congestive) heart failure" },
  { condition: "Hypertension", icdCode: "I11.9", description: "Hypertensive heart disease without (congestive) heart failure" },
  { condition: "Hypertension", icdCode: "I12.0", description: "Hypertensive renal disease with renal failure" },
  { condition: "Hypertension", icdCode: "I12.9", description: "Hypertensive renal disease without renal failure" },
  { condition: "Hypertension", icdCode: "I13.0", description: "Hypertensive heart and renal disease with (congestive) heart failure" },
  { condition: "Hypertension", icdCode: "I13.1", description: "Hypertensive heart and renal disease with renal failure" },
  { condition: "Hypertension", icdCode: "I13.2", description: "Hypertensive heart and renal disease with both (congestive) heart failure and renal failure" },
  { condition: "Hypertension", icdCode: "I13.9", description: "Hypertensive heart and renal disease, unspecified" },
  { condition: "Hypertension", icdCode: "I15.0", description: "Renovascular hypertension" },
  { condition: "Hypertension", icdCode: "I15.1", description: "Hypertension secondary to other renal disorders" },
  { condition: "Hypertension", icdCode: "I15.2", description: "Hypertension secondary to endocrine disorders" },
  { condition: "Hypertension", icdCode: "I15.8", description: "Other secondary hypertension" },
  { condition: "Hypertension", icdCode: "I15.9", description: "Secondary hypertension, unspecified" },
  { condition: "Diabetes Insipidus", icdCode: "E23.2", description: "Diabetes insipidus" },
  { condition: "Diabetes Insipidus", icdCode: "N25.1", description: "Nephrogenic diabetes insipidus" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.0", description: "Insulin-dependent diabetes mellitus with coma" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.1", description: "Insulin-dependent diabetes mellitus with ketoacidosis" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.2+N08.3*", description: "Insulin-dependent diabetes mellitus with renal complications/Insulin-dependent diabetic nephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.3+H36.0*", description: "Insulin-dependent diabetes mellitus with ophthalmic complications/ Diabetic retinopathy" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.4+G63.2*", description: "Insulin-dependent diabetes mellitus with neurological complications/ Diabetic polyneuropathy" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.5", description: "Insulin-dependent diabetes mellitus with peripheral circulatory complications" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.6", description: "Insulin-dependent diabetes mellitus with other specified complications" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.7", description: "Insulin-dependent diabetes mellitus with multiple complications" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.8", description: "Insulin-dependent diabetes mellitus with unspecified complications" },
  { condition: "Diabetes Mellitus Type 1", icdCode: "E10.9", description: "Insulin-dependent diabetes mellitus without complications" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.0", description: "Non-insulin-dependent diabetes mellitus with coma" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.1", description: "Non-insulin-dependent diabetes mellitus with ketoacidosis" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.2+N08.3*", description: "Non-insulin-dependent diabetes mellitus with renal complications/Insulin-dependent diabetic nephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.3+H36.0*", description: "Non-insulin-dependent diabetes mellitus with ophthalmic complications/ Diabetic retinopathy" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.4+G63.2*", description: "Non-insulin-dependent diabetes mellitus with neurological complications/ Diabetic polyneuropathy" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.5", description: "Non-insulin-dependent diabetes mellitus with peripheral circulatory complications" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.6", description: "Non-insulin-dependent diabetes mellitus with other specified complications" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.7", description: "Non-insulin-dependent diabetes mellitus with multiple complications" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.8", description: "Non-insulin-dependent diabetes mellitus with unspecified complications" },
  { condition: "Diabetes Mellitus Type 2", icdCode: "E11.9", description: "Non-insulin-dependent diabetes mellitus without complications" }
];

/**
 * Get ICD codes for a specific condition
 * @param {string} condition - The condition name
 * @returns {Array} Array of ICD code objects
 */
export const getICDCodesForCondition = (condition) => {
  return conditionsData.filter(item => item.condition === condition);
};

/**
 * Get all unique conditions
 * @returns {Array} Array of unique condition names
 */
export const getAllConditions = () => {
  return [...new Set(conditionsData.map(item => item.condition))];
};

export default conditionsData;

