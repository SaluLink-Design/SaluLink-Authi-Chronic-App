# SaluLink Chronic Treatment App

A comprehensive React-based application for managing chronic disease treatment protocols, powered by Authi 1.0 Clinical Note Interpretation Engine.

## Features

### 🔍 Stage 1: Clinical Note Analysis
- Paste or type patient clinical notes
- Authi 1.0 analyzes notes to identify chronic conditions
- Supports: Cardiac Failure, Hypertension, Diabetes Insipidus, Diabetes Mellitus Type 1 & 2
- Extracts relevant medical terminology, symptoms, and family history indicators

### 🏥 Stage 2: ICD-10 Code Mapping
- Automatic mapping to relevant ICD-10 codes
- Select one or multiple codes per condition
- Comprehensive ICD-10 code database for cardiovascular and endocrine conditions

### 💊 Stage 3: Treatment Protocol Selection
- **Diagnostic Basket**: Initial tests for diagnosis confirmation
- **Ongoing Management Basket**: Tests for continuous patient monitoring
- Specify frequency for each test within coverage limits
- View test codes, descriptions, and specialist requirements

### 📋 Stage 4: Treatment Documentation & Medication
- Document results for each selected test
- Upload images or add notes for test results
- **Medication Selection**:
  - Filter by medical aid plan (Core, Priority, Saver, Executive, Comprehensive)
  - View CDA (Chronic Disease Amount) for different plans
  - Automatic exclusion highlighting for plan-specific restrictions
  - Grouped by medicine class and active ingredient
- Add medication registration notes

### 📄 Stage 5: Claim Summary & Export
- Complete claim documentation review
- **Export as PDF**: Professional, structured claim document
- **Save to Case Library**: Store claims for future reference
- **Start New Claim**: Begin another patient workflow

### 📚 Case Library
- View all saved claims
- Quick access to previously completed cases
- Persistent storage using browser localStorage

## Technologies Used

- **React 18**: Modern UI framework
- **Tailwind CSS**: Utility-first styling
- **Authi 1.0**: Custom clinical note analysis engine
- **jsPDF**: PDF generation
- **localStorage**: Client-side data persistence

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm start
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Sources

The app uses three primary datasets:

1. **Cardiovascular and Endocrine Conditions.csv**
   - Chronic conditions with ICD-10 codes and descriptions

2. **Cardiovascular and Endocrine Treatments.csv**
   - Diagnostic and ongoing management test baskets
   - Test codes, coverage limits, and specialist requirements

3. **Cardiovascular and Endocrine Medicine.csv**
   - Approved medicines by condition
   - CDA amounts per plan type
   - Active ingredients and formulary status

## Authi 1.0 Engine

Authi 1.0 is a clinical note interpretation engine that:
- Analyzes free-text clinical notes
- Identifies medical entities through keyword matching
- Supports 5 chronic conditions
- Extracts relevant symptoms, terminology, and family history
- Provides structured output for downstream processing

## Project Structure

\`\`\`
src/
├── components/          # React components for each stage
│   ├── Stage1Analysis.jsx
│   ├── Stage2ICDMapping.jsx
│   ├── Stage3TreatmentProtocol.jsx
│   ├── Stage4Documentation.jsx
│   ├── Stage5ClaimSummary.jsx
│   └── Sidebar.jsx
├── data/                # Data modules from CSV files
│   ├── conditions.js
│   ├── treatments.js
│   └── medicines.js
├── utils/               # Utility functions
│   └── authi.js        # Authi 1.0 engine
├── App.js              # Main application with state management
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind
\`\`\`

## Compliance & Standards

- **PMB Compliance**: Aligns with Prescribed Minimum Benefits
- **Medical Scheme Integration**: Formulary-based medication selection
- **Structured Documentation**: Standardized claim format for submissions
- **Audit Trail**: Complete tracking of clinical decisions

## Usage Workflow

1. **Enter Clinical Note**: Paste patient note or use sample
2. **Analyze**: Authi 1.0 identifies potential conditions
3. **Confirm Condition**: Select the correct condition
4. **Select ICD Codes**: Choose applicable ICD-10 codes
5. **Choose Treatments**: Select diagnostic and ongoing management tests
6. **Document Results**: Add notes and images for each test
7. **Select Medications**: Choose from formulary based on patient's plan
8. **Review & Export**: Generate PDF or save to case library

## Future Enhancements

- Multi-condition support in a single claim
- Integration with EHR systems
- Real-time scheme benefit checks
- Advanced NLP for better entity extraction
- Cloud storage and sharing capabilities

## License

© 2025 SaluLink. All rights reserved.

## Support

For support, please contact the SaluLink development team.

