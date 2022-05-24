import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public total: number;
  public limit: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.total = paginationResults.total;
    this.limit = paginationResults.results.length;
  }
}