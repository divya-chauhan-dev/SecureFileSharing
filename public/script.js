// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadArea = document.getElementById('uploadArea');
const uploadProgress = document.getElementById('uploadProgress');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const uploadStatus = document.getElementById('uploadStatus');
const filesList = document.getElementById('filesList');
const refreshBtn = document.getElementById('refreshBtn');

let selectedFile = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFiles();
});

// File input change
fileInput.addEventListener('change', (e) => {
    handleFileSelect(e.target.files[0]);
});

// Upload button click
uploadBtn.addEventListener('click', () => {
    if (selectedFile) {
        uploadFile(selectedFile);
    }
});

// Refresh button click
refreshBtn.addEventListener('click', () => {
    loadFiles();
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
});

// Handle file selection
function handleFileSelect(file) {
    if (file) {
        selectedFile = file;
        uploadBtn.disabled = false;
        uploadArea.querySelector('p').textContent = `Selected: ${file.name}`;
        uploadStatus.textContent = '';
        uploadStatus.className = 'status-message';
    }
}

// Upload file
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    uploadBtn.disabled = true;
    uploadProgress.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = '0%';

    try {
        const xhr = new XMLHttpRequest();

        // Progress tracking
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                progressBar.style.width = percentComplete + '%';
                progressText.textContent = Math.round(percentComplete) + '%';
            }
        });

        // Upload complete
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                showStatus('success', 'File uploaded successfully!');
                
                // Show share URL
                const shareUrl = response.file.shareUrl;
                showStatus('success', `File uploaded! Share URL: <br><strong>${shareUrl}</strong>`);
                
                // Reset form
                setTimeout(() => {
                    resetUploadForm();
                    loadFiles();
                }, 3000);
            } else {
                showStatus('error', 'Upload failed. Please try again.');
                uploadBtn.disabled = false;
            }
            uploadProgress.classList.add('hidden');
        });

        // Error handling
        xhr.addEventListener('error', () => {
            showStatus('error', 'Upload failed. Please check your connection.');
            uploadBtn.disabled = false;
            uploadProgress.classList.add('hidden');
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);

    } catch (error) {
        console.error('Upload error:', error);
        showStatus('error', 'Upload failed: ' + error.message);
        uploadBtn.disabled = false;
        uploadProgress.classList.add('hidden');
    }
}

// Load files list
async function loadFiles() {
    try {
        filesList.innerHTML = '<p class="loading">Loading files...</p>';
        
        const response = await fetch('/api/files');
        const data = await response.json();

        if (data.success && data.files.length > 0) {
            displayFiles(data.files);
        } else {
            filesList.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <p>No files uploaded yet</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading files:', error);
        filesList.innerHTML = '<p class="loading" style="color: red;">Error loading files</p>';
    }
}

// Display files
function displayFiles(files) {
    filesList.innerHTML = '';
    
    files.forEach(file => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        
        const uploadDate = new Date(file.uploadDate).toLocaleString();
        const fileSize = formatFileSize(file.size);
        
        fileCard.innerHTML = `
            <div class="file-info-card">
                <div class="file-name">📄 ${file.originalName}</div>
                <div class="file-meta">
                    Size: ${fileSize} | Uploaded: ${uploadDate} | Downloads: ${file.downloadCount}
                </div>
                <div class="file-share-url" id="url-${file.id}">
                    ${file.shareUrl}
                </div>
            </div>
            <div class="file-actions">
                <button class="btn btn-secondary" onclick="copyToClipboard('${file.shareUrl}', '${file.id}')">
                    📋 Copy Link
                </button>
                <button class="btn btn-secondary" onclick="downloadFile('${file.shareUrl}')">
                    ⬇️ Download
                </button>
                <button class="btn btn-delete" onclick="deleteFile('${file.id}')">
                    🗑️ Delete
                </button>
            </div>
        `;
        
        filesList.appendChild(fileCard);
    });
}

// Copy to clipboard
function copyToClipboard(url, fileId) {
    navigator.clipboard.writeText(url).then(() => {
        const urlElement = document.getElementById(`url-${fileId}`);
        const originalText = urlElement.textContent;
        urlElement.textContent = '✅ Copied to clipboard!';
        urlElement.style.color = 'green';
        
        setTimeout(() => {
            urlElement.textContent = originalText;
            urlElement.style.color = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

// Download file
function downloadFile(url) {
    window.open(url, '_blank');
}

// Delete file
async function deleteFile(fileId) {
    if (!confirm('Are you sure you want to delete this file?')) {
        return;
    }

    try {
        const response = await fetch(`/api/files/${fileId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showStatus('success', 'File deleted successfully!');
            loadFiles();
        } else {
            showStatus('error', 'Failed to delete file');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showStatus('error', 'Error deleting file');
    }
}

// Show status message
function showStatus(type, message) {
    uploadStatus.className = `status-message ${type}`;
    uploadStatus.innerHTML = message;
}

// Reset upload form
function resetUploadForm() {
    selectedFile = null;
    fileInput.value = '';
    uploadBtn.disabled = true;
    uploadArea.querySelector('p').textContent = 'Click to select a file or drag and drop';
    uploadStatus.textContent = '';
    uploadStatus.className = 'status-message';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}