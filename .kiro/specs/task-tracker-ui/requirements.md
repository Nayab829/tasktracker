# Requirements Document

## Introduction

Task Tracker UI is a clean, modern, fully responsive React.js single-page application that allows users to create, view, edit, delete, filter, and sort tasks entirely on the frontend. The application provides a rich dashboard experience with statistics, intuitive task management via modals, and an empty state for new users — all without any backend integration.

## Glossary

- **Task_Tracker**: The React.js single-page application being built.
- **Task**: A unit of work with a title, description, status, priority, and due date.
- **Dashboard**: The primary page displaying task statistics, search, filters, and the task list.
- **Task_List**: The section of the Dashboard that renders all filtered and sorted tasks.
- **Task_Card**: A visual card component that represents a single Task in the Task_List.
- **Task_Modal**: A modal overlay containing the Add/Edit Task form.
- **Task_Form**: The form inside the Task_Modal used to create or edit a Task.
- **Stats_Card**: A card component displaying a single aggregate metric (e.g., total, completed).
- **Header**: The top navigation bar containing the app logo/title and a search input.
- **Task_Filters**: The section of the Dashboard containing filter and sort controls.
- **Empty_State**: The UI shown in the Task_List when no tasks match the current criteria.
- **Status**: One of three values — Pending, In Progress, or Completed.
- **Priority**: One of three values — Low, Medium, or High.

## Requirements

### Requirement 1: Dashboard Layout

**User Story:** As a user, I want a structured dashboard page, so that I can see all task information and controls in one place.

#### Acceptance Criteria

1. THE Task_Tracker SHALL render a single Dashboard page as the application entry point (no client-side routing required).
2. THE Dashboard SHALL contain, in top-to-bottom order: a Header, a Stats_Card row, a Task_Filters section, and a Task_List section.
3. THE Dashboard SHALL be responsive: at viewport widths ≥1024px the task grid SHALL display 3 columns; at widths 481px–1023px it SHALL display 2 columns; at widths ≤480px it SHALL display 1 column.

---

### Requirement 2: Header

**User Story:** As a user, I want a persistent header with the app title and a search bar, so that I can always identify the application and search for tasks quickly.

#### Acceptance Criteria

1. THE Header SHALL display the text "Task Tracker" as the application title.
2. THE Header SHALL display a search input that accepts free-text entry up to 200 characters.
3. WHEN the user types in the search input, THE Task_List SHALL update to show only Tasks whose title or description contains the entered text (case-insensitive, after trimming leading/trailing whitespace from the query).
4. IF the search input is cleared or contains only whitespace, THE Task_List SHALL revert to displaying tasks matching the current active filter and sort state.
5. THE Header SHALL display an "Add Task" button that opens the Task_Modal in creation mode.
6. THE Header SHALL remain at the top of the viewport at all viewport widths down to 320px.

---

### Requirement 3: Task Statistics

**User Story:** As a user, I want to see aggregate task counts at a glance, so that I can understand the overall state of my workload.

#### Acceptance Criteria

1. THE Dashboard SHALL render four Stats_Cards labelled "Total Tasks", "Completed", "Pending", and "In Progress", each displaying the corresponding count from the full unfiltered task list.
2. WHEN the task list changes (add, edit, delete), THE Stats_Cards SHALL reflect updated counts from the full unfiltered task list without a page refresh.
3. THE Stats_Card row SHALL display 4 columns at viewport widths >1024px, 2 columns at widths 481px–1024px, and 1 column at widths ≤480px.

---

### Requirement 4: Task List

**User Story:** As a user, I want to see all my tasks in a structured list, so that I can review and manage them efficiently.

#### Acceptance Criteria

1. THE Task_List SHALL render one Task_Card per Task in the current filtered and sorted set.
2. THE Task_Card SHALL display the Task's title, description (omitted if blank), Status Badge, due date, and priority.
3. THE Task_Card SHALL display a Status Badge with distinct background and text colors for each Status value: Pending (amber/yellow tones), In Progress (blue tones), Completed (green tones).
4. THE Task_Card SHALL display the Priority with a colored dot indicator: Low (grey or teal), Medium (orange), High (red).
5. WHEN the "Edit" button on a Task_Card is clicked, THE Task_Modal SHALL open pre-populated with that Task's title, description, status, priority, and due date.
6. WHEN the "Delete" button on a Task_Card is clicked, THE Task_Card SHALL be removed from the Task_List without a page refresh.
7. THE Task_List grid SHALL display 3 columns at viewport widths ≥1024px, 2 columns at 481px–1023px, and 1 column at ≤480px.
8. WHEN a Task's due date is in the past and its status is not Completed, THE Task_Card SHALL display a visual overdue indicator (e.g., distinct color or label on the due date field).

---

### Requirement 5: Add/Edit Task Modal

**User Story:** As a user, I want a modal form to create and edit tasks, so that I can manage task details without leaving the dashboard.

#### Acceptance Criteria

1. WHEN the "Add Task" button is clicked, THE Task_Modal SHALL open with an empty Task_Form with Status defaulting to "Pending" and Priority defaulting to "Low".
2. WHEN an Edit button on a Task_Card is clicked, THE Task_Modal SHALL open with the Task_Form pre-populated with the selected Task's existing data.
3. THE Task_Form SHALL contain the following fields: Task Title (text input, max 100 characters), Task Description (textarea, max 500 characters), Status (dropdown: Pending, In Progress, Completed), Priority (dropdown: Low, Medium, High), Due Date (date picker).
4. THE Task_Form SHALL mark Task Title and Due Date as required fields with visible required indicators.
5. IF the Task_Form is submitted with a blank Task Title or missing Due Date, THE Task_Form SHALL display inline error messages beneath the respective fields; each error message SHALL disappear when its field becomes valid.
6. WHILE any required field is invalid or empty, THE Task_Form submit button SHALL be non-interactive and visually distinct from its enabled state (e.g., reduced opacity or greyed out).
7. WHEN the Task_Form is submitted with all valid data in creation mode, THE Task_List SHALL add the new Task.
8. WHEN the Task_Form is submitted with all valid data in creation mode, THE Task_Modal SHALL close.
9. WHEN the Task_Form is submitted with all valid data in edit mode, THE Task_List SHALL update the existing Task's data.
10. WHEN the Task_Form is submitted with all valid data in edit mode, THE Task_Modal SHALL close.
11. WHEN the user clicks outside the Task_Modal or presses the Escape key, THE Task_Modal SHALL close without saving changes.
12. WHILE the Task_Modal is open, keyboard focus SHALL be confined to the interactive elements within the modal and SHALL cycle from the last interactive element back to the first on Tab press, meeting WCAG 2.1 AA focus-trap requirements.
13. WHEN the Task_Modal is opened in creation mode after a previously cancelled session, THE Task_Form SHALL display empty/default values with no data from the prior session.

---

### Requirement 6: Filter and Sort Controls

**User Story:** As a user, I want to filter and sort my task list, so that I can focus on specific subsets of tasks.

#### Acceptance Criteria

1. THE Task_Filters SHALL provide a "Filter by Status" control with options: All, Pending, In Progress, Completed.
2. THE Task_Filters SHALL provide a "Filter by Priority" control with options: All, Low, Medium, High.
3. THE Task_Filters SHALL provide a "Sort by Due Date" control with options: None, Ascending, Descending.
4. THE Task_Filters SHALL provide a "Sort by Created Date" control with options: None, Ascending, Descending.
5. WHEN any filter or sort control value changes, THE Task_List SHALL re-render within 100ms without a page refresh.
6. WHEN a Status filter, a Priority filter, and a search query are all active simultaneously, THE Task_List SHALL show only Tasks that satisfy all three conditions.
7. WHEN the user selects a non-None value for "Sort by Due Date", THE "Sort by Created Date" control SHALL reset to None; and vice versa — only one sort may be active at a time.
8. WHEN at least one filter or sort is set to a non-default value, THE Task_Filters SHALL display a "Clear" button; WHEN the "Clear" button is clicked, all filter and sort controls SHALL reset to their default values (All / None).

---

### Requirement 7: Empty State

**User Story:** As a user, I want to see a friendly message when there are no tasks to display, so that I understand the list is empty and know what to do next.

#### Acceptance Criteria

1. WHEN the Task_List contains zero Tasks (no tasks created or all filtered out), THE Empty_State SHALL be displayed in place of the Task_Card grid.
2. WHILE the Empty_State is displayed with no tasks in the system, THE Empty_State SHALL show a visible non-text graphic element (icon or illustration) and the text message "No tasks found. Create your first task."
3. WHEN tasks exist but active filters or search produce zero results, THE Empty_State SHALL display the text message "No tasks match the current filters. Try adjusting or clearing your filters."

---

### Requirement 8: Local State Management

**User Story:** As a developer, I want all task data managed in React state, so that the UI remains dynamic and consistent without a backend.

#### Acceptance Criteria

1. THE Task_Tracker SHALL store all Task data using React's `useState` hook or `useReducer` hook at the App or Dashboard level.
2. THE Task_Tracker SHALL initialise the task list with mock data from `src/data/mockTasks.js`.
3. WHEN a Task is added, edited, or deleted, THE Dashboard SHALL re-render displaying the latest task data without a page refresh.
4. THE Task_Tracker SHALL assign each new Task a unique `id` using `Date.now()` or `crypto.randomUUID()` and a `createdAt` ISO timestamp at creation time.

---

### Requirement 9: Styling and Design System

**User Story:** As a user, I want a professional, visually consistent interface, so that the application feels polished and easy to use.

#### Acceptance Criteria

1. THE Task_Tracker SHALL apply a single coherent color palette throughout all components.
2. THE Task_Tracker SHALL use consistent spacing and typography across all components.
3. THE Task_Tracker SHALL apply smooth hover and focus transition effects (duration 150–300ms) to all interactive elements.
4. THE Task_Tracker SHALL be styled using plain CSS, CSS Modules, or Tailwind CSS with no external UI component library dependencies.
5. THE Task_Tracker SHALL meet WCAG 2.1 AA color contrast requirements for all text and interactive elements.

---

### Requirement 10: Component Structure

**User Story:** As a developer, I want a well-organised component structure, so that the codebase is easy to maintain and extend.

#### Acceptance Criteria

1. THE Task_Tracker SHALL organise source files according to the following structure: `src/components/` for reusable components, `src/pages/` for page-level components, `src/data/` for mock data, and `src/styles/` for global styles.
2. THE Task_Tracker SHALL implement all components as React functional components using only hooks (no class components).
3. THE Task_Tracker SHALL define the following components: `Header`, `StatsCard`, `TaskCard`, `TaskForm`, `TaskModal`, `TaskFilters`, and `Dashboard`.
