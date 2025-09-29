export interface PaginationMeta {
  page: number;
  total_elements: number;
  total_pages: number;
  last_page: boolean;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}