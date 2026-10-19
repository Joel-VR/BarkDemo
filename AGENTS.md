# Repository Guidelines

## Project Structure

The frontend lives in `frontend/`. Its main application surfaces are organized in `frontend/src/ClientApp.tsx`, `TechnicianApp.tsx`, and `AdminApp.tsx`; shared UI belongs in `frontend/src/ui.tsx`. Keep changes close to the app or component they affect, and put reusable presentation or behavior in shared UI when multiple surfaces need it. Keep static assets alongside the frontend assets already used by the project.

## Build, Test, and Development

Use the package manager and scripts defined by the frontend manifest and its lockfile. From `frontend/`, install dependencies with the matching lockfile command (for example, `npm ci` when `package-lock.json` is present), start the local development server with the declared dev script, and run the declared build, lint, and test scripts before submitting relevant changes. Do not mix package managers or update the lockfile with a different manager.

## Coding Style

Follow the existing TypeScript and React conventions: use functional components, keep props and data shapes explicit, and prefer shared components over duplicated UI. Match surrounding formatting, import ordering, and Tailwind utility patterns. Use PascalCase for React component names and filenames, camelCase for functions and variables, and descriptive names for CSS or utility classes. Avoid broad formatting changes unrelated to the task.

## Testing Guidelines

Use the test framework and scripts configured in `frontend/package.json`; add or update tests alongside the affected feature using the repository's existing naming and placement patterns. For UI changes, exercise the relevant app surface at desktop and mobile widths when practical. If no test script is configured, run the available lint and production build commands and report that limitation.

## Commits and Pull Requests

Write concise commit subjects that describe the change in imperative form (for example, `Improve technician job card layout`). Pull requests should summarize user-visible behavior and implementation, link related issues, list validation commands and outcomes, and include screenshots for visual changes. Keep each change focused and call out any configuration or migration steps.

## Configuration and Security

Keep credentials and machine-specific settings out of source control. Use the project's existing environment-variable patterns and document newly required settings with safe example values; never commit real secrets.
