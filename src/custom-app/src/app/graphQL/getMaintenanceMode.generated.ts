import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

export type GetMaintenanceModeQueryVariablesDto = Exact<{ [key: string]: never; }>;

export type GetMaintenanceModeQueryDto = { __typename?: 'OctoQuery', runtime?: { __typename?: 'RuntimeModelQuery', systemTenantModeConfiguration?: { __typename?: 'SystemTenantModeConfigurationConnection', edges?: Array<{ __typename?: 'SystemTenantModeConfigurationEdge', node?: { __typename?: 'SystemTenantModeConfiguration', rtId: string, maintenanceLevel: string, environmentMode: string } | null } | null> | null } | null } | null };

export const GetMaintenanceModeDocumentDto = gql`
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
  export class GetMaintenanceModeDtoGQL extends Apollo.Query<GetMaintenanceModeQueryDto, GetMaintenanceModeQueryVariablesDto> {
    document = GetMaintenanceModeDocumentDto;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
