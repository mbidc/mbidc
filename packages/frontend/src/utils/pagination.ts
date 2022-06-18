import { useState } from "react";

export interface PaginationOptions {
  limit?: number;
  page?: number;
}

export function usePagination(options?: PaginationOptions) {
  const [limit, setLimit] = useState(options?.limit ?? 10);
  const [page, setPage] = useState(options?.page ?? 0);
  return {
    limit,
    page,
    setLimit,
    setPage,
  };
}
