export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  Byte: { input: any; output: any; }
  CkVersion: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeOffset: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  LargeBinary: { input: any; output: any; }
  Long: { input: any; output: any; }
  OctoObjectId: { input: string; output: string; }
  RtCkAssociationRoleId: { input: string; output: string; }
  RtCkEnumId: { input: string; output: string; }
  RtCkRecordId: { input: string; output: string; }
  RtCkTypeId: { input: string; output: string; }
  Seconds: { input: any; output: any; }
  SimpleScalar: { input: any; output: any; }
  ULong: { input: any; output: any; }
  Uri: { input: any; output: any; }
};

export type AggregationInputTypesDto =
  | 'AVERAGE'
  | 'COUNT'
  | 'MAXIMUM'
  | 'MINIMUM'
  | 'SUM';

export type AggregationTypeDto =
  | 'AVG'
  | 'COUNT'
  | 'MAX'
  | 'MIN'
  | 'STATE_DURATION'
  | 'SUM'
  | 'TIME_WEIGHTED_AVG';

export type AggregationTypesDto =
  | 'AVERAGE'
  | 'COUNT'
  | 'MAXIMUM'
  | 'MINIMUM'
  | 'NONE'
  | 'STATE_DURATION'
  | 'SUM'
  | 'TIME_WEIGHTED_AVERAGE';

export type ArchiveColumnSpecInputDto = {
  indexed: Scalars['Boolean']['input'];
  path: Scalars['String']['input'];
  required: Scalars['Boolean']['input'];
};

export type ArchiveStorageHealthDto =
  | 'CRITICAL'
  | 'GOOD'
  | 'UNKNOWN'
  | 'WARNING';

export type AssociationModOptionsDto =
  | 'CREATE'
  | 'DELETE';

export type AttributeOwnershipDto =
  | 'RUNTIME_STATE'
  | 'SECRET'
  | 'SEED_OWNED'
  | 'TENANT_OWNED';

export type AttributeValueTypeDto =
  | 'BINARY'
  | 'BINARY_LINKED'
  | 'BOOLEAN'
  | 'DATE_TIME'
  | 'DATE_TIME_OFFSET'
  | 'DOUBLE'
  | 'ENUM'
  | 'GEOSPATIAL_POINT'
  | 'INT'
  | 'INTEGER'
  | 'INTEGER_64'
  | 'INTEGER_ARRAY'
  | 'INT_64'
  | 'INT_ARRAY'
  | 'RECORD'
  | 'RECORD_ARRAY'
  | 'SECRET'
  | 'STRING'
  | 'STRING_ARRAY'
  | 'TIME_SPAN';

export type BasicAssetInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicAssetInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicAssetInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicCityInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  zipcode?: InputMaybe<Scalars['Int']['input']>;
};

export type BasicCityInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicCityInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicCountryInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicCountryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicCountryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicDistrictInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicDistrictInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicDistrictInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicEmployeeInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  employeeExternalId?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  partialFeedbacks?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  shiftMachines?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  shiftOrderItems?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicEmployeeInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicEmployeeInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicStateInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicStateInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicStateInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicTreeInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicTreeInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicTreeInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BasicTreeNodeInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type BasicTreeNodeInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: BasicTreeNodeInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type BlueprintConflictResolutionDto =
  | 'KEEP_BLUEPRINT'
  | 'KEEP_USER'
  | 'MERGE'
  | 'SKIP';

export type BlueprintConflictResolutionInputDto = {
  entityId: Scalars['String']['input'];
  resolution: BlueprintConflictResolutionDto;
};

export type BlueprintUpdateModeDto =
  | 'FULL'
  | 'MERGE'
  | 'MIGRATION'
  | 'SAFE';

export type BlueprintUpdateRequestInputDto = {
  conflictResolutions?: InputMaybe<Array<BlueprintConflictResolutionInputDto>>;
  dryRun?: InputMaybe<Scalars['Boolean']['input']>;
  targetVersion: Scalars['String']['input'];
  updateMode?: InputMaybe<BlueprintUpdateModeDto>;
};

export type BucketAlignmentDto =
  | 'CALENDAR_DAY'
  | 'CALENDAR_MONTH'
  | 'CALENDAR_QUARTER'
  | 'CALENDAR_YEAR'
  | 'FIXED_SIZE'
  | 'ISO_8601_WEEK';

export type BucketAlignmentInputDto =
  | 'CALENDAR_DAY'
  | 'CALENDAR_MONTH'
  | 'CALENDAR_QUARTER'
  | 'CALENDAR_YEAR'
  | 'FIXED_SIZE'
  | 'ISO_8601_WEEK';

export type CkEnumUpdateDto = {
  operation?: InputMaybe<CkExtensionUpdateOperationsDto>;
  value?: InputMaybe<CkEnumValueInputDto>;
};

export type CkEnumValueInputDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CkExtensionUpdateOperationsDto =
  | 'DELETE'
  | 'INSERT';

export type CkMethodOperationStateDto =
  | 'ACCEPTED'
  | 'FAILED'
  | 'RUNNING'
  | 'SUCCEEDED';

export type CkRollupFunctionDto =
  | 'AVG'
  | 'COUNT'
  | 'FIRST'
  | 'LAST'
  | 'MAX'
  | 'MIN'
  | 'STATE_DURATION'
  | 'SUM'
  | 'TIME_WEIGHTED_AVG';

export type CreateRollupArchiveInputDto = {
  aggregations: Array<RollupAggregationInputDto>;
  bucketAlignment?: InputMaybe<BucketAlignmentInputDto>;
  bucketSizeMs: Scalars['Long']['input'];
  carryLookbackMs?: InputMaybe<Scalars['Long']['input']>;
  referenceTimeZone?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sourceArchiveRtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
  sources?: InputMaybe<Array<CreateRollupSourceInputDto>>;
  watermarkLagMs: Scalars['Long']['input'];
};

export type CreateRollupSourceInputDto = {
  sourceArchiveRtId: Scalars['OctoObjectId']['input'];
  validFrom?: InputMaybe<Scalars['DateTime']['input']>;
  validTo?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTimeRangeArchiveInputDto = {
  columns: Array<ArchiveColumnSpecInputDto>;
  periodMs?: InputMaybe<Scalars['Long']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  targetCkTypeId: Scalars['String']['input'];
};

export type DeleteStrategiesDto =
  | 'ARCHIVE'
  | 'ERASE';

export type FieldFilterDto = {
  attributePath: Scalars['String']['input'];
  comparisonValue?: InputMaybe<Scalars['SimpleScalar']['input']>;
  operator: FieldFilterOperatorsDto;
  secondaryValue?: InputMaybe<Scalars['SimpleScalar']['input']>;
};

export type FieldFilterOperatorsDto =
  | 'ANY_EQ'
  | 'ANY_LIKE'
  | 'BETWEEN'
  | 'EQUALS'
  | 'GREATER_EQUAL_THAN'
  | 'GREATER_THAN'
  | 'IN'
  | 'IS_NOT_NULL'
  | 'IS_NULL'
  | 'LESS_EQUAL_THAN'
  | 'LESS_THAN'
  | 'LIKE'
  | 'MATCH_REG_EX'
  | 'NOT_EQUALS'
  | 'NOT_IN';

export type FieldGroupByAggregationInputDto = {
  avgAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  countAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  groupByAttributePaths: Array<InputMaybe<Scalars['String']['input']>>;
  maxValueAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  minValueAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  resolveEnumValuesToNames?: InputMaybe<Scalars['Boolean']['input']>;
  sumAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FormulaResultTypeDto =
  | 'BOOLEAN'
  | 'DATE_TIME'
  | 'DOUBLE'
  | 'INT'
  | 'INT_64';

export type GlobalQueryOptionsDto = {
  includeArchivedEntities?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GraphDirectionDto =
  | 'ANY'
  | 'INBOUND'
  | 'OUTBOUND';

export type MethodHandlerInstanceStateDto =
  | 'EXPIRED'
  | 'LIVE'
  | 'NO_QUEUE_BOUND'
  | 'WITHDRAWN';

export type MethodHandlerMethodStateDto =
  | 'LIVE'
  | 'NOT_ANNOUNCED'
  | 'NO_LIVE_HANDLER';

export type MethodHandlerSourceDto =
  | 'HEARTBEAT'
  | 'SNAPSHOT';

export type MethodHandlerTransportDto =
  | 'BUS'
  | 'IN_PROCESS';

export type ModelStateDto =
  | 'AVAILABLE'
  | 'IMPORTING'
  | 'RESOLVE_FAILED';

export type MultiplicitiesDto =
  | 'N'
  | 'ONE'
  | 'ZERO_OR_ONE';

export type NavigationFilterModeDto =
  | 'FILTER'
  | 'INCLUDE';

export type NearGeospatialFilterDto = {
  attributeName: Scalars['String']['input'];
  maxDistance?: InputMaybe<Scalars['Float']['input']>;
  minDistance?: InputMaybe<Scalars['Float']['input']>;
  point: PointInputDto;
};

export type PointInputDto = {
  coordinates: PositionInputDto;
};

export type PositionInputDto = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type QueryModeDto =
  | 'DEFAULT'
  | 'DOWNSAMPLING'
  | 'INTERPOLATION';

export type ResolveSeriesQueryInputDto = {
  baseArchiveRtId: Scalars['OctoObjectId']['input'];
  comparisonPolicy?: InputMaybe<SeriesComparisonPolicyDto>;
  from: Scalars['DateTime']['input'];
  requiredAggregation: CkRollupFunctionDto;
  rtIds?: InputMaybe<Array<Scalars['OctoObjectId']['input']>>;
  sourcePath: Scalars['String']['input'];
  targetPoints: Scalars['Int']['input'];
  timeZone?: InputMaybe<Scalars['String']['input']>;
  to: Scalars['DateTime']['input'];
};

export type ResultAggregationInputDto = {
  avgAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  countAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  groupBy?: InputMaybe<FieldGroupByAggregationInputDto>;
  maxValueAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  minValueAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sumAttributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type RollupAggregationInputDto = {
  comparisonValue?: InputMaybe<Scalars['String']['input']>;
  function: CkRollupFunctionDto;
  sourcePath: Scalars['String']['input'];
  targetColumnName?: InputMaybe<Scalars['String']['input']>;
};

export type RtAssociationInputDto = {
  modOption?: InputMaybe<AssociationModOptionsDto>;
  target: RtEntityIdDto;
};

export type RtEntityAssociationInputDto = {
  roleName: Scalars['String']['input'];
  targets: Array<InputMaybe<RtAssociationInputDto>>;
};

export type RtEntityAttributeInputDto = {
  attributeName?: InputMaybe<Scalars['String']['input']>;
  secretIsSet?: InputMaybe<Scalars['Boolean']['input']>;
  secretKeyMissing?: InputMaybe<Scalars['Boolean']['input']>;
  secretSetAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['SimpleScalar']['input']>;
};

export type RtEntityIdDto = {
  ckTypeId: Scalars['RtCkTypeId']['input'];
  rtId: Scalars['OctoObjectId']['input'];
};

export type RtEntityInputDto = {
  associations?: InputMaybe<Array<InputMaybe<RtEntityAssociationInputDto>>>;
  attributes: Array<InputMaybe<RtEntityAttributeInputDto>>;
  ckTypeId: Scalars['RtCkTypeId']['input'];
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
};

export type RtEntityUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item?: InputMaybe<RtEntityInputDto>;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type RtQueryCellInputDto = {
  attributePath?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['SimpleScalar']['input']>;
};

export type RtQueryColumnInputDto = {
  aggregationType: AggregationInputTypesDto;
  attributePath: Scalars['String']['input'];
};

export type RtQueryRowInputDto = {
  cells: Array<InputMaybe<RtQueryCellInputDto>>;
  ckTypeId: Scalars['RtCkTypeId']['input'];
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
};

export type RtQueryRowUpdateDto = {
  item?: InputMaybe<RtQueryRowInputDto>;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SearchFilterDto = {
  attributePaths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  searchTerm: Scalars['String']['input'];
  type?: InputMaybe<SearchFilterTypesDto>;
};

export type SearchFilterTypesDto =
  | 'ATTRIBUTE_FILTER'
  | 'TEXT_SEARCH';

export type SecretStorageFormDto =
  | 'CORRUPT'
  | 'ENC_V1'
  | 'ENC_V2'
  | 'KEY_MISSING'
  | 'NOT_SET'
  | 'PLAINTEXT';

export type SecretUsageMatchDto =
  | 'BY_TYPE'
  | 'EXACT';

export type SeriesComparisonPolicyDto =
  | 'PER_QUERY'
  | 'PER_SERIES';

export type SeriesResolutionSignalDto =
  | 'COVERAGE_LIMITED'
  | 'EMPTY_LADDER'
  | 'NO_SUITABLE_ROLLUP'
  | 'OK'
  | 'RESOLUTION_LIMITED'
  | 'UNKNOWN_BASE_GRAIN';

export type SortDto = {
  attributePath: Scalars['String']['input'];
  sortOrder?: InputMaybe<SortOrdersDto>;
};

export type SortOrdersDto =
  | 'ASCENDING'
  | 'DEFAULT'
  | 'DESCENDING';

export type StreamDataArgumentsDto = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  interval?: InputMaybe<Scalars['Seconds']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  queryMode: QueryModeDto;
  rtIds?: InputMaybe<Array<InputMaybe<Scalars['OctoObjectId']['input']>>>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type StreamDataQueryColumnInputDto = {
  aggregationType: AggregationTypeDto;
  attributePath: Scalars['String']['input'];
  comparisonValue?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAggregationQueryColumnInputDto = {
  aggregationType?: InputMaybe<SystemAggregationTypesDto>;
  attributePath?: InputMaybe<Scalars['String']['input']>;
  comparisonValue?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAggregationRtQueryInputDto = {
  attributeSearchFilter?: InputMaybe<SystemAttributeSearchFilterInputDto>;
  columns?: InputMaybe<Array<InputMaybe<SystemAggregationQueryColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  textSearchFilter?: InputMaybe<SystemTextSearchFilterInputDto>;
};

export type SystemAggregationRtQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAggregationRtQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAggregationSdQueryInputDto = {
  archiveRtId?: InputMaybe<Scalars['String']['input']>;
  columns?: InputMaybe<Array<InputMaybe<SystemAggregationQueryColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtIds?: InputMaybe<Array<Scalars['String']['input']>>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemAggregationSdQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAggregationSdQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAggregationTypesDto =
  | 'AVERAGE'
  | 'COUNT'
  | 'MAXIMUM'
  | 'MINIMUM'
  | 'STATE_DURATION'
  | 'SUM'
  | 'TIME_WEIGHTED_AVERAGE';

export type SystemAiAiAgentConfigInputDto = {
  authMode?: InputMaybe<SystemAiAuthModeDto>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultModel?: InputMaybe<SystemAiModelTierDto>;
  devBridgeEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  hibernationIdleMinutes?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  subscriptionScope?: InputMaybe<SystemAiSubscriptionScopeDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  workerImageTag?: InputMaybe<Scalars['String']['input']>;
  workspaceMode?: InputMaybe<SystemAiWorkspaceModeDto>;
};

export type SystemAiAiAgentConfigInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiAgentConfigInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiAgentJobInputDto = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  goal?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  ownedByAiResource?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<SystemAiJobStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiAgentJobInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiAgentJobInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiAgentSessionInputDto = {
  aiResources?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  baseBranch?: InputMaybe<Scalars['String']['input']>;
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  goalSummary?: InputMaybe<Scalars['String']['input']>;
  jobKind?: InputMaybe<SystemAiJobKindDto>;
  lastEventSequence?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  ownerUserId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sourceRepo?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<SystemAiSessionStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tokensConsumed?: InputMaybe<Scalars['Int']['input']>;
  workspaceBranchRef?: InputMaybe<Scalars['String']['input']>;
  workspaceWorktreePath?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAiAiAgentSessionInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiAgentSessionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiApprovalRequestInputDto = {
  comment?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  decidedAt?: InputMaybe<Scalars['DateTime']['input']>;
  decidedBy?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  payload?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<SystemAiApprovalReasonDto>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SystemAiApprovalStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  toolName?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAiAiApprovalRequestInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiApprovalRequestInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiAuditEventInputDto = {
  actorRef?: InputMaybe<Scalars['String']['input']>;
  at?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  detail?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetRef?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAiAiAuditEventInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiAuditEventInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiCredentialBindingInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  encryptedValue?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<SystemAiCredentialKindDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiCredentialBindingInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiCredentialBindingInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiCredentialTicketInputDto = {
  code?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  issuedByUserId?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<SystemAiTicketScopeDto>;
  status?: InputMaybe<SystemAiTicketStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiCredentialTicketInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiCredentialTicketInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiKnowledgeSourceInputDto = {
  appliesToScopes?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  kind?: InputMaybe<SystemAiKnowledgeKindDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  path?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiKnowledgeSourceInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiKnowledgeSourceInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiPromptTemplateInputDto = {
  appliesTo?: InputMaybe<SystemAiJobKindDto>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  exampleGoals?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  systemPromptFragment?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiPromptTemplateInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiPromptTemplateInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiQuotaLimitInputDto = {
  concurrentJobs?: InputMaybe<Scalars['Int']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  costCapMonthlyEUR?: InputMaybe<Scalars['Decimal']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxSessionDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  maxSessionsQueued?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tokensPerDay?: InputMaybe<Scalars['Int']['input']>;
  tokensPerJob?: InputMaybe<Scalars['Int']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiQuotaLimitInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiQuotaLimitInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiSessionEventInputDto = {
  actorRef?: InputMaybe<Scalars['String']['input']>;
  at?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  kind?: InputMaybe<SystemAiSessionEventKindDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  payload?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiSessionEventInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiSessionEventInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiTokenLeaseInputDto = {
  accessExpiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  accessToken?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  generation?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rateLimitTier?: InputMaybe<Scalars['String']['input']>;
  refreshExpiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SystemAiLeaseStatusDto>;
  subscriptionType?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  trustedDeviceToken?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAiAiTokenLeaseInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiTokenLeaseInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiToolPolicyInputDto = {
  approvalMode?: InputMaybe<SystemAiApprovalModeDto>;
  approvalTimeoutMinutes?: InputMaybe<Scalars['Int']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  conflictMode?: InputMaybe<SystemAiConflictModeDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  risk?: InputMaybe<SystemAiRiskLevelDto>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  toolName?: InputMaybe<Scalars['String']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiToolPolicyInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiToolPolicyInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiAiUsageRecordInputDto = {
  at?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  costCents?: InputMaybe<Scalars['Decimal']['input']>;
  inputTokens?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  model?: InputMaybe<Scalars['String']['input']>;
  outputTokens?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sessionRef?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAiAiUsageRecordInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAiAiUsageRecordInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemAiApprovalModeDto =
  | 'AUTO'
  | 'DISABLED'
  | 'REQUIRED';

export type SystemAiApprovalReasonDto =
  | 'CONFLICT'
  | 'MANUAL'
  | 'QUOTA_OVERRIDE'
  | 'RISK';

export type SystemAiApprovalStatusDto =
  | 'APPROVED'
  | 'PENDING'
  | 'REJECTED'
  | 'TIMED_OUT';

export type SystemAiAuthModeDto =
  | 'BYO_KEY'
  | 'CENTRAL_KEY'
  | 'SUBSCRIPTION';

export type SystemAiConflictModeDto =
  | 'ALWAYS_APPROVE'
  | 'AUTO_RETRY'
  | 'RETRY_THEN_APPROVE';

export type SystemAiCredentialKindDto =
  | 'DEV_SSH_AUTHORIZED_KEY'
  | 'ENV_SECRET'
  | 'GIT_HUB_PAT'
  | 'SSH_KEY';

export type SystemAiJobKindDto =
  | 'ADMIN'
  | 'APPLICATION'
  | 'BLUEPRINT_AUTHORING'
  | 'DATA_MODEL'
  | 'FREE_FORM'
  | 'PIPELINE'
  | 'RUNTIME_DATA';

export type SystemAiJobStatusDto =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED';

export type SystemAiKnowledgeKindDto =
  | 'CLAUDE_MD'
  | 'MCP_RESOURCE'
  | 'RAG_DOC'
  | 'URL';

export type SystemAiLeaseStatusDto =
  | 'ACTIVE'
  | 'EXPIRED'
  | 'REFRESH_FAILED'
  | 'REVOKED';

export type SystemAiModelTierDto =
  | 'HAIKU'
  | 'OPUS'
  | 'SONNET';

export type SystemAiRiskLevelDto =
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM';

export type SystemAiSessionEventKindDto =
  | 'ERROR'
  | 'HOOK'
  | 'MESSAGE'
  | 'STATUS_CHANGE'
  | 'TOOL_CALL'
  | 'TOOL_RESULT';

export type SystemAiSessionStatusDto =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED'
  | 'PAUSED'
  | 'QUEUED'
  | 'QUOTA_BLOCKED'
  | 'RATE_LIMITED'
  | 'RUNNING';

export type SystemAiSubscriptionScopeDto =
  | 'MESHMAKERS_POOL'
  | 'PER_USER'
  | 'SERVICE_ACCOUNT';

export type SystemAiTicketScopeDto =
  | 'CREDENTIAL_REGISTER'
  | 'DEV_SSH_KEY_REGISTER';

export type SystemAiTicketStatusDto =
  | 'EXPIRED'
  | 'OPEN'
  | 'REDEEMED';

export type SystemAiWorkspaceModeDto =
  | 'PERSISTENT_HIBERNATING'
  | 'PER_SESSION'
  | 'POOL';

export type SystemAttributeSearchFilterInputDto = {
  attributePaths?: InputMaybe<Array<Scalars['String']['input']>>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};

export type SystemAutoIncrementInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  currentValue?: InputMaybe<Scalars['Int']['input']>;
  end?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemAutoIncrementInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemAutoIncrementInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBlueprintBackupInputDto = {
  blueprintName?: InputMaybe<Scalars['String']['input']>;
  blueprintVersion?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  snapshotJson?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemBlueprintBackupInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemBlueprintBackupInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBlueprintHistoryInputDto = {
  applicationMode?: InputMaybe<Scalars['String']['input']>;
  appliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  blueprintName?: InputMaybe<Scalars['String']['input']>;
  blueprintVersion?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  entitiesCreated?: InputMaybe<Scalars['Int']['input']>;
  entitiesDeleted?: InputMaybe<Scalars['Int']['input']>;
  entitiesUpdated?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  previousBlueprintName?: InputMaybe<Scalars['String']['input']>;
  previousVersion?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  seedDataChecksum?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemBlueprintHistoryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemBlueprintHistoryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBlueprintInstallationInputDto = {
  blueprintName?: InputMaybe<Scalars['String']['input']>;
  blueprintVersion?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  installedAt?: InputMaybe<Scalars['DateTime']['input']>;
  isDependency?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  resolvedDependencies?: InputMaybe<Array<Scalars['String']['input']>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  seedDataChecksum?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemBlueprintInstallationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemBlueprintInstallationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBotArchiveImportModeDto =
  | 'INSERT_ONLY'
  | 'UPSERT';

export type SystemBotAttributeAggregateConfigurationInputDto = {
  autoCompleteFilter?: InputMaybe<Scalars['String']['input']>;
  autoCompleteLimit?: InputMaybe<Scalars['Int']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configures?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  isAutoCompleteEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemBotAttributeAggregateConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemBotAttributeAggregateConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBotFixupInputDto = {
  appliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  isApplied?: InputMaybe<Scalars['Boolean']['input']>;
  isSuccess?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  output?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  script?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemBotFixupInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemBotFixupInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBotTenantRepositoryDumpMethodInputDto = {
  includeArchiveData?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SystemBotTenantRepositoryExportArchiveDataMethodInputDto = {
  archiveRtId: Scalars['String']['input'];
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemBotTenantRepositoryImportArchiveDataMethodInputDto = {
  archiveRtId: Scalars['String']['input'];
  mode?: InputMaybe<SystemBotArchiveImportModeDto>;
  tusFileId: Scalars['String']['input'];
};

export type SystemBotTenantRepositoryInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemBotTenantRepositoryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemBotTenantRepositoryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemBotTenantRepositoryRestoreMethodInputDto = {
  databaseName: Scalars['String']['input'];
  oldDatabaseName?: InputMaybe<Scalars['String']['input']>;
  restoreArchiveData?: InputMaybe<Scalars['Boolean']['input']>;
  tusFileId: Scalars['String']['input'];
};

export type SystemCommunicationAdapterInputDto = {
  chartName?: InputMaybe<Scalars['String']['input']>;
  chartVersion?: InputMaybe<Scalars['String']['input']>;
  communicationState?: InputMaybe<SystemCommunicationCommunicationStateDto>;
  communicationStateTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  configuration?: InputMaybe<Scalars['String']['input']>;
  configurationState?: InputMaybe<SystemCommunicationConfigurationStateDto>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consecutiveStatusFailures?: InputMaybe<Scalars['Int']['input']>;
  cpuLimit?: InputMaybe<Scalars['String']['input']>;
  cpuRequest?: InputMaybe<Scalars['String']['input']>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  executes?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  executingAdapter?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  helmRepository?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  hostedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  idleTimeoutMinutes?: InputMaybe<Scalars['Int']['input']>;
  ingressEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastActivityAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastConfigurationError?: InputMaybe<Scalars['String']['input']>;
  lastConfigurationErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentError?: InputMaybe<Scalars['String']['input']>;
  lastDeploymentErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentWarning?: InputMaybe<Scalars['String']['input']>;
  lastSuccessfulStatusAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastSyncedSequenceNumber?: InputMaybe<Scalars['Int']['input']>;
  lentFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  lifecycleMode?: InputMaybe<SystemCommunicationLifecycleModeDto>;
  lifecycleState?: InputMaybe<SystemCommunicationLifecycleStateDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  memoryLimit?: InputMaybe<Scalars['String']['input']>;
  memoryRequest?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  onDemandBlockingReasons?: InputMaybe<Scalars['String']['input']>;
  onDemandCapable?: InputMaybe<Scalars['Boolean']['input']>;
  pipelineServiceAccount?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  receivesClusterSecrets?: InputMaybe<Scalars['Boolean']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  values?: InputMaybe<Array<InputMaybe<SystemCommunicationValueOverrideInputDto>>>;
  valuesYaml?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationAdapterInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationAdapterInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationAdapterPoolInputDto = {
  chartName?: InputMaybe<Scalars['String']['input']>;
  chartVersion?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consecutiveStatusFailures?: InputMaybe<Scalars['Int']['input']>;
  cpuLimit?: InputMaybe<Scalars['String']['input']>;
  cpuRequest?: InputMaybe<Scalars['String']['input']>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  helmRepository?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  hostedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  idleTimeoutMinutes?: InputMaybe<Scalars['Int']['input']>;
  ingressEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastActivityAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentError?: InputMaybe<Scalars['String']['input']>;
  lastDeploymentErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentWarning?: InputMaybe<Scalars['String']['input']>;
  lastSuccessfulStatusAt?: InputMaybe<Scalars['DateTime']['input']>;
  lendingAllowedTenantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  lendingMaxConcurrentLeasesPerTenant?: InputMaybe<Scalars['Int']['input']>;
  lifecycleMode?: InputMaybe<SystemCommunicationLifecycleModeDto>;
  lifecycleState?: InputMaybe<SystemCommunicationLifecycleStateDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxReplicas?: InputMaybe<Scalars['Int']['input']>;
  memoryLimit?: InputMaybe<Scalars['String']['input']>;
  memoryRequest?: InputMaybe<Scalars['String']['input']>;
  minReplicas?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  onDemandBlockingReasons?: InputMaybe<Scalars['String']['input']>;
  onDemandCapable?: InputMaybe<Scalars['Boolean']['input']>;
  poolMemberCpuLimit?: InputMaybe<Scalars['String']['input']>;
  poolMemberCpuRequest?: InputMaybe<Scalars['String']['input']>;
  poolMemberMemoryLimit?: InputMaybe<Scalars['String']['input']>;
  poolMemberMemoryRequest?: InputMaybe<Scalars['String']['input']>;
  poolServiceAccount?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  receivesClusterSecrets?: InputMaybe<Scalars['Boolean']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scaleUpPolicy?: InputMaybe<SystemCommunicationPoolScaleUpPolicyDto>;
  scaleUpQueueDepthThreshold?: InputMaybe<Scalars['Int']['input']>;
  scaleUpQueueWaitSeconds?: InputMaybe<Scalars['Int']['input']>;
  sharingMode?: InputMaybe<SystemCommunicationAdapterSharingModeDto>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  values?: InputMaybe<Array<InputMaybe<SystemCommunicationValueOverrideInputDto>>>;
  valuesYaml?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationAdapterPoolInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationAdapterPoolInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationAdapterSharingModeDto =
  | 'DESCENDANTS'
  | 'DESCENDANTS_AND_SIBLINGS'
  | 'NOT_SHARED';

export type SystemCommunicationAiConfigurationInputDto = {
  aiModel?: InputMaybe<Scalars['String']['input']>;
  apiKey?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxTokens?: InputMaybe<Scalars['Int']['input']>;
  mcpServerUrl?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  temperature?: InputMaybe<Scalars['Decimal']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationAiConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationAiConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationApplicationInputDto = {
  chartName?: InputMaybe<Scalars['String']['input']>;
  chartVersion?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consecutiveStatusFailures?: InputMaybe<Scalars['Int']['input']>;
  cpuLimit?: InputMaybe<Scalars['String']['input']>;
  cpuRequest?: InputMaybe<Scalars['String']['input']>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  helmRepository?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  hostedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  idleTimeoutMinutes?: InputMaybe<Scalars['Int']['input']>;
  ingressEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastActivityAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentError?: InputMaybe<Scalars['String']['input']>;
  lastDeploymentErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentWarning?: InputMaybe<Scalars['String']['input']>;
  lastSuccessfulStatusAt?: InputMaybe<Scalars['DateTime']['input']>;
  lifecycleMode?: InputMaybe<SystemCommunicationLifecycleModeDto>;
  lifecycleState?: InputMaybe<SystemCommunicationLifecycleStateDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  memoryLimit?: InputMaybe<Scalars['String']['input']>;
  memoryRequest?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  onDemandBlockingReasons?: InputMaybe<Scalars['String']['input']>;
  onDemandCapable?: InputMaybe<Scalars['Boolean']['input']>;
  receivesClusterSecrets?: InputMaybe<Scalars['Boolean']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  values?: InputMaybe<Array<InputMaybe<SystemCommunicationValueOverrideInputDto>>>;
  valuesYaml?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationApplicationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationApplicationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationCommunicationStateDto =
  | 'OFFLINE'
  | 'ONLINE'
  | 'UNREGISTERED';

export type SystemCommunicationConfigurationStateDto =
  | 'CONFIGURED'
  | 'ERROR'
  | 'PENDING'
  | 'UNCONFIGURED';

export type SystemCommunicationDataFlowInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationDataFlowInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationDataFlowInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationDataPointMappingInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  mappedAsSource?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mappedAsTarget?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mappingExpression?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sourceAttributePath?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetAttributePath?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationDataPointMappingInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationDataPointMappingInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationDeploymentSiteInputDto = {
  communicationState?: InputMaybe<SystemCommunicationCommunicationStateDto>;
  communicationStateTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  configurationState?: InputMaybe<SystemCommunicationConfigurationStateDto>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consecutiveStatusFailures?: InputMaybe<Scalars['Int']['input']>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<SystemCommunicationEnvironmentDto>;
  hosts?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  lastConfigurationError?: InputMaybe<Scalars['String']['input']>;
  lastConfigurationErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastDeploymentError?: InputMaybe<Scalars['String']['input']>;
  lastDeploymentErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastSuccessfulStatusAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationDeploymentSiteInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationDeploymentSiteInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationDeploymentStateDto =
  | 'DEPLOYED'
  | 'DISABLED'
  | 'ERROR'
  | 'PENDING'
  | 'UNDEPLOYED';

export type SystemCommunicationDiscordConfigurationInputDto = {
  botToken?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  guildId?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationDiscordConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationDiscordConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationEMailReceiverConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  folder?: InputMaybe<Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  isSslEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationEMailReceiverConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationEMailReceiverConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationEMailSenderConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  host?: InputMaybe<Scalars['String']['input']>;
  isSslEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  senderEmail?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationEMailSenderConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationEMailSenderConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationEdaConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  notificationEmailContact?: InputMaybe<Scalars['String']['input']>;
  partnerId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationEdaConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationEdaConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationEnergyCommunityConfigurationInputDto = {
  appHeading?: InputMaybe<Scalars['String']['input']>;
  appTitle?: InputMaybe<Scalars['String']['input']>;
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  bankAccountHolder?: InputMaybe<Scalars['String']['input']>;
  bankAccountIban?: InputMaybe<Scalars['String']['input']>;
  billingMailServerConfiguration?: InputMaybe<Scalars['String']['input']>;
  billingReportFilePrefix?: InputMaybe<Scalars['String']['input']>;
  billingReportName?: InputMaybe<Scalars['String']['input']>;
  colors?: InputMaybe<SystemCommunicationUiThemeColorsInputDto>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consumerPrice?: InputMaybe<Scalars['Decimal']['input']>;
  consumptionRecordRequestDelay?: InputMaybe<Scalars['Int']['input']>;
  emailFooterImage?: InputMaybe<Scalars['LargeBinary']['input']>;
  energyCommunityId?: InputMaybe<Scalars['String']['input']>;
  farmerTaxRate?: InputMaybe<Scalars['Decimal']['input']>;
  favicon?: InputMaybe<Scalars['LargeBinary']['input']>;
  footerGradientEnd?: InputMaybe<Scalars['String']['input']>;
  footerGradientStart?: InputMaybe<Scalars['String']['input']>;
  footerLogo?: InputMaybe<Scalars['LargeBinary']['input']>;
  headerGradientEnd?: InputMaybe<Scalars['String']['input']>;
  headerGradientStart?: InputMaybe<Scalars['String']['input']>;
  headerLogo?: InputMaybe<Scalars['LargeBinary']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationEmailContact?: InputMaybe<Scalars['String']['input']>;
  partnerId?: InputMaybe<Scalars['String']['input']>;
  producerPrice?: InputMaybe<Scalars['Decimal']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  taxRate?: InputMaybe<Scalars['Decimal']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationEnergyCommunityConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationEnergyCommunityConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationEnvironmentDto =
  | 'CLOUD'
  | 'EDGE';

export type SystemCommunicationFinApiConfigurationInputDto = {
  baseUrl?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  isSandbox?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationFinApiConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationFinApiConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationGrafanaConfigurationInputDto = {
  adminPassword?: InputMaybe<Scalars['String']['input']>;
  adminUser?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  grafanaUrl?: InputMaybe<Scalars['String']['input']>;
  identityServerUrl?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  oAuthClientId?: InputMaybe<Scalars['String']['input']>;
  octoMeshUrl?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationGrafanaConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationGrafanaConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationHelmChannelDto =
  | 'DEV'
  | 'RELEASE';

export type SystemCommunicationHelmRepositoryConfigurationInputDto = {
  channel?: InputMaybe<SystemCommunicationHelmChannelDto>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  helmRepositoryUsedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  purpose?: InputMaybe<SystemCommunicationHelmRepositoryPurposeDto>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  repositoryUrl?: InputMaybe<Scalars['String']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationHelmRepositoryConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationHelmRepositoryConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationHelmRepositoryPurposeDto =
  | 'ADAPTERS'
  | 'APPLICATIONS';

export type SystemCommunicationLenderReferenceInputDto = {
  lenderAdapterPoolRtId?: InputMaybe<Scalars['String']['input']>;
  lenderTenantId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationLentAdapterPoolInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  lender?: InputMaybe<SystemCommunicationLenderReferenceInputDto>;
  lentTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxReplicas?: InputMaybe<Scalars['Int']['input']>;
  minReplicas?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SystemCommunicationAdapterSharingModeDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationLentAdapterPoolInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationLentAdapterPoolInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationLifecycleModeDto =
  | 'ALWAYS_ON'
  | 'AUTO'
  | 'LEASED'
  | 'ON_DEMAND';

export type SystemCommunicationLifecycleStateDto =
  | 'DRAINING'
  | 'HIBERNATED'
  | 'RUNNING'
  | 'WAKING';

export type SystemCommunicationLoxoneConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  host?: InputMaybe<Scalars['String']['input']>;
  isSslEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mappingTargets?: InputMaybe<Array<InputMaybe<SystemCommunicationMappingTargetInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  pollIntervalSeconds?: InputMaybe<Scalars['Int']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationLoxoneConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationLoxoneConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationMappingTargetInputDto = {
  externalId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sourceIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationMicrosoftGraphConfigurationInputDto = {
  azureTenantId?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationMicrosoftGraphConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationMicrosoftGraphConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationPipelineExecutionClassDto =
  | 'BATCH'
  | 'INTERACTIVE';

export type SystemCommunicationPipelineExecutionInputDto = {
  adapterExecutions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  callerAccessToken?: InputMaybe<Scalars['String']['input']>;
  callerEmail?: InputMaybe<Scalars['String']['input']>;
  callerName?: InputMaybe<Scalars['String']['input']>;
  callerRoles?: InputMaybe<Array<Scalars['String']['input']>>;
  callerSubjectId?: InputMaybe<Scalars['String']['input']>;
  callerTenantId?: InputMaybe<Scalars['String']['input']>;
  callerTrustLevel?: InputMaybe<Scalars['Int']['input']>;
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  executionId?: InputMaybe<Scalars['String']['input']>;
  inputData?: InputMaybe<Scalars['String']['input']>;
  leaseGrantedAt?: InputMaybe<Scalars['DateTime']['input']>;
  leaseReleasedAt?: InputMaybe<Scalars['DateTime']['input']>;
  leaseWaitMs?: InputMaybe<Scalars['Int']['input']>;
  leasedFromAdapterPoolRtId?: InputMaybe<Scalars['String']['input']>;
  leasedFromTenantId?: InputMaybe<Scalars['String']['input']>;
  leasedOnMemberId?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  outputData?: InputMaybe<Scalars['String']['input']>;
  pipelineExecutions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<SystemCommunicationPipelineExecutionStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  triggerType?: InputMaybe<SystemCommunicationPipelineTriggerTypeDto>;
};

export type SystemCommunicationPipelineExecutionInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationPipelineExecutionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationPipelineExecutionStatusDto =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED'
  | 'INTERRUPTED'
  | 'QUEUED'
  | 'RUNNING';

export type SystemCommunicationPipelineInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consecutiveStatusFailures?: InputMaybe<Scalars['Int']['input']>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  executedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  executedPipeline?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  executionClass?: InputMaybe<SystemCommunicationPipelineExecutionClassDto>;
  isDebuggingEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isUsing?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  lastDeploymentError?: InputMaybe<Scalars['String']['input']>;
  lastDeploymentErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastSuccessfulStatusAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  pipelineDefinition?: InputMaybe<Scalars['String']['input']>;
  receivesDataFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sendsDataTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  statisticsForPipeline?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  triggers?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationPipelineInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationPipelineInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationPipelineStatisticsHourBucketInputDto = {
  durationCount?: InputMaybe<Scalars['Int']['input']>;
  failureCount?: InputMaybe<Scalars['Int']['input']>;
  hourStartAt?: InputMaybe<Scalars['DateTime']['input']>;
  successCount?: InputMaybe<Scalars['Int']['input']>;
  totalDurationMs?: InputMaybe<Scalars['Long']['input']>;
};

export type SystemCommunicationPipelineStatisticsInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  foldedBefore?: InputMaybe<Scalars['DateTime']['input']>;
  hourlyBuckets?: InputMaybe<Array<InputMaybe<SystemCommunicationPipelineStatisticsHourBucketInputDto>>>;
  last12HoursAvgDurationMs?: InputMaybe<Scalars['Int']['input']>;
  last12HoursFailureCount?: InputMaybe<Scalars['Int']['input']>;
  last12HoursSuccessCount?: InputMaybe<Scalars['Int']['input']>;
  last24HoursAvgDurationMs?: InputMaybe<Scalars['Int']['input']>;
  last24HoursFailureCount?: InputMaybe<Scalars['Int']['input']>;
  last24HoursSuccessCount?: InputMaybe<Scalars['Int']['input']>;
  last30DaysAvgDurationMs?: InputMaybe<Scalars['Int']['input']>;
  last30DaysFailureCount?: InputMaybe<Scalars['Int']['input']>;
  last30DaysSuccessCount?: InputMaybe<Scalars['Int']['input']>;
  lastExecutionAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastHourAvgDurationMs?: InputMaybe<Scalars['Int']['input']>;
  lastHourFailureCount?: InputMaybe<Scalars['Int']['input']>;
  lastHourSuccessCount?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  pipelineStatistics?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationPipelineStatisticsInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationPipelineStatisticsInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationPipelineTriggerInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consecutiveStatusFailures?: InputMaybe<Scalars['Int']['input']>;
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  deploymentState?: InputMaybe<SystemCommunicationDeploymentStateDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastDeploymentError?: InputMaybe<Scalars['String']['input']>;
  lastDeploymentErrorTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  lastSuccessfulStatusAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  triggeredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationPipelineTriggerInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationPipelineTriggerInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationPipelineTriggerTypeDto =
  | 'EVENT'
  | 'MANUAL'
  | 'SCHEDULED'
  | 'STARTUP';

export type SystemCommunicationPoolScaleUpPolicyDto =
  | 'QUEUE_DEPTH'
  | 'QUEUE_DEPTH_OR_WAIT_SECONDS'
  | 'QUEUE_WAIT_SECONDS';

export type SystemCommunicationSapConfigurationInputDto = {
  appServerHost?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  gatewayHost?: InputMaybe<Scalars['String']['input']>;
  gatewayService?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  programId?: InputMaybe<Scalars['String']['input']>;
  registrationCount?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  systemId?: InputMaybe<Scalars['String']['input']>;
  systemNumber?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  trace?: InputMaybe<Scalars['String']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationSapConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationSapConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationServiceAccountConfigurationInputDto = {
  allowDelegation?: InputMaybe<Scalars['Boolean']['input']>;
  assignedRoleNames?: InputMaybe<Array<Scalars['String']['input']>>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  issuerUri?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  pipelineServiceAccountOf?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  poolServiceAccountOf?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationServiceAccountConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationServiceAccountConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationSftpConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  host?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxConcurrentConnections?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  privateKeyPassphrase?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationSftpConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationSftpConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationSignalChannelInputDto = {
  apiUrl?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  lastError?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  number?: InputMaybe<Scalars['String']['input']>;
  registeredAt?: InputMaybe<Scalars['DateTime']['input']>;
  registrationHistory?: InputMaybe<Array<InputMaybe<SystemCommunicationSignalRegistrationEventInputDto>>>;
  registrationState?: InputMaybe<SystemCommunicationSignalRegistrationStateDto>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationSignalChannelInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationSignalChannelInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationSignalRegistrationActionDto =
  | 'ADOPTED'
  | 'CODE_VERIFIED'
  | 'DELETED'
  | 'DELETE_FAILED'
  | 'PROFILE_UPDATED'
  | 'REGISTER_FAILED'
  | 'REGISTER_REQUESTED'
  | 'VERIFY_FAILED';

export type SystemCommunicationSignalRegistrationEventInputDto = {
  action?: InputMaybe<SystemCommunicationSignalRegistrationActionDto>;
  at?: InputMaybe<Scalars['DateTime']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationSignalRegistrationStateDto =
  | 'CODE_PENDING'
  | 'FAILED'
  | 'REGISTERED'
  | 'UNREGISTERED';

export type SystemCommunicationTagInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  isTagging?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationTagInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationTagInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemCommunicationUiThemeColorsInputDto = {
  neutralColor?: InputMaybe<Scalars['String']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  tertiaryColor?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationValueOverrideInputDto = {
  isSecret?: InputMaybe<Scalars['Boolean']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCommunicationWeClappConfigurationInputDto = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  baseUrl?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemCommunicationWeClappConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemCommunicationWeClappConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemDownsamplingSdQueryInputDto = {
  archiveRtId?: InputMaybe<Scalars['String']['input']>;
  columns?: InputMaybe<Array<InputMaybe<SystemAggregationQueryColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtIds?: InputMaybe<Array<Scalars['String']['input']>>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemDownsamplingSdQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemDownsamplingSdQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemEnvironmentModesDto =
  | 'DEVELOPMENT'
  | 'PRODUCTION'
  | 'STAGING'
  | 'TESTING';

export type SystemFieldFilterInputDto = {
  attributePath?: InputMaybe<Scalars['String']['input']>;
  comparisonValue?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<SystemFieldFilterOperatorDto>;
};

export type SystemFieldFilterOperatorDto =
  | 'ANY_EQ'
  | 'ANY_LIKE'
  | 'EQUALS'
  | 'GREATER_EQUAL_THAN'
  | 'GREATER_THAN'
  | 'IN'
  | 'LESS_EQUAL_THAN'
  | 'LESS_THAN'
  | 'LIKE'
  | 'MATCH'
  | 'MATCH_REG_EX'
  | 'NOT_EQUALS'
  | 'NOT_IN';

export type SystemFilesFileSystemItemInputDto = {
  content?: InputMaybe<Scalars['LargeBinary']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
};

export type SystemFilesFileSystemItemInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemFilesFileSystemItemInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemFilesFolderInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
};

export type SystemFilesFolderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemFilesFolderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemFilesFolderRootInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
};

export type SystemFilesFolderRootInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemFilesFolderRootInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemGroupingAggregationRtQueryInputDto = {
  attributeSearchFilter?: InputMaybe<SystemAttributeSearchFilterInputDto>;
  columns?: InputMaybe<Array<InputMaybe<SystemAggregationQueryColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  groupingColumns?: InputMaybe<Array<Scalars['String']['input']>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  textSearchFilter?: InputMaybe<SystemTextSearchFilterInputDto>;
};

export type SystemGroupingAggregationRtQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemGroupingAggregationRtQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemGroupingAggregationSdQueryInputDto = {
  archiveRtId?: InputMaybe<Scalars['String']['input']>;
  columns?: InputMaybe<Array<InputMaybe<SystemAggregationQueryColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  groupingColumns?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtIds?: InputMaybe<Array<Scalars['String']['input']>>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemGroupingAggregationSdQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemGroupingAggregationSdQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityApiResourceInputDto = {
  allowedAccessTokenSigningAlgorithms?: InputMaybe<Array<Scalars['String']['input']>>;
  apiSecrets?: InputMaybe<Array<InputMaybe<SystemIdentitySecretInputDto>>>;
  claims?: InputMaybe<Array<Scalars['String']['input']>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  requireResourceIndicator?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
  showInDiscoveryDocument?: InputMaybe<Scalars['Boolean']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityApiResourceInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityApiResourceInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityApiScopeInputDto = {
  claims?: InputMaybe<Array<Scalars['String']['input']>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  isEmphasized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  showInDiscoveryDocument?: InputMaybe<Scalars['Boolean']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityApiScopeInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityApiScopeInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityAzureEntraIdIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  authority?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityAzureEntraIdIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityAzureEntraIdIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityClientClaimInputDto = {
  claimType?: InputMaybe<Scalars['String']['input']>;
  claimValue?: InputMaybe<Scalars['String']['input']>;
  claimValueType?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityClientInputDto = {
  absoluteRefreshTokenLifetime?: InputMaybe<Scalars['Int']['input']>;
  accessTokenLifetime?: InputMaybe<Scalars['Int']['input']>;
  accessTokenType?: InputMaybe<SystemIdentityTokenTypeDto>;
  allowAccessTokensViaBrowser?: InputMaybe<Scalars['Boolean']['input']>;
  allowOfflineAccess?: InputMaybe<Scalars['Boolean']['input']>;
  allowPlainTextPkce?: InputMaybe<Scalars['Boolean']['input']>;
  allowRememberConsent?: InputMaybe<Scalars['Boolean']['input']>;
  allowedCorsOrigins?: InputMaybe<Array<InputMaybe<SystemIdentityClientUriEntryInputDto>>>;
  allowedGrantTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  allowedIdentityTokenSigningAlgorithms?: InputMaybe<Array<Scalars['String']['input']>>;
  allowedScopes?: InputMaybe<Array<Scalars['String']['input']>>;
  alwaysIncludeUserClaimsInIdToken?: InputMaybe<Scalars['Boolean']['input']>;
  alwaysSendClientClaims?: InputMaybe<Scalars['Boolean']['input']>;
  assignedRoles?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  authorizationCodeLifetime?: InputMaybe<Scalars['Int']['input']>;
  autoProvisionInChildTenants?: InputMaybe<Scalars['Boolean']['input']>;
  backChannelLogoutSessionRequired?: InputMaybe<Scalars['Boolean']['input']>;
  backChannelLogoutUri?: InputMaybe<Scalars['String']['input']>;
  cibaLifetime?: InputMaybe<Scalars['Int']['input']>;
  clientClaims?: InputMaybe<Array<InputMaybe<SystemIdentityClientClaimInputDto>>>;
  clientClaimsPrefix?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientName?: InputMaybe<Scalars['String']['input']>;
  clientSecrets?: InputMaybe<Array<InputMaybe<SystemIdentitySecretInputDto>>>;
  clientUri?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consentLifetime?: InputMaybe<Scalars['Int']['input']>;
  coordinateLifetimeWithUserSession?: InputMaybe<Scalars['Boolean']['input']>;
  dPoPClockSkew?: InputMaybe<Scalars['Seconds']['input']>;
  dPoPValidationMode?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  deviceCodeLifetime?: InputMaybe<Scalars['Int']['input']>;
  dynamicRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  dynamicRegistrationExpiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  enableLocalLogin?: InputMaybe<Scalars['Boolean']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  frontChannelLogoutSessionRequired?: InputMaybe<Scalars['Boolean']['input']>;
  frontChannelLogoutUri?: InputMaybe<Scalars['String']['input']>;
  identityProviderRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
  identityTokenLifetime?: InputMaybe<Scalars['Int']['input']>;
  impersonators?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  includeJwtId?: InputMaybe<Scalars['Boolean']['input']>;
  initiateLoginUri?: InputMaybe<Scalars['String']['input']>;
  logoUri?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mayActAs?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  memberOfGroups?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  pairWiseSubjectSalt?: InputMaybe<Scalars['String']['input']>;
  pollingInterval?: InputMaybe<Scalars['Int']['input']>;
  postLogoutRedirectUris?: InputMaybe<Array<InputMaybe<SystemIdentityClientUriEntryInputDto>>>;
  protocolType?: InputMaybe<Scalars['String']['input']>;
  provisionedByParentTenantId?: InputMaybe<Scalars['String']['input']>;
  redirectUris?: InputMaybe<Array<InputMaybe<SystemIdentityClientUriEntryInputDto>>>;
  refreshTokenExpiration?: InputMaybe<SystemIdentityTokenExpirationDto>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  requireClientSecret?: InputMaybe<Scalars['Boolean']['input']>;
  requireConsent?: InputMaybe<Scalars['Boolean']['input']>;
  requireDPoP?: InputMaybe<Scalars['Boolean']['input']>;
  requirePkce?: InputMaybe<Scalars['Boolean']['input']>;
  requireRequestObject?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  slidingRefreshTokenLifetime?: InputMaybe<Scalars['Int']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  updateAccessTokenClaimsOnRefresh?: InputMaybe<Scalars['Boolean']['input']>;
  userCodeType?: InputMaybe<Scalars['String']['input']>;
  userSsoLifetime?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemIdentityClientInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityClientInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityClientMirrorInputDto = {
  childTenantId?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parentClientId?: InputMaybe<Scalars['String']['input']>;
  parentTenantId?: InputMaybe<Scalars['String']['input']>;
  provisionedAt?: InputMaybe<Scalars['DateTime']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  secretHashVersion?: InputMaybe<Scalars['Int']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityClientMirrorInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityClientMirrorInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityClientUriEntryInputDto = {
  source?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityDataPermissionInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  grantedToRoles?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  permissionId?: InputMaybe<Scalars['String']['input']>;
  policies?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityDataPermissionInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityDataPermissionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityDataPolicyEnforcementModeDto =
  | 'AUDIT_ONLY'
  | 'ENFORCE';

export type SystemIdentityDataPolicyInputDto = {
  actions?: InputMaybe<Array<Scalars['String']['input']>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  enforcementMode?: InputMaybe<SystemIdentityDataPolicyEnforcementModeDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  permission?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<SystemIdentityDataPolicyScopeDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetCkTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SystemIdentityDataPolicyInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityDataPolicyInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityDataPolicyScopeDto =
  | 'ALL'
  | 'OWNED_ONLY';

export type SystemIdentityDataProtectionKeyInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  creationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  friendlyName?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  xmlData?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityDataProtectionKeyInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityDataProtectionKeyInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityEmailDomainGroupRuleInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailDomainPattern?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetGroupRtId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityEmailDomainGroupRuleInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityEmailDomainGroupRuleInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityExternalTenantUserMappingInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mappedRoleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  memberOfGroups?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sourceTenantId?: InputMaybe<Scalars['String']['input']>;
  sourceUserId?: InputMaybe<Scalars['String']['input']>;
  sourceUserName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityExternalTenantUserMappingInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityExternalTenantUserMappingInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityFacebookIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityFacebookIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityFacebookIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityGoogleIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityGoogleIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityGoogleIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityGroupInputDto = {
  assignedRoles?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  childGroups?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  groupDescription?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  members?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  normalizedGroupName?: InputMaybe<Scalars['String']['input']>;
  parentGroups?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityGroupInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityGroupInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityIdentifierKindDto =
  | 'CLIENT_CERTIFICATE_FINGERPRINT'
  | 'EMAIL_ADDRESS'
  | 'ENTRA_ID_OBJECT_ID'
  | 'PHONE_NUMBER';

export type SystemIdentityIdentifierSourceDto =
  | 'ADMIN'
  | 'IDENTITY_PROVIDER'
  | 'SELF_SERVICE';

export type SystemIdentityIdentityResourceInputDto = {
  claims?: InputMaybe<Array<Scalars['String']['input']>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  isEmphasized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  showInDiscoveryDocument?: InputMaybe<Scalars['Boolean']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityIdentityResourceInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityIdentityResourceInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityMicrosoftAdIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  useTls?: InputMaybe<Scalars['Boolean']['input']>;
  userBaseDn?: InputMaybe<Scalars['String']['input']>;
  userNameAttribute?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityMicrosoftAdIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityMicrosoftAdIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityMicrosoftIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityMicrosoftIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityMicrosoftIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityOAuthAuthorizationInputDto = {
  authorizationType?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  creationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  properties?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityOAuthAuthorizationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityOAuthAuthorizationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityOAuthTokenInputDto = {
  authorizationRtId?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  creationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  payload?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['String']['input']>;
  redemptionDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityOAuthTokenInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityOAuthTokenInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityOctoTenantIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentTenantId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityOctoTenantIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityOctoTenantIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityOpenLdapIdentityProviderInputDto = {
  allowSelfRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  defaultGroupRtId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  useTls?: InputMaybe<Scalars['Boolean']['input']>;
  userBaseDn?: InputMaybe<Scalars['String']['input']>;
  userNameAttribute?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityOpenLdapIdentityProviderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityOpenLdapIdentityProviderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityPermissionInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  identityRoleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  permissionId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityPermissionInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityPermissionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityPermissionRoleInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  identityRoleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  roleId?: InputMaybe<Scalars['String']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityPermissionRoleInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityPermissionRoleInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityPersistedGrantInputDto = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  consumedDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  creationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expirationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  grantKey?: InputMaybe<Scalars['String']['input']>;
  grantType?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityPersistedGrantInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityPersistedGrantInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityRoleClaimInputDto = {
  claimType?: InputMaybe<Scalars['String']['input']>;
  claimValue?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityRoleInputDto = {
  assignedEntities?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  claims?: InputMaybe<Array<InputMaybe<SystemIdentityRoleClaimInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  grantedPermissions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  identityRoleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  normalizedName?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityRoleInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityRoleInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentitySecretInputDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  expirationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityServerSideSessionInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  creationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  expirationDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  renewalDateTime?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scheme?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  ticket?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityServerSideSessionInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityServerSideSessionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityTokenExpirationDto =
  | 'ABSOLUTE'
  | 'SLIDING';

export type SystemIdentityTokenTypeDto =
  | 'JWT'
  | 'REFERENCE';

export type SystemIdentityTrustLevelDto =
  | 'NONE'
  | 'STRONG'
  | 'WEAK';

export type SystemIdentityUserClaimInputDto = {
  claimType?: InputMaybe<Scalars['String']['input']>;
  claimValue?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityUserInputDto = {
  accessFailedCount?: InputMaybe<Scalars['Int']['input']>;
  assignedRoles?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  claims?: InputMaybe<Array<InputMaybe<SystemIdentityUserClaimInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailConfirmed?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lockoutEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lockoutEnd?: InputMaybe<Scalars['DateTimeOffset']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  memberOfGroups?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  normalizedEmail?: InputMaybe<Scalars['String']['input']>;
  normalizedUserName?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberConfirmed?: InputMaybe<Scalars['Boolean']['input']>;
  preferredChannelBindingId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  resetPasswordOnLogin?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  securityStamp?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  twoFactorEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  userLogins?: InputMaybe<Array<InputMaybe<SystemIdentityUserLoginInputDto>>>;
  userName?: InputMaybe<Scalars['String']['input']>;
  userTokens?: InputMaybe<Array<InputMaybe<SystemIdentityUserTokenInputDto>>>;
  verifiedExternalIdentifiers?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemIdentityUserInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityUserInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemIdentityUserLoginInputDto = {
  loginProvider?: InputMaybe<Scalars['String']['input']>;
  providerDisplayName?: InputMaybe<Scalars['String']['input']>;
  providerKey?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityUserTokenInputDto = {
  loginProvider?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type SystemIdentityVerifiedExternalIdentifierInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  enrolledAt?: InputMaybe<Scalars['DateTime']['input']>;
  enrollmentTrust?: InputMaybe<SystemIdentityTrustLevelDto>;
  identifierKind?: InputMaybe<SystemIdentityIdentifierKindDto>;
  identifierValue?: InputMaybe<Scalars['String']['input']>;
  lastVerifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  requiredMessageAuthentication?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<SystemIdentityIdentifierSourceDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  user?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  validUntil?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemIdentityVerifiedExternalIdentifierInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemIdentityVerifiedExternalIdentifierInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemMaintenanceLevelsDto =
  | 'FULL_SYSTEM'
  | 'OFF'
  | 'USER_APPS';

export type SystemMigrationHistoryInputDto = {
  backupId?: InputMaybe<Scalars['String']['input']>;
  ckModelName?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  entitiesAdded?: InputMaybe<Scalars['Int']['input']>;
  entitiesAffected?: InputMaybe<Scalars['Int']['input']>;
  entitiesDeleted?: InputMaybe<Scalars['Int']['input']>;
  entitiesUpdated?: InputMaybe<Scalars['Int']['input']>;
  errors?: InputMaybe<Array<Scalars['String']['input']>>;
  executedAt?: InputMaybe<Scalars['DateTime']['input']>;
  fromVersion?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  toVersion?: InputMaybe<Scalars['String']['input']>;
  warnings?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SystemMigrationHistoryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemMigrationHistoryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNavigationFilterModesDto =
  | 'FILTER'
  | 'INCLUDE';

export type SystemNotificationCssTemplateConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  cssStyle?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemNotificationCssTemplateConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemNotificationCssTemplateConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationEventInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  level?: InputMaybe<SystemNotificationEventLevelsDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  message?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<SystemNotificationEventSourcesDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemNotificationEventInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemNotificationEventInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationEventLevelsDto =
  | 'CRITICAL'
  | 'DEBUG'
  | 'ERROR'
  | 'INFORMATION'
  | 'WARNING';

export type SystemNotificationEventSourcesDto =
  | 'ADMIN_PANEL'
  | 'ASSET_REPOSITORY_SERVICE'
  | 'BOT_SERVICE'
  | 'COMMUNICATION_SERVICE'
  | 'IDENTITY_SERVICE'
  | 'MESH_ADAPTER'
  | 'UNDEFINED';

export type SystemNotificationEventStatesDto =
  | 'ACTIVE'
  | 'ERROR'
  | 'INACTIVE';

export type SystemNotificationMailNotificationConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  enableEmailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  redirectAfterEmailInteractionUrl?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemNotificationMailNotificationConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemNotificationMailNotificationConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationNotificationDeliveryStateInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  lastError?: InputMaybe<Scalars['String']['input']>;
  lastRunAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastSentAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  preference?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  processedUntil?: InputMaybe<Scalars['DateTime']['input']>;
  queryRtId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  runningSince?: InputMaybe<Scalars['DateTime']['input']>;
  skipExistingRows?: InputMaybe<Scalars['Boolean']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemNotificationNotificationDeliveryStateInputUpdateDto = {
  item: SystemNotificationNotificationDeliveryStateInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationNotificationPreferenceInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  deliveryState?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  skipExistingRows?: InputMaybe<Scalars['Boolean']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
  subscription?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
};

export type SystemNotificationNotificationPreferenceInputUpdateDto = {
  item: SystemNotificationNotificationPreferenceInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationNotificationSubscriptionInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  deployedAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  query?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  template?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemNotificationNotificationSubscriptionInputUpdateDto = {
  item: SystemNotificationNotificationSubscriptionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationNotificationTemplateInputDto = {
  bodyTemplate?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  renderingType?: InputMaybe<SystemNotificationRenderingTypesDto>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  subjectTemplate?: InputMaybe<Scalars['String']['input']>;
  subscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  type?: InputMaybe<SystemNotificationNotificationTypesDto>;
};

export type SystemNotificationNotificationTemplateInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemNotificationNotificationTemplateInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemNotificationNotificationTypesDto =
  | 'E_MAIL'
  | 'PUSH'
  | 'SMS';

export type SystemNotificationRenderingTypesDto =
  | 'HTML'
  | 'PLAIN';

export type SystemNotificationStatefulEventInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  level?: InputMaybe<SystemNotificationEventLevelsDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  message?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<SystemNotificationEventSourcesDto>;
  state?: InputMaybe<SystemNotificationEventStatesDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemNotificationStatefulEventInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemNotificationStatefulEventInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemReportingConnectionInfoInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  connectionString?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  provider?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemReportingConnectionInfoInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemReportingConnectionInfoInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemReportingFileSystemItemInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  content?: InputMaybe<Scalars['LargeBinary']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemReportingFileSystemItemInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemReportingFileSystemItemInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemReportingFolderInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemReportingFolderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemReportingFolderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemReportingFolderRootInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemReportingFolderRootInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemReportingFolderRootInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemSimpleRtQueryInputDto = {
  attributeSearchFilter?: InputMaybe<SystemAttributeSearchFilterInputDto>;
  columns?: InputMaybe<Array<Scalars['String']['input']>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sorting?: InputMaybe<Array<InputMaybe<SystemSortOrderItemInputDto>>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  textSearchFilter?: InputMaybe<SystemTextSearchFilterInputDto>;
};

export type SystemSimpleRtQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemSimpleRtQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemSimpleSdQueryInputDto = {
  archiveRtId?: InputMaybe<Scalars['String']['input']>;
  columns?: InputMaybe<Array<Scalars['String']['input']>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fieldFilter?: InputMaybe<Array<InputMaybe<SystemFieldFilterInputDto>>>;
  folder?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationFilterMode?: InputMaybe<SystemNavigationFilterModesDto>;
  notificationSubscriptions?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  queryCkTypeId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtIds?: InputMaybe<Array<Scalars['String']['input']>>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sorting?: InputMaybe<Array<InputMaybe<SystemSortOrderItemInputDto>>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemSimpleSdQueryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemSimpleSdQueryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemSortOrderItemInputDto = {
  attributePath?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SystemSortOrdersDto>;
};

export type SystemSortOrdersDto =
  | 'ASCENDING'
  | 'DEFAULT'
  | 'DESCENDING';

export type SystemStreamDataBucketAlignmentDto =
  | 'CALENDAR_DAY'
  | 'CALENDAR_MONTH'
  | 'CALENDAR_QUARTER'
  | 'CALENDAR_YEAR'
  | 'FIXED_SIZE'
  | 'ISO_8601_WEEK';

export type SystemStreamDataCkArchiveColumnInputDto = {
  computedState?: InputMaybe<SystemStreamDataCkComputedColumnStateDto>;
  computedVersion?: InputMaybe<Scalars['Int']['input']>;
  formula?: InputMaybe<Scalars['String']['input']>;
  indexed?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pendingFormula?: InputMaybe<Scalars['String']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  resultType?: InputMaybe<SystemStreamDataCkComputedColumnResultTypeDto>;
};

export type SystemStreamDataCkArchiveConflictKeyInputDto = {
  column?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SystemStreamDataCkConflictKeyOrderDto>;
};

export type SystemStreamDataCkArchiveDirtyWindowInputDto = {
  changeKind?: InputMaybe<SystemStreamDataCkRecomputeChangeKindDto>;
  detectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  source?: InputMaybe<SystemStreamDataCkRecomputeChangeSourceDto>;
  windowEnd?: InputMaybe<Scalars['DateTime']['input']>;
  windowStart?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemStreamDataCkArchiveRecomputeRangeInputDto = {
  attempts?: InputMaybe<Scalars['Int']['input']>;
  dependentArchiveRtId?: InputMaybe<Scalars['String']['input']>;
  enqueuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastError?: InputMaybe<Scalars['String']['input']>;
  nextAttemptAt?: InputMaybe<Scalars['DateTime']['input']>;
  rangeEnd?: InputMaybe<Scalars['DateTime']['input']>;
  rangeStart?: InputMaybe<Scalars['DateTime']['input']>;
  rtIdScope?: InputMaybe<Scalars['String']['input']>;
};

export type SystemStreamDataCkArchiveStatusDto =
  | 'ACTIVATED'
  | 'CREATED'
  | 'DISABLED'
  | 'FAILED';

export type SystemStreamDataCkComputedColumnResultTypeDto =
  | 'BOOLEAN'
  | 'DATE_TIME'
  | 'DOUBLE'
  | 'INT'
  | 'INT_64';

export type SystemStreamDataCkComputedColumnStateDto =
  | 'ACTIVE'
  | 'BACKFILLING'
  | 'FAILED'
  | 'PENDING';

export type SystemStreamDataCkConflictKeyOrderDto =
  | 'HIGHER_WINS'
  | 'LOWER_WINS';

export type SystemStreamDataCkRecomputeChangeKindDto =
  | 'APPEND'
  | 'RETROACTIVE_MODIFY';

export type SystemStreamDataCkRecomputeChangeSourceDto =
  | 'IMPORT'
  | 'MANUAL'
  | 'PIPELINE';

export type SystemStreamDataCkRecomputeJobStateDto =
  | 'COALESCED'
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'RUNNING'
  | 'SWAPPING';

export type SystemStreamDataCkRecomputeTriggerDto =
  | 'CHAIN_PROPAGATION'
  | 'MANUAL'
  | 'PERIODIC';

export type SystemStreamDataCkRollupAggregationInputDto = {
  comparisonValue?: InputMaybe<Scalars['String']['input']>;
  function?: InputMaybe<SystemStreamDataCkRollupFunctionDto>;
  sourcePath?: InputMaybe<Scalars['String']['input']>;
  targetColumnName?: InputMaybe<Scalars['String']['input']>;
};

export type SystemStreamDataCkRollupFunctionDto =
  | 'AVG'
  | 'COUNT'
  | 'FIRST'
  | 'LAST'
  | 'MAX'
  | 'MIN'
  | 'STATE_DURATION'
  | 'SUM'
  | 'TIME_WEIGHTED_AVG';

export type SystemStreamDataCkRollupSourceReferenceInputDto = {
  sourceArchiveRtId?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['DateTime']['input']>;
  validTo?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemStreamDataRawArchiveInputDto = {
  columns?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  conflictPrecedence?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveConflictKeyInputDto>>>;
  dirtyWindows?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveDirtyWindowInputDto>>>;
  lastRecomputeFailureAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeFailureReason?: InputMaybe<Scalars['String']['input']>;
  lastRecomputeStartedAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeSuccessAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxRetroactiveReachMs?: InputMaybe<Scalars['Int']['input']>;
  pendingRecomputeRanges?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveRecomputeRangeInputDto>>>;
  rawRetentionMs?: InputMaybe<Scalars['Int']['input']>;
  recomputeInProgress?: InputMaybe<Scalars['Boolean']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SystemStreamDataCkArchiveStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetCkTypeId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemStreamDataRawArchiveInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemStreamDataRawArchiveInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemStreamDataRecomputeJobInputDto = {
  archiveRtId?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  errorReason?: InputMaybe<Scalars['String']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastProgressAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rangeEnd?: InputMaybe<Scalars['DateTime']['input']>;
  rangeStart?: InputMaybe<Scalars['DateTime']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rowsProcessed?: InputMaybe<Scalars['Int']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtIdScope?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  stagingTableName?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<SystemStreamDataCkRecomputeJobStateDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  trigger?: InputMaybe<SystemStreamDataCkRecomputeTriggerDto>;
  windowsProcessed?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemStreamDataRecomputeJobInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemStreamDataRecomputeJobInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemStreamDataRollupArchiveInputDto = {
  aggregations?: InputMaybe<Array<InputMaybe<SystemStreamDataCkRollupAggregationInputDto>>>;
  bucketAlignment?: InputMaybe<SystemStreamDataBucketAlignmentDto>;
  bucketSizeMs?: InputMaybe<Scalars['Long']['input']>;
  carryLookbackMs?: InputMaybe<Scalars['Long']['input']>;
  columns?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  conflictPrecedence?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveConflictKeyInputDto>>>;
  dirtyWindows?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveDirtyWindowInputDto>>>;
  frozenUntil?: InputMaybe<Scalars['DateTime']['input']>;
  lastAggregatedBucketEnd?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeFailureAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeFailureReason?: InputMaybe<Scalars['String']['input']>;
  lastRecomputeStartedAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeSuccessAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxRetroactiveReachMs?: InputMaybe<Scalars['Int']['input']>;
  pendingRecomputeRanges?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveRecomputeRangeInputDto>>>;
  rawRetentionMs?: InputMaybe<Scalars['Int']['input']>;
  recomputeInProgress?: InputMaybe<Scalars['Boolean']['input']>;
  referenceTimeZone?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sourceArchiveRtId?: InputMaybe<Scalars['String']['input']>;
  sources?: InputMaybe<Array<InputMaybe<SystemStreamDataCkRollupSourceReferenceInputDto>>>;
  status?: InputMaybe<SystemStreamDataCkArchiveStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetCkTypeId?: InputMaybe<Scalars['String']['input']>;
  watermarkLagMs?: InputMaybe<Scalars['Long']['input']>;
};

export type SystemStreamDataRollupArchiveInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemStreamDataRollupArchiveInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemStreamDataTimeRangeArchiveInputDto = {
  columns?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveColumnInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  conflictPrecedence?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveConflictKeyInputDto>>>;
  dirtyWindows?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveDirtyWindowInputDto>>>;
  lastRecomputeFailureAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeFailureReason?: InputMaybe<Scalars['String']['input']>;
  lastRecomputeStartedAt?: InputMaybe<Scalars['DateTime']['input']>;
  lastRecomputeSuccessAt?: InputMaybe<Scalars['DateTime']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  maxRetroactiveReachMs?: InputMaybe<Scalars['Int']['input']>;
  pendingRecomputeRanges?: InputMaybe<Array<InputMaybe<SystemStreamDataCkArchiveRecomputeRangeInputDto>>>;
  period?: InputMaybe<Scalars['Seconds']['input']>;
  rawRetentionMs?: InputMaybe<Scalars['Int']['input']>;
  recomputeInProgress?: InputMaybe<Scalars['Boolean']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SystemStreamDataCkArchiveStatusDto>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetCkTypeId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemStreamDataTimeRangeArchiveInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemStreamDataTimeRangeArchiveInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemTenantConfigurationInputDto = {
  configurationValue?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemTenantConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemTenantConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemTenantInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  databaseName?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  parentTenantId?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemTenantInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemTenantInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemTenantModeConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  environmentMode?: InputMaybe<SystemEnvironmentModesDto>;
  maintenanceLevel?: InputMaybe<SystemMaintenanceLevelsDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  publishCkModelObservability?: InputMaybe<Scalars['Boolean']['input']>;
  publishWorkloadObservability?: InputMaybe<Scalars['Boolean']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  usedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemTenantModeConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemTenantModeConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemTextSearchFilterInputDto = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiBrandingInputDto = {
  appName?: InputMaybe<Scalars['String']['input']>;
  appTitle?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  darkTheme?: InputMaybe<SystemUiThemePaletteInputDto>;
  description?: InputMaybe<Scalars['String']['input']>;
  favicon?: InputMaybe<Array<InputMaybe<Scalars['Byte']['input']>>>;
  footerLogo?: InputMaybe<Array<InputMaybe<Scalars['Byte']['input']>>>;
  headerLogo?: InputMaybe<Array<InputMaybe<Scalars['Byte']['input']>>>;
  lightTheme?: InputMaybe<SystemUiThemePaletteInputDto>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemUiBrandingInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiBrandingInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiDashboardInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  columns?: InputMaybe<Scalars['Int']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rowHeight?: InputMaybe<Scalars['Int']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemUiDashboardInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiDashboardInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiDashboardWidgetInputDto = {
  col?: InputMaybe<Scalars['Int']['input']>;
  colSpan?: InputMaybe<Scalars['Int']['input']>;
  config?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  dataSourceCkTypeId?: InputMaybe<Scalars['String']['input']>;
  dataSourceRtId?: InputMaybe<Scalars['String']['input']>;
  dataSourceType?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  row?: InputMaybe<Scalars['Int']['input']>;
  rowSpan?: InputMaybe<Scalars['Int']['input']>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiDashboardWidgetInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiDashboardWidgetInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiEntityFormColumnInputDto = {
  attributePath?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemUiEntityFormFieldInputDto = {
  associationRoleId?: InputMaybe<Scalars['String']['input']>;
  attributePath?: InputMaybe<Scalars['String']['input']>;
  default?: InputMaybe<Scalars['String']['input']>;
  editor?: InputMaybe<Scalars['String']['input']>;
  help?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Decimal']['input']>;
  min?: InputMaybe<Scalars['Decimal']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  pattern?: InputMaybe<Scalars['String']['input']>;
  placeholder?: InputMaybe<Scalars['String']['input']>;
  readOnly?: InputMaybe<Scalars['String']['input']>;
  recordColumns?: InputMaybe<Array<Scalars['String']['input']>>;
  referenceCkTypeId?: InputMaybe<Scalars['String']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  secret?: InputMaybe<Scalars['Boolean']['input']>;
  sectionKey?: InputMaybe<Scalars['String']['input']>;
  visibleWhen?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiEntityFormInputDto = {
  canCreate?: InputMaybe<Scalars['Boolean']['input']>;
  canDelete?: InputMaybe<Scalars['Boolean']['input']>;
  canDuplicate?: InputMaybe<Scalars['Boolean']['input']>;
  canEdit?: InputMaybe<Scalars['Boolean']['input']>;
  canExport?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  customComponent?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<InputMaybe<SystemUiEntityFormFieldInputDto>>>;
  generateRemainingFields?: InputMaybe<Scalars['Boolean']['input']>;
  generatedSectionTitle?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  includeDerivedTypes?: InputMaybe<Scalars['Boolean']['input']>;
  listColumns?: InputMaybe<Array<InputMaybe<SystemUiEntityFormColumnInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<Array<InputMaybe<SystemUiEntityFormSectionInputDto>>>;
  singleton?: InputMaybe<Scalars['Boolean']['input']>;
  singletonWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  targetCkTypeId?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiEntityFormInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiEntityFormInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiEntityFormSectionInputDto = {
  collapsed?: InputMaybe<Scalars['Boolean']['input']>;
  columns?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiFolderInputDto = {
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemUiFolderInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiFolderInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiMappingCoverageConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  sourceCandidateCkTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemUiMappingCoverageConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiMappingCoverageConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiProcessDiagramInputDto = {
  animations?: InputMaybe<Scalars['String']['input']>;
  canvasBackgroundColor?: InputMaybe<Scalars['String']['input']>;
  canvasHeight?: InputMaybe<Scalars['Int']['input']>;
  canvasWidth?: InputMaybe<Scalars['Int']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  connections?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  elements?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  primitives?: InputMaybe<Scalars['String']['input']>;
  propertyBindings?: InputMaybe<Scalars['String']['input']>;
  refreshInterval?: InputMaybe<Scalars['Int']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  symbolInstances?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  transformProperties?: InputMaybe<Scalars['String']['input']>;
  variables?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiProcessDiagramInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiProcessDiagramInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiSymbolDefinitionInputDto = {
  boundsHeight?: InputMaybe<Scalars['Int']['input']>;
  boundsWidth?: InputMaybe<Scalars['Int']['input']>;
  canvasSizeHeight?: InputMaybe<Scalars['Int']['input']>;
  canvasSizeWidth?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  connectionPoints?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gridSize?: InputMaybe<Scalars['Int']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parameters?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  previewImage?: InputMaybe<Scalars['String']['input']>;
  primitives?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  symbolInstances?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  tags?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiSymbolDefinitionInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiSymbolDefinitionInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiSymbolLibraryInputDto = {
  author?: InputMaybe<Scalars['String']['input']>;
  children?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  isBuiltIn?: InputMaybe<Scalars['Boolean']['input']>;
  isReadOnly?: InputMaybe<Scalars['Boolean']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiSymbolLibraryInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiSymbolLibraryInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiThemeGradientInputDto = {
  endColor?: InputMaybe<Scalars['String']['input']>;
  startColor?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiThemePaletteInputDto = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  footerGradient?: InputMaybe<SystemUiThemeGradientInputDto>;
  headerGradient?: InputMaybe<SystemUiThemeGradientInputDto>;
  neutralColor?: InputMaybe<Scalars['String']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  tertiaryColor?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUiTreeNavigationConfigurationInputDto = {
  configuredBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  mapsFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  mapsTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  perspectives?: InputMaybe<Array<InputMaybe<SystemUiTreePerspectiveConfigInputDto>>>;
  relatesFrom?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  relatesTo?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
  roles?: InputMaybe<Array<InputMaybe<SystemUiTreeNavigationRoleConfigInputDto>>>;
  rtBlueprintAppliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rtBlueprintLocked?: InputMaybe<Scalars['Boolean']['input']>;
  rtBlueprintSource?: InputMaybe<Scalars['String']['input']>;
  rtWellKnownName?: InputMaybe<Scalars['String']['input']>;
  taggedBy?: InputMaybe<Array<InputMaybe<RtAssociationInputDto>>>;
};

export type SystemUiTreeNavigationConfigurationInputUpdateDto = {
  clearSecretAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  item: SystemUiTreeNavigationConfigurationInputDto;
  rtId?: InputMaybe<Scalars['OctoObjectId']['input']>;
};

export type SystemUiTreeNavigationRoleConfigInputDto = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  grouped?: InputMaybe<Scalars['Boolean']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['String']['input']>;
  sortIndex?: InputMaybe<Scalars['Int']['input']>;
  sourceCkTypeId?: InputMaybe<Scalars['String']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SystemUiTreePerspectiveConfigInputDto = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  primaryDirection?: InputMaybe<Scalars['String']['input']>;
  primaryRoleId?: InputMaybe<Scalars['String']['input']>;
  rootCkTypeId?: InputMaybe<Scalars['String']['input']>;
  rootMode?: InputMaybe<Scalars['String']['input']>;
  secondaryRoleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  sortIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTypeDto =
  | 'DELETE'
  | 'INSERT'
  | 'REPLACE'
  | 'UNDEFINED'
  | 'UPDATE';
