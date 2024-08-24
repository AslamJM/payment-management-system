import { Search } from "lucide-react";
import CardWrapper from "~/components/common/CardWrapper";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const InvoiceSearch = () => {
  return (
    <CardWrapper title="Search Invoice">
      <div className="flex items-center gap-4">
        <Input />
        <Button>
          <Search className="mr-2" /> Search
        </Button>
      </div>
    </CardWrapper>
  );
};

export default InvoiceSearch;
