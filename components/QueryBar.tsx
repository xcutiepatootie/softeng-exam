import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface QueryBarProps {
  fetchData: (query: string) => void;
}

const QueryBar = ({ fetchData }: QueryBarProps) => {
  const [query, setQuery] = useState<string>("");

  const handleFetch = () => {
    fetchData(query);
  };

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Query"
      />
      <Button onClick={handleFetch}>Fetch Data</Button>
    </div>
  );
};

export default QueryBar;
