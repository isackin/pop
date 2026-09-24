import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "cn";
interface ModalProp {
  trigger?: React.ReactNode;
  open?: boolean;
  onChange?: (open: boolean) => void;
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  onSave?: () => void;
  saveText?: string;
  cancelText?: string;
  className?: string;
}
export function CustomModal({
  trigger,
  open,
  onChange,
  title = "",
  subTitle = "",
  children = "",
  footer = "",
  onSave,
  saveText = "Save",
  cancelText = "Close",
  isLoading = false,
  className = "",
}: ModalProp) {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      {trigger && (
        <DialogTrigger render={<Button variant="outline">{trigger}</Button>} />
      )}
      <DialogContent className={cn("sx:max-w-xl", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subTitle && <DialogDescription>{subTitle}</DialogDescription>}
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {children}
        </div>
        <DialogFooter>
          {footer ? (
            footer
          ) : (
            <>
              <DialogClose
                render={
                  <Button variant="outline" type="button" disabled={isLoading}>
                    {cancelText}
                  </Button>
                }
              ></DialogClose>
              {onSave && (
                <Button onClick={onSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : saveText}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
