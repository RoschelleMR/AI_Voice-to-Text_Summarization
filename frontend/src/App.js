import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import TranscriptionModal from './components/TranscriptionModal';
import AudioInput from './components/AudioInput'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [transcriptionData, setTranscriptionData] = useState({
    summary: '',
    transcription: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //Just a function to test a Hello Worl route
  const testAPI = (e) => {
    e.preventDefault()
    axios.get('http://localhost:5000/')
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      alert("Error fetching");
      // Handle error
    });
  }

  return (
    <div>
      <Header />

      <main class="flex-grow container mx-auto p-4 space-y-4">

        <button 
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          onClick={testAPI}
        >
          Test API
        </button>

        <AudioInput setTranscriptionData={setTranscriptionData} />

        {
          // Output Section (Hidden if there isn't a file that is currently transcribed)
          transcriptionData.transcription &&
          <section>
            <h2>Summarized Transcription</h2>

            <div id="summaryContainer" class="p-4 bg-white rounded shadow">
              {transcriptionData.summary}
            </div>

            <button 
              class="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              onClick={openModal}
            >
              View Transcription
            </button>
          </section>
        }

      </main>
      
      <TranscriptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transcription={transcriptionData.transcription}
      />

      {/* <Footer /> */}
    </div>
  );
}

export default App;
