import { sortAndTransformKeys } from "@/lib/sortingLogic";
import { useState } from "react";

type DataObject = {
  [key: string]: string;
};
const useFetchData = () => {
  const [data, setData] = useState<DataObject | null>(null);
  const [processedData, setProcessedData] = useState<DataObject | null>(null);

  const fetchData = async (query: string) => {
    try {
      const response = await fetch(query);
      const result = await response.json();
      console.log(result);
      setData(result);
      const transformedResult = sortAndTransformKeys(result);
      setProcessedData(transformedResult as DataObject);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { data, fetchData, processedData };
};

export default useFetchData;
