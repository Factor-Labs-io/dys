import React, { useEffect, useState } from "react";
import axios from "axios";

type FileDropdownProps = {
  label: string;
  project: string;
  onSelectionChange: (label: string, selectedFolder: string) => void;
};

const FileDropdown: React.FC<FileDropdownProps> = ({ label, project, onSelectionChange }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`/get_files?project=${project}&search_term=${label}`);
        const data = response.data;
        setFiles(data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (label) {
      fetchFiles();
    }
  }, [label, project]);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const file = event.target.value;
    setSelectedFile(file);
    onSelectionChange(label, file);
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

// import React, { useEffect, useState } from "react";

// type FileDropdownProps = {
//   label: string;
//   project: string
//   onSelectionChange: (label: string, selectedFolder: string) => void;
// };

// const FileDropdown: React.FC<FileDropdownProps> = ({ label, project, onSelectionChange }) => {
//   const [files, setFiles] = useState<string[]>([]);
//   const [selectedFile, setSelectedFile] = useState<string>('');

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch(`/get_files?project=${project}&search_term=${label}`);
//         const data = await response.json();
//         setFiles(data.files);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//       }
//     };

//     if (label) {
//       fetchFiles();
//     }
//   }, [label]);

//   const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const file = event.target.value;
//     setSelectedFile(file);
//     onSelectionChange(label, file); // Pass the label along with the selected folder
//   };

//   return (
//     <div>
//       <label htmlFor={`dropdown-${label}`}>{label}:</label>
//       <select id={`dropdown-${label}`} onChange={handleSelectionChange} value={selectedFile}>
//         <option value="">-- Select Piece --</option>
//         {files &&
//           files.map((file: string) => (
//             <option key={file} value={file}>
//               {file}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// };

// export default FileDropdown;
