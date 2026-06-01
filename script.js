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