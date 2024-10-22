import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AddBrandInput = {
  name: Scalars['String']['input'];
};

export type AddCategoryInput = {
  name: Scalars['String']['input'];
};

export type AddProductInput = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Array<Scalars['Upload']['input']>>;
  purchasePrice?: InputMaybe<Scalars['Decimal']['input']>;
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  retailPrice?: InputMaybe<Scalars['Decimal']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['Upload']['input']>;
};

export type AdminPayloadBase = {
  __typename?: 'AdminPayloadBase';
  administrator?: Maybe<Administrator>;
  errors?: Maybe<Array<UserError>>;
};

export type AdminRegisterInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUpdateInput = {
  id: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Administrator = {
  __typename?: 'Administrator';
  id: Scalars['Int']['output'];
  password?: Maybe<Scalars['String']['output']>;
  salt?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type AdministratorFilterInput = {
  and?: InputMaybe<Array<AdministratorFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<AdministratorFilterInput>>;
  password?: InputMaybe<StringOperationFilterInput>;
  salt?: InputMaybe<StringOperationFilterInput>;
  token?: InputMaybe<StringOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
};

export type AdministratorSortInput = {
  id?: InputMaybe<SortEnumType>;
  password?: InputMaybe<SortEnumType>;
  salt?: InputMaybe<SortEnumType>;
  token?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type AllOrdersConnection = {
  __typename?: 'AllOrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AllOrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Order>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AllOrdersEdge = {
  __typename?: 'AllOrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Order;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  products: Array<Product>;
};

export type BrandFilterInput = {
  and?: InputMaybe<Array<BrandFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BrandFilterInput>>;
  products?: InputMaybe<ListFilterInputTypeOfProductFilterInput>;
};

export type BrandSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  products: Array<Product>;
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
  products?: InputMaybe<ListFilterInputTypeOfProductFilterInput>;
};

export type CategorySortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfOrderItemFilterInput = {
  all?: InputMaybe<OrderItemFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OrderItemFilterInput>;
  some?: InputMaybe<OrderItemFilterInput>;
};

export type ListFilterInputTypeOfProductFilterInput = {
  all?: InputMaybe<ProductFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductFilterInput>;
  some?: InputMaybe<ProductFilterInput>;
};

export type ListFilterInputTypeOfSalesFilterInput = {
  all?: InputMaybe<SalesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SalesFilterInput>;
  some?: InputMaybe<SalesFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MonthlyProductStats = {
  __typename?: 'MonthlyProductStats';
  month: Scalars['Int']['output'];
  totalProfit: Scalars['Decimal']['output'];
  totalPurchasePrice: Scalars['Decimal']['output'];
  totalRetailPrice: Scalars['Decimal']['output'];
  year: Scalars['Int']['output'];
};

export type MostSoldProduct = {
  __typename?: 'MostSoldProduct';
  brand?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  productCode?: Maybe<Scalars['String']['output']>;
  productId: Scalars['Int']['output'];
  quantitySold: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBrand: Brand;
  addCategory: Category;
  addProduct: Product;
  addProductOnSale: Array<Sales>;
  addRegister: AdminPayloadBase;
  login: AdminPayloadBase;
  placeOrder: Order;
  removeExpiredSales: Scalars['Boolean']['output'];
  removeProductFromSale: Scalars['Boolean']['output'];
  removeProductsById: Scalars['Boolean']['output'];
  update: UpdateProductPayload;
  updateAdmin: AdminPayloadBase;
};


export type MutationAddBrandArgs = {
  brandInput: AddBrandInput;
};


export type MutationAddCategoryArgs = {
  categoryInput: AddCategoryInput;
};


export type MutationAddProductArgs = {
  input: AddProductInput;
};


export type MutationAddProductOnSaleArgs = {
  input: OnSaleInput;
};


export type MutationAddRegisterArgs = {
  adminRegisterInput: AdminRegisterInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationPlaceOrderArgs = {
  input: OrderInput;
};


export type MutationRemoveProductFromSaleArgs = {
  onSaleId: Scalars['Int']['input'];
};


export type MutationRemoveProductsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateArgs = {
  input: AddProductInput;
};


export type MutationUpdateAdminArgs = {
  adminUpdateInput: AdminUpdateInput;
};

export type OnSaleInput = {
  discountPercentage: Scalars['Float']['input'];
  endDate: Scalars['DateTime']['input'];
  productIds: Array<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type Order = {
  __typename?: 'Order';
  additionalMessage?: Maybe<Scalars['String']['output']>;
  costumerName?: Maybe<Scalars['String']['output']>;
  deliveryAddress?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  orderDate: Scalars['DateTime']['output'];
  orderItems: Array<OrderItem>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Decimal']['output'];
};

export type OrderFilterInput = {
  additionalMessage?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<OrderFilterInput>>;
  costumerName?: InputMaybe<StringOperationFilterInput>;
  deliveryAddress?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<OrderFilterInput>>;
  orderDate?: InputMaybe<DateTimeOperationFilterInput>;
  orderItems?: InputMaybe<ListFilterInputTypeOfOrderItemFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  totalPrice?: InputMaybe<DecimalOperationFilterInput>;
};

export type OrderInput = {
  additionalMessage: Scalars['String']['input'];
  costumerName: Scalars['String']['input'];
  deliveryAddress: Scalars['String']['input'];
  email: Scalars['String']['input'];
  items: Array<OrderItemInput>;
  phoneNumber: Scalars['String']['input'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  code?: Maybe<Scalars['String']['output']>;
  discountedPrice?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  order?: Maybe<Order>;
  orderId: Scalars['Int']['output'];
  price: Scalars['Decimal']['output'];
  product?: Maybe<Product>;
  productId: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  totalPrice: Scalars['Decimal']['output'];
};

export type OrderItemFilterInput = {
  and?: InputMaybe<Array<OrderItemFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  discountedPrice?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<OrderItemFilterInput>>;
  order?: InputMaybe<OrderFilterInput>;
  orderId?: InputMaybe<IntOperationFilterInput>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  product?: InputMaybe<ProductFilterInput>;
  productId?: InputMaybe<IntOperationFilterInput>;
  quantity?: InputMaybe<IntOperationFilterInput>;
};

export type OrderItemInput = {
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderPriceStats = {
  __typename?: 'OrderPriceStats';
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  mostSoldProductCode?: Maybe<Scalars['String']['output']>;
  totalOrders: Scalars['Int']['output'];
  totalPurchasePrice: Scalars['Decimal']['output'];
  totalRetailPrice: Scalars['Decimal']['output'];
  year: Scalars['Int']['output'];
};

export type OrderSortInput = {
  additionalMessage?: InputMaybe<SortEnumType>;
  costumerName?: InputMaybe<SortEnumType>;
  deliveryAddress?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  orderDate?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  totalPrice?: InputMaybe<SortEnumType>;
};

export type OrderStats = {
  __typename?: 'OrderStats';
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  mostSoldProductCode?: Maybe<Scalars['String']['output']>;
  totalOrders: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Brand>;
  brandId: Scalars['Int']['output'];
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  code?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  pictureUrls: Array<Scalars['String']['output']>;
  profit?: Maybe<Scalars['Decimal']['output']>;
  purchasePrice?: Maybe<Scalars['Decimal']['output']>;
  quantity?: Maybe<Scalars['Decimal']['output']>;
  retailPrice?: Maybe<Scalars['Decimal']['output']>;
  sales: Array<Sales>;
  size?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
};

export type ProductFilterInput = {
  and?: InputMaybe<Array<ProductFilterInput>>;
  brand?: InputMaybe<BrandFilterInput>;
  brandId?: InputMaybe<IntOperationFilterInput>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<IntOperationFilterInput>;
  code?: InputMaybe<StringOperationFilterInput>;
  color?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  discountedPrice?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  pictureUrls?: InputMaybe<ListStringOperationFilterInput>;
  purchasePrice?: InputMaybe<DecimalOperationFilterInput>;
  quantity?: InputMaybe<DecimalOperationFilterInput>;
  retailPrice?: InputMaybe<DecimalOperationFilterInput>;
  sales?: InputMaybe<ListFilterInputTypeOfSalesFilterInput>;
  size?: InputMaybe<StringOperationFilterInput>;
  thumbnailUrl?: InputMaybe<StringOperationFilterInput>;
};

export type ProductSortInput = {
  brand?: InputMaybe<BrandSortInput>;
  brandId?: InputMaybe<SortEnumType>;
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  color?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  discountedPrice?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  purchasePrice?: InputMaybe<SortEnumType>;
  quantity?: InputMaybe<SortEnumType>;
  retailPrice?: InputMaybe<SortEnumType>;
  size?: InputMaybe<SortEnumType>;
  thumbnailUrl?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ProductsAsyncConnection = {
  __typename?: 'ProductsAsyncConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductsAsyncEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Product>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductsAsyncEdge = {
  __typename?: 'ProductsAsyncEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
};

export type Query = {
  __typename?: 'Query';
  administrators: Array<Administrator>;
  allOrders?: Maybe<AllOrdersConnection>;
  allSales: Array<Sales>;
  brands: Array<Brand>;
  categories: Array<Category>;
  monthlyPricesAndStatsForYear: Array<OrderPriceStats>;
  monthlyProductStatsForCurrentAndLastYear: Array<MonthlyProductStats>;
  orderById?: Maybe<Order>;
  ordersAndStatsForYear: Array<OrderStats>;
  productById: Product;
  productsAsync?: Maybe<ProductsAsyncConnection>;
  salesByProductId: Array<Sales>;
  tenMostSoldProducts: Array<MostSoldProduct>;
};


export type QueryAdministratorsArgs = {
  order?: InputMaybe<Array<AdministratorSortInput>>;
  where?: InputMaybe<AdministratorFilterInput>;
};


export type QueryAllOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OrderSortInput>>;
  where?: InputMaybe<OrderFilterInput>;
};


export type QueryBrandsArgs = {
  order?: InputMaybe<Array<BrandSortInput>>;
  where?: InputMaybe<BrandFilterInput>;
};


export type QueryCategoriesArgs = {
  where?: InputMaybe<CategoryFilterInput>;
};


export type QueryMonthlyPricesAndStatsForYearArgs = {
  year: Scalars['Int']['input'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrdersAndStatsForYearArgs = {
  year: Scalars['Int']['input'];
};


export type QueryProductByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductsAsyncArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Decimal']['input']>;
  minPrice?: InputMaybe<Scalars['Decimal']['input']>;
  order?: InputMaybe<Array<ProductSortInput>>;
  where?: InputMaybe<ProductFilterInput>;
};


export type QuerySalesByProductIdArgs = {
  productId: Scalars['Int']['input'];
};

export type Sales = {
  __typename?: 'Sales';
  /** The percentage discount applied. */
  discountPercentage: Scalars['Float']['output'];
  /** The price after applying the discount. */
  discountedPrice?: Maybe<Scalars['Decimal']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isValidSalePeriod: Scalars['Boolean']['output'];
  product?: Maybe<Product>;
  productId: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
};

export type SalesFilterInput = {
  and?: InputMaybe<Array<SalesFilterInput>>;
  discountPercentage?: InputMaybe<FloatOperationFilterInput>;
  discountedPrice?: InputMaybe<DecimalOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<SalesFilterInput>>;
  product?: InputMaybe<ProductFilterInput>;
  productId?: InputMaybe<IntOperationFilterInput>;
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductPayload = {
  __typename?: 'UpdateProductPayload';
  products: Product;
};

export type UserError = {
  __typename?: 'UserError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type GetProductsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  brandId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Decimal']['input']>;
  maxPrice?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', productsAsync?: { __typename?: 'ProductsAsyncConnection', nodes?: Array<{ __typename?: 'Product', id: number, code?: string | null, description?: string | null, size?: string | null, color?: string | null, quantity?: any | null, purchasePrice?: any | null, retailPrice?: any | null, profit?: any | null, pictureUrls: Array<string>, brandId: number, categoryId: number, thumbnailUrl?: string | null, sales: Array<{ __typename?: 'Sales', discountedPrice?: any | null, discountPercentage: number, endDate: any, id: number, isValidSalePeriod: boolean, productId: number, startDate: any }> }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } | null };

export type GetAllOrdersQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllOrdersQuery = { __typename?: 'Query', allOrders?: { __typename?: 'AllOrdersConnection', nodes?: Array<{ __typename?: 'Order', additionalMessage?: string | null, costumerName?: string | null, deliveryAddress?: string | null, email?: string | null, id: number, orderDate: any, phoneNumber?: string | null, totalPrice: any, orderItems: Array<{ __typename?: 'OrderItem', code?: string | null, id: number, orderId: number, price: any, productId: number, quantity: number }> }> | null, edges?: Array<{ __typename?: 'AllOrdersEdge', cursor: string }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } | null };

export type AddOnSaleProductsMutationVariables = Exact<{
  discountPercentage: Scalars['Float']['input'];
  productIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;


export type AddOnSaleProductsMutation = { __typename?: 'Mutation', addProductOnSale: Array<{ __typename?: 'Sales', discountedPrice?: any | null, discountPercentage: number, endDate: any, id: number, isValidSalePeriod: boolean, startDate: any }> };

export type SearchByCostumerNameQueryVariables = Exact<{
  customerNameSearch?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchByCostumerNameQuery = { __typename?: 'Query', allOrders?: { __typename?: 'AllOrdersConnection', edges?: Array<{ __typename?: 'AllOrdersEdge', cursor: string }> | null, nodes?: Array<{ __typename?: 'Order', additionalMessage?: string | null, costumerName?: string | null, deliveryAddress?: string | null, email?: string | null, id: number, orderDate: any, phoneNumber?: string | null, totalPrice: any }> | null } | null };

export type GetSalesForYearQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetSalesForYearQuery = { __typename?: 'Query', monthlyPricesAndStatsForYear: Array<{ __typename?: 'OrderPriceStats', month: number, monthName: string, mostSoldProductCode?: string | null, totalOrders: number, totalPurchasePrice: any, totalRetailPrice: any, year: number }> };

export type GetOrdersAndStatsForYearQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetOrdersAndStatsForYearQuery = { __typename?: 'Query', ordersAndStatsForYear: Array<{ __typename?: 'OrderStats', month: number, monthName: string, mostSoldProductCode?: string | null, totalOrders: number, year: number }> };

export type TenMostSoldProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type TenMostSoldProductsQuery = { __typename?: 'Query', tenMostSoldProducts: Array<{ __typename?: 'MostSoldProduct', productId: number, brand?: string | null, category?: string | null, productCode?: string | null, quantitySold: number }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name?: string | null }> };

export type GetBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBrandsQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'Brand', id: number, name?: string | null }> };

export type SearchProductsQueryVariables = Exact<{
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchProductsQuery = { __typename?: 'Query', productsAsync?: { __typename?: 'ProductsAsyncConnection', edges?: Array<{ __typename?: 'ProductsAsyncEdge', node: { __typename?: 'Product', code?: string | null, size?: string | null, color?: string | null, quantity?: any | null, retailPrice?: any | null, purchasePrice?: any | null, profit?: any | null } }> | null } | null };

export type AddProductssMutationVariables = Exact<{
  code: Scalars['String']['input'];
  size: Scalars['String']['input'];
  description: Scalars['String']['input'];
  quantity: Scalars['Decimal']['input'];
  color: Scalars['String']['input'];
  retailPrice: Scalars['Decimal']['input'];
  purchasePrice: Scalars['Decimal']['input'];
  brandId: Scalars['Int']['input'];
  categoryId: Scalars['Int']['input'];
  image: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type AddProductssMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'Product', id: number, code?: string | null, size?: string | null, color?: string | null, description?: string | null, quantity?: any | null, purchasePrice?: any | null, retailPrice?: any | null, brandId: number, categoryId: number, pictureUrls: Array<string> } };

export type PlaceOrderMutationVariables = Exact<{
  input: OrderInput;
}>;


export type PlaceOrderMutation = { __typename?: 'Mutation', placeOrder: { __typename?: 'Order', id: number, deliveryAddress?: string | null, costumerName?: string | null, email?: string | null, phoneNumber?: string | null, additionalMessage?: string | null, orderDate: any, totalPrice: any, orderItems: Array<{ __typename?: 'OrderItem', productId: number, quantity: number, price: any }> } };

export type AddBrandAsyncMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddBrandAsyncMutation = { __typename?: 'Mutation', addBrand: { __typename?: 'Brand', id: number, name?: string | null } };

export type AddCategoryAsyncMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddCategoryAsyncMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: number, name?: string | null } };

export type EditProductMutationVariables = Exact<{
  quantity: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EditProductMutation = { __typename?: 'Mutation', update: { __typename?: 'UpdateProductPayload', products: { __typename?: 'Product', id: number, code?: string | null, size?: string | null, color?: string | null, description?: string | null, quantity?: any | null, purchasePrice?: any | null, retailPrice?: any | null, brandId: number, categoryId: number, pictureUrls: Array<string> } } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', removeProductsById: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AdminPayloadBase', administrator?: { __typename?: 'Administrator', id: number, password?: string | null, salt?: string | null, token?: string | null, username?: string | null } | null } };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', productById: { __typename?: 'Product', brandId: number, categoryId: number, code?: string | null, color?: string | null, description?: string | null, id: number, pictureUrls: Array<string>, profit?: any | null, purchasePrice?: any | null, quantity?: any | null, retailPrice?: any | null, size?: string | null, thumbnailUrl?: string | null, sales: Array<{ __typename?: 'Sales', discountedPrice?: any | null, discountPercentage: number, endDate: any, id: number, isValidSalePeriod: boolean, productId: number, startDate: any }> } };

export const GetProductsDocument = gql`
    query getProducts($cursor: String, $last: Int, $first: Int, $brandId: Int, $categoryId: Int, $minPrice: Decimal, $maxPrice: Decimal) {
  productsAsync(
    last: $last
    first: $first
    after: $cursor
    order: {id: DESC}
    brandId: $brandId
    categoryId: $categoryId
    minPrice: $minPrice
    maxPrice: $maxPrice
  ) {
    nodes {
      id
      code
      description
      size
      color
      quantity
      purchasePrice
      retailPrice
      profit
      pictureUrls
      brandId
      categoryId
      thumbnailUrl
      sales {
        discountedPrice
        discountPercentage
        endDate
        id
        isValidSalePeriod
        productId
        startDate
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductsGQL extends Apollo.Query<GetProductsQuery, GetProductsQueryVariables> {
    document = GetProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllOrdersDocument = gql`
    query getAllOrders($before: String, $after: String) {
  allOrders(before: $before, after: $after, order: {id: DESC}) {
    nodes {
      additionalMessage
      costumerName
      deliveryAddress
      email
      id
      orderDate
      phoneNumber
      totalPrice
      orderItems {
        code
        id
        orderId
        price
        productId
        quantity
      }
    }
    edges {
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllOrdersGQL extends Apollo.Query<GetAllOrdersQuery, GetAllOrdersQueryVariables> {
    document = GetAllOrdersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddOnSaleProductsDocument = gql`
    mutation AddOnSaleProducts($discountPercentage: Float!, $productIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {
  addProductOnSale(
    input: {discountPercentage: $discountPercentage, productIds: $productIds, startDate: $startDate, endDate: $endDate}
  ) {
    discountedPrice
    discountPercentage
    endDate
    id
    isValidSalePeriod
    startDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddOnSaleProductsGQL extends Apollo.Mutation<AddOnSaleProductsMutation, AddOnSaleProductsMutationVariables> {
    document = AddOnSaleProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SearchByCostumerNameDocument = gql`
    query searchByCostumerName($customerNameSearch: String) {
  allOrders(where: {costumerName: {startsWith: $customerNameSearch}}) {
    edges {
      cursor
    }
    nodes {
      additionalMessage
      costumerName
      deliveryAddress
      email
      id
      orderDate
      phoneNumber
      totalPrice
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchByCostumerNameGQL extends Apollo.Query<SearchByCostumerNameQuery, SearchByCostumerNameQueryVariables> {
    document = SearchByCostumerNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetSalesForYearDocument = gql`
    query getSalesForYear($year: Int!) {
  monthlyPricesAndStatsForYear(year: $year) {
    month
    monthName
    mostSoldProductCode
    totalOrders
    totalPurchasePrice
    totalRetailPrice
    year
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSalesForYearGQL extends Apollo.Query<GetSalesForYearQuery, GetSalesForYearQueryVariables> {
    document = GetSalesForYearDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetOrdersAndStatsForYearDocument = gql`
    query getOrdersAndStatsForYear($year: Int!) {
  ordersAndStatsForYear(year: $year) {
    month
    monthName
    mostSoldProductCode
    totalOrders
    year
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrdersAndStatsForYearGQL extends Apollo.Query<GetOrdersAndStatsForYearQuery, GetOrdersAndStatsForYearQueryVariables> {
    document = GetOrdersAndStatsForYearDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TenMostSoldProductsDocument = gql`
    query tenMostSoldProducts {
  tenMostSoldProducts {
    productId
    brand
    category
    productCode
    quantitySold
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TenMostSoldProductsGQL extends Apollo.Query<TenMostSoldProductsQuery, TenMostSoldProductsQueryVariables> {
    document = TenMostSoldProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoriesGQL extends Apollo.Query<GetCategoriesQuery, GetCategoriesQueryVariables> {
    document = GetCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetBrandsDocument = gql`
    query getBrands {
  brands {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBrandsGQL extends Apollo.Query<GetBrandsQuery, GetBrandsQueryVariables> {
    document = GetBrandsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SearchProductsDocument = gql`
    query searchProducts($code: String) {
  productsAsync(where: {code: {eq: $code}}) {
    edges {
      node {
        code
        size
        color
        quantity
        retailPrice
        purchasePrice
        profit
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchProductsGQL extends Apollo.Query<SearchProductsQuery, SearchProductsQueryVariables> {
    document = SearchProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddProductssDocument = gql`
    mutation addProductss($code: String!, $size: String!, $description: String!, $quantity: Decimal!, $color: String!, $retailPrice: Decimal!, $purchasePrice: Decimal!, $brandId: Int!, $categoryId: Int!, $image: [Upload!]!) {
  addProduct(
    input: {code: $code, size: $size, color: $color, description: $description, quantity: $quantity, retailPrice: $retailPrice, purchasePrice: $purchasePrice, categoryId: $categoryId, brandId: $brandId, image: $image}
  ) {
    id
    code
    size
    color
    description
    quantity
    purchasePrice
    retailPrice
    brandId
    categoryId
    pictureUrls
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddProductssGQL extends Apollo.Mutation<AddProductssMutation, AddProductssMutationVariables> {
    document = AddProductssDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PlaceOrderDocument = gql`
    mutation PlaceOrder($input: OrderInput!) {
  placeOrder(input: $input) {
    id
    deliveryAddress
    costumerName
    email
    phoneNumber
    additionalMessage
    orderDate
    totalPrice
    orderItems {
      productId
      quantity
      price
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PlaceOrderGQL extends Apollo.Mutation<PlaceOrderMutation, PlaceOrderMutationVariables> {
    document = PlaceOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddBrandAsyncDocument = gql`
    mutation AddBrandAsync($name: String!) {
  addBrand(brandInput: {name: $name}) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddBrandAsyncGQL extends Apollo.Mutation<AddBrandAsyncMutation, AddBrandAsyncMutationVariables> {
    document = AddBrandAsyncDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddCategoryAsyncDocument = gql`
    mutation AddCategoryAsync($name: String!) {
  addCategory(categoryInput: {name: $name}) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddCategoryAsyncGQL extends Apollo.Mutation<AddCategoryAsyncMutation, AddCategoryAsyncMutationVariables> {
    document = AddCategoryAsyncDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditProductDocument = gql`
    mutation editProduct($quantity: Decimal!, $id: Int) {
  update(input: {quantity: $quantity, id: $id}) {
    products {
      id
      code
      size
      color
      description
      quantity
      purchasePrice
      retailPrice
      brandId
      categoryId
      pictureUrls
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditProductGQL extends Apollo.Mutation<EditProductMutation, EditProductMutationVariables> {
    document = EditProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteProductDocument = gql`
    mutation deleteProduct($id: Int!) {
  removeProductsById(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProductGQL extends Apollo.Mutation<DeleteProductMutation, DeleteProductMutationVariables> {
    document = DeleteProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(loginInput: {username: $username, password: $password}) {
    administrator {
      id
      password
      salt
      token
      username
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProductByIdDocument = gql`
    query GetProductById($id: Int!) {
  productById(id: $id) {
    brandId
    categoryId
    code
    color
    description
    id
    pictureUrls
    profit
    purchasePrice
    quantity
    retailPrice
    size
    thumbnailUrl
    sales {
      discountedPrice
      discountPercentage
      endDate
      id
      isValidSalePeriod
      productId
      startDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductByIdGQL extends Apollo.Query<GetProductByIdQuery, GetProductByIdQueryVariables> {
    document = GetProductByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }