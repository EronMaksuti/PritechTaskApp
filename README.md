# Pritech Task App

A simple React Native (Expo + TypeScript) mobile app for managing a personal task list.
Built as a technical task submission for PRITECH LLC.

## Tech Stack
- React Native with Expo (managed workflow)
- TypeScript
- React Navigation (native stack)
- AsyncStorage for local persistence
- Functional components + hooks only

## Setup Instructions
### Prerequisites
- Node.js (LTS)
- Expo Go app on your phone, or an Android/iOS simulator

### Install & Run
git clone <your-repo-url>
cd PritechTaskApp
npm install
npx expo start

Scan the QR code with Expo Go, or press a/i for an emulator/simulator.

## Features Implemented
- Task list screen with title, status, and created date
- Add new task (title + description, with validation)
- Mark task as completed / not completed
- Delete task (with confirmation)
- Task details view
- Basic input validation
- Clean, simple UI with empty states
- Public API integration — random motivational quote from dummyjson.com

## Bonus Features Implemented
- Search tasks by title
- Filter tasks by status
- Local persistence via AsyncStorage
- Navigation between screens


<img width="200" height="120" alt="Screenshot-Task List" src="https://github.com/user-attachments/assets/51841d8a-7f7f-4ff7-83a8-874cb31522e5" />
<img width="200" height="120" alt="Screenshot - Task List - Pending" src="https://github.com/user-attachments/assets/45b37cdb-c6a0-4f6e-9311-0911a011cb2b" />
<img width="200" height="120" alt="Screenshot - Task Details" src="https://github.com/user-attachments/assets/000d60e4-4763-4560-9af2-e949bf503d5f" />
<img width="200" height="120" alt="Screenshot - Create Task" src="https://github.com/user-attachments/assets/78e2e418-532e-4d83-bc46-b95a5d80f248" />
