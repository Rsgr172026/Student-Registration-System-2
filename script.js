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

/**
 * Task 6: Main Render Processing & Dynamic Scrollbar Management
 */
function renderTable() {
    recordsTableBody.innerHTML = '';
    
    if (students.length === 0) {
        noDataMessage.style.display = 'block';
    } else {
        noDataMessage.style.display = 'none';
        
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td data-label="ID">${escapeHTML(student.id)}</td>
                <td data-label="Name">${escapeHTML(student.name)}</td>
                <td data-label="Email">${escapeHTML(student.email)}</td>
                <td data-label="Contact">${escapeHTML(student.contact)}</td>
                <td data-label="Actions">
                    <button class="btn btn-edit" onclick="editRecord('${student.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteRecord('${student.id}')">Delete</button>
                </td>
            `;
            recordsTableBody.appendChild(row);
        });
    }
    
    manageDynamicScrollbar();
}

/**
 * Task 6: Dynamic Scrollbar Handling via JavaScript
 * Adds containment constraints when record size exceeds layout thresholds
 */
function manageDynamicScrollbar() {
    // If table contains more than 4 items, restrict container height to force vertical scrollbar allocation
    if (students.length > 4) {
        tableWrapper.style.maxHeight = "340px";
        tableWrapper.style.overflowY = "scroll";
        tableWrapper.style.border = "1px solid var(--border-color)";
    } else {
        tableWrapper.style.maxHeight = "none";
        tableWrapper.style.overflowY = "visible";
    }
}

/**
 * Form Submission handling (Create & Update Logic)
 */
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Primary Field Validations check
    if (!validateForm()) return;

    // Ensure scrollbar state is recalculated after create/update
    manageDynamicScrollbar();

    
    const idValue = idInput.value.trim();
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const contactValue = contactInput.value.trim();
    const editTargetId = editStudentIdHidden.value;

    if (editTargetId !== "") {
        // --- UPDATE OPERATION ---
        // Verify targeted ID modification collision bounds
        if (editTargetId !== idValue && students.some(s => s.id === idValue)) {
            document.getElementById('idError').textContent = "This Student ID is already assigned to another record.";
            return;
        }
        
        const targetIndex = students.findIndex(s => s.id === editTargetId);
        if (targetIndex > -1) {
            students[targetIndex] = { id: idValue, name: nameValue, email: emailValue, contact: contactValue };
        }
        
        // Exit edit mode back to create button styling
        editStudentIdHidden.value = "";
        submitBtn.textContent = "Register Student";
        submitBtn.classList.remove('btn-edit');
        submitBtn.style.backgroundColor = "var(--primary-color)";
    } else {
        // --- CREATE OPERATION ---
        // Enforce Unique Primary ID constraint check
        if (students.some(student => student.id === idValue)) {
            document.getElementById('idError').textContent = "This Student ID already exists.";
            return;
        }
        
        // Add new record item object mapping
        students.push({ id: idValue, name: nameValue, email: emailValue, contact: contactValue });
    }
    
    // Commit and sync state mutations
    saveAndRefresh();
    registrationForm.reset();
});

/**
 * Task 6: Edit Records
 */
window.editRecord = function(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    // Load historical matching attributes back to target inputs
    idInput.value = student.id;
    nameInput.value = student.name;
    emailInput.value = student.email;
    contactInput.value = student.contact;
    
    // Toggle application system context status into edit operations tracking parameters
    editStudentIdHidden.value = student.id;
    submitBtn.textContent = "Update Student Details";
    submitBtn.style.backgroundColor = "var(--edit-color)";
    
    // Scroll window back towards form input screen entry viewport section
    nameInput.focus();
};

/**
 * Task 6: Delete Records
 */
window.deleteRecord = function(id) {
    if (confirm("Are you sure you want to permanently delete this student record?")) {
        students = students.filter(student => student.id !== id);
        
        // If current element being processed for edit is deleted from below it, reset the form state safely
        if (editStudentIdHidden.value === id) {
            registrationForm.reset();
            editStudentIdHidden.value = "";
            submitBtn.textContent = "Register Student";
            submitBtn.style.backgroundColor = "var(--primary-color)";
        }
        
        saveAndRefresh();
    }
};

/**
 * Storage Synchronization Persistence utilities
 */
function saveAndRefresh() {
    localStorage.setItem('studentRecords', JSON.stringify(students));
    renderTable();
}

/**
 * Helper utility to prevent XSS injection attacks
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
