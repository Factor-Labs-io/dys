import React, { useState } from 'react';

const Home: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [files, setFiles] = useState<string[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get_files?search_term=${selectedFolder}`);
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label htmlFor="dropdown">Select Pieces:</label>
      <select
        id="dropdown"
        onChange={(e) => setSelectedFolder(e.target.value)}
        onBlur={fetchFiles}
      >
        <option value="">-- Select Folder --</option>
        <option value="TORSO">TORSO</option>
        {/* Add more options as needed */}
      </select>

      <div>
        <h2>Files in {selectedFolder}:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
