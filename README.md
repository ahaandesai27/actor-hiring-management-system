# Actor Hiring Management System

This is a full-stack web application designed for film industry professionals to network, collaborate, and manage their portfolios. The platform enables users to create profiles, apply for roles, post updates, like and comment on posts, and communicate in real-time.

## Features

- **User Authentication:** Secure sign-up and login for professionals.
- **Profile Management:** Edit profile details, upload profile pictures (Cloudinary integration), and showcase experience and ratings.
- **Roles & Applications:** Browse, create, and apply for film roles; role creators can view and manage applicants.
- **Posts & Interactions:** Create posts, like and comment on others’ posts, and view liked posts.
- **Professional Networking:** Connect with other professionals and build a network.
- **Real-Time Chat:** Instant messaging between users.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MariaDB (via Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Uploads:** Cloudinary
- **Real-Time Features:** Firebase Realtime Database (for chat)

## Project Structure

```
actor/
├── backend/
│   ├── Resources/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── app.js
│   └── ...
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── ...
└── README.md
```

## Setup Instructions

### Backend

1. **Install dependencies:**
    ```bash
    cd backend
    npm install
    ```
2. **Configure environment variables:**  
   Create a `.env` file for DB credentials, JWT secret, etc.

3. **Run the backend:**
    ```bash
    npm start
    ```

### Frontend

1. **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```
2. **Configure environment variables:**  
   Set up Cloudinary and API URLs in `.env`.

3. **Run the frontend:**
    ```bash
    npm run dev
    ```

## Cloudinary Integration

- Profile images are uploaded to Cloudinary using unsigned upload presets.
- The image URL is stored in the user’s profile and displayed throughout the app.

## License

MIT

---
