import { CustomDragDrop } from "@/components/customs/custom-table/CustomDragDrop";
import { CustomModal } from "@/components/customs/custom-table/CustomModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ModalParam {
  data: any;
  isOpen: boolean;
  onClose: (e: any) => void;
}

export default function ModalWinnerForm({ data, isOpen, onClose }: ModalParam) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <>
          <CustomModal
            className={cn(
              "transition-all duration-100 md:max-w-lg",
              isPopoverOpen && "blur-xs opacity-80",
            )}
            open={isOpen}
            title={"Send Email Notification"}
            subTitle={"Complete the form below to send an email notification."}
            onChange={(e) => onClose(e)}
            footer={
              <>
                <Button variant="destructive" type="button" onClick={onClose}>
                  Close
                </Button>

                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        type="button"
                        className="bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
                      >
                        Submit
                      </Button>
                    }
                  />
                  <PopoverContent align="center" side="top">
                    <PopoverHeader>
                      <PopoverTitle>
                        Are you sure you want to continue?
                      </PopoverTitle>
                      {/* <PopoverDescription>
                        Are you sure you want to continue?
                      </PopoverDescription> */}
                    </PopoverHeader>
                    <Field orientation={"horizontal"}>
                      <Button
                        variant="destructive"
                        className="w-fit flex-end"
                        onClick={() => {
                          setIsPopoverOpen(false);
                        }}
                      >
                        No!
                      </Button>
                      <Button
                        variant="outline"
                        className="w-fit flex-end bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
                        onClick={(e) => {
                          onClose(e);
                          setIsPopoverOpen(false);
                        }}
                      >
                        Yes, I am Sure!
                      </Button>
                    </Field>
                  </PopoverContent>
                </Popover>
              </>
            }
          >
            <Separator />
            <div className="w-full max-w-lg pt-2">
              <form>
                <FieldGroup>
                  <FieldSet>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="full-name">Email</FieldLabel>
                        <Input
                          type="email"
                          id="random jutsu"
                          placeholder="example@gmail.com"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="full-name">Subject</FieldLabel>
                        <Input
                          type=""
                          id="random jutsu"
                          placeholder="Notification of something..."
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="full-name">Message</FieldLabel>
                        <Textarea
                          id="randwefweomjutsu"
                          placeholder="Input Your Message Here..."
                          required
                        />
                      </Field>
                      <CustomDragDrop callback={() => {}} />
                      <Field orientation="horizontal">
                        <Checkbox id="sqsq" name="terms&condition" />
                        <FieldLabel htmlFor="full-name">
                          Accept terms and conditions
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </form>
            </div>
          </CustomModal>
        </>
      )}
    </>
  );
}
