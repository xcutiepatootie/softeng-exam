import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProcessedTreeView from "./ProcessedTreeView";

type CardProps = {
  title: string;
  content?: any;
  isProcessed?: boolean;
};

const CardComponent = ({ title, content, isProcessed }: CardProps) => {
  const renderContent = (): JSX.Element => {
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
        {isProcessed ? (
          <ProcessedTreeView data={content} />
        ) : (
          <>{renderContent()}</>
        )}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
