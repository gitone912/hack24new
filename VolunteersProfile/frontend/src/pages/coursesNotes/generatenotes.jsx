import React, { useState } from 'react';
import { getStaticURL2 } from '@/services/url2';
import { Spinner } from '@material-tailwind/react';

const GenNotesPage = () => {
  const url = getStaticURL2();
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [notesData, setNotesData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call the API with the user-provided YouTube link
    fetch(`${url}/vtn/process_youtube_link/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        youtube_link: youtubeLink,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setNotesData(data);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching notes. Please try again later.');
        console.error('Error fetching notes:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={youtubeLink}
          onChange={handleInputChange}
          placeholder="Enter YouTube Video link to Generate Notes"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Get Notes
        </button>
      </form>

      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner color="purple" size="lg" />
          <p className="ml-2">Loading...</p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {notesData && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Notes:</h2>
          <p className="mt-2 text-gray-700">{notesData.notes_text}</p>
          <p className="text-sm text-gray-500 mt-2">Created At: {notesData.created_at}</p>

          {/* Download option */}
          <hr />
          <br />
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(notesData.notes_text)}`}
            download="notes.txt"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
          >
            Download Notes
          </a>
        </div>
      )}
    </div>
  );
};

export default GenNotesPage;
