# SaluLink Chronic Treatment App - Quick Start Guide

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Open your terminal** and navigate to the project directory:

```bash
cd "/Users/tjmoipolai/Documents/SaluLink App Building/SaluLink Authi Chronic App"
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm start
```

4. **Open your browser** and visit:

```
http://localhost:3000
```

The app should now be running! 🎉

## 📖 How to Use the App

### Step 1: Clinical Note Analysis

1. Enter or paste a clinical note in the text box
2. Click "Load Sample Note" to try a pre-filled example
3. Click "Analyze with Authi 1.0"
4. Review identified conditions
5. Click "Confirm Condition" for the relevant condition

### Step 2: ICD-10 Code Selection

1. Review the confirmed condition and identified terms
2. Select one or more ICD-10 codes from the list
3. Click "Confirm ICD Codes & Continue"

### Step 3: Treatment Protocol

1. Select tests from the **Diagnostic Basket**
2. Select tests from the **Ongoing Management Basket**
3. Adjust the frequency for each selected test
4. Click "Confirm Treatments & Continue"

### Step 4: Documentation & Medication

1. **Document Test Results**:
   - Add notes for each selected test
   - Mark if images are attached

2. **Select Medications**:
   - Choose a medical aid plan (optional)
   - Select appropriate medications
   - Excluded medicines are clearly marked

3. Add a medication registration note
4. Click "Complete Documentation & Continue"

### Step 5: Claim Summary & Export

1. Review the complete claim summary
2. Choose an action:
   - **Save to Case Library**: Store for future reference
   - **Export as PDF**: Download a professional claim document
   - **Start New Claim**: Begin another patient case

## 💾 Viewing Saved Cases

- Click the **"View Cases"** button in the top-right corner
- Select any saved case to view its details
- Cases are stored in your browser's local storage

## 🎨 Sample Clinical Note

Try this sample note to test the application:

```
Patient presents with a history of high blood pressure (HTN) and recent 
complaints of shortness of breath (SOB). Family history includes FHx heart 
disease. Recent labs show elevated glucose levels, indicating possible DM2. 
Patient also reports excessive urination and polydipsia.
```

This sample will identify multiple conditions for demonstration purposes.

## 📋 Supported Conditions

The app currently supports these chronic conditions:

- **Cardiac Failure**
- **Hypertension**
- **Diabetes Insipidus**
- **Diabetes Mellitus Type 1**
- **Diabetes Mellitus Type 2**

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm start
```

### Dependencies Installation Issues

If you encounter errors during installation:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Browser Compatibility

For best results, use:

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📱 App Structure

```
┌─────────────────────────────────────┐
│  Stage 1: Clinical Note Analysis   │
│  (Authi 1.0 Engine)                 │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Stage 2: ICD-10 Code Mapping       │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Stage 3: Treatment Protocol        │
│  (Diagnostic & Ongoing Baskets)     │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Stage 4: Documentation &           │
│  Medication Selection                │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Stage 5: Claim Summary & Export    │
│  (PDF Export / Case Library)        │
└─────────────────────────────────────┘
```

## 🎯 Key Features

✅ **Authi 1.0 Integration** - Intelligent clinical note analysis  
✅ **ICD-10 Mapping** - Comprehensive code database  
✅ **Treatment Protocols** - Diagnostic and ongoing management baskets  
✅ **Medication Formulary** - Plan-specific medicine selection  
✅ **PDF Export** - Professional claim documentation  
✅ **Case Library** - Persistent storage of completed claims  
✅ **Modern UI** - Beautiful, responsive design with Tailwind CSS  

## 📧 Need Help?

- Review the main README.md for detailed documentation
- Check the inline help tooltips throughout the application
- All data is stored locally - no internet connection required

## 🎊 Enjoy Using SaluLink

You're all set! Start by entering a clinical note and let Authi 1.0 guide you through the complete chronic disease treatment workflow.
