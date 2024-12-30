# Social Media Website

This repository contains the source code and documentation for a dynamic **Social Media Platform** developed as product of Basic Internship subject in **Posts and Telecommunications Institute of Technology**.

The project aims to enhance connectivity, user engagement, and content sharing through a user-friendly and feature-rich platform.

---

## Features

### Authentication and User Management

- Secure user registration, login, and logout.
- Password recovery using email verification.
- Profile view and editing.
- Follow and unfollow users.

### Post Interactions

- Create, like/unlike, save/unsave, and delete posts.
- Add comments to posts.

### Real-Time Communication

- Real-time chat functionality using WebSocket API.

### Search and Discovery

- Search for users and posts with advanced filters.

### Responsive Design

- Optimized for performance across various devices and screen sizes.

---

## Technologies Used

### Frontend

- **HTML, CSS, JavaScript**: Structure and basic interactivity.
- **React.js**: Component-based UI development.
- **Redux**: State management.
- **MUI**: Pre-styled UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Formik**: Form management and validation.

### Backend

- **Java**: Programming language for backend development.
- **Spring Boot**: Backend framework for API development.
- **Spring Security**: Authentication and authorization.
- **Spring Data JPA**: Data persistence with MySQL.
- **Spring Mail**: Email sending for password recovery.
- **Spring Boot DevTools**: Enhances development experience.
- **JWT**: JSON Web Tokens for authentication.
- **Lombok**: Reduces boilerplate code.

### Database

- **MySQL**: Relational database for storing user and platform data.

### Real-Time Features

- **WebSocket API**: Enables instant messaging capabilities.

### Media Storage

- **Cloudinary API**: Secure and efficient image storage.

---

## Project Structure

- **Frontend**: Located in the `frontend` directory.
- **Backend**: Located in the `backend` directory.
- **Documents**: Having all relevant documentation in the `documents` directory.
- **Images**: Images used to demonstrate the application in the `images` directory.

---

## Installation

### Prerequisites

- Node.js and npm
- Java (JDK 17 or above)
- MySQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/TomRiu/social-media-project.git
   cd social-media-website
   ```

2. Set up the backend:

   ```bash
   cd server
   ./mvnw spring-boot:run
   ```

3. Set up the frontend:

   ```bash
   cd client
   npm install
   npm start
   ```

4. Configure the database and email address:
   - Update the `application.properties` file in the `backend` directory with your MySQL and email application credentials.

---

## Demo

### Screenshots

Below are some screenshots demonstrating the application features:

1. **Register Page**
<div align="center">
  <img src="images/register.png" alt="Registration Interface" width="700"/>
  <p><em>User Registration - Simple and secure sign-up process</em></p>
</div>

2. **Login Page**
<div align="center">
  <img src="images/login.png" alt="Login Interface" width="700"/>
  <p><em>Login Page - Clean and intuitive login experience</em></p>
</div>

3. **Forgot Password**
<div align="center">
  <img src="images/forgot-password.png" alt="Password Recovery" width="700"/>
  <p><em>Password Recovery - Easy password reset through email verification</em></p>
</div>

4. **Reset Password**
<div align="center">
  <img src="images/reset-password.png" alt="Password Recovery" width="700"/>
  <p><em>Reset Password - Get by email link to reset password</em></p>
</div>

5. **Create Post**
<div align="center">
  <img src="images/create-post.png" alt="Post Creation" width="700"/>
  <p><em>Post Creation - Rich media sharing capabilities</em></p>
</div>

6. **Home and Search**
<div align="center">
  <img src="images/home-and-search.png" alt="Home Feed and Search" width="700"/>
  <p><em>Home Feed & Search - Discover and explore content</em></p>
</div>

7. **Like, Comment, Save Posts**
<div align="center">
  <img src="images/like-comment-save.png" alt="Post Interactions" width="700"/>
  <p><em>Post Interactions - Engage with content through likes, comments, and saves</em></p>
</div>

8. **Get My Profile with My Posts**
<div align="center">
  <img src="images/get-me-post.png" alt="Personal Profile View" width="700"/>
  <p><em>Personal Profile - View and manage your posts</em></p>
</div>

9. **Get My Profile with My Saved Posts**
<div align="center">
  <img src="images/get-me-saved-post.png" alt="Saved Posts View" width="700"/>
  <p><em>Saved Content - Access your curated collection of saved posts</em></p>
</div>

10. **Other User Profile**
<div align="center">
  <img src="images/other-profile.png" alt="Other User Profile View" width="700"/>
  <p><em>User Profiles - Connect with other users</em></p>
</div>

11. **Real-Time Chat and Messaging**
<div align="center">
  <img src="images/chat-and-message.png" alt="Chat Interface" width="700"/>
  <p><em>Real-time chat with WebSocket technology</em></p>
</div>

## Documentation

- Full documentation: [FINAL_REPORT_OF_BASIC_INTERNSHIP.pdf](documents/FINAL_REPORT_OF_BASIC_INTERNSHIP.pdf)
- Project presentation: [SOCIAL_MEDIA_WEBSITE_PRESENTATION.pptx](documents/SOCIAL_MEDIA_WEBSITE_PRESENTATION.pdf)

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Future Enhancements

- **Notifications**: Real-time updates for likes, comments, and follows.
- **Stories**: Temporary posts similar to other social media platforms.
- **Reels**: Short-form video content creation and viewing.
- **Enhanced Error Handling**: Sophisticated feedback mechanisms for better user experience.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with a detailed description of your changes.

---

## Acknowledgments

Special thanks to **Kim Ngọc Bách**, the guiding lecturer, and everyone who contributed to this project.

---

Feel free to explore the source code, and don’t forget to star the repository if you find it useful!
