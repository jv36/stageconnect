'use client'

import Carousel from "@/components/Carousel";
import MyCard from "@/components/MyCard";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [countryCode, setCountryCode] = useState('CZ'); // Default country code
  const [newCountryCode, setNewCountryCode] = useState('CZ');
  const [error, setError] = useState<string | null>(null);


  const handleCountryCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountryCode(event.target.value.toUpperCase()); // Convert to uppercase
    setError(null); // Clear any previous error
  };

  const handleSearch = () => {
    if (newCountryCode.length === 2) {
      setCountryCode(newCountryCode); // Update the country code
    } else {
      setError("Please enter a valid two-letter country code.");
    }
  };


  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col sm:flex-row gap-4 items-center row-start-1">
        <TextField // Use MUI TextField
          label="Country Code"
          placeholder="e.g., US, CA"
          value={newCountryCode}
          onChange={handleCountryCodeChange}
          className="w-full sm:w-auto" // Adjust width as needed
          inputProps={{ maxLength: 2 }} // Set maxLength for the input
          error={!!error}
          helperText={error}
        />
        <Button // Use MUI Button
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Carousel countryCode={countryCode} /> {/* Pass the countryCode to Carousel */}
      </main>
    </div>
  );
}