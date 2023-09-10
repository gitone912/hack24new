import React, { useState, useEffect } from 'react';
import './style.css';
import { useGetOnnotesQuery } from '@/services/courseServiceApi';
import { useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/widgets/layout';
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  BackspaceIcon
} from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState();
  const { notesId } = useParams();
  const Response = useGetOnnotesQuery(notesId);
  const res = Response.data;

  useEffect(() => {
    if (res) {
      const sortedNotes = [...res.all_notes].sort((a, b) => a.notesNumber - b.notesNumber);
      setNotes(sortedNotes);
      setSelectedNotes(sortedNotes[0].notes_link);
    }
  }, [res]);

  const handleNotesClick = (note) => {
    setSelectedNotes(note.notes_link);
  };

  const navbarRoutes = [
    {
      name: 'dashboard',
      path: '/dashboard/home',
      icon: ChartPieIcon,
    },
    {
      name: 'profile',
      path: '/dashboard/home',
      icon: UserIcon,
    },
    {
      name: 'Back to All Notes',
      path: '/dashboard/notes',
      icon: BackspaceIcon,
    }
  ];

  if (!res) {
    // Show a loading state when data is being fetched
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="relative min-h-screen w-full">
        <div className="container relative z-40 mx-auto p-4">
          <Navbar routes={navbarRoutes} />

          <div className="flex mt-4">
            <div className="w-1/4">
              <div className="grid gap-4">
                {notes?.map((note) => (
                  <div
                    key={note.id}
                    className={`bg-white rounded-lg p-4 shadow-md cursor-pointer ${
                      selectedNotes === note.notes_link ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleNotesClick(note)}
                  >
                    <Typography>{note.title}</Typography>
                    <a href={note.notes_link} target="_blank" rel="noreferrer" class="underline decoration-green-500">
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-3/4 pl-4">
              {selectedNotes && (
                <div style={{ height: '800px' }}>
                  <iframe
                    src={selectedNotes}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export { NotesList };
