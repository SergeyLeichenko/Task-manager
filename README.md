# Task Manager

Portfolio starter: Vue 3 + TypeScript + Pinia + Vue Router + Vite, with Express + TypeScript + MySQL.

## Run it
1. Create the database by running `database/schema.sql` in MySQL.
2. Backend: `cd server`, copy `.env.example` to `.env`, fill in DB credentials, then `npm install` and `npm run dev`.
3. Frontend: `cd client`, copy `.env.example` to `.env`, then `npm install` and `npm run dev`.

API: `http://localhost:3000/api`; Vite usually runs at `http://localhost:5173`.

Request flow: Route → Controller → Service → Repository → MySQL.
The frontend uses `DefaultLayout.vue` with a shared header/sidebar and nested Vue Router pages.
