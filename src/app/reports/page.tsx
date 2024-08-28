import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import ReportsMain from "./_components/ReportsMain";

const ReportsPage = () => {
  return (
    <ScrollArea className="max-w-full overflow-x-auto">
      <ReportsMain />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ReportsPage;
