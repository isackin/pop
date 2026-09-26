"use client";

import CustomTable from "@/components/customs/custom-table/CustomTable";
import { useParams } from "next/navigation";
import { useState } from "react";
import { mockSchoolsApiData, schoolColumns } from "../mockData";
import ModalWinnerForm from "./modal/ModalWinnerForm";
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
          <ModalWinnerForm
            data={selectedSchool}
            isOpen={modalTrigger.show}
            onClose={(e) =>
              setModalTrigger({
                ...e,
                show: false,
              })
            }
          />
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
