import React, { useState } from "react";

type TreeNodeProps = {
  data: any;
  keyName?: string;
};

const ProcessedTreeView = ({ data, keyName }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderValue = (value: any) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return (
          <ul className="list-disc pl-4">
            {value.map((item, index) => (
              <li key={index}>
                <ProcessedTreeView data={item} />
              </li>
            ))}
          </ul>
        );
      } else {
        return <ProcessedTreeView data={value} />;
      }
    } else {
      return <span>{String(value)}</span>;
    }
  };

  return (
    <div>
      {typeof data === "object" && data !== null ? (
        <div>
          <div className="cursor-pointer font-bold" onClick={handleToggle}>
            {keyName && <span>{keyName}: </span>}
            {isOpen ? (
              <span className="inline-block rotate-90 transform">&#9654;</span>
            ) : (
              <span className="inline-block">&#9654;</span>
            )}
            {typeof data === "object" && data !== null
              ? "Object"
              : String(data)}
          </div>
          {isOpen && (
            <div className="pl-4">
              {Array.isArray(data) ? (
                <ul className="pl-4">
                  {data.map((item, index) => (
                    <li key={index}>
                      <ProcessedTreeView data={item} />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="pl-4">
                  {Object.entries(data).map(([key, value]) => (
                    <li key={key}>
                      <ProcessedTreeView data={value} keyName={key} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {keyName && <span>{keyName}: </span>}
          <span>{String(data)}</span>
        </div>
      )}
    </div>
  );
};

export default ProcessedTreeView;
