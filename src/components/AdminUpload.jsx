import axios from 'axios'
import React, { useState } from 'react'

function AdminUpload() {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.")
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            await axios.post("https://imsback-3.onrender.com/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            alert("File uploaded successfully")
        } catch (error) {
            console.error('Upload failed', error)
            alert('Upload failed. Please try again.')
        }
    }

    return (
        <div>
            <h2>Upload CSV</h2>
            <input type="file" accept='.csv' onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default AdminUpload
