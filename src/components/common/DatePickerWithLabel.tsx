import { type FC } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn, formatDate } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface DatePickerWithLabelProps {
  date: Date | null;
  setDate: (date: Date) => void;
}

const DatePickerWithLabel: FC<DatePickerWithLabelProps> = ({
  date,
  setDate,
}) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={(d) => setDate(d ?? new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithLabel;
