import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FailAlert from './FailAlert'
import SuccessAlert from './SuccessAlert'

export default function AudioInput({ setTranscriptionData }) {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [fileTypeAlertActive, setFileTypeAlertActive] = useState(false)
  const [uploadFailureAlertActive, setUploadFailureAlertActive] = useState(false)
  const [uploadSuccessAlertActive, setUploadSuccessAlertActive] = useState(false)

  const onFormSubmit = (e) => {
    e.preventDefault()
    setFileTypeAlertActive(false)
    setUploadFailureAlertActive(false)
    setUploadSuccessAlertActive(false)
    
    if (!file) {
      alert('Please select a file to upload!')
      return
    }

    const formData = new FormData();
    
    formData.append('audio', file);

    

    axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      
    })
    .then(response => {
      
      setUploadSuccessAlertActive(true)
      console.log("File uploaded successfully", response.data);
      setTranscriptionData(response.data)
      // Handle success
    })
    .catch(error => {
      setUploadFailureAlertActive(true)
      console.error("Error uploading file", error.request.response);
      // Handle error
    });
  }

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0]

    console.log(selectedFile)
    
    setUploadFailureAlertActive(false)
    setUploadSuccessAlertActive(false)

    if (selectedFile) {
      const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg', 'audio/x-m4a']

      if (!allowedTypes.includes(selectedFile.type)) {
        e.target.value = ''
        setFile(null)
        setFileName('')
        setFileTypeAlertActive(true)
      } else {
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setFileTypeAlertActive(false)
      }
    }
  };

  return (
    <div>
      {
        fileTypeAlertActive &&
        <FailAlert subject={'File type is not valid'} message={'Please select an audio file (mp3, wav, or ogg).'} />
      }
      {
        uploadFailureAlertActive &&
        <FailAlert subject={'File Upload Failed'} message={'Something went wrong uploading audio file.'} />
      }
      {
        uploadSuccessAlertActive &&
        <SuccessAlert subject={'File Upload Successful!'} message={'Please wait while the audio file being transcribed/summarized.'} />
      }
    
      <form onSubmit={onFormSubmit}>
        <label class="block mb-2 text-sm font-medium text-gray-900">Select audio file</label>
        <input 
            class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400  p-3 focus:outline-none" 
            id="large_size" 
            type="file"
            onChange={onFileChange}
        >
        </input>
        {fileName && <div>Selected file: {fileName}</div>}
        <button 
          class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          type='submit'
        >
          Transcribe/Summarize
        </button>
      </form>
    </div>
  )
}
