# Virtual Assistant

---

Virtual Assistant is a web-based, voice-enabled AI assistant that understands natural language and performs tasks like opening websites, checking the time/date, playing music, and more.

It is built using React (Vite) on the frontend and Node.js + Express.js on the backend, with Gemini AI integration for intelligent command understanding.

---

## Features

- Voice command recognition using Web Speech API  
- Natural language understanding using Gemini AI  
- Opens Google, YouTube, Instagram, Facebook, WhatsApp, Spotify  
- Tells current time, date, day, and month  
- Opens calculator, shows weather  
- Speaks responses using browser speech synthesis  
- Gemini AI API integration for intelligent replies

---

## Run Locally

Clone the project

```bash
git clone https://github.com/shagun078/virtualassistant.git
```

Go to the project directory

```bash
  cd virtualassistant
```

Install dependencies

```bash
  npm install
```
#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server directory

`PORT`=`8000`

`MONGODB_URL`=`your_mongodb_connection_string`

`JWT_SECRET`=`your_jwt_secret_key`

`CLOUDINARY_CLOUD_NAME`=`your_cloudinary_cloud_name`

`CLOUDINARY_API_KEY`=`your_cloudinary_api_key`

`CLOUDINARY_API_SECRET`=`your_cloudinary_api_secret`

`GEMINI_API_URL`=`your_gemini_api_url`

Run the Application

```bash
  npm run dev
```

Open your web browser and visit http://localhost:8000 (or the port shown in your terminal)

---
##  Usage & Testing Guide

Follow these steps to use and test the Virtual Assistant:

#### Sign Up / Sign In
- Create an account using your email.
- If you already have an account, simply sign in.

#### Customize Your Assistant
- Choose a profile image and set your assistant's name (e.g., “Jarvis”).

#### Start Giving Voice Commands
Speak commands like:

- "Jarvis, open Google"
- "Search Messi on YouTube"
- "What’s the weather?"
- "Play Taylor Swift on Spotify"
- "Open WhatsApp"

The assistant will recognize your voice and respond accordingly.

---
## Screenshots

#### Sign In / Sign Up  
![Sign In / Sign Up](https://github.com/shagun078/virtualassistant/blob/main/frontend/src/assets/signin.png)

---

#### Customize Your Assistant  
![Customize Assistant](https://github.com/shagun078/virtualassistant/blob/main/frontend/src/assets/customize.png)

---

#### Interact with Your Virtual Assistant  
![Home / Assistant Interaction](https://github.com/shagun078/virtualassistant/blob/main/frontend/src/assets/assistant.png)

