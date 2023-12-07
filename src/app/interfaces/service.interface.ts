export interface Service {
    id: string | number;
    name: string;
    note?: string;
    description?: string;
    price: number;
    avgDuration: number;
    categoryName: string;
    subCategoryName: string;
    businessName?: string;
}