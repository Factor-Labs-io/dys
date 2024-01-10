import { useEffect, useState } from "react";

type FileDropdownProps = {
  label: string;
  onSelectionChange: (selectedFolder: string) => void;
};

const FileDropdown: React.FC<FileDropdownProps> = ({ label, onSelectionChange }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>(''); // Change state variable name

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/get_files?search_term=${label}`);
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (label) {
      fetchFiles();
    }
  }, [label]);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const file = event.target.value; // Use 'file' instead of 'folder'
    setSelectedFile(file);
    onSelectionChange(file);
  };

  return (
    <div>
      <label htmlFor={`dropdown-${label}`}>{label}:</label>
      <select id={`dropdown-${label}`} onChange={handleSelectionChange} value={selectedFile}>
        <option value="">-- Select Piece --</option>
        {files &&
          files.map((file: string) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FileDropdown;
