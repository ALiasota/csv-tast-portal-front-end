import React, { FC, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CustomModal from "./modals/Modal";
import ApiService from "../services/ApiService";

const AddCsvFile: FC<{ getTasks: () => Promise<void> }> = ({ getTasks }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const uploadedTasks = await ApiService.uploadTasksFromCsv(selectedFile);
        console.log("File uploaded successfully:", uploadedTasks);
        setSelectedFile(null);
        getTasks();
      } catch (error) {
        alert("Error uploading file");
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <CustomModal buttonText="Add Csv FIle (for create tasks)">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Upload CSV File
        </Typography>
        <input
          accept=".csv"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload-csv"
        />
        <label htmlFor="upload-csv">
          <Button variant="outlined" color="primary" component="span">
            Choose File
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body1" component="div">
            Selected file: {selectedFile.name}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Box>
    </CustomModal>
  );
};
export default AddCsvFile;
