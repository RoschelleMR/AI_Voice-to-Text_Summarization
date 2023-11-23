import React from 'react'

export default function TranscriptionModal({ isOpen, onClose, transcription }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
            <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 md:p-6 lg:p-8 rounded shadow-xl max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Transcription</h2>
                <button onClick={onClose} className="text-gray-800 font-semibold hover:text-gray-600">
                    ×
                </button>
                </div>
                <div className="mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{transcription}</p>
                </div>
                <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-150"
                >
                Close
                </button>
            </div>
            </div>
        </div>
    )
}
