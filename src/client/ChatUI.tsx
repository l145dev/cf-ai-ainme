import { ArrowUpIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./components/button";

const ChatUI = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 justify-center items-center">
      <div className="flex flex-col gap-6">
        <h1 className="scroll-m-20 pb-2 text-3xl tracking-tight first:mt-0 text-center">
          AInme, your anime knowledge base.
        </h1>
        <div className="relative">
          <TextareaAutosize
            placeholder="Ask anything about anime!"
            className="min-w-[35vw] pb-12 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            className="absolute right-2 bottom-2"
            variant="outline"
            size="icon"
            aria-label="Submit"
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
