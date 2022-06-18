export class Pagination {
  page?: number;
  limit?: number;
}

export class SuccessResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  constructor(data: T) {
    this.data = data;
    this.statusCode = 200;
    this.message = "success";
  }
}

export class PaginationResponse<T> extends SuccessResponse<T[]> {
  total!: number;
  statusCode!: number;
  message!: string;
  constructor(count: number, data: T[]) {
    super(data);
    this.total = count;
  }
}
