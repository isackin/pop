"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

// ! define object column for the header
interface Column {
  key: string;
  header: string;
}

interface TableProp {
  column: Column[];
  data: Record<string, any>[]; //! meaning, the data is array of object, any kay diri man fixed is object
  SelectedRow: (e: any) => void;
}

type SortDirection = "asc" | "desc";

export default function CustomTable({ column, data, SelectedRow }: TableProp) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
  };
  const HandleClear = () => {
    setSearchTerm("");
    setAppliedSearch("");
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const HandleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const processedData = useMemo(() => {
    let FilteredData = data;
    if (appliedSearch.trim() !== "") {
      const query = appliedSearch.toLowerCase().trim();
      FilteredData = data.filter((row) =>
        column.some((col) => {
          const val = row[col.key];
          if (val == null) return false;
          return String(val).toLowerCase().includes(query);
        }),
      );
    }

    if (!sortKey) return FilteredData;

    return [...FilteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }

      const strA = String(valA);
      const strB = String(valB);
      const comparison = strA.localeCompare(strB, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [sortKey, data, sortDirection, appliedSearch, column]);

  return (
    <>
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-8"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={HandleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch} type="button">
          Search
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* //! map the header */}
              {column.map((columns, _) => {
                return (
                  <TableHead
                    key={columns.key}
                    className="font-medium"
                    onClick={() => {
                      HandleSort(columns.key);
                    }}
                  >
                    {columns.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* //! map the data */}
            {processedData?.length > 0 ? (
              processedData.map((row, rowIndex) => {
                return (
                  <TableRow key={rowIndex}>
                    {column.map((col) => {
                      return (
                        <TableCell
                          key={col.key}
                          onClick={() => SelectedRow(row)}
                        >
                          {/* //!match each key for dynamic display of each column */}
                          {row[col.key] ?? ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={column.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
