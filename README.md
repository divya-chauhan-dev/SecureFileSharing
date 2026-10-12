# 🔐 Secure File Sharing System
A secure and simple file-sharing web application that allows users to upload files and share them with intended recipients using unique access tokens.

## 🌟 Overview
SecureFileSharing is a web-based application designed to provide controlled file sharing through token-based access.
Instead of exposing files through publicly accessible URLs, the system generates a unique token for shared files. Users with a valid sharing token can request access to the intended file.

The project was developed to understand and implement concepts such as REST APIs, backend routing, file handling, token-based access control, and web application security.

---

## ✨ Key Features

- 📤 File Upload: Upload files through a simple web interface.
- 🔑 Token-Based Sharing: Generate a unique token for each shared file.
- 📥 Controlled Download: Access and download files using a valid token.
- 💾 Client-Side Storage: Uses browser Local Storage to manage sender-side file data.
- 🌐 RESTful Backend: Dedicated routes for uploading, sharing, and downloading files.
- 🎨 Simple Web Interface: Clean frontend built with HTML, CSS, and JavaScript.
- 🛡️ Token-Based Access Control: Validates access tokens before allowing file downloads.

---

## 🏗️ How It Works

              ┌──────────────────┐
              │       User       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Web Interface   │
              │   HTML/CSS/JS    │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Node.js +       │
              │  Express Server  │
              └────────┬─────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
     ┌─────────┐  ┌─────────┐  ┌──────────┐
     │ Upload  │  │  Share  │  │ Download │
     │ Route   │  │  Route  │  │  Route   │
     └────┬────┘  └────┬────┘  └────┬─────┘
          │            │             │
          └────────────┼─────────────┘
                       ▼
              ┌──────────────────┐
              │ Token Validation │
              │ & File Handling  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  File Storage &  │
              │  Access Control  │
              └──────────────────┘

---

## 🔄 File Sharing Workflow

Upload File
     │
     ▼
Process File
     │
     ▼
Generate Unique Token
     │
     ▼
Associate Token with File
     │
     ▼
Share Token with Recipient
     │
     ▼
Recipient Provides Token
     │
     ▼
Validate Token
     │
     ▼
Grant or Deny File Access
     │
     ▼
Download File if Authorized

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Browser Local Storage

### Backend
- Node.js
- Express.js

### Other Technologies
- REST APIs
- File System Handling
- Token-Based Access Control
- Git and GitHub

---

## 📂 Project Structure

SecureFileSharing/
│
├── models/
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── routes/
│   ├── upload.js
│   ├── share.js
│   └── download.js
│
├── uploads/
│   └── uploaded-files
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

---

## 📌 Main Modules

### 📤 Upload Module
Handles file uploads through the user interface and processes files using the backend.

### 🔗 Share Module
Generates a unique token associated with a file and provides the information needed to share it with the intended recipient.

### 📥 Download Module
Validates the provided token and processes the corresponding file download when access is authorized.

### 💾 Client-Side Storage
Uses browser Local Storage to manage sender-side file data as part of the application's workflow.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

bash
git clone <your-repository-url>
cd SecureFileSharing

Replace <your-repository-url> with your actual repository URL.


### 2. Install dependencies
bash
npm install


### 3. Configure environment variables
If your application uses a .env file, configure the environment variables required by your backend.

For example, if your application uses a configurable port:
env
PORT=3000

Only include environment variables that your application actually requires. Never commit secrets or sensitive credentials to GitHub.


### 4. Start the application
bash
node server.js

Alternatively, if a start script is configured in package.json:
bash
npm start


### 5. Open the application
Visit:
http://localhost:3000
Use the port configured in your application if it differs from 3000.

---

## 🧪 Example Usage
Step 1 — Upload:** Select a file through the web interface.
Step 2 — Generate Token:** Generate a unique token associated with the file.
Step 3 — Share:** Share the token with the intended recipient.
Step 4 — Validate:** The recipient provides the token to request access.
Step 5 — Download:** The application validates the token and processes the download if access is authorized.

---

## 🔐 Security Concept
The project demonstrates token-based access control for file sharing. Instead of relying solely on predictable filenames or directly exposing file paths, the application uses unique tokens to identify shared files and validate access requests.


File
 │
 └── Associated Access Token
             │
             ▼
       Token Validation
             │
       ┌─────┴─────┐
       │           │
     Valid       Invalid
       │           │
       ▼           ▼
   Allow Access   Deny Access


Token validation provides an access-control mechanism, but it does not by itself guarantee complete file security. Additional measures, such as secure token generation, expiration, file validation, and appropriate server-side access controls, may be needed.

---

## 🎯 What I Learned
Building this project helped me gain practical experience with:
- Developing backend applications using Node.js and Express.js.
- Designing and organizing REST API routes.
- Handling file uploads and downloads.
- Using browser Local Storage for client-side data management.
- Implementing token-based access mechanisms.
- Connecting frontend and backend components.
- Structuring a full-stack web application.
- Understanding file handling and web application security concepts.

---

## 🚀 Future Improvements
Potential enhancements include:
- ⏳ Token expiration and revocation.
- 👤 User authentication and authorization.
- 🔒 File encryption before storage.
- 📧 Email-based file sharing.
- 🗑️ Automatic file expiration and deletion.
- 📊 File access and activity logs.
- ☁️ Cloud storage integration.
- 📱 Improved responsive UI.

---

## 🤝 Contributing
Contributions, suggestions, and improvements are welcome.
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Open a Pull Request.

---

## 👨‍💻 Author
Divya Chauhan
🎓 MCA Graduate | 💻 Aspiring Software Developer/Engineer | 🚀 Open to Work
I'm looking for opportunities to apply my technical knowledge to real-world software development, learn from experienced teams, and continue growing as a software developer.

---

⭐ If you find this project interesting, consider giving the repository a star!
