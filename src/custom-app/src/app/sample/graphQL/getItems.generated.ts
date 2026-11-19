import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

export type GetItemsQueryVariablesDto = Exact<{
  first: number;
}>;

export type GetItemsQueryDto = { __typename?: 'OctoQuery', runtime?: { __typename?: 'RuntimeModelQuery', customAppItem?: { __typename?: 'CustomAppItemConnection', totalCount?: number | null, items?: Array<{ __typename?: 'CustomAppItem', rtId: string, name: string, code: string, quantity?: number | null, status: string } | null> | null } | null } | null };

export const GetItemsDocumentDto = gql`
    query GetItems($first: Int!) {
  runtime {
    customAppItem(first: $first) {
      totalCount
      items {
        rtId
        name
        code
        quantity
        status
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetItemsDtoGQL extends Apollo.Query<GetItemsQueryDto, GetItemsQueryVariablesDto> {
    document = GetItemsDocumentDto;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
