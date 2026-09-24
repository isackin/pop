"use client";

import CustomTable from "@/components/customs/custom-table/CustomTable";
import { useParams } from "next/navigation";
import { mockSchoolsApiData, schoolColumns } from "../mockData";
import { useState } from "react";
import { CustomModal } from "@/components/customs/custom-table/CustomModal";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { CheckCircle2Icon, ClosedCaptionIcon, InfoIcon, X } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "cn";
interface ModalProp {
  modalId: string;
  show?: boolean;
}

export default function SpecificSchool() {
  const { schoolId } = useParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState<ModalProp>({
    modalId: "",
    show: false,
  });
  const selectedSchool = mockSchoolsApiData.find(
    (data) => data.schoolId === schoolId,
  );

  return (
    <>
      {modalTrigger?.show && (
        <>
          <CustomModal
            className={cn(
              "transition-all duration-100",
              isPopoverOpen && "blur-xs opacity-80",
            )}
            open={modalTrigger?.show}
            title={selectedSchool?.schoolName}
            subTitle={selectedSchool?.address}
            onChange={() => {
              setModalTrigger((prev) => ({ ...prev, show: false }));
            }}
            footer={
              <>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => {
                    setModalTrigger((prev) => ({ ...prev, show: false }));
                  }}
                >
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
                        // size="sm"
                        onClick={() => {
                          setIsPopoverOpen(false);
                        }}
                      >
                        No!
                      </Button>
                      <Button
                        variant="outline"
                        className="w-fit flex-end bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
                        onClick={() => {
                          setModalTrigger((prev) => ({ ...prev, show: false }));
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
            <Alert className="max-w-md">
              <CheckCircle2Icon />
              <AlertTitle>Congratulation</AlertTitle>
              <AlertDescription>
                This School have been performing very Good in the last few
                years, Please fill out the form so we can send you the price.
              </AlertDescription>
            </Alert>

            <div className="w-full max-w-md pt-8">
              <form>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Account Form</FieldLegend>
                    <FieldDescription>
                      Please fill the Form Below for us to contact you and send
                      you the price
                    </FieldDescription>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                        <Input
                          type="text"
                          id="random jutsu"
                          placeholder="Juan Dela Cruz..."
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="full-name">Email</FieldLabel>
                        <Input
                          type="email"
                          id="random jutsu"
                          placeholder="example@gmail.com"
                          required
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel htmlFor="full-name">Birthdate</FieldLabel>
                          <Input
                            type="date"
                            id="random jutsu"
                            placeholder="Juan Dela Cruz..."
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="full-name">gender</FieldLabel>
                          <Select>
                            <SelectTrigger id="blablabla">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>

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
      <div className="space-y-4 p-4">
        <div>This is the selected school</div>
        <CustomTable
          column={schoolColumns}
          data={selectedSchool ? [selectedSchool] : []}
          SelectedRow={(e) => {
            setModalTrigger({ modalId: e.id, show: true });
          }}
        />
      </div>
    </>
  );
}
