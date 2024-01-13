import { useEffect, useState } from "react";
import Link from "next/link";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FileDropdown from "~~/components/FileDropdown";
import { MetaHeader } from "~~/components/MetaHeader";
import VideoPlayer from "~~/components/VideoPlayer";
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

const Home: NextPage = () => {
  const initialVideoSrc = "https://s3.us-east-1.wasabisys.com/dys/generations/final_V12.mp4";
  const [videoSrc, setVideoSrc] = useState<string>(initialVideoSrc);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // const handleFileSelectionChange = (label: string, selectedFolder: string) => {
  //   // Handle the selected folder and label
  //   console.log("Selected Label:", label);
  //   console.log("Selected Items:", selectedValues);

  //   setSelectedValues((prevValues) => {
  //     // Check if there's already a selected value for the current label
  //     const index = prevValues.findIndex((value) => value.includes(label));

  //     const keyValue = { [label]: selectedFolder };

  //     // Update the value for the current label or add a new value
  //     if (index !== -1) {
  //       const updatedValues = [...prevValues];
  //       // updatedValues[index] = `${label}_${selectedFolder}`;
  //       updatedValues[index] = `${label}:${selectedFolder}`;
  //       return updatedValues;
  //     } else {
  //       // return [...prevValues, `${label}_${selectedFolder}`];
  //       return [...prevValues, `${label}:${selectedFolder}`];
  //     }
  //   });
  // };

  const handleFileSelectionChange = (label: string, selectedFolder: string) => {
    setSelectedValues(prevValues => {
      // Check if there's already a selected value for the current label
      const index = prevValues.findIndex(value => value.includes(label));

      // Create the attribute object for the current label and selectedFolder
      const attribute = {
        trait_type: label,
        value: selectedFolder,
      };

      // Update the value for the current label or add a new value
      if (index !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[index] = JSON.stringify(attribute); // Cast the object to a string
        return updatedValues;
      } else {
        return [...prevValues, JSON.stringify(attribute)]; // Cast the object to a string
      }
    });
  };

  // Transform selectedValues to the desired JSON format
  // const transformedValues = {
  //   attributes: selectedValues.map((value) => JSON.parse(value)),
  // };

  const handleUp = async (): Promise<void> => {
    console.log("Selected Values:", selectedValues);
    try {
      const apiUrl: string = "/generate_specific";

      // Send a POST request with empty JSON data
      setLoading(true);
      const response: AxiosResponse = await axios.post(apiUrl, { selectedValues });
      const newVideoSrc = response.data["generated_video"];
      console.log("Video url = ", newVideoSrc);

      // Save the new videoSrc to localStorage
      localStorage.setItem("videoSrc", newVideoSrc);

      setVideoSrc(newVideoSrc);
      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made, but the server responded with a status code
        console.error("Error status:", axiosError.response.status);
        console.error("Error data:", axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", axiosError.message);
      }
    }

    // Rest of your handleUpload logic...
  };

  useEffect(() => {
    const savedVideoSrc = localStorage.getItem("videoSrc");

    // Check if the saved videoSrc exists in localStorage and the file exists in the bucket
    if (savedVideoSrc) {
      fetch(savedVideoSrc)
        .then(response => {
          if (response.ok) {
            setVideoSrc(savedVideoSrc);
          } else {
            // Handle the case where the file does not exist
            console.error("The saved video file does not exist.");
            setVideoSrc(initialVideoSrc); // Set to the initial value or handle accordingly
          }
        })
        .catch(error => {
          console.error("Error checking file existence:", error);
        });
    } else {
      setVideoSrc(initialVideoSrc);
    }
  }, []);

  const handleUpload = async (): Promise<void> => {
    try {
      const apiUrl: string = "/generate";

      // Send a POST request with empty JSON data
      const response: AxiosResponse = await axios.post(apiUrl, {});
      const newVideoSrc = response.data["generated_video"];
      console.log("Video url = ", newVideoSrc);

      // Save the new videoSrc to localStorage
      localStorage.setItem("videoSrc", newVideoSrc);

      setVideoSrc(newVideoSrc);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made, but the server responded with a status code
        console.error("Error status:", axiosError.response.status);
        console.error("Error data:", axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", axiosError.message);
      }
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col text-center items-center max-w-lg">
              {/* Use key to force remount when videoSrc changes */}
              <VideoPlayer key={videoSrc} src={videoSrc} />
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <div className="py-4"></div>
              <button onClick={handleUp} className="btn btn-primary" disabled={loading}>
                Generate
              </button>
              <div className="mb-4"></div>
              {loading && (
                <div className="spinner-container">
                  <RingLoader color="#36D7B7" loading={loading} size={50} />
                </div>
              )}
            </div>

            <div>
              <FileDropdown label="1_TORSO" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="2_LEFTARM" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="3_RIGHTARM" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="4_HEAD" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="5_BELLY" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="6_LEFTLEG" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="7_RIGHTLEG" onSelectionChange={handleFileSelectionChange} />
              <FileDropdown label="8_REARTORSO" onSelectionChange={handleFileSelectionChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
