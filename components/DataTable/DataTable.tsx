
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { FiUserPlus } from "react-icons/fi";
import axios from "axios"
import PaymentStatus from "../PaymentStatus/PaymentStatus"
import RoleChange from "../RoleChange/RoleChange"
import AddUser from "../AddUser/AddUser"
import EditUser from "../EditUser/EditUser"

// const data: any = [
//   {
//     accountNumber: "45785498263",
//     amount: 0,
//     status: "success",
//     isActive:"active",
//     role: "editor",
//     email: "ken99@example.com",
//     fullName: "John Doe",
//   },
//   {
//     id: "38778966136",
//     amount: 0,
//     status: "success",
//     isActive:"deactive",
//     role: "moderator",
//     email: "Tazv341@example.com",
//     fullName: "Tobin Jones",
//   },
//   {
//     id: "48578962356",
//     amount: 242,
//     status: "success",
//     isActive:"deactive",
//     role: "user",
//     email: "Abe45@example.com",
//     fullName: "Elliot Orn",
//   },
//   {
//     id: "65865741656",
//     amount: 837,
//     status: "processing",
//     isActive:"active",
//     role: "user",
//     email: "Monserrat44@example.com",
//     fullName: "Deanna Christiansen",
//   },
//   {
//     id: "19684565360",
//     amount: 0,
//     status: "success",
//     role: "admin",
//     isActive:"active",
//     email: "Silas22@example.com",
//     fullName: "Hertha Labadie",
//   },
//   {
//     id: "23264698900",
//     amount: 721,
//     status: "failed",
//     isActive:"active",
//     role: "finance",
//     email: "carmella@example.com",
//     fullName: "Larissa Little",
//   },
//   {
//     id: "89748923660",
//     amount: 0,
//     status: "success",
//     isActive:"active",
//     role: "editor",
//     email: "ken99@example.com",
//     fullName: "Nestor Predovic",
//   },
//   {
//     id: "87453256230",
//     amount: 0,
//     status: "success",
//     isActive:"active",
//     role: "moderator",
//     email: "Tazv341@example.com",
//     fullName: "Brennon Paucek",
//   },
//   {
//     id: "15612566360",
//     amount: 242,
//     status: "success",
//     isActive:"active",
//     role: "user",
//     email: "Abe45@example.com",
//     fullName: "Kirk Gulgowski",
//   },
//   {
//     id: "3984586940",
//     amount: 837,
//     isActive:"active",
//     status: "processing",
//     role: "user",
//     email: "Monserrat44@example.com",
//     fullName: "Newell Marvin",
//   },
// ]


export type Payment = {
  id:any
  accountNumber: string
  amount: number
  paymentStatus: boolean,
  isActive: "active" | "deactive",
  role: any,
  email: string,
  fullName: string
}

const globalFilterFn: FilterFn<Payment> = (row, columnId, filterValue: string) => {
  const searchTerm = filterValue.toLowerCase();
  const accountNumber = row.original.accountNumber?.toLowerCase() || "";
  const email = row.original.email?.toLowerCase() || "";
  const fullName = row.original.fullName?.toLowerCase() || "";
  const amount = row.original.amount?.toString().toLowerCase() || "";

  return (
    accountNumber.includes(searchTerm) ||
    email.includes(searchTerm) ||
    fullName.includes(searchTerm) ||
    amount.includes(searchTerm)
  );
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value:any) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "accountNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Number
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-5">{row.getValue("accountNumber")}</div>,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-5">{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("isActive") === true ? "Online" : "Offline"}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const rol = row.getValue("role")
      const user = row.original
      return (
      <>
      <RoleChange row={rol} id={user?.id}/>
      </>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-center font-medium flex justify-center items-center w-24 whitespace-nowrap">{formatted}</div>
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
    const pay = row.getValue("paymentStatus")
    const user = row.original


      return (
      <>
      <PaymentStatus row={pay} id={user?.id}/>
      </>
      )
    }
  },
  {
    header: "Edit",
    cell: ({ row }) => {
      const user = row.original
      return (
      <>
      <EditUser id={user?.id}/>
      </>
      )
    },
  },
]

export function DataTableDemo(data:any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [search, setSearch] = React.useState("");
  const searchTerm = search.toLowerCase();

const table = useReactTable({
    data:data?.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });



  return (
    <div className="w-full dark:bg-black/50 bg-white p-5 rounded-3xl font-sans">
      <div className="flex items-center py-4 gap-x-4">
        <Input
          placeholder="Search by acc. number, email, full name, or amount..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <AddUser />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"
              className="ml-auto">
              Columns
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="row"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="dark:bg-neutral-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
}