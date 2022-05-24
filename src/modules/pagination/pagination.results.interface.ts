export interface PaginationResultInterface<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    limit: number;
}