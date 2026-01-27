export interface sellerproductQuery {
  id?:string | number,
  productName?: string;
  categoryId?: string | number;
  limit?: number;
  offset?: number;
}