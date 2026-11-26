import type * as Types from './globalTypes';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type GetMaintenanceModeQueryVariablesDto = Exact<{ [key: string]: never; }>;


export type GetMaintenanceModeQueryDto = { runtime: { __typename: 'RuntimeModelQuery', systemTenantModeConfiguration: { __typename: 'SystemTenantModeConfigurationConnection', edges: Array<{ __typename: 'SystemTenantModeConfigurationEdge', node: { __typename: 'SystemTenantModeConfiguration', rtId: string, maintenanceLevel: Types.SystemMaintenanceLevelsDto, environmentMode: Types.SystemEnvironmentModesDto } | null } | null> | null } | null } | null };

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