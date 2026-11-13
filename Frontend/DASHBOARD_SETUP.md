# Dashboard and account flow update

This frontend update adds a real signed-in dashboard and makes the existing interview history API visible in the UI.

## Routes
- `/` — Dashboard with total reports, average score, best score and saved report history.
- `/new-interview` — Existing resume + job description + self-description form.
- `/interview/:interviewId` — Existing detailed report view.
- `/login` and `/register` — Authentication.

## Backend requirements
The backend already contains these routes in the supplied source:
- `GET /api/interview` — returns reports belonging to `req.user.id`, newest first.
- `GET /api/interview/report/:interviewId` — fetches one report for the logged-in user.
- `GET /api/auth/logout` — blacklists the current token and clears the cookie.

Reports are stored in MongoDB with the authenticated user's ID. The dashboard only displays the signed-in user's reports.

## Deploy
Replace the frontend source with this package and deploy it to Vercel. No new backend environment variables or database migrations are required for this UI addition. Keep the existing `VITE_API_URL` pointed at the Render backend.
