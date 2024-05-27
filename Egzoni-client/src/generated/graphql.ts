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

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
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

export type Mutation = {
  __typename?: 'Mutation';
  addProduct: Product;
  removeProductsById: Scalars['Boolean']['output'];
  update: UpdateProductPayload;
};


export type MutationAddProductArgs = {
  input: AddProductInput;
};


export type MutationRemoveProductsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateArgs = {
  input: AddProductInput;
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

export type Query = {
  __typename?: 'Query';
  productsAsync: Array<Product>;
  productsById: Product;
};


export type QueryProductsAsyncArgs = {
  where?: InputMaybe<ProductFilterInput>;
};


export type QueryProductsByIdArgs = {
  id: Scalars['ID']['input'];
};

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

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', productsAsync: Array<{ __typename?: 'Product', id: number, kodi?: string | null, masa?: string | null, ngjyra?: string | null, sasia?: any | null, tipi?: string | null, cmimiIShitjes?: any | null, cmimiIBlerjes?: any | null, fitimi?: any | null }> };

export type SearchProductsQueryVariables = Exact<{
  kodi: Scalars['String']['input'];
}>;


export type SearchProductsQuery = { __typename?: 'Query', productsAsync: Array<{ __typename?: 'Product', kodi?: string | null, masa?: string | null, ngjyra?: string | null, sasia?: any | null, tipi?: string | null, cmimiIShitjes?: any | null, cmimiIBlerjes?: any | null, fitimi?: any | null }> };

export type AddProductssMutationVariables = Exact<{
  kodi: Scalars['String']['input'];
  masa: Scalars['String']['input'];
  sasia: Scalars['Decimal']['input'];
  tipi: Scalars['String']['input'];
  ngjyra: Scalars['String']['input'];
  cmimiIShitjes: Scalars['Decimal']['input'];
  cmimiIBlerjes: Scalars['Decimal']['input'];
}>;


export type AddProductssMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'Product', id: number, kodi?: string | null, masa?: string | null, ngjyra?: string | null, sasia?: any | null, tipi?: string | null, cmimiIBlerjes?: any | null, cmimiIShitjes?: any | null } };

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


export type EditProductMutation = { __typename?: 'Mutation', update: { __typename?: 'UpdateProductPayload', products: { __typename?: 'Product', id: number, kodi?: string | null, masa?: string | null, ngjyra?: string | null, sasia?: any | null, tipi?: string | null, cmimiIBlerjes?: any | null, cmimiIShitjes?: any | null } } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', removeProductsById: boolean };

export const GetProductsDocument = gql`
    query getProducts {
  productsAsync {
    id
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
export const SearchProductsDocument = gql`
    query searchProducts($kodi: String!) {
  productsAsync(where: {kodi: {eq: $kodi}}) {
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
    mutation addProductss($kodi: String!, $masa: String!, $sasia: Decimal!, $tipi: String!, $ngjyra: String!, $cmimiIShitjes: Decimal!, $cmimiIBlerjes: Decimal!) {
  addProduct(
    input: {kodi: $kodi, masa: $masa, ngjyra: $ngjyra, sasia: $sasia, tipi: $tipi, cmimiIShitjes: $cmimiIShitjes, cmimiIBlerjes: $cmimiIBlerjes}
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
    providedIn: 'root'
  })
  export class AddProductssGQL extends Apollo.Mutation<AddProductssMutation, AddProductssMutationVariables> {
    document = AddProductssDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditProductDocument = gql`
    mutation editProduct($kodi: String!, $masa: String!, $sasia: Decimal!, $tipi: String!, $ngjyra: String!, $cmimiIShitjes: Decimal!, $cmimiIBlerjes: Decimal!, $id: Int) {
  update(
    input: {kodi: $kodi, masa: $masa, ngjyra: $ngjyra, sasia: $sasia, tipi: $tipi, cmimiIShitjes: $cmimiIShitjes, cmimiIBlerjes: $cmimiIBlerjes, id: $id}
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