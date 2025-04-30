# Chat-App

A real-time chat application built using modern web technologies. This application allows users to communicate in chat rooms, supports private messaging, and provides a responsive user interface for seamless communication.

## Features

-**Profile Setup**: User can setup their profile with image.
- **User Authentication**: Secure login and registration for users.
- **Responsive Design**: Fully functional on desktop and mobile devices.
- **Emojis and Attachments**: Express yourself with emojis and share files.

## Tech Stack

- **Frontend**: React.js, HTML5, CSS3, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) and bcrypt

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (>=14.x)
- **npm** (>=6.x) or **yarn**
- **MongoDB** (locally or on a cloud platform like MongoDB Atlas)

---

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shivansh806/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SOCKET_PORT=your_socket_port
   ```

   - Replace `your_mongodb_connection_string` with your MongoDB connection string.
   - Replace `your_jwt_secret` with a secure secret key for JWT.
   - Replace `your_socket_port` with the desired port for the WebSocket server (default: 5000).

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Access the application**:

   Open your browser and navigate to `http://localhost:3000`.

---

## Dependencies

This project uses the following key dependencies:

- **Frontend**:
  - React.js
  - Tailwind CSS
- **Backend**:
  - Express.js
- **Database**:
  - MongoDB
- **Authentication**:
  - bcrypt for password hashing
  - JWT for user authentication

For a complete list of dependencies, refer to the `package.json` file.

---

## Configuration

1. **Environment Variables**:
   - Ensure the `.env` file contains valid values for `MONGO_URI`, `JWT_SECRET`, and `SOCKET_PORT`.

2. **Database**:
   - The application requires a MongoDB database. You can use a local instance or a cloud-based solution like MongoDB Atlas.

3. **Frontend Configuration**:
   - The frontend is pre-configured to connect to the backend server. Ensure the backend is running on the specified port.

---

## Screenshots/Demo

### Chat Page
![Chat Page Screenshot](https://github.com/shivansh806/chat-app/blob/main/Chat%20Page.png?raw=true)

### Profile Page
![Profile Page Screenshot](https://raw.githubusercontent.com/shivansh806/chat-app/5ef9349d643391f08341c7dd9857684f9a0d2660/Profile%20Page.png)

### Login Page
![Login Page](https://github.com/shivansh806/chat-app/blob/main/Login%20Page.png?raw=true)

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with descriptive messages.
4. Push your branch and create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

## Contact

For any inquiries or feedback, feel free to reach out at [shivanshsingh806@gmail.com](mailto:shivanshsingh806@gmail.com).

---
Happy chatting! 🚀
