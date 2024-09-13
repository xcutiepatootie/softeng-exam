"use client";
import React from "react";
import CardComponent from "@/components/CardComponent";
import QueryBar from "@/components/QueryBar";
import useFetchData from "@/hooks/useFetchData";

export default function Home() {
  const { data, fetchData, processedData } = useFetchData();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-4 border bg-[#DEE5D4]">
      <QueryBar fetchData={fetchData} />
      <div className="flex space-x-10">
        <div className="w-1/2">
          <CardComponent title="URL Response:" content={data} />
        </div>
        <div className="w-1/2">
          <CardComponent
            title="Processed URL Response:"
            content={processedData}
            isProcessed={true}
          />
        </div>
      </div>
    </div>
  );
}
