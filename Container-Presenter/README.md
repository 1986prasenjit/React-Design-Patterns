# React Container–Presenter Pattern  
*(also known as Smart–Dumb Components Pattern)*

---

## 1. Definition and Overview

The **Container–Presenter Pattern** is a fundamental design pattern in React development that focuses on **separating logic from presentation**.

Although commonly referred to as the *Smart–Dumb Components Pattern*, the terms **Container** and **Presenter** are more accurate and descriptive. They define responsibilities rather than perceived intelligence.

This pattern exists to prevent **monster components**—large React components that handle API calls, business logic, state management, and JSX rendering all in one file.

---

## 2. Core Architectural Idea

In the broader context of React architecture, this pattern divides a component into two distinct layers:

- **Container Component** → Handles data, state, APIs, and business logic  
- **Presenter Component** → Handles JSX, HTML, CSS, and UI-only behavior  

This separation enforces **Separation of Concerns (SoC)** and the **Single Responsibility Principle (SRP)**.

---

## 3. Container Component (Smart Layer)

### 3.1 Definition

A **Container Component** is responsible for all **data-oriented logic** in a React feature.

### 3.2 Responsibilities

- **Data Fetching**
  - Makes API calls using tools like `fetch` or Axios
  - Communicates with back-end services

- **State Management**
  - Manages data-related state such as:
    - fetched data (users, posts, products)
    - loading state
    - error state

- **Business Logic**
  - Handles retry logic
  - Handles save/update/delete operations
  - Executes database-related operations

- **Delegation**
  - Passes data and handler functions to presenter components via props

### 3.3 What a Container Must NOT Do

- No JSX rendering
- No HTML or CSS
- No UI-centric state (like `isEditing`, `formData`)
- No direct user interaction handling

A container is considered **correctly implemented only when it has no JSX rendering logic**.

---

## 4. Presenter Component (Dumb Layer)

### 4.1 Definition

A **Presenter Component** focuses exclusively on **visual structure and UI behavior**.

### 4.2 Responsibilities

- **Rendering UI**
  - Uses JSX, HTML, and CSS to display data

- **Receives Props**
  - Data (users, posts, products)
  - Status flags (`loading`, `error`)
  - Handler functions (`onRetry`, `onSave`)

- **UI-Centric State**
  - `isEditing`
  - `formData`
  - UI toggles and visual flags

- **Delegation**
  - Triggers container logic via props
  - Does not know how APIs work

### 4.3 No API Awareness

A presenter:
- Never performs API calls
- Never fetches data
- Never manages backend logic

---

## 5. Separation of Concerns (SoC)

The Container–Presenter Pattern enforces strict separation:

### Data Concern (Container)
- API calls
- Data lifecycle
- Business rules
- Persistent state

### UI Concern (Presenter)
- JSX structure
- Layout and styling
- Temporary UI state
- User interactions

This separation prevents tightly coupled components and improves architecture quality.

---

## 6. Code Smells This Pattern Solves

### 6.1 Monster Components

Symptoms include:
- Multiple `useState` hooks for unrelated data
- API calls mixed with JSX
- Complex conditional rendering
- Large return blocks with many UI states

---

### 6.2 SRP Violation

A component violates SRP when it:
- Fetches data
- Handles form logic
- Manages UI toggles
- Renders UI
all at the same time.

---

### 6.3 Poor Reusability

- UI elements are hardcoded
- Loading spinners and error messages cannot be reused
- Developers resort to copy-paste

---

### 6.4 Poor Testability

- Requires mocking APIs, state, and UI together
- Difficult to isolate logic for testing
- Leads to fragile test suites

---

### 6.5 Difficult Maintenance

- One large file must be modified for every change
- High risk of regression bugs
- Hard to onboard new developers

---

## 7. Common Pitfalls and Anti-Patterns

### 7.1 Over-Engineering

Do NOT use this pattern when:
- Component is very simple
- No API calls
- Minimal state
- Purely presentational components

Examples:
- Loading spinners
- Static error messages
- Simple buttons

---

### 7.2 Prop Drilling

Occurs when:
- 10–15 props are passed
- Props flow through multiple layers
- Intermediate components do not use the props

This signals that the pattern is reaching its limits.

---

## 8. When the Pattern Becomes an Anti-Pattern

The Container–Presenter pattern becomes an anti-pattern when:
- It increases complexity instead of reducing it
- It introduces excessive prop drilling
- It is applied blindly to simple components

At this point, **Context API** or **State Reducer patterns** are better solutions.

---

## 9. Data Fetching in Containers

Containers manage the full data lifecycle:

1. Trigger fetch (`useEffect`)
2. Call API
3. Update state
4. Handle loading and error
5. Expose data via props

Retry and update logic must always stay in the container.

---

## 10. State Management Rules

### Container State
- Data fetched from APIs
- Loading and error flags

### Presenter State
- UI-only state
- Temporary form inputs
- Visual toggles

---

## 11. Business Logic Placement

Business logic belongs **only in containers**:
- API interactions
- Save/update/delete actions
- Retry logic

Naming convention:
- Container functions → `handleSomething`
- Presenter props → `onSomething`

---

## 12. Granular Presenter Components

To avoid mammoth presenters:
- Break UI into mini-presenters
- Example:
  - `UserProfilePresenter`
    - `ProfileHeader`
    - `PostList`
      - `Post`

This improves readability and reuse.

---

## 13. Common Components

### Loading Spinner
- Purely presentational
- Reusable
- Accepts message via props
- No container needed

### Error Message
- Reusable component
- Accepts:
  - title
  - message
  - `onRetry`
- Retry logic handled by container

---

## 14. Implementation Steps

1. Identify messy component
2. Extract data logic into container
3. Move JSX to presenter
4. Extract reusable UI to common components
5. Pass data and handlers via props
6. Refine presenters into smaller units

---

## 15. Ideal Use Cases

- Data-heavy dashboards
- Product catalogs
- Analytics reports
- Complex forms
- Multi-step wizards
- Checkout flows

---

## 16. Summary

The Container–Presenter Pattern is a powerful architectural tool for React applications **when used correctly**.

It:
- Eliminates monster components
- Improves testability
- Enhances reusability
- Makes code easier to maintain

However, it should be applied **thoughtfully**, not blindly.  
Use it to reduce complexity, not to create it.

---
