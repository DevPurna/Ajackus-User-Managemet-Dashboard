# User Management Dashboard

## Project Overview:

This is a User Management Dashboard built using React.js and Tailwind CSS. The application allows users to view, add, edit, delete, search, filter, and sort user data using a mock backend API (JSONPlaceholder). The app also includes pagination and responsive design for better usability across devices.

## Features:

1. Display a list of users with columns: ID, First Name, Last Name, Email, and Department.
2. Add, Edit, Delete users using modal forms.
3. Search users by first name, last name, email, or department.
4. Filter users via a modal popup by First Name, Last Name, Email, Department.
5. Sort user list by clicking column headers.
6. Pagination with options for 10, 25, 50, and 100 users per page.
7. Responsive design for mobile, tablet, and desktop.
8. Client-side validation for all forms.
9. Error handling for fetch, add, edit, and delete API calls.
10. Clean UI styled with Tailwind CSS and modern buttons/icons using Lucide.

## Technologies Used

Frontend: React.js, Tailwind CSS
Icons: Lucide React
Backend: JSONPlaceholder (mock API)
HTTP Requests: Axios
Package Manager: npm / yarn

## Installation & Setup

Clone the repository

git clone https://github.com/DevPurna/Ajackus-User-Managemet-Dashboard
cd user-management-dashboard

## Install dependencies

npm install

# or

yarn install

Start the development server

npm start

# or

yarn start

Open http://localhost:3000 in your browser.

## Project Structure

src/
├─ components/
│ ├─ UserTable.jsx
│ ├─ UserForm.jsx
│ ├─ Pagination.jsx
│ ├─ FilterSearch.jsx
│ └─ FilterModal.jsx
├─ services/
│ └─ api.js
├─ pages/
│ └─ Dashboard.jsx
├─ App.jsx
└─ index.js

## API Integration

- All API calls are handled via JSONPlaceholder:
- GET /users → fetch all users
- POST /users → add a new user (simulated)
- PUT /users/:id → update user (simulated)
- DELETE /users/:id → delete user (simulated)
  Note: JSONPlaceholder simulates success, so changes are not persistent.

## Error Handling

- All API calls are wrapped in try/catch blocks.
- User-friendly alert messages display on network or API errors.
- Form validation prevents invalid data submission.

## Reflections

Challenges faced:

- Handling asynchronous API calls with proper UI updates.
- Implementing sorting, filtering, and pagination together without conflicts.
- Making modal forms responsive and reusable for Add/Edit actions.
- Managing state updates efficiently with React hooks.
- Improvements if given more time:
- Add toast notifications instead of alerts for errors and success messages.
- Implement user authentication for a real backend scenario.
- Use React Context or Redux for better state management.
- Enhance UI/UX design with animations and more polished tables.
- Persist data using a real backend instead of mock API.

## How to Use

- View Users: Users are displayed in a table on page load.
- Search Users: Use the search bar to filter users by any text field.
- Filter Users: Click the Filter button to open the filter modal and apply custom filters.
- Add User: Click the Add User button, fill the form, and submit.
- Edit User: Click the Edit button on a user row to open the pre-filled form.
- Delete User: Click the Delete button to remove a user.
- Sort Users: Click on any column header to sort ascending/descending.
- Pagination: Use the pagination controls to navigate pages and select the number of users per page.
