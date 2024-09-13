import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = {};

const renderObject = (obj: any) => {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => (
        <div key={key} className="mb-2">
          <strong>{key}:</strong>{" "}
          {
            typeof value === "object" && value !== null
              ? renderObject(value) // Recursively render nested objects
              : String(value) // Convert non-object values to string
          }
        </div>
      ))}
    </div>
  );
};

const CardComponent = ({
  title,
  content,
}: {
  title: string;
  content?: any;
}) => {
  const renderContent = () => {
    try {
      return (
        <div className="h-full w-full overflow-auto whitespace-pre-wrap">
          {JSON.stringify(content, null, 2)}
        </div> //
      );
    } catch (error) {
      return <p>Error rendering content</p>;
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[640px] w-[540px] overflow-x-auto p-4">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
