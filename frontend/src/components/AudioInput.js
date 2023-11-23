import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AudioInput() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    
    if (!file) {
      alert('Please select a file to upload!')
      return
    }

    const formData = new FormData();
    formData.append('audio', file);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      alert("Uploaded Successfully")
      console.log("File uploaded successfully", response.data);
      // Handle success
    })
    .catch(error => {
      alert("Error uploading file")
      console.error("Error uploading file", error);
      // Handle error
    });
  }

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/ogg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Please select an audio file (mp3, wav, or ogg).');
        setFile(null);
        setFileName('');
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }
    }
  };

  return (
    <form onFormSubmit={onFormSubmit}>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select audio file</label>
      <input 
          class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400  p-3 focus:outline-none" 
          id="large_size" 
          type="file"
          onChange={onFileChange}
      >
      </input>
      {fileName && <div>Selected file: {fileName}</div>}
      <div id="fileName" class="mt-1 text-sm text-gray-600">No file selected</div>
      <button 
        class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        type='submit'
      >
        Transcribe/Summarize
      </button>
    </form>
  )
}
