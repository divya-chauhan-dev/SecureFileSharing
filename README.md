# SecureFileSharing
🔐 Secure File Sharing System
A secure and simple file-sharing web application that allows users to upload files and share them with intended recipients using unique access tokens.

🌟 Overview
SecureFileSharing is a web-based application designed to provide controlled and secure file sharing through token-based access.
Instead of exposing files through publicly accessible URLs, the system generates a unique token for shared files. Only users who possess the valid sharing token can access or download the intended file.
The project was developed to understand and implement concepts such as REST APIs, backend routing, file handling, database management, token-based access control, and web application security.

---

✨ Key Features
📤 Secure File Upload — Upload files through a simple web interface.
🔑 Token-Based Sharing— Generate a unique token for each shared file.
📥 Controlled Download — Files can only be accessed using the valid token.
🗄️ File Metadata Storage — File information and sharing details are stored in MongoDB.
🌐 RESTful Backend — Dedicated routes for uploading, sharing, and downloading files.
🎨 Simple Web Interface — Clean frontend built with HTML, CSS, and JavaScript.
🛡️ Controlled File Access — Prevents direct access to shared files without the required token.

---

🏗️ How It Works


              ┌──────────────────┐
              │      User        │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   Web Interface  │
              │ HTML/CSS/JS      │
              └────────┬─────────┘
                       │
              ┌────────▼─────────┐
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
          ▼            ▼             ▼
     ┌──────────────────────────────────┐
     │          File + Token            │
     │        Access Management         │
     └───────────────┬──────────────────┘
                     │
                     ▼
              ┌──────────────┐
              │   MongoDB    │
              │ File Metadata│
              └──────────────┘

---

🔄 File Sharing Workflow
Upload File
     │
     ▼
Store File
     │
     ▼
Generate Unique Token
     │
     ▼
Store File Metadata
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
Download File


---

🛠️ Tech Stack
Frontend
* HTML5
* CSS3
* JavaScript

Backend
* Node.js
* Express.js

Database
* MongoDB
* Mongoose

Other
* REST APIs
* File System Handling
* Token-Based Access Control
* Git & GitHub

---

📂 Project Structure

SecureFileSharing/
│
├── models/
│   └── File.js
│
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

📌 Main Modules
📤 Upload Module
Handles file uploads from the user and stores the uploaded files in the server's designated storage directory.

🔗 Share Module
Generates a unique token associated with a file and provides the information required to share that file with the intended recipient.

📥 Download Module
Validates the provided token and allows the recipient to download the corresponding file.

🗃️ File Model
Maintains file-related metadata using MongoDB and Mongoose.

---

⚙️ Installation & Setup
1. Clone the repository

2. Install dependencies
bash
npm install

3. Configure MongoDB
Make sure MongoDB is running locally or provide your MongoDB connection string through your environment configuration.
Example:
env
MONGO_URI=your_mongodb_connection_string
PORT=3000

Note: Never commit passwords, API keys, database credentials, or other secrets to GitHub.

4. Start the application
bash
node server.js
Or,
if a start script is configured:
bash
npm start

5. Open in browser
http://localhost:3000


---

🧪 Example Usage
Step 1 — Upload
Select a file through the web interface and upload it to the application.
Step 2 — Generate Share Token
The application generates a unique token associated with the uploaded file.
Step 3 — Share
Send the generated token to the intended recipient.
Step 4 — Access
The recipient provides the token to request access to the file.
Step 5 — Download
After successful token validation, the recipient can download the file.

---

🔐 Security Concept
The core security mechanism of this project is token-based file access.
Instead of relying only on a predictable filename or publicly exposed file path, the application associates uploaded files with unique access tokens.

File
 │
 ├── File Metadata
 │
 └── Unique Access Token
             │
             ▼
       Token Validation
             │
       ┌─────┴─────┐
       │           │
    Valid       Invalid
       │           │
       ▼           ▼
   Download      Denied

This provides an additional layer of access control for shared files.

---

🎯 What I Learned
Building this project helped me gain practical experience with:
* Building backend applications using Node.js and Express
* Designing and organizing REST API routes
* Handling file uploads and downloads
* Working with MongoDB and Mongoose.
* Implementing token-based access mechanisms
* Connecting frontend and backend components
* Structuring a full-stack web application
* Understanding practical considerations around secure file handling

---

🚀 Future Improvements
Some improvements that can be added in future versions:
* ⏳ Token expiration
* 👤 User authentication and authorization
* 🔒 File encryption before storage
* 📧 Email-based secure sharing
* 🗑️ Automatic file expiration and deletion
* 📊 File access/activity logs
* ☁️ Cloud storage integration
* 📱 Improved responsive UI

---

🤝 Contributing :
Contributions, suggestions, and improvements are welcome.
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Open a Pull Request

---

👨‍💻 Author
Divya
🎓 MCA Graduate | 💻 Aspiring Software Developer/Engineer | 🚀 Open to Work
I'm currently looking for opportunities where I can apply my knowledge to real-world software development, learn from experienced teams, and continue growing as a Software Developer/Engineer.

---

⭐ If you found this project interesting, consider giving the repository a star!
