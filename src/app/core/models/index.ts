// ---- Enums ----
export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  ONLINE = 'ONLINE',
  OTHER = 'OTHER'
}

export enum SaleChannel {
  MANUAL = 'MANUAL',
  IMPORT = 'IMPORT',
  POS = 'POS',
  API = 'API'
}

export enum StockMovementType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  TRANSFER = 'TRANSFER'
}

export enum StockMovementReason {
  PURCHASE = 'PURCHASE',
  SALE = 'SALE',
  RETURN = 'RETURN',
  DAMAGE = 'DAMAGE',
  LOSS = 'LOSS',
  CORRECTION = 'CORRECTION',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT'
}

export enum ReferenceType {
  SALE = 'SALE',
  PURCHASE = 'PURCHASE',
  TRANSFER = 'TRANSFER',
  MANUAL = 'MANUAL'
}

// ---- Base ----
export interface BaseEntity {
  createdAt?: string;
  updatedAt?: string;
}

// ---- Category ----
export interface Category extends BaseEntity {
  id?: number;
  name: string;
  description?: string;
  isActive?: number;
}

export interface CategoryRequest {
  name: string;
  description?: string;
  isActive?: number;
}

// ---- Branch ----
export interface Branch extends BaseEntity {
  id?: number;
  branchName: string;
  address?: string;
  isActive?: number;
}

export interface BranchRequest {
  branchName: string;
  address?: string;
  isActive?: number;
}

// ---- Product ----
export interface Product extends BaseEntity {
  id?: number;
  name: string;
  description?: string;
  category?: Category;
  categoryId?: number;
  image?: string;
  price?: number;
  discount?: number;
  isActive?: number;
  rate?: number;
}

export interface ProductRequest {
  name: string;
  description?: string;
  categoryId?: number;
  image?: string;
  price?: number;
  discount?: number;
  isActive?: number;
  rate?: number;
}

// ---- Inventory ----
export interface Inventory extends BaseEntity {
  id?: number;
  branch?: Branch;
  branchId?: number;
  product?: Product;
  productId?: number;
  quantity?: number;
}

export interface InventoryRequest {
  branchId: number;
  productId: number;
  quantity: number;
}

// ---- Sale Item ----
export interface SaleItem extends BaseEntity {
  id?: number;
  product?: Product;
  productId?: number;
  quantity: number;
  unitPrice?: number;
  lineTotal?: number;
}

export interface SaleItemRequest {
  productId: number;
  quantity: number;
  unitPrice?: number;
  lineTotal?: number;
}

// ---- Sale ----
export interface Sale extends BaseEntity {
  id?: number;
  branch?: Branch;
  branchId?: number;
  totalAmount?: number;
  discountAmount?: number;
  taxAmount?: number;
  paymentMethod?: PaymentMethod;
  channel?: SaleChannel;
  externalRef?: string;
  items?: SaleItem[];
}

export interface SaleRequest {
  branchId: number;
  totalAmount?: number;
  discountAmount?: number;
  taxAmount?: number;
  paymentMethod?: PaymentMethod;
  channel?: SaleChannel;
  externalRef?: string;
  items: SaleItemRequest[];
}

// ---- Stock Movement ----
export interface StockMovement extends BaseEntity {
  id?: number;
  branchId?: number;
  productId?: number;
  type?: StockMovementType;
  reason?: StockMovementReason;
  quantity?: number;
  unitCost?: number;
  refType?: ReferenceType;
  refId?: string;
  note?: string;
}

export interface StockMovementRequest {
  branchId: number;
  productId: number;
  type: StockMovementType;
  reason: StockMovementReason;
  quantity: number;
  unitCost?: number;
  refType?: ReferenceType;
  refId?: string;
  note?: string;
}

// ---- API Response Wrapper ----
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}


export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type Page<T> = PageResponse<T>;
