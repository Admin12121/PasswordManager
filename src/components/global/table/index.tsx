"use client";

import React, { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import { LoaderCircle, Search, ArrowRight, ChevronDown, Plus } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor,
  Selection,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";

import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu as DropdownMenuNext,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface statusOptionProps {
  name: string;
  uid: string;
}

interface ApiResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  page_size: number;
  results: any[];
}

interface columns {
  name: string;
  uid: string;
  sortable?: boolean;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface MainTableProps {
  SetExcludeBy: any;
  data: ApiResponse;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  searchLoading: boolean;
  dataperpage: React.Dispatch<React.SetStateAction<number | null>>;
  refetch: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  exclude_by: string;
  renderCell: (data: any, columnKey: React.Key) => React.ReactNode;
  INITIAL_VISIBLE_COLUMNS: string[];
  columns: columns[];
  statusOptions: statusOptionProps[];
  addlink: string;
}

export default function MainTable({
  SetExcludeBy,
  data,
  setSearch,
  isLoading,
  searchLoading,
  dataperpage,
  refetch,
  columns,
  page,
  setPage,
  exclude_by,
  renderCell,
  INITIAL_VISIBLE_COLUMNS,
  statusOptions,
  addlink,
}: MainTableProps) {
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState("");
  const [searchValue, setsearchValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [users, setUsers] = React.useState<any[]>([]);
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const pages = Math.ceil(totalUsers / rowsPerPage);

  const handleColumnToggle = (columnUid: string) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(columnUid)) {
        newSet.delete(columnUid);
      } else {
        newSet.add(columnUid);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (data) {
      setUsers(data.results);
      setTotalUsers(data.count);
    }
  }, [data, page, exclude_by]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    const filteredUsers = [...users];
    if (statusFilter !== "all") {
      const selectedStatuses = Array.from(statusFilter);

      const excludedStatuses = statusOptions
        .map((option) => option.uid)
        .filter((status) => !selectedStatuses.includes(status));

      const oppositeStatuses = excludedStatuses.map((status) => {
        return status;
      });

      SetExcludeBy(oppositeStatuses);
    }

    return filteredUsers;
  }, [users, page, statusFilter, SetExcludeBy]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, users, page, statusFilter, exclude_by, filteredItems]);

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dataperpage(Number(e.target.value));
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (value?: string) => {
    if (value) {
      setsearchValue(value);
      setSearch(value);
      setPage(1);
    } else {
      setFilterValue("");
      setsearchValue("");
      setSearch("");
    }
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="relative">
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => {
                onSearchChange(event.target.value);
              }}
              className="h-8 w-[150px] lg:w-[350px] peer pe-9 ps-9  "
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              {searchLoading ? (
                <LoaderCircle
                  className="animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  role="presentation"
                />
              ) : (
                <Search size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </div>
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Press to speak"
              type="submit"
            >
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="flex gap-3">
            <DropdownMenuNext>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex h-8 gap-2 w-20 p-0 data-[state=open]:bg-muted"
                >
                  Status <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {statusOptions.map((status) => (
                  <DropdownMenuItem key={status.uid} className="cursor-pointer">
                    {capitalize(status.name)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuNext>
            <DropdownMenuNext>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex h-8 gap-2 w-24 p-0 data-[state=open]:bg-muted"
                >
                  Columns <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.uid}
                    className="cursor-pointer"
                    checked={
                      visibleColumns === "all" ||
                      (visibleColumns as Set<string>).has(column.uid)
                    }
                    onCheckedChange={() => handleColumnToggle(column.uid)}
                  >
                    {capitalize(column.name)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuNext>
            <Button
              variant="secondary"
              size="icon"
              className="flex h-8 gap-2 p-0 data-[state=open]:bg-muted"
              onClick={() => router.push(addlink)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalUsers} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small cursor-pointer"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{ cursor: "bg-foreground text-background" }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    hasSearchFilter,
    setPage,
  ]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No users found"}
        items={sortedItems}
        isLoading={isLoading}
        loadingContent={
          <span className="h-[50vh] flex items-center justify-center">
            <Spinner color="default" />
          </span>
        }
      >
        {(item: any) => (
          <TableRow key={item.slug}>
            {(columnKey: any) => (
              <TableCell className="cursor-pointer">
                {renderCell(item, columnKey) as React.ReactNode}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
