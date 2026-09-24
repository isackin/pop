"use client";

import CustomTable from "@/components/customs/custom-table/CustomTable";
import { useParams } from "next/navigation";
import { mockSchoolsApiData, schoolColumns } from "../mockData";

export default function SpecificSchool() {
  const { schoolId } = useParams();
  const selectedSchool = mockSchoolsApiData.find(
    (data) => data.schoolId === schoolId,
  );

  return (
    <div className="space-y-4 p-4">
      <div>This is the selected school</div>
      <CustomTable
        column={schoolColumns}
        data={selectedSchool ? [selectedSchool] : []}
        SelectedRow={(e) => {}}
      />
    </div>
  );
}
