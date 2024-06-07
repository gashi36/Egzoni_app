import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any };
};

export type AddProductInput = {
  cmimiIBlerjes?: InputMaybe<Scalars['Decimal']['input']>;
  cmimiIShitjes?: InputMaybe<Scalars['Decimal']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  kodi?: InputMaybe<Scalars['String']['input']>;
  masa?: InputMaybe<Scalars['String']['input']>;
  ngjyra?: InputMaybe<Scalars['String']['input']>;
  sasia?: InputMaybe<Scalars['Decimal']['input']>;
  tipi?: InputMaybe<Scalars['String']['input']>;
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

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION',
}

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

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct: Product;
  addRegister: AdminPayloadBase;
  login: AdminPayloadBase;
  removeProductsById: Scalars['Boolean']['output'];
  update: UpdateProductPayload;
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
  cmimiIBlerjes?: Maybe<Scalars['Decimal']['output']>;
  cmimiIShitjes?: Maybe<Scalars['Decimal']['output']>;
  fitimi?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  kodi?: Maybe<Scalars['String']['output']>;
  masa?: Maybe<Scalars['String']['output']>;
  ngjyra?: Maybe<Scalars['String']['output']>;
  sasia?: Maybe<Scalars['Decimal']['output']>;
  tipi?: Maybe<Scalars['String']['output']>;
};

export type ProductFilterInput = {
  and?: InputMaybe<Array<ProductFilterInput>>;
  cmimiIBlerjes?: InputMaybe<DecimalOperationFilterInput>;
  cmimiIShitjes?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  kodi?: InputMaybe<StringOperationFilterInput>;
  masa?: InputMaybe<StringOperationFilterInput>;
  ngjyra?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  sasia?: InputMaybe<DecimalOperationFilterInput>;
  tipi?: InputMaybe<StringOperationFilterInput>;
};

export type ProductSortInput = {
  cmimiIBlerjes?: InputMaybe<SortEnumType>;
  cmimiIShitjes?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  kodi?: InputMaybe<SortEnumType>;
  masa?: InputMaybe<SortEnumType>;
  ngjyra?: InputMaybe<SortEnumType>;
  sasia?: InputMaybe<SortEnumType>;
  tipi?: InputMaybe<SortEnumType>;
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
  productById: Product;
  productsAsync?: Maybe<ProductsAsyncConnection>;
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
  Desc = 'DESC',
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

export type GetProductsQuery = {
  __typename?: 'Query';
  productsAsync?: {
    __typename?: 'ProductsAsyncConnection';
    nodes?: Array<{
      __typename?: 'Product';
      cmimiIBlerjes?: any | null;
      cmimiIShitjes?: any | null;
      fitimi?: any | null;
      id: number;
      kodi?: string | null;
      masa?: string | null;
      ngjyra?: string | null;
      sasia?: any | null;
      tipi?: string | null;
    }> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
    };
  } | null;
};

export type SearchProductsQueryVariables = Exact<{
  kodi?: InputMaybe<Scalars['String']['input']>;
}>;

export type SearchProductsQuery = {
  __typename?: 'Query';
  productsAsync?: {
    __typename?: 'ProductsAsyncConnection';
    edges?: Array<{
      __typename?: 'ProductsAsyncEdge';
      node: {
        __typename?: 'Product';
        kodi?: string | null;
        masa?: string | null;
        ngjyra?: string | null;
        sasia?: any | null;
        tipi?: string | null;
        cmimiIShitjes?: any | null;
        cmimiIBlerjes?: any | null;
        fitimi?: any | null;
      };
    }> | null;
  } | null;
};

export type AddProductssMutationVariables = Exact<{
  kodi: Scalars['String']['input'];
  masa: Scalars['String']['input'];
  sasia: Scalars['Decimal']['input'];
  tipi: Scalars['String']['input'];
  ngjyra: Scalars['String']['input'];
  cmimiIShitjes: Scalars['Decimal']['input'];
  cmimiIBlerjes: Scalars['Decimal']['input'];
}>;

export type AddProductssMutation = {
  __typename?: 'Mutation';
  addProduct: {
    __typename?: 'Product';
    id: number;
    kodi?: string | null;
    masa?: string | null;
    ngjyra?: string | null;
    sasia?: any | null;
    tipi?: string | null;
    cmimiIBlerjes?: any | null;
    cmimiIShitjes?: any | null;
  };
};

export type EditProductMutationVariables = Exact<{
  kodi: Scalars['String']['input'];
  masa: Scalars['String']['input'];
  sasia: Scalars['Decimal']['input'];
  tipi: Scalars['String']['input'];
  ngjyra: Scalars['String']['input'];
  cmimiIShitjes: Scalars['Decimal']['input'];
  cmimiIBlerjes: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
}>;

export type EditProductMutation = {
  __typename?: 'Mutation';
  update: {
    __typename?: 'UpdateProductPayload';
    products: {
      __typename?: 'Product';
      id: number;
      kodi?: string | null;
      masa?: string | null;
      ngjyra?: string | null;
      sasia?: any | null;
      tipi?: string | null;
      cmimiIBlerjes?: any | null;
      cmimiIShitjes?: any | null;
    };
  };
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  removeProductsById: boolean;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AdminPayloadBase';
    administrator?: {
      __typename?: 'Administrator';
      id: number;
      password?: string | null;
      salt: string;
      token?: string | null;
      username?: string | null;
    } | null;
  };
};

export const GetProductsDocument = gql`
  query getProducts($cursor: String, $first: Int) {
    productsAsync(first: $first, after: $cursor, order: { id: DESC }) {
      nodes {
        cmimiIBlerjes
        cmimiIShitjes
        fitimi
        id
        kodi
        masa
        ngjyra
        sasia
        tipi
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
  providedIn: 'root',
})
export class GetProductsGQL extends Apollo.Query<
  GetProductsQuery,
  GetProductsQueryVariables
> {
  document = GetProductsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const SearchProductsDocument = gql`
  query searchProducts($kodi: String) {
    productsAsync(where: { kodi: { eq: $kodi } }) {
      edges {
        node {
          kodi
          masa
          ngjyra
          sasia
          tipi
          cmimiIShitjes
          cmimiIBlerjes
          fitimi
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class SearchProductsGQL extends Apollo.Query<
  SearchProductsQuery,
  SearchProductsQueryVariables
> {
  document = SearchProductsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AddProductssDocument = gql`
  mutation addProductss(
    $kodi: String!
    $masa: String!
    $sasia: Decimal!
    $tipi: String!
    $ngjyra: String!
    $cmimiIShitjes: Decimal!
    $cmimiIBlerjes: Decimal!
  ) {
    addProduct(
      input: {
        kodi: $kodi
        masa: $masa
        ngjyra: $ngjyra
        sasia: $sasia
        tipi: $tipi
        cmimiIShitjes: $cmimiIShitjes
        cmimiIBlerjes: $cmimiIBlerjes
      }
    ) {
      id
      kodi
      masa
      ngjyra
      sasia
      tipi
      cmimiIBlerjes
      cmimiIShitjes
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AddProductssGQL extends Apollo.Mutation<
  AddProductssMutation,
  AddProductssMutationVariables
> {
  document = AddProductssDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const EditProductDocument = gql`
  mutation editProduct(
    $kodi: String!
    $masa: String!
    $sasia: Decimal!
    $tipi: String!
    $ngjyra: String!
    $cmimiIShitjes: Decimal!
    $cmimiIBlerjes: Decimal!
    $id: Int
  ) {
    update(
      input: {
        kodi: $kodi
        masa: $masa
        ngjyra: $ngjyra
        sasia: $sasia
        tipi: $tipi
        cmimiIShitjes: $cmimiIShitjes
        cmimiIBlerjes: $cmimiIBlerjes
        id: $id
      }
    ) {
      products {
        id
        kodi
        masa
        ngjyra
        sasia
        tipi
        cmimiIBlerjes
        cmimiIShitjes
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EditProductGQL extends Apollo.Mutation<
  EditProductMutation,
  EditProductMutationVariables
> {
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
  providedIn: 'root',
})
export class DeleteProductGQL extends Apollo.Mutation<
  DeleteProductMutation,
  DeleteProductMutationVariables
> {
  document = DeleteProductDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
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
  providedIn: 'root',
})
export class LoginGQL extends Apollo.Mutation<
  LoginMutation,
  LoginMutationVariables
> {
  document = LoginDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
