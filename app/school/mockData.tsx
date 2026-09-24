import { Column } from "@/components/customs/custom-table/CustomTable"


export const schoolColumns: Column[] = [
  { key: "id", header: "ID" },
  { key: "schoolId", header: "School ID" },
  { key: "schoolName", header: "School Name" },
  { key: "address", header: "Address" },
]

export const mockSchoolsApiData = [
  { id: "1", schoolId: "SCH-2024-001", schoolName: "Central Visayas State University", address: "Main Campus, Capitol Site, Cebu City" },
  { id: "2", schoolId: "SCH-2024-002", schoolName: "Eastern Metro Science High School", address: "123 Real Street, Tacloban City" },
  { id: "3", schoolId: "SCH-2024-003", schoolName: "St. Augustine Academy", address: "45 Rizal Avenue, Palo, Leyte" },
  { id: "4", schoolId: "SCH-2024-004", schoolName: "National Technological Institute", address: "78 Katipunan Ave, Quezon City" },
  { id: "5", schoolId: "SCH-2024-005", schoolName: "Pacific Maritime College", address: "Roxas Boulevard, Pasay City" },
  { id: "6", schoolId: "SCH-2024-006", schoolName: "Bicol Regional Science School", address: "Peñaranda St, Legazpi City" },
  { id: "7", schoolId: "SCH-2024-007", schoolName: "Mindanao State Polytechnic College", address: "University Heights, Davao City" },
  { id: "8", schoolId: "SCH-2024-008", schoolName: "Luzon Agricultural Academy", address: "McArthur Highway, San Fernando, Pampanga" },
  { id: "9", schoolId: "SCH-2024-009", schoolName: "Global City International School", address: "5th Avenue, BGC, Taguig" },
  { id: "10", schoolId: "SCH-2024-010", schoolName: "Southern Leyte Pioneer College", address: "Mabini St, Maasin City" },
]