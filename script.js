/**
 * Student Registration System - Logic & Data Layer
 */

// Global App State
let students = JSON.parse(localStorage.getItem('studentRecords')) || [];

// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const recordsTableBody = document.getElementById('recordsTableBody');
const noDataMessage = document.getElementById('noDataMessage');
const tableWrapper = document.getElementById('tableWrapper');
const submitBtn = document.getElementById('submitBtn');
const editStudentIdHidden = document.getElementById('editStudentId');

// Form Input DOM Elements
const nameInput = document.getElementById('studentName');
const idInput = document.getElementById('studentId');
const emailInput = document.getElementById('emailId');
const contactInput = document.getElementById('contactNo');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    setupValidationListeners();
});

// Keep scrollbar state consistent during resize/orientation changes
window.addEventListener('resize', () => {
    manageDynamicScrollbar();
});

/**
 * Task 6: Field Validation Configurations
 */
function validateField(inputElement, errorElement, regex, configMsg) {
    const value = inputElement.value.trim();
    
    // Check Empty Constraint
    if (value === "") {
        errorElement.textContent = "This field cannot be left empty.";
        return false;
    }
    
    // Check Regex Match Regex Patterns
    if (!regex.test(value)) {
        errorElement.textContent = configMsg;
        return false;
    }
    
    errorElement.textContent = "";
    return true;
}

function validateForm() {
    // Regex Definitions
    const nameRegex = /^[A-Za-z\s]+$/;         // Only alphabetical characters and spaces
    const idRegex = /^[0-9]+$/;               // Only pure numeric digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email schema mapping
    const contactRegex = /^[0-9]{10,}$/;       // Numbers only, min length 10 digits

    const isNameValid = validateField(nameInput, document.getElementById('nameError'), nameRegex, "Name must only contain alphabetic letters.");
    const isIdValid = validateField(idInput, document.getElementById('idError'), idRegex, "ID must be purely numeric.");
    const isEmailValid = validateField(emailInput, document.getElementById('emailError'), emailRegex, "Please enter a valid email format.");
    const isContactValid = validateField(contactInput, document.getElementById('contactError'), contactRegex, "Contact must be numeric and contain at least 10 digits.");

    return isNameValid && isIdValid && isEmailValid && isContactValid;
}

// Attach real-time correction styling lookups
function setupValidationListeners() {
    nameInput.addEventListener('input', () => validateField(nameInput, document.getElementById('nameError'), /^[A-Za-z\s]+$/, "Name must only contain alphabetic letters."));
    idInput.addEventListener('input', () => validateField(idInput, document.getElementById('idError'), /^[0-9]+$/, "ID must be purely numeric."));
    emailInput.addEventListener('input', () => validateField(emailInput, document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email format."));
    contactInput.addEventListener('input', () => validateField(contactInput, document.getElementById('contactError'), /^[0-9]{10,}$/, "Contact must be numeric and contain at least 10 digits."));
}
