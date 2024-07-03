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
  image?: InputMaybe<Scalars['Upload']['input']>;
  purchasePrice?: InputMaybe<Scalars['Decimal']['input']>;
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  retailPrice?: InputMaybe<Scalars['Decimal']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
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

export type Administrator = {
  __typename?: 'Administrator';
  id: Scalars['Int']['output'];
  password?: Maybe<Scalars['String']['output']>;
  salt: Scalars['String']['output'];
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

export type ListFilterInputTypeOfProductFilterInput = {
  all?: InputMaybe<ProductFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductFilterInput>;
  some?: InputMaybe<ProductFilterInput>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBrand: Brand;
  addCategory: Category;
  addProduct: Product;
  addRegister: AdminPayloadBase;
  login: AdminPayloadBase;
  removeProductsById: Scalars['Boolean']['output'];
  update: UpdateProductPayload;
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


export type MutationAddRegisterArgs = {
  adminRegisterInput: AdminRegisterInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveProductsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateArgs = {
  input: AddProductInput;
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
  id: Scalars['Int']['output'];
  pictureUrl?: Maybe<Scalars['String']['output']>;
  profit?: Maybe<Scalars['Decimal']['output']>;
  purchasePrice?: Maybe<Scalars['Decimal']['output']>;
  quantity?: Maybe<Scalars['Decimal']['output']>;
  retailPrice?: Maybe<Scalars['Decimal']['output']>;
  size?: Maybe<Scalars['String']['output']>;
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
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  pictureUrl?: InputMaybe<StringOperationFilterInput>;
  purchasePrice?: InputMaybe<DecimalOperationFilterInput>;
  quantity?: InputMaybe<DecimalOperationFilterInput>;
  retailPrice?: InputMaybe<DecimalOperationFilterInput>;
  size?: InputMaybe<StringOperationFilterInput>;
};

export type ProductSortInput = {
  brand?: InputMaybe<BrandSortInput>;
  brandId?: InputMaybe<SortEnumType>;
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  color?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  pictureUrl?: InputMaybe<SortEnumType>;
  purchasePrice?: InputMaybe<SortEnumType>;
  quantity?: InputMaybe<SortEnumType>;
  retailPrice?: InputMaybe<SortEnumType>;
  size?: InputMaybe<SortEnumType>;
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
  brands: Array<Brand>;
  categories: Array<Category>;
  productById: Product;
  productsAsync?: Maybe<ProductsAsyncConnection>;
};


export type QueryAdministratorsArgs = {
  order?: InputMaybe<Array<AdministratorSortInput>>;
  where?: InputMaybe<AdministratorFilterInput>;
};


export type QueryBrandsArgs = {
  order?: InputMaybe<Array<BrandSortInput>>;
  where?: InputMaybe<BrandFilterInput>;
};


export type QueryCategoriesArgs = {
  where?: InputMaybe<CategoryFilterInput>;
};


export type QueryProductByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductsAsyncArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ProductSortInput>>;
  where?: InputMaybe<ProductFilterInput>;
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
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', productsAsync?: { __typename?: 'ProductsAsyncConnection', nodes?: Array<{ __typename?: 'Product', brandId: number, categoryId: number, purchasePrice?: any | null, retailPrice?: any | null, profit?: any | null, description?: string | null, id: number, code?: string | null, size?: string | null, color?: string | null, pictureUrl?: string | null, quantity?: any | null }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } | null };

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
  image: Scalars['Upload']['input'];
}>;


export type AddProductssMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'Product', id: number, code?: string | null, size?: string | null, color?: string | null, description?: string | null, quantity?: any | null, purchasePrice?: any | null, retailPrice?: any | null, brandId: number, categoryId: number, pictureUrl?: string | null } };

export type AddBrandAsyncMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddBrandAsyncMutation = { __typename?: 'Mutation', addBrand: { __typename?: 'Brand', id: number, name?: string | null } };

export type AddCategoryAsyncMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddCategoryAsyncMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: number, name?: string | null } };

export type EditProductMutationVariables = Exact<{
  code: Scalars['String']['input'];
  size: Scalars['String']['input'];
  quantity: Scalars['Decimal']['input'];
  description: Scalars['String']['input'];
  color: Scalars['String']['input'];
  retailPrice: Scalars['Decimal']['input'];
  purchasePrice: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  brandId: Scalars['Int']['input'];
  categoryId: Scalars['Int']['input'];
}>;


export type EditProductMutation = { __typename?: 'Mutation', update: { __typename?: 'UpdateProductPayload', products: { __typename?: 'Product', id: number, code?: string | null, size?: string | null, color?: string | null, description?: string | null, quantity?: any | null, purchasePrice?: any | null, retailPrice?: any | null, brandId: number, categoryId: number } } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', removeProductsById: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AdminPayloadBase', administrator?: { __typename?: 'Administrator', id: number, password?: string | null, salt: string, token?: string | null, username?: string | null } | null } };

export const GetProductsDocument = gql`
    query getProducts($cursor: String, $first: Int) {
  productsAsync(first: $first, after: $cursor, order: {id: DESC}) {
    nodes {
      brandId
      categoryId
      purchasePrice
      retailPrice
      profit
      description
      id
      code
      size
      color
      pictureUrl
      quantity
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
    mutation addProductss($code: String!, $size: String!, $description: String!, $quantity: Decimal!, $color: String!, $retailPrice: Decimal!, $purchasePrice: Decimal!, $brandId: Int!, $categoryId: Int!, $image: Upload!) {
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
    pictureUrl
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
    mutation editProduct($code: String!, $size: String!, $quantity: Decimal!, $description: String!, $color: String!, $retailPrice: Decimal!, $purchasePrice: Decimal!, $id: Int, $brandId: Int!, $categoryId: Int!) {
  update(
    input: {code: $code, size: $size, color: $color, description: $description, quantity: $quantity, retailPrice: $retailPrice, purchasePrice: $purchasePrice, id: $id, categoryId: $categoryId, brandId: $brandId}
  ) {
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