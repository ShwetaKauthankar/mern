import React, { useState, useEffect } from "react";
import { getQuotes } from "../services/apiService";
import QuoteCard from "../components/QuoteCard";
import FloatingActionButton from "../components/FloatingActionButton";
import { Dialog, DialogContent } from "@mui/material";
import CreateQuote from "./QuoteCreation";

interface QuoteListProps {
  token: string;
}

const QuoteList= (props: QuoteListProps) => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchQuotes = async (reset = false) => {
    setLoading(true);
    try {
      const data = await getQuotes(props.token, 5, reset ? 0 : offset);
      if (reset) {
        setQuotes(data.data);
        setOffset(5);
      } else if (data.data.length > 0) {
        setQuotes((prev) => [...prev, ...data.data]);
        setOffset((prev) => prev + 5);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchQuotes();
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop; 
    const scrollHeight = document.documentElement.scrollHeight; 
    const clientHeight = window.innerHeight;
  
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
      if (!loading) {
        fetchQuotes();
      }
    }
  };
  
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedHandleScroll);
  
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [loading]);

  const dummyImage = 'https://avatar.iran.liara.run/public';

  return (
    <div className="quote-list">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} mediaUrl={quote.mediaUrl || dummyImage} text={quote.text} username={quote.username} />
      ))}
      <FloatingActionButton onClick={() => setOpenDialog(true)} />
      {loading && <p>Loading...</p>}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <CreateQuote
            token={props.token}
            onClose={() => {
              setOpenDialog(false);
              fetchQuotes(true);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuoteList;
