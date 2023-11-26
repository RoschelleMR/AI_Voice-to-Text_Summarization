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
  const [spinnerState, setSpinnerState] = useState(false)

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

    
    setSpinnerState(true)
    axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      
    })
    .then(response => {
      
      setSpinnerState(false)

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
          Transcribe
        </button>
      </form>

      {spinnerState && <div class="text-center loadingbox">
          <h2>Transcribing...</h2>
          <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
      </div>
      
      
      }

    </div>
  )
}
