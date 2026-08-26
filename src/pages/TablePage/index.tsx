import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type Column,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PageLayout from '@/components/PageLayout';
import { allPostsQueryOptions } from '@/queries/posts';
import TablePaginationControls from './TablePaginationControls';

import type { Post } from '@/types/Post';

// Table V9 requires an explicit `features` declaration; only the row models
// this page actually uses are registered so unused feature code tree-shakes away.
// `filterFns` must be registered explicitly too: unlike sorting's auto-fn,
// `column.getAutoFilterFn()` looks up its chosen name (`includesString` for the
// string `title` column) in this registry and returns `undefined` if it's missing,
// silently disabling the filter.
const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
});

// The `any` value type lets this header renderer be shared across columns with
// different cell value types (number, string); `Column`'s value parameter is
// otherwise invariant, so `unknown` would reject narrower columns here.
// oxlint-disable-next-line no-explicit-any
const generateSortableHeader = ({ column }: { column: Column<typeof features, Post, any> }) => {
  const isSorted = column.getIsSorted();
  const isAsc = isSorted === 'asc';
  const isDesc = isSorted === 'desc';

  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      <span className="capitalize">{column.id}</span>{' '}
      {isAsc && <ArrowUp className="ml-2 h-4 w-4" />}
      {isDesc && <ArrowDown className="ml-2 h-4 w-4" />}
      {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );
};

const columnHelper = createColumnHelper<typeof features, Post>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('id', {
    header: generateSortableHeader,
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  }),
  columnHelper.accessor('userId', {
    header: generateSortableHeader,
    cell: ({ row }) => <div>{row.getValue('userId')}</div>,
  }),
  columnHelper.accessor('title', {
    header: generateSortableHeader,
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  }),
  columnHelper.accessor('body', {
    header: generateSortableHeader,
    cell: ({ row }) => <div>{row.getValue('body')}</div>,
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <Button {...props} variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )}
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(post.title)}>
                Copy post title
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit post</DropdownMenuItem>
            <DropdownMenuItem>Delete post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);

// Spec: ./spec/README.md — read before changing this page
const TablePage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data: posts } = useSuspenseQuery(allPostsQueryOptions);

  const table = useTable({
    features,
    data: posts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const {
    pagination: { pageIndex },
  } = table.state;

  const renderHeader = () => (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );

  const renderBody = () => (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                <table.FlexRender cell={cell} />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  return (
    <PageLayout title="Table with sorting, filtering and pagination.">
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Filter posts..."
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(props) => (
                <Button {...props} variant="outline" className="ml-auto">
                  Columns
                </Button>
              )}
            />
            <DropdownMenuContent align="end">
              {table
                .getAllLeafColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
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
            {renderHeader()}
            {renderBody()}
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <TablePaginationControls
            currentPage={pageIndex + 1}
            totalPages={table.getPageCount()}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            onPreviousPage={() => table.previousPage()}
            onNextPage={() => table.nextPage()}
            onPageChange={(page) => table.setPageIndex(page)}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default TablePage;
