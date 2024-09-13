import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";

interface QueryBarProps {
  fetchData: (query: string) => void;
}

const QueryBar = ({ fetchData }: QueryBarProps) => {
  const [query, setQuery] = useState<string>("");
  const [previousQueries, setPreviousQueries] = useLocalStorage<string[]>(
    "prevQueries",
    [],
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleData = () => {
    if (query.trim() !== "") {
      if (!previousQueries.includes(query)) {
        const newTexts = [query, ...previousQueries].slice(0, 5);
        setPreviousQueries(newTexts);
      }

      fetchData(query);
      setQuery("");
      setShowDropdown(false);
    }
  };

  const handleQueryClick = (query: string) => {
    setQuery(query);
    setShowDropdown(false);
  };

  return (
    <div className="relative mt-10 flex w-full max-w-2xl flex-col space-y-2">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Convert input to lowercase
          placeholder="Enter Query"
          className="w-full"
          onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Hide dropdown when focus is lost with a delay
        />
        <Button onClick={handleData}>Fetch Data</Button>
      </div>
      {showDropdown && previousQueries.length > 0 && (
        <div className="absolute top-10 z-10 w-full max-w-2xl border border-gray-300 bg-white shadow-lg">
          <ul className="list-none p-2">
            {previousQueries.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleQueryClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryBar;
