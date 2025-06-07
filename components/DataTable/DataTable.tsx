/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
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

const data: Payment[] = [
  {
    id: "45785498263",
    amount: 0,
    status: "success",
    isActive:"active",
    role: "editor",
    email: "ken99@example.com",
    fullName: "John Doe",
  },
  {
    id: "38778966136",
    amount: 0,
    status: "success",
    isActive:"deactive",
    role: "moderator",
    email: "Tazv341@example.com",
    fullName: "Tobin Jones",
  },
  {
    id: "48578962356",
    amount: 242,
    status: "success",
    isActive:"deactive",
    role: "user",
    email: "Abe45@example.com",
    fullName: "Elliot Orn",
  },
  {
    id: "65865741656",
    amount: 837,
    status: "processing",
    isActive:"active",
    role: "user",
    email: "Monserrat44@example.com",
    fullName: "Deanna Christiansen",
  },
  {
    id: "19684565360",
    amount: 0,
    status: "success",
    role: "admin",
    isActive:"active",
    email: "Silas22@example.com",
    fullName: "Hertha Labadie",
  },
  {
    id: "23264698900",
    amount: 721,
    status: "failed",
    isActive:"active",
    role: "finance",
    email: "carmella@example.com",
    fullName: "Larissa Little",
  },
  {
    id: "89748923660",
    amount: 0,
    status: "success",
    isActive:"active",
    role: "editor",
    email: "ken99@example.com",
    fullName: "Nestor Predovic",
  },
  {
    id: "87453256230",
    amount: 0,
    status: "success",
    isActive:"active",
    role: "moderator",
    email: "Tazv341@example.com",
    fullName: "Brennon Paucek",
  },
  {
    id: "15612566360",
    amount: 242,
    status: "success",
    isActive:"active",
    role: "user",
    email: "Abe45@example.com",
    fullName: "Kirk Gulgowski",
  },
  {
    id: "3984586940",
    amount: 837,
    isActive:"active",
    status: "processing",
    role: "user",
    email: "Monserrat44@example.com",
    fullName: "Newell Marvin",
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed",
  isActive: "active" | "deactive",
  role: any,
  email: string,
  fullName: string
}

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
    accessorKey: "id",
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
    cell: ({ row }) => <div className="pl-5">{row.getValue("id")}</div>,
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
      <div className="capitalize">{row.getValue("isActive")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
        const [selectedRole, setRole] = useState("");
      return (<>
      <Select onValueChange={(val:any) => setRole(val)}>
        <SelectTrigger className="w-[180px] capitalize">
          <SelectValue placeholder={selectedRole ? selectedRole : row.getValue("role")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role Change</SelectLabel>
            <SelectItem value="Admin" className="capitalize">Admin</SelectItem>
            <SelectItem value="Moderator" className="capitalize">Moderator</SelectItem>
            <SelectItem value="Editor" className="capitalize">Editor</SelectItem>
            <SelectItem value="Finance" className="capitalize">Finance</SelectItem>
            <SelectItem value="User" className="capitalize">User</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </>)
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Payment</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Enable</DropdownMenuItem>
            <DropdownMenuItem>Disable</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((item) => {
    const searchTerm = search.toLowerCase();

    // Kolon bazında arama
    return (
      item.email.toLowerCase().includes(searchTerm) ||
      item.role.toLowerCase().includes(searchTerm) ||
      item.fullName.toLowerCase().includes(searchTerm) ||
      item.amount.toString().toLowerCase().includes(searchTerm)
    );
  });

  const table = useReactTable({
    data:filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })



  return (
    <div className="w-full dark:bg-black/50 bg-white p-5 rounded-3xl font-sans">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value:any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="dark:bg-neutral-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
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
  )
}
