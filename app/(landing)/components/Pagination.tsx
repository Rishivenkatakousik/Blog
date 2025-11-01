"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BlogPagination({
  totalPages,
  currentPage,
  onPageChange,
  totalItems,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}) {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      {typeof totalItems === "number" && (
        <div className="text-sm text-muted-foreground">
          Showing {totalItems} posts
        </div>
      )}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={
                  (currentPage === 1 ? "pointer-events-none opacity-50 " : "") +
                  "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => onPageChange(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={
                  (currentPage === totalPages
                    ? "pointer-events-none opacity-50 "
                    : "") + "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
