import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

export type GetMaintenanceModeQueryVariables = Exact<{ [key: string]: never; }>;

export type GetMaintenanceModeQuery = { __typename?: 'OctoQuery', runtime?: { __typename?: 'RuntimeModelQuery', systemTenantModeConfiguration?: { __typename?: 'SystemTenantModeConfigurationConnection', edges?: Array<{ __typename?: 'SystemTenantModeConfigurationEdge', node?: { __typename?: 'SystemTenantModeConfiguration', rtId: string, maintenanceLevel: string, environmentMode: string } | null } | null> | null } | null } | null };

export const GetMaintenanceModeDocument = gql`
    query GetMaintenanceMode {
  runtime {
    systemTenantModeConfiguration(first: 1) {
      edges {
        node {
          rtId
          maintenanceLevel
          environmentMode
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMaintenanceModeGQL extends Apollo.Query<GetMaintenanceModeQuery, GetMaintenanceModeQueryVariables> {
    document = GetMaintenanceModeDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
