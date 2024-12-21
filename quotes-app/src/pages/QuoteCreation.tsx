import React, { useState } from "react";
import { uploadMedia, createQuote } from "../services/apiService";
import { Box, Button, TextField } from "@mui/material";

interface CreateQuoteProps {
  token: string;
  onClose: () => void ;
}

const CreateQuote = (props: CreateQuoteProps) => {
  const [text, setText] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await handleUpload(selectedFile);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const data = await uploadMedia(file);
      if (data) {
        setMediaUrl(data[0].url as any);
        alert("File uploaded successfully!");
      }
    } catch (error) {
      console.log("Error uploading file");
    }
  };

  const handleSubmit = async () => {
    if (text && mediaUrl) {
      await createQuote(props.token, text, mediaUrl);
      alert("Quote created successfully!");
      setText('');
      setMediaUrl('');
      props.onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="create-quote">
      <h1>Create Quote</h1>
      <TextField type="text" label="Enter quote text" variant="outlined" value={text} onChange={(e) => setText(e.target.value)}/>
      <Box style={{display: 'flex', margin: '10px 0'}}>
      <input 
          type="file" 
          onChange={handleFileChange} 
        />
      </Box>
      <Box style={{display: 'flex', justifyContent: 'space-between', marginTop: '35px'}}>
      <Button variant="contained" onClick={props.onClose} style={{width: '45%'}} color="error">Close</Button>
      <Button variant="contained" onClick={handleSubmit} style={{width: '45%'}} color="success">Save</Button>
      </Box>

    </div>
  );
};

export default CreateQuote;
