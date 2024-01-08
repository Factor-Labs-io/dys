import { useState, useEffect } from 'react';

type FileDropdownProps = {
    label: string;
    onSelectionChange: (selectedFolder: string) => void;
  };
  
  const FileDropdown: React.FC<FileDropdownProps> = ({ label, onSelectionChange }) => {
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string>(label);
  
    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const response = await fetch(`/get_files?search_term=${selectedFolder}`);
          const data = await response.json();
          setFiles(data.files);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };
  
      if (selectedFolder) {
        fetchFiles();
      }
    }, [selectedFolder]);
  
    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const folder = event.target.value;
      setSelectedFolder(folder);
      onSelectionChange(folder);
    };
  
    return (
      <div>
        <label htmlFor={`dropdown-${label}`}>{label}:</label>
        <select
          id={`dropdown-${label}`}
          onChange={handleSelectionChange}
          value={selectedFolder}
        >
          <option value="">-- Select Piece --</option>
          {files.map((file: string) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FileDropdown;
  
  