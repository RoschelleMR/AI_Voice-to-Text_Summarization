import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import AudioInput from './components/AudioInput';
import TextDisplay from './components/TextDisplay';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [isFileTranscribed, setIsFileTranscribed] = useState(false)

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

      <button 
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        onClick={testAPI}
      >
        Test API
      </button>

      <main class="flex-grow container mx-auto p-4 space-y-4">
        <AudioInput setIsFileTranscribed={setIsFileTranscribed}/>
        
        {
          // Output Section (Hidden if there isn't a file that is currently transcribed)
          isFileTranscribed &&
          <section>
            <h2>Summarized Transcription</h2>
            <TextDisplay />
            <button class="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-green-700 transition">View Transcription</button>
          </section>
        }

      </main>

      <Footer />
    </div>
  );
}

export default App;
