"use client";
// import styles from "../styles/globals.css";
import React, { useState } from "react";
import axios from "axios";
import FormData from 'form-data';

const VideoUploader: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedVideo(files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append('video', selectedVideo);

      try {
        const response = await axios.put('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the API response here
        console.log(response.data);
      } catch (error) {
        // Handle errors here
        console.error('Error uploading video:', error);
      }
    } else {
      // Handle the case where no video is selected
      console.error('No video selected');
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <input className="pb-6" type="file" accept="video/*" onChange={handleFileChange} />
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUploader;