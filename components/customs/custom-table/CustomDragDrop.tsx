import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { formatFileSize } from "@/hooks/useFileSize";
import {
  ALLOWED_FILE_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "@/lib/constant";
import { Cloud, FileCode, XIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
interface MainProp {
  title?: string;
  subTitle?: string;
  buttonText?: string;
  callback: () => void;
}
export function CustomDragDrop({
  title,
  subTitle,
  buttonText,
  callback,
}: MainProp) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files;
      if (e.target.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(
          `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
        );
        return;
      }
      setErrorMessage("");
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const handeleRemove = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Cloud />
          </EmptyMedia>
          <EmptyTitle>{title ?? "Start uploading"}</EmptyTitle>
          <EmptyDescription>
            {subTitle
              ? subTitle
              : "Drag and drop your files here, or click to browse."}
            {errorMessage && (
              <p className="text-sm text-destructive mt-1">{errorMessage}</p>
            )}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Input
            hidden
            type="file"
            ref={fileInputRef}
            onChange={handeFileChange}
            multiple
            accept={ALLOWED_FILE_EXTENSIONS}
          />
          <Button variant="outline" size="sm" onClick={handleTriggerUpload}>
            {buttonText ? buttonText : "Choose Files"}
          </Button>
        </EmptyContent>
      </Empty>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
        {files?.map((image, _) => (
          <Attachment className="w-full" key={_}>
            <AttachmentMedia>
              <FileCode />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>
                {image.type} {formatFileSize(image.size)}
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                type="button"
                onClick={() => handeleRemove(_)}
                aria-label="Remove message-renderer.tsx"
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </div>
    </>
  );
}
