import { Typography } from "@mui/material";
import React from "react";

interface QuoteCardProps {
  mediaUrl: string;
  text: string;
  username: string;
}

const QuoteCard= ({
  mediaUrl,
  text,
  username
}: QuoteCardProps) => {
  return (
    <div style={styles.card}>
      <div style={{position: 'relative'}}>
        <img src={mediaUrl} alt="Quote" style={styles.image} />
        <div style={styles.overlay}>
          <span style={{wordBreak: 'break-word'}}>{text}</span>
        </div>
      </div>
      <div style={styles.details}>
        <Typography>By :- {username}</Typography>
      </div>
    </div>
  );
};

const styles = {
  card: {
    marginBottom: "16px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "300px",
    display: "block",
  },
  overlay: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center" as "center",
    fontWeight: 500,
  },
  details: {
    padding: "8px",
    backgroundColor: "#fff",
  },
  username: {
    margin: 0,
    fontWeight: "bold" as "bold",
    color: "#333",
    fontSize: "14px",
  }
};

export default QuoteCard;
