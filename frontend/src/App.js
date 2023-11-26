import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import TranscriptionModal from './components/TranscriptionModal';
import AudioInput from './components/AudioInput'
import Summarize from './components/Summarize';
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [transcriptionData, setTranscriptionData] = useState({
    transcription: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [summaryState, setSummaryState] = useState(false);

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
            <h2>Transcription</h2>

            <div id="summaryContainer" class="p-4 bg-white rounded shadow">
              {transcriptionData.transcription}
            </div>

            <button 
              class="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              onClick={openModal}
            >
              View Transcription
            </button>
            <a 
                href="http://localhost:5000/api/uploads/transcription.txt"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center downSum"
            >
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                <span>Download Transcription</span>
            </a>
          </section>
        }

      { //loads summarize button once transcription is done
        transcriptionData.transcription && 
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setSummaryState(true)}
        > 
          Summarize
        </button>
      } 

    {
          // Shows Summary, uses transciption to gnerate summary
          summaryState &&
          <Summarize transcription = {transcriptionData.transcription}/>
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
