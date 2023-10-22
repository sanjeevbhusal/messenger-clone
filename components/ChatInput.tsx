import { AiOutlineFileAdd, AiOutlinePlus } from "react-icons/ai";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { ChangeEvent, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

function ChatInput() {
  const [files, setFiles] = useState<any[]>([]);
  const [openPopover, setOpenPopover] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  function onFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      setFiles([...files, { file, src: e.target?.result }]);
    };
    reader.readAsDataURL(file);

    setOpenPopover(false);
  }

  function onFileRemove(file: File) {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  }

  return (
    <div className="h-full flex gap-8 overflow-auto">
      <Popover
        open={openPopover}
        onOpenChange={() => setOpenPopover(!openPopover)}
      >
        <PopoverTrigger>
          <AiOutlinePlus className="border rounded-full w-12 h-12 p-2 border-black" />
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <Label
            htmlFor="upload-image"
            className="cursor-pointer hover:bg-gray-100 w-full block p-4"
          >
            Upload Image
          </Label>
          <Input
            id="upload-image"
            type="file"
            className="hidden"
            accept=".jpeg, .jpg, .png"
            onChange={onFileUpload}
          />
        </PopoverContent>
      </Popover>

      <div className="grow border bg-gray-200 border-none rounded-lg px-2 py-4">
        <div className={`${files.length > 0 ? "mb-2" : ""} flex gap-6`}>
          {files.length > 0 ? (
            <div className="h-16 w-16 border border-black rounded-md">
              <Label
                htmlFor="upload-image"
                className="cursor-pointer w-full h-full flex items-center justify-center"
              >
                <AiOutlineFileAdd className="" size={40} />
              </Label>
              <Input
                id="upload-image"
                type="file"
                className="hidden"
                accept=".jpeg, .jpg, .png"
                onChange={onFileUpload}
              />
            </div>
          ) : null}
          {files.map((file) => (
            <div key={file} className="h-16 w-16 relative">
              <img
                src={file.src}
                className="w-full h-full object-cover rounded-lg"
              />
              <RxCross2
                className="cursor-pointer absolute -right-3 -top-3 bg-white w-6 h-6 p-1 rounded-full border hover:bg-gray-100"
                onClick={() => onFileRemove(file)}
              />
            </div>
          ))}
        </div>
        <Textarea
          className="min-h-[40px] p-0 border-none focus:border-none focus:outline-none  focus-visible:ring-0 resize-none bg-gray-200 rounded-none focus-visible:ring-offset-0"
          placeholder="Some Message..."
        />
      </div>
    </div>
  );
}

export default ChatInput;
