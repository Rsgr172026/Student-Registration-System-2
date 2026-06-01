# Student Registration System

A responsive **Student Registration System** built with **HTML, CSS, and JavaScript**.

## Features
- Add new student records (Name, Student ID, Email ID, Contact Number)
- Edit existing records
- Delete records
- Data persists after refresh using **localStorage**
- Input validation:
  - **Student Name**: letters and spaces only
  - **Student ID**: numbers only
  - **Email ID**: valid email format
  - **Contact Number**: numbers only, minimum 10 digits
- Records display section with dynamic vertical scrollbar when the list grows

## Project Files
- `index.html` - Page layout, form, and records table
- `style.css` - Styling + responsive design
- `script.js` - CRUD logic, validation, localStorage persistence

## How to Run
1. Open `index.html` in a browser.
2. Register students using the form.
3. Edit/delete from the records table.

## Notes
- The app stores data under `localStorage` key: `studentRecords`.
- The UI uses semantic sections and responsive breakpoints (mobile/tablet/desktop).
🔗 **Project Repository:** [Click here to view on GitHub](https://github.com/Rsgr172026/Student-Registration-System-2)
