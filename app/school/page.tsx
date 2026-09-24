"use client";
import CustomTable from "@/components/customs/custom-table/CustomTable";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockSchoolsApiData, schoolColumns } from "./mockData";

export default function School() {
  const navigate = useRouter();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const HandleSelectedRow = (e: any) => {
    setSelectedRow(e);
    navigate.push(`/school/${e.schoolId}`);
  };
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-4">
      <h1>List of SCHOOLS</h1>
      <h5>the selected row is {selectedRow?.schoolName}</h5>
      <CustomTable
        column={schoolColumns}
        data={mockSchoolsApiData}
        SelectedRow={(e) => HandleSelectedRow(e)}
      />
    </main>
  );
}
