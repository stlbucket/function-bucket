import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AbListing = {
  __typename: 'AbListing';
  canInvite?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profileId?: Maybe<Scalars['UUID']['output']>;
};

/** A connection to a list of `AbListing` values. */
export type AbListingsConnection = {
  __typename: 'AbListingsConnection';
  /** A list of edges which contains the `AbListing` and cursor to aid in pagination. */
  edges: Array<Maybe<AbListingsEdge>>;
  /** A list of `AbListing` objects. */
  nodes: Array<Maybe<AbListing>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AbListing` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AbListing` edge in the connection. */
export type AbListingsEdge = {
  __typename: 'AbListingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AbListing` at the end of the edge. */
  node?: Maybe<AbListing>;
};

/** All input for the `activateTenant` mutation. */
export type ActivateTenantInput = {
  _tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `activateTenant` mutation. */
export type ActivateTenantPayload = {
  __typename: 'ActivateTenantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  tenant?: Maybe<Tenant>;
  /** An edge for our `Tenant`. May be used by Relay 1. */
  tenantEdge?: Maybe<TenantsEdge>;
};


/** The output of our `activateTenant` mutation. */
export type ActivateTenantPayloadTenantEdgeArgs = {
  orderBy?: Array<TenantsOrderBy>;
};

export type AppSetting = Node & {
  __typename: 'AppSetting';
  /** Reads a single `Application` that is related to this `AppSetting`. */
  application?: Maybe<Application>;
  applicationKey: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

/**
 * A condition to be used against `AppSetting` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AppSettingCondition = {
  /** Checks for equality with the object’s `applicationKey` field. */
  applicationKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppSetting` values. */
export type AppSettingsConnection = {
  __typename: 'AppSettingsConnection';
  /** A list of edges which contains the `AppSetting` and cursor to aid in pagination. */
  edges: Array<Maybe<AppSettingsEdge>>;
  /** A list of `AppSetting` objects. */
  nodes: Array<Maybe<AppSetting>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppSetting` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppSetting` edge in the connection. */
export type AppSettingsEdge = {
  __typename: 'AppSettingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppSetting` at the end of the edge. */
  node?: Maybe<AppSetting>;
};

/** Methods to use when ordering `AppSetting`. */
export enum AppSettingsOrderBy {
  ApplicationKeyAsc = 'APPLICATION_KEY_ASC',
  ApplicationKeyDesc = 'APPLICATION_KEY_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC'
}

export type Application = Node & {
  __typename: 'Application';
  /** Reads and enables pagination through a set of `AppSetting`. */
  appSettingsByApplicationKey: AppSettingsConnection;
  /** Reads and enables pagination through a set of `AppSetting`. */
  appSettingsByApplicationKeyList: Array<AppSetting>;
  key: Scalars['String']['output'];
  licenseCount?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `LicenseType`. */
  licenseTypesByApplicationKey: LicenseTypesConnection;
  /** Reads and enables pagination through a set of `LicenseType`. */
  licenseTypesByApplicationKeyList: Array<LicenseType>;
  /** Reads and enables pagination through a set of `Module`. */
  modulesByApplicationKey: ModulesConnection;
  /** Reads and enables pagination through a set of `Module`. */
  modulesByApplicationKeyList: Array<Module>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};


export type ApplicationAppSettingsByApplicationKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppSettingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingsOrderBy>>;
};


export type ApplicationAppSettingsByApplicationKeyListArgs = {
  condition?: InputMaybe<AppSettingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingsOrderBy>>;
};


export type ApplicationLicenseTypesByApplicationKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypesOrderBy>>;
};


export type ApplicationLicenseTypesByApplicationKeyListArgs = {
  condition?: InputMaybe<LicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypesOrderBy>>;
};


export type ApplicationModulesByApplicationKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ModuleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ModulesOrderBy>>;
};


export type ApplicationModulesByApplicationKeyListArgs = {
  condition?: InputMaybe<ModuleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ModulesOrderBy>>;
};

/**
 * A condition to be used against `Application` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ApplicationCondition = {
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Application` values. */
export type ApplicationsConnection = {
  __typename: 'ApplicationsConnection';
  /** A list of edges which contains the `Application` and cursor to aid in pagination. */
  edges: Array<Maybe<ApplicationsEdge>>;
  /** A list of `Application` objects. */
  nodes: Array<Maybe<Application>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Application` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Application` edge in the connection. */
export type ApplicationsEdge = {
  __typename: 'ApplicationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Application` at the end of the edge. */
  node?: Maybe<Application>;
};

/** Methods to use when ordering `Application`. */
export enum ApplicationsOrderBy {
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `assignTodo` mutation. */
export type AssignTodoInput = {
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `assignTodo` mutation. */
export type AssignTodoPayload = {
  __typename: 'AssignTodoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `assignTodo` mutation. */
export type AssignTodoPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

/** All input for the `assumeResidency` mutation. */
export type AssumeResidencyInput = {
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `assumeResidency` mutation. */
export type AssumeResidencyPayload = {
  __typename: 'AssumeResidencyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `assumeResidency` mutation. */
export type AssumeResidencyPayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

/** All input for the `becomeSupport` mutation. */
export type BecomeSupportInput = {
  _tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `becomeSupport` mutation. */
export type BecomeSupportPayload = {
  __typename: 'BecomeSupportPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `becomeSupport` mutation. */
export type BecomeSupportPayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

/** All input for the `blockResident` mutation. */
export type BlockResidentInput = {
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `blockResident` mutation. */
export type BlockResidentPayload = {
  __typename: 'BlockResidentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `blockResident` mutation. */
export type BlockResidentPayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

/** All input for the `cancelProject` mutation. */
export type CancelProjectInput = {
  _projectId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `cancelProject` mutation. */
export type CancelProjectPayload = {
  __typename: 'CancelProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Reads a single `ProjectType` that is related to this `Project`. */
  projectType?: Maybe<ProjectType>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `cancelProject` mutation. */
export type CancelProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectsOrderBy>;
};

/** All input for the `cloneProjectTemplate` mutation. */
export type CloneProjectTemplateInput = {
  _identifier?: InputMaybe<Scalars['String']['input']>;
  _options?: InputMaybe<CloneProjectTemplateOptionInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `CloneProjectTemplateOption` */
export type CloneProjectTemplateOptionInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
};

/** The output of our `cloneProjectTemplate` mutation. */
export type CloneProjectTemplatePayload = {
  __typename: 'CloneProjectTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Reads a single `ProjectType` that is related to this `Project`. */
  projectType?: Maybe<ProjectType>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `cloneProjectTemplate` mutation. */
export type CloneProjectTemplatePayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectsOrderBy>;
};

/** All input for the `completeUow` mutation. */
export type CompleteUowInput = {
  _options?: InputMaybe<CompleteUowOptionInput>;
  _uowId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `CompleteUowOption` */
export type CompleteUowOptionInput = {
  stepData?: InputMaybe<Scalars['JSON']['input']>;
  workflowData?: InputMaybe<Scalars['JSON']['input']>;
};

/** The output of our `completeUow` mutation. */
export type CompleteUowPayload = {
  __typename: 'CompleteUowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uow?: Maybe<Uow>;
  /** An edge for our `Uow`. May be used by Relay 1. */
  uowEdge?: Maybe<UowsEdge>;
};


/** The output of our `completeUow` mutation. */
export type CompleteUowPayloadUowEdgeArgs = {
  orderBy?: Array<UowsOrderBy>;
};

/** All input for the `createLocation` mutation. */
export type CreateLocationInput = {
  _locationInfo?: InputMaybe<LocationInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `createLocation` mutation. */
export type CreateLocationPayload = {
  __typename: 'CreateLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  /** An edge for our `Location`. May be used by Relay 1. */
  locationEdge?: Maybe<LocationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LocResident` that is related to this `Location`. */
  resident?: Maybe<LocResident>;
  /** Reads a single `LocTenant` that is related to this `Location`. */
  tenant?: Maybe<LocTenant>;
};


/** The output of our `createLocation` mutation. */
export type CreateLocationPayloadLocationEdgeArgs = {
  orderBy?: Array<LocationsOrderBy>;
};

/** All input for the `createTenant` mutation. */
export type CreateTenantInput = {
  _email?: InputMaybe<Scalars['String']['input']>;
  _identifier?: InputMaybe<Scalars['String']['input']>;
  _name?: InputMaybe<Scalars['String']['input']>;
  _type?: InputMaybe<TenantType>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `createTenant` mutation. */
export type CreateTenantPayload = {
  __typename: 'CreateTenantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  tenant?: Maybe<Tenant>;
  /** An edge for our `Tenant`. May be used by Relay 1. */
  tenantEdge?: Maybe<TenantsEdge>;
};


/** The output of our `createTenant` mutation. */
export type CreateTenantPayloadTenantEdgeArgs = {
  orderBy?: Array<TenantsOrderBy>;
};

/** All input for the `createTodo` mutation. */
export type CreateTodoInput = {
  _name?: InputMaybe<Scalars['String']['input']>;
  _options?: InputMaybe<CreateTodoOptionInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `CreateTodoOption` */
export type CreateTodoOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationInfoInput>;
  parentTodoId?: InputMaybe<Scalars['UUID']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The output of our `createTodo` mutation. */
export type CreateTodoPayload = {
  __typename: 'CreateTodoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `createTodo` mutation. */
export type CreateTodoPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

/** All input for the `deactivateSubscriber` mutation. */
export type DeactivateSubscriberInput = {
  _subscriberId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deactivateSubscriber` mutation. */
export type DeactivateSubscriberPayload = {
  __typename: 'DeactivateSubscriberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `MsgResident` that is related to this `Subscriber`. */
  msgResident?: Maybe<MsgResident>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  subscriber?: Maybe<Subscriber>;
  /** An edge for our `Subscriber`. May be used by Relay 1. */
  subscriberEdge?: Maybe<SubscribersEdge>;
  /** Reads a single `MsgTenant` that is related to this `Subscriber`. */
  tenant?: Maybe<MsgTenant>;
  /** Reads a single `Topic` that is related to this `Subscriber`. */
  topic?: Maybe<Topic>;
};


/** The output of our `deactivateSubscriber` mutation. */
export type DeactivateSubscriberPayloadSubscriberEdgeArgs = {
  orderBy?: Array<SubscribersOrderBy>;
};

/** All input for the `deactivateTenant` mutation. */
export type DeactivateTenantInput = {
  _tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deactivateTenant` mutation. */
export type DeactivateTenantPayload = {
  __typename: 'DeactivateTenantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  tenant?: Maybe<Tenant>;
  /** An edge for our `Tenant`. May be used by Relay 1. */
  tenantEdge?: Maybe<TenantsEdge>;
};


/** The output of our `deactivateTenant` mutation. */
export type DeactivateTenantPayloadTenantEdgeArgs = {
  orderBy?: Array<TenantsOrderBy>;
};

/** All input for the `deactivateTenantSubscription` mutation. */
export type DeactivateTenantSubscriptionInput = {
  _tenantSubscriptionId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deactivateTenantSubscription` mutation. */
export type DeactivateTenantSubscriptionPayload = {
  __typename: 'DeactivateTenantSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `LicensePack` that is related to this `TenantSubscription`. */
  licensePack?: Maybe<LicensePack>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tenant` that is related to this `TenantSubscription`. */
  tenant?: Maybe<Tenant>;
  tenantSubscription?: Maybe<TenantSubscription>;
  /** An edge for our `TenantSubscription`. May be used by Relay 1. */
  tenantSubscriptionEdge?: Maybe<TenantSubscriptionsEdge>;
};


/** The output of our `deactivateTenantSubscription` mutation. */
export type DeactivateTenantSubscriptionPayloadTenantSubscriptionEdgeArgs = {
  orderBy?: Array<TenantSubscriptionsOrderBy>;
};

/** All input for the `declineInvitation` mutation. */
export type DeclineInvitationInput = {
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `declineInvitation` mutation. */
export type DeclineInvitationPayload = {
  __typename: 'DeclineInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `declineInvitation` mutation. */
export type DeclineInvitationPayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

/** All input for the `declineResidency` mutation. */
export type DeclineResidencyInput = {
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `declineResidency` mutation. */
export type DeclineResidencyPayload = {
  __typename: 'DeclineResidencyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `declineResidency` mutation. */
export type DeclineResidencyPayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

/** All input for the `deleteLocation` mutation. */
export type DeleteLocationInput = {
  _locationId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deleteLocation` mutation. */
export type DeleteLocationPayload = {
  __typename: 'DeleteLocationPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteTodo` mutation. */
export type DeleteTodoInput = {
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deleteTodo` mutation. */
export type DeleteTodoPayload = {
  __typename: 'DeleteTodoPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteTopic` mutation. */
export type DeleteTopicInput = {
  _topicId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deleteTopic` mutation. */
export type DeleteTopicPayload = {
  __typename: 'DeleteTopicPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteUow` mutation. */
export type DeleteUowInput = {
  _uowId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `deleteUow` mutation. */
export type DeleteUowPayload = {
  __typename: 'DeleteUowPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `errorUow` mutation. */
export type ErrorUowInput = {
  _message?: InputMaybe<Scalars['String']['input']>;
  _stack?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _uowId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `errorUow` mutation. */
export type ErrorUowPayload = {
  __typename: 'ErrorUowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uow?: Maybe<Uow>;
  /** An edge for our `Uow`. May be used by Relay 1. */
  uowEdge?: Maybe<UowsEdge>;
};


/** The output of our `errorUow` mutation. */
export type ErrorUowPayloadUowEdgeArgs = {
  orderBy?: Array<UowsOrderBy>;
};

/** All input for the `exitSupportMode` mutation. */
export type ExitSupportModeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `exitSupportMode` mutation. */
export type ExitSupportModePayload = {
  __typename: 'ExitSupportModePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `exitSupportMode` mutation. */
export type ExitSupportModePayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

export enum ExpirationIntervalType {
  Day = 'DAY',
  Explicit = 'EXPLICIT',
  Month = 'MONTH',
  None = 'NONE',
  Quarter = 'QUARTER',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** All input for the `grantUserLicense` mutation. */
export type GrantUserLicenseInput = {
  _licenseTypeKey?: InputMaybe<Scalars['String']['input']>;
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `grantUserLicense` mutation. */
export type GrantUserLicensePayload = {
  __typename: 'GrantUserLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  license?: Maybe<License>;
  /** An edge for our `License`. May be used by Relay 1. */
  licenseEdge?: Maybe<LicensesEdge>;
  /** Reads a single `LicenseType` that is related to this `License`. */
  licenseType?: Maybe<LicenseType>;
  /** Reads a single `Profile` that is related to this `License`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Resident` that is related to this `License`. */
  resident?: Maybe<Resident>;
  /** Reads a single `Tenant` that is related to this `License`. */
  tenant?: Maybe<Tenant>;
  /** Reads a single `TenantSubscription` that is related to this `License`. */
  tenantSubscription?: Maybe<TenantSubscription>;
};


/** The output of our `grantUserLicense` mutation. */
export type GrantUserLicensePayloadLicenseEdgeArgs = {
  orderBy?: Array<LicensesOrderBy>;
};

/** All input for the `incompleteUow` mutation. */
export type IncompleteUowInput = {
  _uowId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `incompleteUow` mutation. */
export type IncompleteUowPayload = {
  __typename: 'IncompleteUowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uow?: Maybe<Uow>;
  /** An edge for our `Uow`. May be used by Relay 1. */
  uowEdge?: Maybe<UowsEdge>;
};


/** The output of our `incompleteUow` mutation. */
export type IncompleteUowPayloadUowEdgeArgs = {
  orderBy?: Array<UowsOrderBy>;
};

/** All input for the `joinAddressBook` mutation. */
export type JoinAddressBookInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `joinAddressBook` mutation. */
export type JoinAddressBookPayload = {
  __typename: 'JoinAddressBookPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  /** An edge for our `Profile`. May be used by Relay 1. */
  profileEdge?: Maybe<ProfilesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `joinAddressBook` mutation. */
export type JoinAddressBookPayloadProfileEdgeArgs = {
  orderBy?: Array<ProfilesOrderBy>;
};

/** All input for the `leaveAddressBook` mutation. */
export type LeaveAddressBookInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `leaveAddressBook` mutation. */
export type LeaveAddressBookPayload = {
  __typename: 'LeaveAddressBookPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  /** An edge for our `Profile`. May be used by Relay 1. */
  profileEdge?: Maybe<ProfilesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `leaveAddressBook` mutation. */
export type LeaveAddressBookPayloadProfileEdgeArgs = {
  orderBy?: Array<ProfilesOrderBy>;
};

export type License = Node & {
  __typename: 'License';
  createdAt: Scalars['Datetime']['output'];
  expiresAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Reads a single `LicenseType` that is related to this `License`. */
  licenseType?: Maybe<LicenseType>;
  licenseTypeKey: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Profile` that is related to this `License`. */
  profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Resident` that is related to this `License`. */
  resident?: Maybe<Resident>;
  residentId: Scalars['UUID']['output'];
  status: LicenseStatus;
  /** Reads a single `Tenant` that is related to this `License`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads a single `TenantSubscription` that is related to this `License`. */
  tenantSubscription?: Maybe<TenantSubscription>;
  tenantSubscriptionId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

/** A condition to be used against `License` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type LicenseCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `licenseTypeKey` field. */
  licenseTypeKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `residentId` field. */
  residentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<LicenseStatus>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tenantSubscriptionId` field. */
  tenantSubscriptionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type LicensePack = Node & {
  __typename: 'LicensePack';
  autoSubscribe: Scalars['Boolean']['output'];
  createdAt: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `LicensePackLicenseType`. */
  licensePackLicenseTypesByLicensePackKey: LicensePackLicenseTypesConnection;
  /** Reads and enables pagination through a set of `LicensePackLicenseType`. */
  licensePackLicenseTypesByLicensePackKeyList: Array<LicensePackLicenseType>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `TenantSubscription`. */
  tenantSubscriptionsByLicensePackKey: TenantSubscriptionsConnection;
  /** Reads and enables pagination through a set of `TenantSubscription`. */
  tenantSubscriptionsByLicensePackKeyList: Array<TenantSubscription>;
  updatedAt: Scalars['Datetime']['output'];
};


export type LicensePackLicensePackLicenseTypesByLicensePackKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicensePackLicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePackLicenseTypesOrderBy>>;
};


export type LicensePackLicensePackLicenseTypesByLicensePackKeyListArgs = {
  condition?: InputMaybe<LicensePackLicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePackLicenseTypesOrderBy>>;
};


export type LicensePackTenantSubscriptionsByLicensePackKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TenantSubscriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantSubscriptionsOrderBy>>;
};


export type LicensePackTenantSubscriptionsByLicensePackKeyListArgs = {
  condition?: InputMaybe<TenantSubscriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantSubscriptionsOrderBy>>;
};

/**
 * A condition to be used against `LicensePack` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LicensePackCondition = {
  /** Checks for equality with the object’s `autoSubscribe` field. */
  autoSubscribe?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type LicensePackLicenseType = Node & {
  __typename: 'LicensePackLicenseType';
  expirationIntervalMultiplier: Scalars['Int']['output'];
  expirationIntervalType: ExpirationIntervalType;
  id: Scalars['UUID']['output'];
  issuedCount?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `LicensePack` that is related to this `LicensePackLicenseType`. */
  licensePack?: Maybe<LicensePack>;
  licensePackKey: Scalars['String']['output'];
  /** Reads a single `LicenseType` that is related to this `LicensePackLicenseType`. */
  licenseType?: Maybe<LicenseType>;
  licenseTypeKey: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  numberOfLicenses: Scalars['Int']['output'];
};

/**
 * A condition to be used against `LicensePackLicenseType` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type LicensePackLicenseTypeCondition = {
  /** Checks for equality with the object’s `expirationIntervalMultiplier` field. */
  expirationIntervalMultiplier?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `expirationIntervalType` field. */
  expirationIntervalType?: InputMaybe<ExpirationIntervalType>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `licensePackKey` field. */
  licensePackKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `licenseTypeKey` field. */
  licenseTypeKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `numberOfLicenses` field. */
  numberOfLicenses?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `LicensePackLicenseType` values. */
export type LicensePackLicenseTypesConnection = {
  __typename: 'LicensePackLicenseTypesConnection';
  /** A list of edges which contains the `LicensePackLicenseType` and cursor to aid in pagination. */
  edges: Array<Maybe<LicensePackLicenseTypesEdge>>;
  /** A list of `LicensePackLicenseType` objects. */
  nodes: Array<Maybe<LicensePackLicenseType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LicensePackLicenseType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LicensePackLicenseType` edge in the connection. */
export type LicensePackLicenseTypesEdge = {
  __typename: 'LicensePackLicenseTypesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LicensePackLicenseType` at the end of the edge. */
  node?: Maybe<LicensePackLicenseType>;
};

/** Methods to use when ordering `LicensePackLicenseType`. */
export enum LicensePackLicenseTypesOrderBy {
  ExpirationIntervalMultiplierAsc = 'EXPIRATION_INTERVAL_MULTIPLIER_ASC',
  ExpirationIntervalMultiplierDesc = 'EXPIRATION_INTERVAL_MULTIPLIER_DESC',
  ExpirationIntervalTypeAsc = 'EXPIRATION_INTERVAL_TYPE_ASC',
  ExpirationIntervalTypeDesc = 'EXPIRATION_INTERVAL_TYPE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LicensePackKeyAsc = 'LICENSE_PACK_KEY_ASC',
  LicensePackKeyDesc = 'LICENSE_PACK_KEY_DESC',
  LicenseTypeKeyAsc = 'LICENSE_TYPE_KEY_ASC',
  LicenseTypeKeyDesc = 'LICENSE_TYPE_KEY_DESC',
  Natural = 'NATURAL',
  NumberOfLicensesAsc = 'NUMBER_OF_LICENSES_ASC',
  NumberOfLicensesDesc = 'NUMBER_OF_LICENSES_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `LicensePack` values. */
export type LicensePacksConnection = {
  __typename: 'LicensePacksConnection';
  /** A list of edges which contains the `LicensePack` and cursor to aid in pagination. */
  edges: Array<Maybe<LicensePacksEdge>>;
  /** A list of `LicensePack` objects. */
  nodes: Array<Maybe<LicensePack>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LicensePack` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LicensePack` edge in the connection. */
export type LicensePacksEdge = {
  __typename: 'LicensePacksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LicensePack` at the end of the edge. */
  node?: Maybe<LicensePack>;
};

/** Methods to use when ordering `LicensePack`. */
export enum LicensePacksOrderBy {
  AutoSubscribeAsc = 'AUTO_SUBSCRIBE_ASC',
  AutoSubscribeDesc = 'AUTO_SUBSCRIBE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export enum LicenseStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE'
}

export type LicenseType = Node & {
  __typename: 'LicenseType';
  /** Reads a single `Application` that is related to this `LicenseType`. */
  application?: Maybe<Application>;
  applicationKey: Scalars['String']['output'];
  assignmentScope: LicenseTypeAssignmentScope;
  createdAt: Scalars['Datetime']['output'];
  displayName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `LicensePackLicenseType`. */
  licensePackLicenseTypesByLicenseTypeKey: LicensePackLicenseTypesConnection;
  /** Reads and enables pagination through a set of `LicensePackLicenseType`. */
  licensePackLicenseTypesByLicenseTypeKeyList: Array<LicensePackLicenseType>;
  /** Reads and enables pagination through a set of `LicenseTypePermission`. */
  licenseTypePermissionsByLicenseTypeKey: LicenseTypePermissionsConnection;
  /** Reads and enables pagination through a set of `LicenseTypePermission`. */
  licenseTypePermissionsByLicenseTypeKeyList: Array<LicenseTypePermission>;
  /** Reads and enables pagination through a set of `License`. */
  licensesByLicenseTypeKey: LicensesConnection;
  /** Reads and enables pagination through a set of `License`. */
  licensesByLicenseTypeKeyList: Array<License>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


export type LicenseTypeLicensePackLicenseTypesByLicenseTypeKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicensePackLicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePackLicenseTypesOrderBy>>;
};


export type LicenseTypeLicensePackLicenseTypesByLicenseTypeKeyListArgs = {
  condition?: InputMaybe<LicensePackLicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePackLicenseTypesOrderBy>>;
};


export type LicenseTypeLicenseTypePermissionsByLicenseTypeKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseTypePermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypePermissionsOrderBy>>;
};


export type LicenseTypeLicenseTypePermissionsByLicenseTypeKeyListArgs = {
  condition?: InputMaybe<LicenseTypePermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypePermissionsOrderBy>>;
};


export type LicenseTypeLicensesByLicenseTypeKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type LicenseTypeLicensesByLicenseTypeKeyListArgs = {
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};

export enum LicenseTypeAssignmentScope {
  Admin = 'ADMIN',
  All = 'ALL',
  None = 'NONE',
  Superadmin = 'SUPERADMIN',
  Support = 'SUPPORT',
  User = 'USER'
}

/**
 * A condition to be used against `LicenseType` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LicenseTypeCondition = {
  /** Checks for equality with the object’s `applicationKey` field. */
  applicationKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `assignmentScope` field. */
  assignmentScope?: InputMaybe<LicenseTypeAssignmentScope>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type LicenseTypePermission = {
  __typename: 'LicenseTypePermission';
  /** Reads a single `LicenseType` that is related to this `LicenseTypePermission`. */
  licenseType?: Maybe<LicenseType>;
  licenseTypeKey: Scalars['String']['output'];
  /** Reads a single `Permission` that is related to this `LicenseTypePermission`. */
  permission?: Maybe<Permission>;
  permissionKey: Scalars['String']['output'];
};

/**
 * A condition to be used against `LicenseTypePermission` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type LicenseTypePermissionCondition = {
  /** Checks for equality with the object’s `licenseTypeKey` field. */
  licenseTypeKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `permissionKey` field. */
  permissionKey?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `LicenseTypePermission` values. */
export type LicenseTypePermissionsConnection = {
  __typename: 'LicenseTypePermissionsConnection';
  /** A list of edges which contains the `LicenseTypePermission` and cursor to aid in pagination. */
  edges: Array<Maybe<LicenseTypePermissionsEdge>>;
  /** A list of `LicenseTypePermission` objects. */
  nodes: Array<Maybe<LicenseTypePermission>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LicenseTypePermission` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LicenseTypePermission` edge in the connection. */
export type LicenseTypePermissionsEdge = {
  __typename: 'LicenseTypePermissionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LicenseTypePermission` at the end of the edge. */
  node?: Maybe<LicenseTypePermission>;
};

/** Methods to use when ordering `LicenseTypePermission`. */
export enum LicenseTypePermissionsOrderBy {
  LicenseTypeKeyAsc = 'LICENSE_TYPE_KEY_ASC',
  LicenseTypeKeyDesc = 'LICENSE_TYPE_KEY_DESC',
  Natural = 'NATURAL',
  PermissionKeyAsc = 'PERMISSION_KEY_ASC',
  PermissionKeyDesc = 'PERMISSION_KEY_DESC'
}

/** A connection to a list of `LicenseType` values. */
export type LicenseTypesConnection = {
  __typename: 'LicenseTypesConnection';
  /** A list of edges which contains the `LicenseType` and cursor to aid in pagination. */
  edges: Array<Maybe<LicenseTypesEdge>>;
  /** A list of `LicenseType` objects. */
  nodes: Array<Maybe<LicenseType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LicenseType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LicenseType` edge in the connection. */
export type LicenseTypesEdge = {
  __typename: 'LicenseTypesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LicenseType` at the end of the edge. */
  node?: Maybe<LicenseType>;
};

/** Methods to use when ordering `LicenseType`. */
export enum LicenseTypesOrderBy {
  ApplicationKeyAsc = 'APPLICATION_KEY_ASC',
  ApplicationKeyDesc = 'APPLICATION_KEY_DESC',
  AssignmentScopeAsc = 'ASSIGNMENT_SCOPE_ASC',
  AssignmentScopeDesc = 'ASSIGNMENT_SCOPE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A connection to a list of `License` values. */
export type LicensesConnection = {
  __typename: 'LicensesConnection';
  /** A list of edges which contains the `License` and cursor to aid in pagination. */
  edges: Array<Maybe<LicensesEdge>>;
  /** A list of `License` objects. */
  nodes: Array<Maybe<License>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `License` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `License` edge in the connection. */
export type LicensesEdge = {
  __typename: 'LicensesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `License` at the end of the edge. */
  node?: Maybe<License>;
};

/** Methods to use when ordering `License`. */
export enum LicensesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LicenseTypeKeyAsc = 'LICENSE_TYPE_KEY_ASC',
  LicenseTypeKeyDesc = 'LICENSE_TYPE_KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC',
  ResidentIdAsc = 'RESIDENT_ID_ASC',
  ResidentIdDesc = 'RESIDENT_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TenantSubscriptionIdAsc = 'TENANT_SUBSCRIPTION_ID_ASC',
  TenantSubscriptionIdDesc = 'TENANT_SUBSCRIPTION_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type LocResident = Node & {
  __typename: 'LocResident';
  displayName: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Location`. */
  locationsByResidentId: LocationsConnection;
  /** Reads and enables pagination through a set of `Location`. */
  locationsByResidentIdList: Array<Location>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Resident` that is related to this `LocResident`. */
  resident?: Maybe<Resident>;
  residentId: Scalars['UUID']['output'];
  /** Reads a single `LocTenant` that is related to this `LocResident`. */
  tenant?: Maybe<LocTenant>;
  tenantId: Scalars['UUID']['output'];
};


export type LocResidentLocationsByResidentIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};


export type LocResidentLocationsByResidentIdListArgs = {
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};

/**
 * A condition to be used against `LocResident` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LocResidentCondition = {
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `residentId` field. */
  residentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `LocResident` values. */
export type LocResidentsConnection = {
  __typename: 'LocResidentsConnection';
  /** A list of edges which contains the `LocResident` and cursor to aid in pagination. */
  edges: Array<Maybe<LocResidentsEdge>>;
  /** A list of `LocResident` objects. */
  nodes: Array<Maybe<LocResident>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LocResident` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LocResident` edge in the connection. */
export type LocResidentsEdge = {
  __typename: 'LocResidentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LocResident` at the end of the edge. */
  node?: Maybe<LocResident>;
};

/** Methods to use when ordering `LocResident`. */
export enum LocResidentsOrderBy {
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResidentIdAsc = 'RESIDENT_ID_ASC',
  ResidentIdDesc = 'RESIDENT_ID_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export type LocTenant = Node & {
  __typename: 'LocTenant';
  /** Reads and enables pagination through a set of `LocResident`. */
  locResidentsByTenantId: LocResidentsConnection;
  /** Reads and enables pagination through a set of `LocResident`. */
  locResidentsByTenantIdList: Array<LocResident>;
  /** Reads and enables pagination through a set of `Location`. */
  locationsByTenantId: LocationsConnection;
  /** Reads and enables pagination through a set of `Location`. */
  locationsByTenantIdList: Array<Location>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Tenant` that is related to this `LocTenant`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
};


export type LocTenantLocResidentsByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LocResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocResidentsOrderBy>>;
};


export type LocTenantLocResidentsByTenantIdListArgs = {
  condition?: InputMaybe<LocResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocResidentsOrderBy>>;
};


export type LocTenantLocationsByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};


export type LocTenantLocationsByTenantIdListArgs = {
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};

/**
 * A condition to be used against `LocTenant` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LocTenantCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `LocTenant` values. */
export type LocTenantsConnection = {
  __typename: 'LocTenantsConnection';
  /** A list of edges which contains the `LocTenant` and cursor to aid in pagination. */
  edges: Array<Maybe<LocTenantsEdge>>;
  /** A list of `LocTenant` objects. */
  nodes: Array<Maybe<LocTenant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LocTenant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LocTenant` edge in the connection. */
export type LocTenantsEdge = {
  __typename: 'LocTenantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LocTenant` at the end of the edge. */
  node?: Maybe<LocTenant>;
};

/** Methods to use when ordering `LocTenant`. */
export enum LocTenantsOrderBy {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export type Location = Node & {
  __typename: 'Location';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  lat?: Maybe<Scalars['String']['output']>;
  lon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  /** Reads a single `LocResident` that is related to this `Location`. */
  resident?: Maybe<LocResident>;
  residentId: Scalars['UUID']['output'];
  state?: Maybe<Scalars['String']['output']>;
  /** Reads a single `LocTenant` that is related to this `Location`. */
  tenant?: Maybe<LocTenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Todo`. */
  todos: TodosConnection;
  /** Reads and enables pagination through a set of `Todo`. */
  todosList: Array<Todo>;
};


export type LocationTodosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type LocationTodosListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};

/**
 * A condition to be used against `Location` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LocationCondition = {
  /** Checks for equality with the object’s `address1` field. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `address2` field. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `city` field. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `country` field. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `lat` field. */
  lat?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lon` field. */
  lon?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postalCode` field. */
  postalCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `residentId` field. */
  residentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `state` field. */
  state?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `LocationInfo` */
export type LocationInfoInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  lat?: InputMaybe<Scalars['String']['input']>;
  lon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Location` values. */
export type LocationsConnection = {
  __typename: 'LocationsConnection';
  /** A list of edges which contains the `Location` and cursor to aid in pagination. */
  edges: Array<Maybe<LocationsEdge>>;
  /** A list of `Location` objects. */
  nodes: Array<Maybe<Location>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Location` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Location` edge in the connection. */
export type LocationsEdge = {
  __typename: 'LocationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Location` at the end of the edge. */
  node?: Maybe<Location>;
};

/** Methods to use when ordering `Location`. */
export enum LocationsOrderBy {
  Address1Asc = 'ADDRESS1_ASC',
  Address1Desc = 'ADDRESS1_DESC',
  Address2Asc = 'ADDRESS2_ASC',
  Address2Desc = 'ADDRESS2_DESC',
  CityAsc = 'CITY_ASC',
  CityDesc = 'CITY_DESC',
  CountryAsc = 'COUNTRY_ASC',
  CountryDesc = 'COUNTRY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LatAsc = 'LAT_ASC',
  LatDesc = 'LAT_DESC',
  LonAsc = 'LON_ASC',
  LonDesc = 'LON_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PostalCodeAsc = 'POSTAL_CODE_ASC',
  PostalCodeDesc = 'POSTAL_CODE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResidentIdAsc = 'RESIDENT_ID_ASC',
  ResidentIdDesc = 'RESIDENT_ID_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

/** All input for the `makeTemplateFromTodo` mutation. */
export type MakeTemplateFromTodoInput = {
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `makeTemplateFromTodo` mutation. */
export type MakeTemplateFromTodoPayload = {
  __typename: 'MakeTemplateFromTodoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `makeTemplateFromTodo` mutation. */
export type MakeTemplateFromTodoPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

/** All input for the `makeTodoFromTemplate` mutation. */
export type MakeTodoFromTemplateInput = {
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `makeTodoFromTemplate` mutation. */
export type MakeTodoFromTemplatePayload = {
  __typename: 'MakeTodoFromTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `makeTodoFromTemplate` mutation. */
export type MakeTodoFromTemplatePayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

export type Message = Node & {
  __typename: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `MsgResident` that is related to this `Message`. */
  postedByMsgResident?: Maybe<MsgResident>;
  postedByMsgResidentId: Scalars['UUID']['output'];
  status: MessageStatus;
  tags: Array<Maybe<Scalars['String']['output']>>;
  /** Reads a single `MsgTenant` that is related to this `Message`. */
  tenant?: Maybe<MsgTenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads a single `Topic` that is related to this `Message`. */
  topic?: Maybe<Topic>;
  topicId: Scalars['UUID']['output'];
};

/** A condition to be used against `Message` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MessageCondition = {
  /** Checks for equality with the object’s `content` field. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `postedByMsgResidentId` field. */
  postedByMsgResidentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<MessageStatus>;
  /** Checks for equality with the object’s `tags` field. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `topicId` field. */
  topicId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `MessageInfo` */
export type MessageInfoInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  topicId?: InputMaybe<Scalars['UUID']['input']>;
};

export enum MessageStatus {
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Sent = 'SENT'
}

/** A connection to a list of `Message` values. */
export type MessagesConnection = {
  __typename: 'MessagesConnection';
  /** A list of edges which contains the `Message` and cursor to aid in pagination. */
  edges: Array<Maybe<MessagesEdge>>;
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Message` edge in the connection. */
export type MessagesEdge = {
  __typename: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
};

/** Methods to use when ordering `Message`. */
export enum MessagesOrderBy {
  ContentAsc = 'CONTENT_ASC',
  ContentDesc = 'CONTENT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PostedByMsgResidentIdAsc = 'POSTED_BY_MSG_RESIDENT_ID_ASC',
  PostedByMsgResidentIdDesc = 'POSTED_BY_MSG_RESIDENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TopicIdAsc = 'TOPIC_ID_ASC',
  TopicIdDesc = 'TOPIC_ID_DESC'
}

export type Module = Node & {
  __typename: 'Module';
  /** Reads a single `Application` that is related to this `Module`. */
  application?: Maybe<Application>;
  applicationKey: Scalars['String']['output'];
  defaultIconKey?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  ordinal: Scalars['Int']['output'];
  permissionKeys: Array<Maybe<Scalars['String']['output']>>;
  /** Reads and enables pagination through a set of `Tool`. */
  toolsByModuleKey: ToolsConnection;
  /** Reads and enables pagination through a set of `Tool`. */
  toolsByModuleKeyList: Array<Tool>;
};


export type ModuleToolsByModuleKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


export type ModuleToolsByModuleKeyListArgs = {
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};

/** A condition to be used against `Module` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ModuleCondition = {
  /** Checks for equality with the object’s `applicationKey` field. */
  applicationKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `defaultIconKey` field. */
  defaultIconKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `ordinal` field. */
  ordinal?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `permissionKeys` field. */
  permissionKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ModuleInfo = {
  __typename: 'ModuleInfo';
  defaultIconKey?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ordinal?: Maybe<Scalars['Int']['output']>;
  permissionKeys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tools?: Maybe<Array<Maybe<ToolInfo>>>;
};

/** A connection to a list of `Module` values. */
export type ModulesConnection = {
  __typename: 'ModulesConnection';
  /** A list of edges which contains the `Module` and cursor to aid in pagination. */
  edges: Array<Maybe<ModulesEdge>>;
  /** A list of `Module` objects. */
  nodes: Array<Maybe<Module>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Module` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Module` edge in the connection. */
export type ModulesEdge = {
  __typename: 'ModulesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Module` at the end of the edge. */
  node?: Maybe<Module>;
};

/** Methods to use when ordering `Module`. */
export enum ModulesOrderBy {
  ApplicationKeyAsc = 'APPLICATION_KEY_ASC',
  ApplicationKeyDesc = 'APPLICATION_KEY_DESC',
  DefaultIconKeyAsc = 'DEFAULT_ICON_KEY_ASC',
  DefaultIconKeyDesc = 'DEFAULT_ICON_KEY_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrdinalAsc = 'ORDINAL_ASC',
  OrdinalDesc = 'ORDINAL_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type MsgResident = Node & {
  __typename: 'MsgResident';
  displayName: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Message`. */
  messagesByPostedByMsgResidentId: MessagesConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByPostedByMsgResidentIdList: Array<Message>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Resident` that is related to this `MsgResident`. */
  resident?: Maybe<Resident>;
  residentId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribers: SubscribersConnection;
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribersList: Array<Subscriber>;
  /** Reads a single `MsgTenant` that is related to this `MsgResident`. */
  tenant?: Maybe<MsgTenant>;
  tenantId: Scalars['UUID']['output'];
};


export type MsgResidentMessagesByPostedByMsgResidentIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type MsgResidentMessagesByPostedByMsgResidentIdListArgs = {
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type MsgResidentSubscribersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


export type MsgResidentSubscribersListArgs = {
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};

/**
 * A condition to be used against `MsgResident` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MsgResidentCondition = {
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `residentId` field. */
  residentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `MsgResident` values. */
export type MsgResidentsConnection = {
  __typename: 'MsgResidentsConnection';
  /** A list of edges which contains the `MsgResident` and cursor to aid in pagination. */
  edges: Array<Maybe<MsgResidentsEdge>>;
  /** A list of `MsgResident` objects. */
  nodes: Array<Maybe<MsgResident>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MsgResident` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `MsgResident` edge in the connection. */
export type MsgResidentsEdge = {
  __typename: 'MsgResidentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `MsgResident` at the end of the edge. */
  node?: Maybe<MsgResident>;
};

/** Methods to use when ordering `MsgResident`. */
export enum MsgResidentsOrderBy {
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResidentIdAsc = 'RESIDENT_ID_ASC',
  ResidentIdDesc = 'RESIDENT_ID_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export type MsgTenant = Node & {
  __typename: 'MsgTenant';
  /** Reads and enables pagination through a set of `Message`. */
  messagesByTenantId: MessagesConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByTenantIdList: Array<Message>;
  /** Reads and enables pagination through a set of `MsgResident`. */
  msgResidentsByTenantId: MsgResidentsConnection;
  /** Reads and enables pagination through a set of `MsgResident`. */
  msgResidentsByTenantIdList: Array<MsgResident>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribersByTenantId: SubscribersConnection;
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribersByTenantIdList: Array<Subscriber>;
  /** Reads a single `Tenant` that is related to this `MsgTenant`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Topic`. */
  topicsByTenantId: TopicsConnection;
  /** Reads and enables pagination through a set of `Topic`. */
  topicsByTenantIdList: Array<Topic>;
};


export type MsgTenantMessagesByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type MsgTenantMessagesByTenantIdListArgs = {
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type MsgTenantMsgResidentsByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgResidentsOrderBy>>;
};


export type MsgTenantMsgResidentsByTenantIdListArgs = {
  condition?: InputMaybe<MsgResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgResidentsOrderBy>>;
};


export type MsgTenantSubscribersByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


export type MsgTenantSubscribersByTenantIdListArgs = {
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


export type MsgTenantTopicsByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TopicCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TopicsOrderBy>>;
};


export type MsgTenantTopicsByTenantIdListArgs = {
  condition?: InputMaybe<TopicCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TopicsOrderBy>>;
};

/**
 * A condition to be used against `MsgTenant` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MsgTenantCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `MsgTenant` values. */
export type MsgTenantsConnection = {
  __typename: 'MsgTenantsConnection';
  /** A list of edges which contains the `MsgTenant` and cursor to aid in pagination. */
  edges: Array<Maybe<MsgTenantsEdge>>;
  /** A list of `MsgTenant` objects. */
  nodes: Array<Maybe<MsgTenant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MsgTenant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `MsgTenant` edge in the connection. */
export type MsgTenantsEdge = {
  __typename: 'MsgTenantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `MsgTenant` at the end of the edge. */
  node?: Maybe<MsgTenant>;
};

/** Methods to use when ordering `MsgTenant`. */
export enum MsgTenantsOrderBy {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename: 'Mutation';
  activateTenant?: Maybe<ActivateTenantPayload>;
  assignTodo?: Maybe<AssignTodoPayload>;
  assumeResidency?: Maybe<AssumeResidencyPayload>;
  becomeSupport?: Maybe<BecomeSupportPayload>;
  blockResident?: Maybe<BlockResidentPayload>;
  cancelProject?: Maybe<CancelProjectPayload>;
  cloneProjectTemplate?: Maybe<CloneProjectTemplatePayload>;
  completeUow?: Maybe<CompleteUowPayload>;
  createLocation?: Maybe<CreateLocationPayload>;
  createTenant?: Maybe<CreateTenantPayload>;
  createTodo?: Maybe<CreateTodoPayload>;
  deactivateSubscriber?: Maybe<DeactivateSubscriberPayload>;
  deactivateTenant?: Maybe<DeactivateTenantPayload>;
  deactivateTenantSubscription?: Maybe<DeactivateTenantSubscriptionPayload>;
  declineInvitation?: Maybe<DeclineInvitationPayload>;
  declineResidency?: Maybe<DeclineResidencyPayload>;
  deleteLocation?: Maybe<DeleteLocationPayload>;
  deleteTodo?: Maybe<DeleteTodoPayload>;
  deleteTopic?: Maybe<DeleteTopicPayload>;
  deleteUow?: Maybe<DeleteUowPayload>;
  errorUow?: Maybe<ErrorUowPayload>;
  exitSupportMode?: Maybe<ExitSupportModePayload>;
  grantUserLicense?: Maybe<GrantUserLicensePayload>;
  incompleteUow?: Maybe<IncompleteUowPayload>;
  joinAddressBook?: Maybe<JoinAddressBookPayload>;
  leaveAddressBook?: Maybe<LeaveAddressBookPayload>;
  makeTemplateFromTodo?: Maybe<MakeTemplateFromTodoPayload>;
  makeTodoFromTemplate?: Maybe<MakeTodoFromTemplatePayload>;
  pauseUow?: Maybe<PauseUowPayload>;
  pinTodo?: Maybe<PinTodoPayload>;
  queueWorkflow?: Maybe<QueueWorkflowPayload>;
  reactivateTenantSubscription?: Maybe<ReactivateTenantSubscriptionPayload>;
  revokeUserLicense?: Maybe<RevokeUserLicensePayload>;
  subscribeTenantToLicensePack?: Maybe<SubscribeTenantToLicensePackPayload>;
  unblockResident?: Maybe<UnblockResidentPayload>;
  unpinTodo?: Maybe<UnpinTodoPayload>;
  updateLocation?: Maybe<UpdateLocationPayload>;
  updateProfile?: Maybe<UpdateProfilePayload>;
  updateTodo?: Maybe<UpdateTodoPayload>;
  updateTodoStatus?: Maybe<UpdateTodoStatusPayload>;
  upsertMessage?: Maybe<UpsertMessagePayload>;
  upsertProject?: Maybe<UpsertProjectPayload>;
  upsertSubscriber?: Maybe<UpsertSubscriberPayload>;
  upsertTopic?: Maybe<UpsertTopicPayload>;
  upsertUow?: Maybe<UpsertUowPayload>;
  waitingUow?: Maybe<WaitingUowPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationActivateTenantArgs = {
  input: ActivateTenantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAssignTodoArgs = {
  input: AssignTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAssumeResidencyArgs = {
  input: AssumeResidencyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationBecomeSupportArgs = {
  input: BecomeSupportInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationBlockResidentArgs = {
  input: BlockResidentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCancelProjectArgs = {
  input: CancelProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCloneProjectTemplateArgs = {
  input: CloneProjectTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCompleteUowArgs = {
  input: CompleteUowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeactivateSubscriberArgs = {
  input: DeactivateSubscriberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeactivateTenantArgs = {
  input: DeactivateTenantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeactivateTenantSubscriptionArgs = {
  input: DeactivateTenantSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeclineInvitationArgs = {
  input: DeclineInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeclineResidencyArgs = {
  input: DeclineResidencyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLocationArgs = {
  input: DeleteLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTopicArgs = {
  input: DeleteTopicInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUowArgs = {
  input: DeleteUowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationErrorUowArgs = {
  input: ErrorUowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationExitSupportModeArgs = {
  input: ExitSupportModeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGrantUserLicenseArgs = {
  input: GrantUserLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationIncompleteUowArgs = {
  input: IncompleteUowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationJoinAddressBookArgs = {
  input: JoinAddressBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLeaveAddressBookArgs = {
  input: LeaveAddressBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMakeTemplateFromTodoArgs = {
  input: MakeTemplateFromTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMakeTodoFromTemplateArgs = {
  input: MakeTodoFromTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPauseUowArgs = {
  input: PauseUowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPinTodoArgs = {
  input: PinTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationQueueWorkflowArgs = {
  input: QueueWorkflowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReactivateTenantSubscriptionArgs = {
  input: ReactivateTenantSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRevokeUserLicenseArgs = {
  input: RevokeUserLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSubscribeTenantToLicensePackArgs = {
  input: SubscribeTenantToLicensePackInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUnblockResidentArgs = {
  input: UnblockResidentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUnpinTodoArgs = {
  input: UnpinTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTodoStatusArgs = {
  input: UpdateTodoStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertMessageArgs = {
  input: UpsertMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertProjectArgs = {
  input: UpsertProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertSubscriberArgs = {
  input: UpsertSubscriberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertTopicArgs = {
  input: UpsertTopicInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUowArgs = {
  input: UpsertUowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationWaitingUowArgs = {
  input: WaitingUowInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** An input for mutations affecting `PagingOption` */
export type PagingOptionInput = {
  itemLimit?: InputMaybe<Scalars['Int']['input']>;
  itemOffset?: InputMaybe<Scalars['Int']['input']>;
  pageOffset?: InputMaybe<Scalars['Int']['input']>;
};

/** All input for the `pauseUow` mutation. */
export type PauseUowInput = {
  _uowId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `pauseUow` mutation. */
export type PauseUowPayload = {
  __typename: 'PauseUowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uow?: Maybe<Uow>;
  /** An edge for our `Uow`. May be used by Relay 1. */
  uowEdge?: Maybe<UowsEdge>;
};


/** The output of our `pauseUow` mutation. */
export type PauseUowPayloadUowEdgeArgs = {
  orderBy?: Array<UowsOrderBy>;
};

export type Permission = Node & {
  __typename: 'Permission';
  key: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `LicenseTypePermission`. */
  licenseTypePermissionsByPermissionKey: LicenseTypePermissionsConnection;
  /** Reads and enables pagination through a set of `LicenseTypePermission`. */
  licenseTypePermissionsByPermissionKeyList: Array<LicenseTypePermission>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};


export type PermissionLicenseTypePermissionsByPermissionKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseTypePermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypePermissionsOrderBy>>;
};


export type PermissionLicenseTypePermissionsByPermissionKeyListArgs = {
  condition?: InputMaybe<LicenseTypePermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypePermissionsOrderBy>>;
};

/**
 * A condition to be used against `Permission` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PermissionCondition = {
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Permission` values. */
export type PermissionsConnection = {
  __typename: 'PermissionsConnection';
  /** A list of edges which contains the `Permission` and cursor to aid in pagination. */
  edges: Array<Maybe<PermissionsEdge>>;
  /** A list of `Permission` objects. */
  nodes: Array<Maybe<Permission>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Permission` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Permission` edge in the connection. */
export type PermissionsEdge = {
  __typename: 'PermissionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Permission` at the end of the edge. */
  node?: Maybe<Permission>;
};

/** Methods to use when ordering `Permission`. */
export enum PermissionsOrderBy {
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `pinTodo` mutation. */
export type PinTodoInput = {
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `pinTodo` mutation. */
export type PinTodoPayload = {
  __typename: 'PinTodoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `pinTodo` mutation. */
export type PinTodoPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

export type Profile = Node & {
  __typename: 'Profile';
  avatarKey?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `License`. */
  licenses: LicensesConnection;
  /** Reads and enables pagination through a set of `License`. */
  licensesList: Array<License>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Resident`. */
  residents: ResidentsConnection;
  /** Reads and enables pagination through a set of `Resident`. */
  residentsByInvitedByProfileId: ResidentsConnection;
  /** Reads and enables pagination through a set of `Resident`. */
  residentsByInvitedByProfileIdList: Array<Resident>;
  /** Reads and enables pagination through a set of `Resident`. */
  residentsList: Array<Resident>;
  status: ProfileStatus;
  updatedAt: Scalars['Datetime']['output'];
};


export type ProfileLicensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type ProfileLicensesListArgs = {
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type ProfileResidentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


export type ProfileResidentsByInvitedByProfileIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


export type ProfileResidentsByInvitedByProfileIdListArgs = {
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


export type ProfileResidentsListArgs = {
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};

export type ProfileClaim = {
  __typename: 'ProfileClaim';
  actualResidentId?: Maybe<Scalars['UUID']['output']>;
  applicationKey?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  profileId?: Maybe<Scalars['UUID']['output']>;
  profileStatus?: Maybe<ProfileStatus>;
  residentId?: Maybe<Scalars['UUID']['output']>;
  tenantId?: Maybe<Scalars['UUID']['output']>;
  tenantName?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `Profile` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProfileCondition = {
  /** Checks for equality with the object’s `avatarKey` field. */
  avatarKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `identifier` field. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isPublic` field. */
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `phone` field. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<ProfileStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum ProfileStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Inactive = 'INACTIVE'
}

/** A connection to a list of `Profile` values. */
export type ProfilesConnection = {
  __typename: 'ProfilesConnection';
  /** A list of edges which contains the `Profile` and cursor to aid in pagination. */
  edges: Array<Maybe<ProfilesEdge>>;
  /** A list of `Profile` objects. */
  nodes: Array<Maybe<Profile>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Profile` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Profile` edge in the connection. */
export type ProfilesEdge = {
  __typename: 'ProfilesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Profile` at the end of the edge. */
  node?: Maybe<Profile>;
};

/** Methods to use when ordering `Profile`. */
export enum ProfilesOrderBy {
  AvatarKeyAsc = 'AVATAR_KEY_ASC',
  AvatarKeyDesc = 'AVATAR_KEY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  IdentifierAsc = 'IDENTIFIER_ASC',
  IdentifierDesc = 'IDENTIFIER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPublicAsc = 'IS_PUBLIC_ASC',
  IsPublicDesc = 'IS_PUBLIC_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  Natural = 'NATURAL',
  PhoneAsc = 'PHONE_ASC',
  PhoneDesc = 'PHONE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Project = Node & {
  __typename: 'Project';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  inputDefinitions: Array<Maybe<WorkflowInputDefinition>>;
  isTemplate: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `ProjectType` that is related to this `Project`. */
  projectType?: Maybe<ProjectType>;
  template?: Maybe<Project>;
  tenantId: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  uowId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `Uow`. */
  uows: UowsConnection;
  /** Reads and enables pagination through a set of `Uow`. */
  uowsList: Array<Uow>;
  updatedAt: Scalars['Datetime']['output'];
  workflowData: Scalars['JSON']['output'];
};


export type ProjectUowsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UowCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowsOrderBy>>;
};


export type ProjectUowsListArgs = {
  condition?: InputMaybe<UowCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowsOrderBy>>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `identifier` field. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `inputDefinitions` field. */
  inputDefinitions?: InputMaybe<Array<InputMaybe<WorkflowInputDefinitionInput>>>;
  /** Checks for equality with the object’s `isTemplate` field. */
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `uowId` field. */
  uowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `workflowData` field. */
  workflowData?: InputMaybe<Scalars['JSON']['input']>;
};

/** An input for mutations affecting `ProjectInfo` */
export type ProjectInfoInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  inputDefinitions?: InputMaybe<Array<InputMaybe<WorkflowInputDefinitionInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  onCompletedWorkflowHandlerKey?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uowDependencies?: InputMaybe<Array<InputMaybe<UowDependencyInfoInput>>>;
  uows?: InputMaybe<Array<InputMaybe<UowInfoInput>>>;
};

export type ProjectRole = Node & {
  __typename: 'ProjectRole';
  config: Scalars['JSON']['output'];
  id: Scalars['UUID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/**
 * A condition to be used against `ProjectRole` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ProjectRoleCondition = {
  /** Checks for equality with the object’s `config` field. */
  config?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `ProjectRole` values. */
export type ProjectRolesConnection = {
  __typename: 'ProjectRolesConnection';
  /** A list of edges which contains the `ProjectRole` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectRolesEdge>>;
  /** A list of `ProjectRole` objects. */
  nodes: Array<Maybe<ProjectRole>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectRole` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ProjectRole` edge in the connection. */
export type ProjectRolesEdge = {
  __typename: 'ProjectRolesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ProjectRole` at the end of the edge. */
  node?: Maybe<ProjectRole>;
};

/** Methods to use when ordering `ProjectRole`. */
export enum ProjectRolesOrderBy {
  ConfigAsc = 'CONFIG_ASC',
  ConfigDesc = 'CONFIG_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ProjectType = Node & {
  __typename: 'ProjectType';
  id: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Project`. */
  projectsByType: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByTypeList: Array<Project>;
};


export type ProjectTypeProjectsByTypeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


export type ProjectTypeProjectsByTypeListArgs = {
  condition?: InputMaybe<ProjectCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/**
 * A condition to be used against `ProjectType` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ProjectTypeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `ProjectType` values. */
export type ProjectTypesConnection = {
  __typename: 'ProjectTypesConnection';
  /** A list of edges which contains the `ProjectType` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectTypesEdge>>;
  /** A list of `ProjectType` objects. */
  nodes: Array<Maybe<ProjectType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ProjectType` edge in the connection. */
export type ProjectTypesEdge = {
  __typename: 'ProjectTypesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ProjectType` at the end of the edge. */
  node?: Maybe<ProjectType>;
};

/** Methods to use when ordering `ProjectType`. */
export enum ProjectTypesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Project` values. */
export type ProjectsConnection = {
  __typename: 'ProjectsConnection';
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectsEdge>>;
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Project` edge in the connection. */
export type ProjectsEdge = {
  __typename: 'ProjectsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdentifierAsc = 'IDENTIFIER_ASC',
  IdentifierDesc = 'IDENTIFIER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsTemplateAsc = 'IS_TEMPLATE_ASC',
  IsTemplateDesc = 'IS_TEMPLATE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UowIdAsc = 'UOW_ID_ASC',
  UowIdDesc = 'UOW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkflowDataAsc = 'WORKFLOW_DATA_ASC',
  WorkflowDataDesc = 'WORKFLOW_DATA_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename: 'Query';
  /** Get a single `AppSetting`. */
  appSetting?: Maybe<AppSetting>;
  /** Reads a single `AppSetting` using its globally unique `ID`. */
  appSettingByNodeId?: Maybe<AppSetting>;
  /** Reads and enables pagination through a set of `AppSetting`. */
  appSettings?: Maybe<AppSettingsConnection>;
  /** Reads a set of `AppSetting`. */
  appSettingsList?: Maybe<Array<AppSetting>>;
  /** Get a single `Application`. */
  application?: Maybe<Application>;
  /** Reads a single `Application` using its globally unique `ID`. */
  applicationByNodeId?: Maybe<Application>;
  /** Reads and enables pagination through a set of `Application`. */
  applications?: Maybe<ApplicationsConnection>;
  /** Reads a set of `Application`. */
  applicationsList?: Maybe<Array<Application>>;
  availableModules?: Maybe<Array<Maybe<ModuleInfo>>>;
  currentProfileClaims?: Maybe<ProfileClaim>;
  /** Reads and enables pagination through a set of `Resident`. */
  demoProfileResidencies?: Maybe<ResidentsConnection>;
  demoProfileResidenciesList?: Maybe<Array<Maybe<Resident>>>;
  /** Reads and enables pagination through a set of `AbListing`. */
  getAbListings?: Maybe<AbListingsConnection>;
  getAbListingsList?: Maybe<Array<Maybe<AbListing>>>;
  getMyself?: Maybe<Profile>;
  /** Get a single `License`. */
  license?: Maybe<License>;
  /** Reads a single `License` using its globally unique `ID`. */
  licenseByNodeId?: Maybe<License>;
  /** Get a single `License`. */
  licenseByResidentIdAndLicenseTypeKey?: Maybe<License>;
  /** Get a single `LicensePack`. */
  licensePack?: Maybe<LicensePack>;
  /** Reads a single `LicensePack` using its globally unique `ID`. */
  licensePackByNodeId?: Maybe<LicensePack>;
  /** Get a single `LicensePackLicenseType`. */
  licensePackLicenseType?: Maybe<LicensePackLicenseType>;
  /** Get a single `LicensePackLicenseType`. */
  licensePackLicenseTypeByLicensePackKeyAndLicenseTypeKey?: Maybe<LicensePackLicenseType>;
  /** Reads a single `LicensePackLicenseType` using its globally unique `ID`. */
  licensePackLicenseTypeByNodeId?: Maybe<LicensePackLicenseType>;
  /** Reads and enables pagination through a set of `LicensePackLicenseType`. */
  licensePackLicenseTypes?: Maybe<LicensePackLicenseTypesConnection>;
  /** Reads a set of `LicensePackLicenseType`. */
  licensePackLicenseTypesList?: Maybe<Array<LicensePackLicenseType>>;
  /** Reads and enables pagination through a set of `LicensePack`. */
  licensePacks?: Maybe<LicensePacksConnection>;
  /** Reads a set of `LicensePack`. */
  licensePacksList?: Maybe<Array<LicensePack>>;
  /** Get a single `LicenseType`. */
  licenseType?: Maybe<LicenseType>;
  /** Reads a single `LicenseType` using its globally unique `ID`. */
  licenseTypeByNodeId?: Maybe<LicenseType>;
  /** Get a single `LicenseTypePermission`. */
  licenseTypePermissionByLicenseTypeKeyAndPermissionKey?: Maybe<LicenseTypePermission>;
  /** Reads and enables pagination through a set of `LicenseTypePermission`. */
  licenseTypePermissions?: Maybe<LicenseTypePermissionsConnection>;
  /** Reads a set of `LicenseTypePermission`. */
  licenseTypePermissionsList?: Maybe<Array<LicenseTypePermission>>;
  /** Reads and enables pagination through a set of `LicenseType`. */
  licenseTypes?: Maybe<LicenseTypesConnection>;
  /** Reads a set of `LicenseType`. */
  licenseTypesList?: Maybe<Array<LicenseType>>;
  /** Reads and enables pagination through a set of `License`. */
  licenses?: Maybe<LicensesConnection>;
  /** Reads a set of `License`. */
  licensesList?: Maybe<Array<License>>;
  /** Get a single `LocResident`. */
  locResident?: Maybe<LocResident>;
  /** Reads a single `LocResident` using its globally unique `ID`. */
  locResidentByNodeId?: Maybe<LocResident>;
  /** Reads and enables pagination through a set of `LocResident`. */
  locResidents?: Maybe<LocResidentsConnection>;
  /** Reads a set of `LocResident`. */
  locResidentsList?: Maybe<Array<LocResident>>;
  /** Get a single `LocTenant`. */
  locTenant?: Maybe<LocTenant>;
  /** Reads a single `LocTenant` using its globally unique `ID`. */
  locTenantByNodeId?: Maybe<LocTenant>;
  /** Reads and enables pagination through a set of `LocTenant`. */
  locTenants?: Maybe<LocTenantsConnection>;
  /** Reads a set of `LocTenant`. */
  locTenantsList?: Maybe<Array<LocTenant>>;
  /** Get a single `Location`. */
  location?: Maybe<Location>;
  /** Reads a single `Location` using its globally unique `ID`. */
  locationByNodeId?: Maybe<Location>;
  /** Reads and enables pagination through a set of `Location`. */
  locations?: Maybe<LocationsConnection>;
  /** Reads a set of `Location`. */
  locationsList?: Maybe<Array<Location>>;
  /** Get a single `Message`. */
  message?: Maybe<Message>;
  /** Reads a single `Message` using its globally unique `ID`. */
  messageByNodeId?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messages?: Maybe<MessagesConnection>;
  /** Reads a set of `Message`. */
  messagesList?: Maybe<Array<Message>>;
  /** Get a single `Module`. */
  module?: Maybe<Module>;
  /** Reads a single `Module` using its globally unique `ID`. */
  moduleByNodeId?: Maybe<Module>;
  /** Reads and enables pagination through a set of `Module`. */
  modules?: Maybe<ModulesConnection>;
  /** Reads a set of `Module`. */
  modulesList?: Maybe<Array<Module>>;
  /** Get a single `MsgResident`. */
  msgResident?: Maybe<MsgResident>;
  /** Reads a single `MsgResident` using its globally unique `ID`. */
  msgResidentByNodeId?: Maybe<MsgResident>;
  /** Reads and enables pagination through a set of `MsgResident`. */
  msgResidents?: Maybe<MsgResidentsConnection>;
  /** Reads a set of `MsgResident`. */
  msgResidentsList?: Maybe<Array<MsgResident>>;
  /** Get a single `MsgTenant`. */
  msgTenant?: Maybe<MsgTenant>;
  /** Reads a single `MsgTenant` using its globally unique `ID`. */
  msgTenantByNodeId?: Maybe<MsgTenant>;
  /** Reads and enables pagination through a set of `MsgTenant`. */
  msgTenants?: Maybe<MsgTenantsConnection>;
  /** Reads a set of `MsgTenant`. */
  msgTenantsList?: Maybe<Array<MsgTenant>>;
  /** Reads and enables pagination through a set of `Resident`. */
  myProfileResidencies?: Maybe<ResidentsConnection>;
  myProfileResidenciesList?: Maybe<Array<Maybe<Resident>>>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /** Get a single `Permission`. */
  permission?: Maybe<Permission>;
  /** Reads a single `Permission` using its globally unique `ID`. */
  permissionByNodeId?: Maybe<Permission>;
  /** Reads and enables pagination through a set of `Permission`. */
  permissions?: Maybe<PermissionsConnection>;
  /** Reads a set of `Permission`. */
  permissionsList?: Maybe<Array<Permission>>;
  /** Get a single `Profile`. */
  profile?: Maybe<Profile>;
  /** Get a single `Profile`. */
  profileByDisplayName?: Maybe<Profile>;
  /** Get a single `Profile`. */
  profileByEmail?: Maybe<Profile>;
  /** Get a single `Profile`. */
  profileByIdentifier?: Maybe<Profile>;
  /** Reads a single `Profile` using its globally unique `ID`. */
  profileByNodeId?: Maybe<Profile>;
  /** Reads and enables pagination through a set of `Profile`. */
  profiles?: Maybe<ProfilesConnection>;
  /** Reads a set of `Profile`. */
  profilesList?: Maybe<Array<Profile>>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectByNodeId?: Maybe<Project>;
  /** Get a single `ProjectRole`. */
  projectRole?: Maybe<ProjectRole>;
  /** Reads a single `ProjectRole` using its globally unique `ID`. */
  projectRoleByNodeId?: Maybe<ProjectRole>;
  /** Reads and enables pagination through a set of `ProjectRole`. */
  projectRoles?: Maybe<ProjectRolesConnection>;
  /** Reads a set of `ProjectRole`. */
  projectRolesList?: Maybe<Array<ProjectRole>>;
  /** Get a single `ProjectType`. */
  projectType?: Maybe<ProjectType>;
  /** Reads a single `ProjectType` using its globally unique `ID`. */
  projectTypeByNodeId?: Maybe<ProjectType>;
  /** Reads and enables pagination through a set of `ProjectType`. */
  projectTypes?: Maybe<ProjectTypesConnection>;
  /** Reads a set of `ProjectType`. */
  projectTypesList?: Maybe<Array<ProjectType>>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectsConnection>;
  /** Reads a set of `Project`. */
  projectsList?: Maybe<Array<Project>>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `Resident`. */
  resident?: Maybe<Resident>;
  /** Reads a single `Resident` using its globally unique `ID`. */
  residentByNodeId?: Maybe<Resident>;
  /** Get a single `Resident`. */
  residentByTenantIdAndProfileIdAndType?: Maybe<Resident>;
  /** Reads and enables pagination through a set of `Resident`. */
  residents?: Maybe<ResidentsConnection>;
  /** Reads a set of `Resident`. */
  residentsList?: Maybe<Array<Resident>>;
  /** Reads and enables pagination through a set of `Profile`. */
  searchProfiles?: Maybe<ProfilesConnection>;
  searchProfilesList?: Maybe<Array<Maybe<Profile>>>;
  /** Reads and enables pagination through a set of `Project`. */
  searchProjects?: Maybe<ProjectsConnection>;
  searchProjectsList?: Maybe<Array<Maybe<Project>>>;
  /** Reads and enables pagination through a set of `Resident`. */
  searchResidents?: Maybe<ResidentsConnection>;
  searchResidentsList?: Maybe<Array<Maybe<Resident>>>;
  /** Reads and enables pagination through a set of `Tenant`. */
  searchTenants?: Maybe<TenantsConnection>;
  searchTenantsList?: Maybe<Array<Maybe<Tenant>>>;
  /** Reads and enables pagination through a set of `Todo`. */
  searchTodos?: Maybe<TodosConnection>;
  searchTodosList?: Maybe<Array<Maybe<Todo>>>;
  siteUserById?: Maybe<Scalars['JSON']['output']>;
  /** Get a single `Subscriber`. */
  subscriber?: Maybe<Subscriber>;
  /** Reads a single `Subscriber` using its globally unique `ID`. */
  subscriberByNodeId?: Maybe<Subscriber>;
  /** Get a single `Subscriber`. */
  subscriberByTopicIdAndMsgResidentId?: Maybe<Subscriber>;
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribers?: Maybe<SubscribersConnection>;
  /** Reads a set of `Subscriber`. */
  subscribersList?: Maybe<Array<Subscriber>>;
  /** Get a single `Tenant`. */
  tenant?: Maybe<Tenant>;
  /** Get a single `Tenant`. */
  tenantByIdentifier?: Maybe<Tenant>;
  /** Get a single `Tenant`. */
  tenantByName?: Maybe<Tenant>;
  /** Reads a single `Tenant` using its globally unique `ID`. */
  tenantByNodeId?: Maybe<Tenant>;
  /** Reads and enables pagination through a set of `License`. */
  tenantLicenses?: Maybe<LicensesConnection>;
  tenantLicensesList?: Maybe<Array<Maybe<License>>>;
  /** Reads and enables pagination through a set of `Resident`. */
  tenantProfileResidencies?: Maybe<ResidentsConnection>;
  tenantProfileResidenciesList?: Maybe<Array<Maybe<Resident>>>;
  /** Get a single `TenantSubscription`. */
  tenantSubscription?: Maybe<TenantSubscription>;
  /** Reads a single `TenantSubscription` using its globally unique `ID`. */
  tenantSubscriptionByNodeId?: Maybe<TenantSubscription>;
  /** Reads and enables pagination through a set of `TenantSubscription`. */
  tenantSubscriptions?: Maybe<TenantSubscriptionsConnection>;
  /** Reads a set of `TenantSubscription`. */
  tenantSubscriptionsList?: Maybe<Array<TenantSubscription>>;
  /** Reads and enables pagination through a set of `Tenant`. */
  tenants?: Maybe<TenantsConnection>;
  /** Reads a set of `Tenant`. */
  tenantsList?: Maybe<Array<Tenant>>;
  /** Get a single `Thing`. */
  thing?: Maybe<Thing>;
  /** Reads a single `Thing` using its globally unique `ID`. */
  thingByNodeId?: Maybe<Thing>;
  /** Reads and enables pagination through a set of `Thing`. */
  things?: Maybe<ThingsConnection>;
  /** Reads a set of `Thing`. */
  thingsList?: Maybe<Array<Thing>>;
  throwError?: Maybe<Scalars['Boolean']['output']>;
  /** Get a single `Todo`. */
  todo?: Maybe<Todo>;
  /** Reads a single `Todo` using its globally unique `ID`. */
  todoByNodeId?: Maybe<Todo>;
  /** Get a single `TodoResident`. */
  todoResident?: Maybe<TodoResident>;
  /** Reads a single `TodoResident` using its globally unique `ID`. */
  todoResidentByNodeId?: Maybe<TodoResident>;
  /** Reads and enables pagination through a set of `TodoResident`. */
  todoResidents?: Maybe<TodoResidentsConnection>;
  /** Reads a set of `TodoResident`. */
  todoResidentsList?: Maybe<Array<TodoResident>>;
  /** Get a single `TodoTenant`. */
  todoTenant?: Maybe<TodoTenant>;
  /** Reads a single `TodoTenant` using its globally unique `ID`. */
  todoTenantByNodeId?: Maybe<TodoTenant>;
  /** Reads and enables pagination through a set of `TodoTenant`. */
  todoTenants?: Maybe<TodoTenantsConnection>;
  /** Reads a set of `TodoTenant`. */
  todoTenantsList?: Maybe<Array<TodoTenant>>;
  /** Reads and enables pagination through a set of `Todo`. */
  todos?: Maybe<TodosConnection>;
  /** Reads a set of `Todo`. */
  todosList?: Maybe<Array<Todo>>;
  /** Get a single `Tool`. */
  tool?: Maybe<Tool>;
  /** Reads a single `Tool` using its globally unique `ID`. */
  toolByNodeId?: Maybe<Tool>;
  /** Reads and enables pagination through a set of `Tool`. */
  tools?: Maybe<ToolsConnection>;
  /** Reads a set of `Tool`. */
  toolsList?: Maybe<Array<Tool>>;
  /** Get a single `Topic`. */
  topic?: Maybe<Topic>;
  /** Reads a single `Topic` using its globally unique `ID`. */
  topicByNodeId?: Maybe<Topic>;
  /** Reads and enables pagination through a set of `Topic`. */
  topics?: Maybe<TopicsConnection>;
  /** Reads a set of `Topic`. */
  topicsList?: Maybe<Array<Topic>>;
  /** Get a single `Uow`. */
  uow?: Maybe<Uow>;
  /** Reads a single `Uow` using its globally unique `ID`. */
  uowByNodeId?: Maybe<Uow>;
  uowByProjectAndIdentifier?: Maybe<Uow>;
  /** Reads and enables pagination through a set of `UowDependency`. */
  uowDependencies?: Maybe<UowDependenciesConnection>;
  /** Reads a set of `UowDependency`. */
  uowDependenciesList?: Maybe<Array<UowDependency>>;
  /** Get a single `UowDependency`. */
  uowDependency?: Maybe<UowDependency>;
  /** Reads a single `UowDependency` using its globally unique `ID`. */
  uowDependencyByNodeId?: Maybe<UowDependency>;
  /** Reads and enables pagination through a set of `Uow`. */
  uows?: Maybe<UowsConnection>;
  /** Reads a set of `Uow`. */
  uowsList?: Maybe<Array<Uow>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppSettingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppSettingsListArgs = {
  condition?: InputMaybe<AppSettingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppSettingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ApplicationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApplicationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationsListArgs = {
  condition?: InputMaybe<ApplicationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApplicationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDemoProfileResidenciesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDemoProfileResidenciesListArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetAbListingsArgs = {
  _profileId?: InputMaybe<Scalars['UUID']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetAbListingsListArgs = {
  _profileId?: InputMaybe<Scalars['UUID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseByResidentIdAndLicenseTypeKeyArgs = {
  licenseTypeKey: Scalars['String']['input'];
  residentId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackLicenseTypeArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackLicenseTypeByLicensePackKeyAndLicenseTypeKeyArgs = {
  licensePackKey: Scalars['String']['input'];
  licenseTypeKey: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackLicenseTypeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackLicenseTypesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicensePackLicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePackLicenseTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePackLicenseTypesListArgs = {
  condition?: InputMaybe<LicensePackLicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePackLicenseTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePacksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicensePackCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePacksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensePacksListArgs = {
  condition?: InputMaybe<LicensePackCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensePacksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypeArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypePermissionByLicenseTypeKeyAndPermissionKeyArgs = {
  licenseTypeKey: Scalars['String']['input'];
  permissionKey: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypePermissionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseTypePermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypePermissionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypePermissionsListArgs = {
  condition?: InputMaybe<LicenseTypePermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypePermissionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicenseTypesListArgs = {
  condition?: InputMaybe<LicenseTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicenseTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLicensesListArgs = {
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocResidentArgs = {
  residentId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocResidentByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocResidentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LocResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocResidentsListArgs = {
  condition?: InputMaybe<LocResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocTenantArgs = {
  tenantId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocTenantByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocTenantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LocTenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocTenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocTenantsListArgs = {
  condition?: InputMaybe<LocTenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocTenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationsListArgs = {
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMessagesListArgs = {
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryModuleArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryModuleByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryModulesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ModuleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ModulesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryModulesListArgs = {
  condition?: InputMaybe<ModuleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ModulesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgResidentArgs = {
  residentId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgResidentByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgResidentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgResidentsListArgs = {
  condition?: InputMaybe<MsgResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgTenantArgs = {
  tenantId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgTenantByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgTenantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgTenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgTenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgTenantsListArgs = {
  condition?: InputMaybe<MsgTenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgTenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMyProfileResidenciesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMyProfileResidenciesListArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPermissionArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPermissionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPermissionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PermissionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPermissionsListArgs = {
  condition?: InputMaybe<PermissionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PermissionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileByDisplayNameArgs = {
  displayName: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileByEmailArgs = {
  email: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileByIdentifierArgs = {
  identifier: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfilesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProfileCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProfilesListArgs = {
  condition?: InputMaybe<ProfileCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectRoleArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectRoleByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectRolesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectRoleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectRolesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectRolesListArgs = {
  condition?: InputMaybe<ProjectRoleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectRolesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectTypeArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectTypeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectTypesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectTypesListArgs = {
  condition?: InputMaybe<ProjectTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsListArgs = {
  condition?: InputMaybe<ProjectCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryResidentArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryResidentByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryResidentByTenantIdAndProfileIdAndTypeArgs = {
  profileId: Scalars['UUID']['input'];
  tenantId: Scalars['UUID']['input'];
  type: ResidentType;
};


/** The root query type which gives access points into the data universe. */
export type QueryResidentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryResidentsListArgs = {
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchProfilesArgs = {
  _options?: InputMaybe<SearchProfilesOptionInput>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchProfilesListArgs = {
  _options?: InputMaybe<SearchProfilesOptionInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchProjectsArgs = {
  _options?: InputMaybe<SearchProjectsOptionInput>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchProjectsListArgs = {
  _options?: InputMaybe<SearchProjectsOptionInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchResidentsArgs = {
  _options?: InputMaybe<SearchResidentsOptionInput>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchResidentsListArgs = {
  _options?: InputMaybe<SearchResidentsOptionInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchTenantsArgs = {
  _options?: InputMaybe<SearchTenantsOptionInput>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchTenantsListArgs = {
  _options?: InputMaybe<SearchTenantsOptionInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchTodosArgs = {
  _options?: InputMaybe<SearchTodosOptionInput>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySearchTodosListArgs = {
  _options?: InputMaybe<SearchTodosOptionInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySiteUserByIdArgs = {
  _id?: InputMaybe<Scalars['UUID']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscriberArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscriberByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscriberByTopicIdAndMsgResidentIdArgs = {
  msgResidentId: Scalars['UUID']['input'];
  topicId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscribersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscribersListArgs = {
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantByIdentifierArgs = {
  identifier: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantLicensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantLicensesListArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantProfileResidenciesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantProfileResidenciesListArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantSubscriptionArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantSubscriptionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantSubscriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TenantSubscriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantSubscriptionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantSubscriptionsListArgs = {
  condition?: InputMaybe<TenantSubscriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantSubscriptionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantsListArgs = {
  condition?: InputMaybe<TenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryThingArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryThingByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryThingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ThingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ThingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryThingsListArgs = {
  condition?: InputMaybe<ThingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ThingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryThrowErrorArgs = {
  _message?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoResidentArgs = {
  residentId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoResidentByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoResidentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodoResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoResidentsListArgs = {
  condition?: InputMaybe<TodoResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodoResidentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoTenantArgs = {
  tenantId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoTenantByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoTenantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoTenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodoTenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoTenantsListArgs = {
  condition?: InputMaybe<TodoTenantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodoTenantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTodosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTodosListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryToolArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryToolByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryToolsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryToolsListArgs = {
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTopicArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTopicByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTopicsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TopicCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TopicsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTopicsListArgs = {
  condition?: InputMaybe<TopicCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TopicsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUowArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUowByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUowByProjectAndIdentifierArgs = {
  _identifier?: InputMaybe<Scalars['String']['input']>;
  _projectId?: InputMaybe<Scalars['UUID']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUowDependenciesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UowDependencyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowDependenciesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUowDependenciesListArgs = {
  condition?: InputMaybe<UowDependencyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowDependenciesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUowDependencyArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUowDependencyByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUowsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UowCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUowsListArgs = {
  condition?: InputMaybe<UowCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowsOrderBy>>;
};

/** All input for the `queueWorkflow` mutation. */
export type QueueWorkflowInput = {
  _identifier?: InputMaybe<Scalars['String']['input']>;
  _workflowInputData?: InputMaybe<Scalars['JSON']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `queueWorkflow` mutation. */
export type QueueWorkflowPayload = {
  __typename: 'QueueWorkflowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  json?: Maybe<Scalars['JSON']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `reactivateTenantSubscription` mutation. */
export type ReactivateTenantSubscriptionInput = {
  _tenantSubscriptionId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `reactivateTenantSubscription` mutation. */
export type ReactivateTenantSubscriptionPayload = {
  __typename: 'ReactivateTenantSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `LicensePack` that is related to this `TenantSubscription`. */
  licensePack?: Maybe<LicensePack>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tenant` that is related to this `TenantSubscription`. */
  tenant?: Maybe<Tenant>;
  tenantSubscription?: Maybe<TenantSubscription>;
  /** An edge for our `TenantSubscription`. May be used by Relay 1. */
  tenantSubscriptionEdge?: Maybe<TenantSubscriptionsEdge>;
};


/** The output of our `reactivateTenantSubscription` mutation. */
export type ReactivateTenantSubscriptionPayloadTenantSubscriptionEdgeArgs = {
  orderBy?: Array<TenantSubscriptionsOrderBy>;
};

export type Resident = Node & {
  __typename: 'Resident';
  createdAt: Scalars['Datetime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  invitedByDisplayName?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  invitedByProfileId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `License`. */
  licenses: LicensesConnection;
  /** Reads and enables pagination through a set of `License`. */
  licensesList: Array<License>;
  /** Reads a single `LocResident` that is related to this `Resident`. */
  locResident?: Maybe<LocResident>;
  /** Reads a single `MsgResident` that is related to this `Resident`. */
  msgResident?: Maybe<MsgResident>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['UUID']['output']>;
  status: ResidentStatus;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
  tenantName: Scalars['String']['output'];
  /** Reads a single `TodoResident` that is related to this `Resident`. */
  todoResident?: Maybe<TodoResident>;
  type: ResidentType;
  updatedAt: Scalars['Datetime']['output'];
};


export type ResidentLicensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type ResidentLicensesListArgs = {
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};

/**
 * A condition to be used against `Resident` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ResidentCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `invitedByDisplayName` field. */
  invitedByDisplayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `invitedByProfileId` field. */
  invitedByProfileId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<ResidentStatus>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tenantName` field. */
  tenantName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<ResidentType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum ResidentStatus {
  Active = 'ACTIVE',
  BlockedIndividual = 'BLOCKED_INDIVIDUAL',
  BlockedTenant = 'BLOCKED_TENANT',
  Declined = 'DECLINED',
  Inactive = 'INACTIVE',
  Invited = 'INVITED',
  Supporting = 'SUPPORTING'
}

export enum ResidentType {
  Guest = 'GUEST',
  Home = 'HOME',
  Support = 'SUPPORT'
}

/** A connection to a list of `Resident` values. */
export type ResidentsConnection = {
  __typename: 'ResidentsConnection';
  /** A list of edges which contains the `Resident` and cursor to aid in pagination. */
  edges: Array<Maybe<ResidentsEdge>>;
  /** A list of `Resident` objects. */
  nodes: Array<Maybe<Resident>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Resident` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Resident` edge in the connection. */
export type ResidentsEdge = {
  __typename: 'ResidentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Resident` at the end of the edge. */
  node?: Maybe<Resident>;
};

/** Methods to use when ordering `Resident`. */
export enum ResidentsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InvitedByDisplayNameAsc = 'INVITED_BY_DISPLAY_NAME_ASC',
  InvitedByDisplayNameDesc = 'INVITED_BY_DISPLAY_NAME_DESC',
  InvitedByProfileIdAsc = 'INVITED_BY_PROFILE_ID_ASC',
  InvitedByProfileIdDesc = 'INVITED_BY_PROFILE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TenantNameAsc = 'TENANT_NAME_ASC',
  TenantNameDesc = 'TENANT_NAME_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** All input for the `revokeUserLicense` mutation. */
export type RevokeUserLicenseInput = {
  _licenseId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `revokeUserLicense` mutation. */
export type RevokeUserLicensePayload = {
  __typename: 'RevokeUserLicensePayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** An input for mutations affecting `SearchProfilesOption` */
export type SearchProfilesOptionInput = {
  pagingOptions?: InputMaybe<PagingOptionInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProfileStatus>;
};

/** An input for mutations affecting `SearchProjectsOption` */
export type SearchProjectsOptionInput = {
  dateRangeEnd?: InputMaybe<Scalars['Date']['input']>;
  dateRangeStart?: InputMaybe<Scalars['Date']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  projectType?: InputMaybe<Scalars['String']['input']>;
  projectUowStatus?: InputMaybe<UowStatusType>;
  resultLimit?: InputMaybe<Scalars['Int']['input']>;
  searchTerms?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `SearchResidentsOption` */
export type SearchResidentsOptionInput = {
  pagingOptions?: InputMaybe<PagingOptionInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ResidentStatus>;
};

/** An input for mutations affecting `SearchTenantsOption` */
export type SearchTenantsOptionInput = {
  pagingOptions?: InputMaybe<PagingOptionInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TenantStatus>;
  type?: InputMaybe<TenantType>;
};

/** An input for mutations affecting `SearchTodosOption` */
export type SearchTodosOptionInput = {
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  pagingOptions?: InputMaybe<PagingOptionInput>;
  rootsOnly?: InputMaybe<Scalars['Boolean']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  todoStatus?: InputMaybe<TodoStatus>;
  todoType?: InputMaybe<TodoType>;
};

/** All input for the `subscribeTenantToLicensePack` mutation. */
export type SubscribeTenantToLicensePackInput = {
  _licensePackKey?: InputMaybe<Scalars['String']['input']>;
  _tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `subscribeTenantToLicensePack` mutation. */
export type SubscribeTenantToLicensePackPayload = {
  __typename: 'SubscribeTenantToLicensePackPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `LicensePack` that is related to this `TenantSubscription`. */
  licensePack?: Maybe<LicensePack>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tenant` that is related to this `TenantSubscription`. */
  tenant?: Maybe<Tenant>;
  tenantSubscription?: Maybe<TenantSubscription>;
  /** An edge for our `TenantSubscription`. May be used by Relay 1. */
  tenantSubscriptionEdge?: Maybe<TenantSubscriptionsEdge>;
};


/** The output of our `subscribeTenantToLicensePack` mutation. */
export type SubscribeTenantToLicensePackPayloadTenantSubscriptionEdgeArgs = {
  orderBy?: Array<TenantSubscriptionsOrderBy>;
};

export type Subscriber = Node & {
  __typename: 'Subscriber';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  lastRead: Scalars['Datetime']['output'];
  /** Reads a single `MsgResident` that is related to this `Subscriber`. */
  msgResident?: Maybe<MsgResident>;
  msgResidentId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  status: SubscriberStatus;
  /** Reads a single `MsgTenant` that is related to this `Subscriber`. */
  tenant?: Maybe<MsgTenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads a single `Topic` that is related to this `Subscriber`. */
  topic?: Maybe<Topic>;
  topicId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `Subscriber` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SubscriberCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `lastRead` field. */
  lastRead?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `msgResidentId` field. */
  msgResidentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<SubscriberStatus>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `topicId` field. */
  topicId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `SubscriberInfo` */
export type SubscriberInfoInput = {
  msgResidentId?: InputMaybe<Scalars['UUID']['input']>;
  topicId?: InputMaybe<Scalars['UUID']['input']>;
};

export enum SubscriberStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Inactive = 'INACTIVE'
}

/** A connection to a list of `Subscriber` values. */
export type SubscribersConnection = {
  __typename: 'SubscribersConnection';
  /** A list of edges which contains the `Subscriber` and cursor to aid in pagination. */
  edges: Array<Maybe<SubscribersEdge>>;
  /** A list of `Subscriber` objects. */
  nodes: Array<Maybe<Subscriber>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Subscriber` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Subscriber` edge in the connection. */
export type SubscribersEdge = {
  __typename: 'SubscribersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Subscriber` at the end of the edge. */
  node?: Maybe<Subscriber>;
};

/** Methods to use when ordering `Subscriber`. */
export enum SubscribersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastReadAsc = 'LAST_READ_ASC',
  LastReadDesc = 'LAST_READ_DESC',
  MsgResidentIdAsc = 'MSG_RESIDENT_ID_ASC',
  MsgResidentIdDesc = 'MSG_RESIDENT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TopicIdAsc = 'TOPIC_ID_ASC',
  TopicIdDesc = 'TOPIC_ID_DESC'
}

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename: 'Subscription';
  topicMessage?: Maybe<TopicMessageSubscriptionPayload>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionTopicMessageArgs = {
  topicId: Scalars['UUID']['input'];
};

export type Tenant = Node & {
  __typename: 'Tenant';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `License`. */
  licenses: LicensesConnection;
  /** Reads and enables pagination through a set of `License`. */
  licensesList: Array<License>;
  /** Reads a single `LocTenant` that is related to this `Tenant`. */
  locTenant?: Maybe<LocTenant>;
  /** Reads a single `MsgTenant` that is related to this `Tenant`. */
  msgTenant?: Maybe<MsgTenant>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Resident`. */
  residents: ResidentsConnection;
  /** Reads and enables pagination through a set of `Resident`. */
  residentsList: Array<Resident>;
  status: TenantStatus;
  /** Reads and enables pagination through a set of `TenantSubscription`. */
  tenantSubscriptions: TenantSubscriptionsConnection;
  /** Reads and enables pagination through a set of `TenantSubscription`. */
  tenantSubscriptionsList: Array<TenantSubscription>;
  /** Reads and enables pagination through a set of `Thing`. */
  things: ThingsConnection;
  /** Reads and enables pagination through a set of `Thing`. */
  thingsList: Array<Thing>;
  /** Reads a single `TodoTenant` that is related to this `Tenant`. */
  todoTenant?: Maybe<TodoTenant>;
  type: TenantType;
  updatedAt: Scalars['Datetime']['output'];
};


export type TenantLicensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type TenantLicensesListArgs = {
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type TenantResidentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


export type TenantResidentsListArgs = {
  condition?: InputMaybe<ResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResidentsOrderBy>>;
};


export type TenantTenantSubscriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TenantSubscriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantSubscriptionsOrderBy>>;
};


export type TenantTenantSubscriptionsListArgs = {
  condition?: InputMaybe<TenantSubscriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantSubscriptionsOrderBy>>;
};


export type TenantThingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ThingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ThingsOrderBy>>;
};


export type TenantThingsListArgs = {
  condition?: InputMaybe<ThingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ThingsOrderBy>>;
};

/** A condition to be used against `Tenant` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TenantCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `identifier` field. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TenantStatus>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<TenantType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum TenantStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Paused = 'PAUSED'
}

export type TenantSubscription = Node & {
  __typename: 'TenantSubscription';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Reads a single `LicensePack` that is related to this `TenantSubscription`. */
  licensePack?: Maybe<LicensePack>;
  licensePackKey: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `License`. */
  licenses: LicensesConnection;
  /** Reads and enables pagination through a set of `License`. */
  licensesList: Array<License>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  status: TenantSubscriptionStatus;
  /** Reads a single `Tenant` that is related to this `TenantSubscription`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


export type TenantSubscriptionLicensesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};


export type TenantSubscriptionLicensesListArgs = {
  condition?: InputMaybe<LicenseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LicensesOrderBy>>;
};

/**
 * A condition to be used against `TenantSubscription` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TenantSubscriptionCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `licensePackKey` field. */
  licensePackKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TenantSubscriptionStatus>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum TenantSubscriptionStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** A connection to a list of `TenantSubscription` values. */
export type TenantSubscriptionsConnection = {
  __typename: 'TenantSubscriptionsConnection';
  /** A list of edges which contains the `TenantSubscription` and cursor to aid in pagination. */
  edges: Array<Maybe<TenantSubscriptionsEdge>>;
  /** A list of `TenantSubscription` objects. */
  nodes: Array<Maybe<TenantSubscription>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TenantSubscription` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TenantSubscription` edge in the connection. */
export type TenantSubscriptionsEdge = {
  __typename: 'TenantSubscriptionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TenantSubscription` at the end of the edge. */
  node?: Maybe<TenantSubscription>;
};

/** Methods to use when ordering `TenantSubscription`. */
export enum TenantSubscriptionsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LicensePackKeyAsc = 'LICENSE_PACK_KEY_ASC',
  LicensePackKeyDesc = 'LICENSE_PACK_KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export enum TenantType {
  Anchor = 'ANCHOR',
  Customer = 'CUSTOMER',
  Demo = 'DEMO',
  Test = 'TEST',
  Trial = 'TRIAL'
}

/** A connection to a list of `Tenant` values. */
export type TenantsConnection = {
  __typename: 'TenantsConnection';
  /** A list of edges which contains the `Tenant` and cursor to aid in pagination. */
  edges: Array<Maybe<TenantsEdge>>;
  /** A list of `Tenant` objects. */
  nodes: Array<Maybe<Tenant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tenant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Tenant` edge in the connection. */
export type TenantsEdge = {
  __typename: 'TenantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tenant` at the end of the edge. */
  node?: Maybe<Tenant>;
};

/** Methods to use when ordering `Tenant`. */
export enum TenantsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdentifierAsc = 'IDENTIFIER_ASC',
  IdentifierDesc = 'IDENTIFIER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Thing = Node & {
  __typename: 'Thing';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  status?: Maybe<ThingStatus>;
  /** Reads a single `Tenant` that is related to this `Thing`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
};

/** A condition to be used against `Thing` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ThingCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<ThingStatus>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

export enum ThingStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** A connection to a list of `Thing` values. */
export type ThingsConnection = {
  __typename: 'ThingsConnection';
  /** A list of edges which contains the `Thing` and cursor to aid in pagination. */
  edges: Array<Maybe<ThingsEdge>>;
  /** A list of `Thing` objects. */
  nodes: Array<Maybe<Thing>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Thing` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Thing` edge in the connection. */
export type ThingsEdge = {
  __typename: 'ThingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Thing` at the end of the edge. */
  node?: Maybe<Thing>;
};

/** Methods to use when ordering `Thing`. */
export enum ThingsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export type Todo = Node & {
  __typename: 'Todo';
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isTemplate: Scalars['Boolean']['output'];
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['UUID']['output']>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  ordinal: Scalars['Int']['output'];
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  parentTodoId?: Maybe<Scalars['UUID']['output']>;
  pinned: Scalars['Boolean']['output'];
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  residentId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  rootTodoId: Scalars['UUID']['output'];
  status: TodoStatus;
  tags: Array<Maybe<Scalars['String']['output']>>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Todo`. */
  todosByParentTodoId: TodosConnection;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByParentTodoIdList: Array<Todo>;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByRootTodoId: TodosConnection;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByRootTodoIdList: Array<Todo>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
  topicId: Scalars['UUID']['output'];
  type: TodoType;
  updatedAt: Scalars['Datetime']['output'];
};


export type TodoTodosByParentTodoIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type TodoTodosByParentTodoIdListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type TodoTodosByRootTodoIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type TodoTodosByRootTodoIdListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};

/** A condition to be used against `Todo` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TodoCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isTemplate` field. */
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `locationId` field. */
  locationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `ordinal` field. */
  ordinal?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `parentTodoId` field. */
  parentTodoId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `pinned` field. */
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `residentId` field. */
  residentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rootTodoId` field. */
  rootTodoId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TodoStatus>;
  /** Checks for equality with the object’s `tags` field. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `topicId` field. */
  topicId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<TodoType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type TodoResident = Node & {
  __typename: 'TodoResident';
  displayName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Resident` that is related to this `TodoResident`. */
  resident?: Maybe<Resident>;
  residentId: Scalars['UUID']['output'];
  /** Reads a single `TodoTenant` that is related to this `TodoResident`. */
  tenant?: Maybe<TodoTenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Todo`. */
  todosByResidentId: TodosConnection;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByResidentIdList: Array<Todo>;
};


export type TodoResidentTodosByResidentIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type TodoResidentTodosByResidentIdListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};

/**
 * A condition to be used against `TodoResident` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TodoResidentCondition = {
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `residentId` field. */
  residentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TodoResident` values. */
export type TodoResidentsConnection = {
  __typename: 'TodoResidentsConnection';
  /** A list of edges which contains the `TodoResident` and cursor to aid in pagination. */
  edges: Array<Maybe<TodoResidentsEdge>>;
  /** A list of `TodoResident` objects. */
  nodes: Array<Maybe<TodoResident>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TodoResident` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TodoResident` edge in the connection. */
export type TodoResidentsEdge = {
  __typename: 'TodoResidentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TodoResident` at the end of the edge. */
  node?: Maybe<TodoResident>;
};

/** Methods to use when ordering `TodoResident`. */
export enum TodoResidentsOrderBy {
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResidentIdAsc = 'RESIDENT_ID_ASC',
  ResidentIdDesc = 'RESIDENT_ID_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export enum TodoStatus {
  Archived = 'ARCHIVED',
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
  Unfinished = 'UNFINISHED'
}

export type TodoTenant = Node & {
  __typename: 'TodoTenant';
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Tenant` that is related to this `TodoTenant`. */
  tenant?: Maybe<Tenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `TodoResident`. */
  todoResidentsByTenantId: TodoResidentsConnection;
  /** Reads and enables pagination through a set of `TodoResident`. */
  todoResidentsByTenantIdList: Array<TodoResident>;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByTenantId: TodosConnection;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByTenantIdList: Array<Todo>;
};


export type TodoTenantTodoResidentsByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodoResidentsOrderBy>>;
};


export type TodoTenantTodoResidentsByTenantIdListArgs = {
  condition?: InputMaybe<TodoResidentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodoResidentsOrderBy>>;
};


export type TodoTenantTodosByTenantIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type TodoTenantTodosByTenantIdListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};

/**
 * A condition to be used against `TodoTenant` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TodoTenantCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TodoTenant` values. */
export type TodoTenantsConnection = {
  __typename: 'TodoTenantsConnection';
  /** A list of edges which contains the `TodoTenant` and cursor to aid in pagination. */
  edges: Array<Maybe<TodoTenantsEdge>>;
  /** A list of `TodoTenant` objects. */
  nodes: Array<Maybe<TodoTenant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TodoTenant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TodoTenant` edge in the connection. */
export type TodoTenantsEdge = {
  __typename: 'TodoTenantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TodoTenant` at the end of the edge. */
  node?: Maybe<TodoTenant>;
};

/** Methods to use when ordering `TodoTenant`. */
export enum TodoTenantsOrderBy {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export enum TodoType {
  Milestone = 'MILESTONE',
  Task = 'TASK'
}

/** A connection to a list of `Todo` values. */
export type TodosConnection = {
  __typename: 'TodosConnection';
  /** A list of edges which contains the `Todo` and cursor to aid in pagination. */
  edges: Array<Maybe<TodosEdge>>;
  /** A list of `Todo` objects. */
  nodes: Array<Maybe<Todo>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Todo` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Todo` edge in the connection. */
export type TodosEdge = {
  __typename: 'TodosEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Todo` at the end of the edge. */
  node?: Maybe<Todo>;
};

/** Methods to use when ordering `Todo`. */
export enum TodosOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsTemplateAsc = 'IS_TEMPLATE_ASC',
  IsTemplateDesc = 'IS_TEMPLATE_DESC',
  LocationIdAsc = 'LOCATION_ID_ASC',
  LocationIdDesc = 'LOCATION_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrdinalAsc = 'ORDINAL_ASC',
  OrdinalDesc = 'ORDINAL_DESC',
  ParentTodoIdAsc = 'PARENT_TODO_ID_ASC',
  ParentTodoIdDesc = 'PARENT_TODO_ID_DESC',
  PinnedAsc = 'PINNED_ASC',
  PinnedDesc = 'PINNED_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResidentIdAsc = 'RESIDENT_ID_ASC',
  ResidentIdDesc = 'RESIDENT_ID_DESC',
  RootTodoIdAsc = 'ROOT_TODO_ID_ASC',
  RootTodoIdDesc = 'ROOT_TODO_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TopicIdAsc = 'TOPIC_ID_ASC',
  TopicIdDesc = 'TOPIC_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Tool = Node & {
  __typename: 'Tool';
  defaultIconKey?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  /** Reads a single `Module` that is related to this `Tool`. */
  module?: Maybe<Module>;
  moduleKey: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  ordinal: Scalars['Int']['output'];
  permissionKeys: Array<Maybe<Scalars['String']['output']>>;
  route: Scalars['String']['output'];
};

/** A condition to be used against `Tool` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ToolCondition = {
  /** Checks for equality with the object’s `defaultIconKey` field. */
  defaultIconKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `moduleKey` field. */
  moduleKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `ordinal` field. */
  ordinal?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `permissionKeys` field. */
  permissionKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `route` field. */
  route?: InputMaybe<Scalars['String']['input']>;
};

export type ToolInfo = {
  __typename: 'ToolInfo';
  defaultIconKey?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ordinal?: Maybe<Scalars['Int']['output']>;
  permissionKeys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  route?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of `Tool` values. */
export type ToolsConnection = {
  __typename: 'ToolsConnection';
  /** A list of edges which contains the `Tool` and cursor to aid in pagination. */
  edges: Array<Maybe<ToolsEdge>>;
  /** A list of `Tool` objects. */
  nodes: Array<Maybe<Tool>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tool` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Tool` edge in the connection. */
export type ToolsEdge = {
  __typename: 'ToolsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tool` at the end of the edge. */
  node?: Maybe<Tool>;
};

/** Methods to use when ordering `Tool`. */
export enum ToolsOrderBy {
  DefaultIconKeyAsc = 'DEFAULT_ICON_KEY_ASC',
  DefaultIconKeyDesc = 'DEFAULT_ICON_KEY_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  ModuleKeyAsc = 'MODULE_KEY_ASC',
  ModuleKeyDesc = 'MODULE_KEY_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrdinalAsc = 'ORDINAL_ASC',
  OrdinalDesc = 'ORDINAL_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RouteAsc = 'ROUTE_ASC',
  RouteDesc = 'ROUTE_DESC'
}

export type Topic = Node & {
  __typename: 'Topic';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Message`. */
  messages: MessagesConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesList: Array<Message>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  status: TopicStatus;
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribers: SubscribersConnection;
  /** Reads and enables pagination through a set of `Subscriber`. */
  subscribersList: Array<Subscriber>;
  tags: Array<Maybe<Scalars['String']['output']>>;
  /** Reads a single `MsgTenant` that is related to this `Topic`. */
  tenant?: Maybe<MsgTenant>;
  tenantId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Todo`. */
  todos: TodosConnection;
  /** Reads and enables pagination through a set of `Todo`. */
  todosList: Array<Todo>;
};


export type TopicMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type TopicMessagesListArgs = {
  condition?: InputMaybe<MessageCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


export type TopicSubscribersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


export type TopicSubscribersListArgs = {
  condition?: InputMaybe<SubscriberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscribersOrderBy>>;
};


export type TopicTodosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};


export type TopicTodosListArgs = {
  condition?: InputMaybe<TodoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TodosOrderBy>>;
};

/** A condition to be used against `Topic` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TopicCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `identifier` field. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TopicStatus>;
  /** Checks for equality with the object’s `tags` field. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `TopicInfo` */
export type TopicInfoInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TopicStatus>;
};

export type TopicMessageSubscriptionPayload = {
  __typename: 'TopicMessageSubscriptionPayload';
  event?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Message>;
  messageId?: Maybe<Scalars['UUID']['output']>;
};

export enum TopicStatus {
  Closed = 'CLOSED',
  Locked = 'LOCKED',
  Open = 'OPEN'
}

/** A connection to a list of `Topic` values. */
export type TopicsConnection = {
  __typename: 'TopicsConnection';
  /** A list of edges which contains the `Topic` and cursor to aid in pagination. */
  edges: Array<Maybe<TopicsEdge>>;
  /** A list of `Topic` objects. */
  nodes: Array<Maybe<Topic>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Topic` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Topic` edge in the connection. */
export type TopicsEdge = {
  __typename: 'TopicsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Topic` at the end of the edge. */
  node?: Maybe<Topic>;
};

/** Methods to use when ordering `Topic`. */
export enum TopicsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdentifierAsc = 'IDENTIFIER_ASC',
  IdentifierDesc = 'IDENTIFIER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

/** All input for the `unblockResident` mutation. */
export type UnblockResidentInput = {
  _residentId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `unblockResident` mutation. */
export type UnblockResidentPayload = {
  __typename: 'UnblockResidentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  invitedByProfile?: Maybe<Profile>;
  /** Reads a single `Profile` that is related to this `Resident`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  resident?: Maybe<Resident>;
  /** An edge for our `Resident`. May be used by Relay 1. */
  residentEdge?: Maybe<ResidentsEdge>;
  /** Reads a single `Tenant` that is related to this `Resident`. */
  tenant?: Maybe<Tenant>;
};


/** The output of our `unblockResident` mutation. */
export type UnblockResidentPayloadResidentEdgeArgs = {
  orderBy?: Array<ResidentsOrderBy>;
};

/** All input for the `unpinTodo` mutation. */
export type UnpinTodoInput = {
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `unpinTodo` mutation. */
export type UnpinTodoPayload = {
  __typename: 'UnpinTodoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `unpinTodo` mutation. */
export type UnpinTodoPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

export type Uow = Node & {
  __typename: 'Uow';
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  /** Reads and enables pagination through a set of `Uow`. */
  dependees: UowsConnection;
  dependeesList?: Maybe<Array<Maybe<Uow>>>;
  /** Reads and enables pagination through a set of `Uow`. */
  dependers: UowsConnection;
  dependersList?: Maybe<Array<Maybe<Uow>>>;
  description?: Maybe<Scalars['String']['output']>;
  dueAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  isTemplate: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  parentUowId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  status: UowStatusType;
  tenantId: Scalars['UUID']['output'];
  type?: Maybe<UowType>;
  /** Reads and enables pagination through a set of `UowDependency`. */
  uowDependenciesByDependeeId: UowDependenciesConnection;
  /** Reads and enables pagination through a set of `UowDependency`. */
  uowDependenciesByDependeeIdList: Array<UowDependency>;
  /** Reads and enables pagination through a set of `UowDependency`. */
  uowDependenciesByDependerId: UowDependenciesConnection;
  /** Reads and enables pagination through a set of `UowDependency`. */
  uowDependenciesByDependerIdList: Array<UowDependency>;
  updatedAt: Scalars['Datetime']['output'];
  useWorker: Scalars['Boolean']['output'];
  workflowError: Scalars['JSON']['output'];
  workflowHandlerKey?: Maybe<Scalars['String']['output']>;
};


export type UowDependeesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UowDependeesListArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UowDependersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UowDependersListArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UowUowDependenciesByDependeeIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UowDependencyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowDependenciesOrderBy>>;
};


export type UowUowDependenciesByDependeeIdListArgs = {
  condition?: InputMaybe<UowDependencyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowDependenciesOrderBy>>;
};


export type UowUowDependenciesByDependerIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UowDependencyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowDependenciesOrderBy>>;
};


export type UowUowDependenciesByDependerIdListArgs = {
  condition?: InputMaybe<UowDependencyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UowDependenciesOrderBy>>;
};

/** A condition to be used against `Uow` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UowCondition = {
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `data` field. */
  data?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `dueAt` field. */
  dueAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `identifier` field. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isTemplate` field. */
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `parentUowId` field. */
  parentUowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<UowStatusType>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<UowType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `useWorker` field. */
  useWorker?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `workflowError` field. */
  workflowError?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `workflowHandlerKey` field. */
  workflowHandlerKey?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `UowDependency` values. */
export type UowDependenciesConnection = {
  __typename: 'UowDependenciesConnection';
  /** A list of edges which contains the `UowDependency` and cursor to aid in pagination. */
  edges: Array<Maybe<UowDependenciesEdge>>;
  /** A list of `UowDependency` objects. */
  nodes: Array<Maybe<UowDependency>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UowDependency` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `UowDependency` edge in the connection. */
export type UowDependenciesEdge = {
  __typename: 'UowDependenciesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UowDependency` at the end of the edge. */
  node?: Maybe<UowDependency>;
};

/** Methods to use when ordering `UowDependency`. */
export enum UowDependenciesOrderBy {
  DependeeIdAsc = 'DEPENDEE_ID_ASC',
  DependeeIdDesc = 'DEPENDEE_ID_DESC',
  DependerIdAsc = 'DEPENDER_ID_ASC',
  DependerIdDesc = 'DEPENDER_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsTemplateAsc = 'IS_TEMPLATE_ASC',
  IsTemplateDesc = 'IS_TEMPLATE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC'
}

export type UowDependency = Node & {
  __typename: 'UowDependency';
  /** Reads a single `Uow` that is related to this `UowDependency`. */
  dependee?: Maybe<Uow>;
  dependeeId: Scalars['UUID']['output'];
  /** Reads a single `Uow` that is related to this `UowDependency`. */
  depender?: Maybe<Uow>;
  dependerId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isTemplate: Scalars['Boolean']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  tenantId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `UowDependency` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UowDependencyCondition = {
  /** Checks for equality with the object’s `dependeeId` field. */
  dependeeId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `dependerId` field. */
  dependerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isTemplate` field. */
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `UowDependencyInfo` */
export type UowDependencyInfoInput = {
  dependeeIdentifier?: InputMaybe<Scalars['String']['input']>;
  dependerIdentifier?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `UowInfo` */
export type UowInfoInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueAt?: InputMaybe<Scalars['Datetime']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentUowId?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UowType>;
  useWorker?: InputMaybe<Scalars['Boolean']['input']>;
  workflowHandlerKey?: InputMaybe<Scalars['String']['input']>;
};

export enum UowStatusType {
  Canceled = 'CANCELED',
  Complete = 'COMPLETE',
  Deleted = 'DELETED',
  Error = 'ERROR',
  Incomplete = 'INCOMPLETE',
  Paused = 'PAUSED',
  Template = 'TEMPLATE',
  Waiting = 'WAITING'
}

export enum UowType {
  Issue = 'ISSUE',
  Milestone = 'MILESTONE',
  Project = 'PROJECT',
  Task = 'TASK'
}

/** A connection to a list of `Uow` values. */
export type UowsConnection = {
  __typename: 'UowsConnection';
  /** A list of edges which contains the `Uow` and cursor to aid in pagination. */
  edges: Array<Maybe<UowsEdge>>;
  /** A list of `Uow` objects. */
  nodes: Array<Maybe<Uow>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Uow` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Uow` edge in the connection. */
export type UowsEdge = {
  __typename: 'UowsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Uow` at the end of the edge. */
  node?: Maybe<Uow>;
};

/** Methods to use when ordering `Uow`. */
export enum UowsOrderBy {
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DueAtAsc = 'DUE_AT_ASC',
  DueAtDesc = 'DUE_AT_DESC',
  IdentifierAsc = 'IDENTIFIER_ASC',
  IdentifierDesc = 'IDENTIFIER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsTemplateAsc = 'IS_TEMPLATE_ASC',
  IsTemplateDesc = 'IS_TEMPLATE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  ParentUowIdAsc = 'PARENT_UOW_ID_ASC',
  ParentUowIdDesc = 'PARENT_UOW_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UseWorkerAsc = 'USE_WORKER_ASC',
  UseWorkerDesc = 'USE_WORKER_DESC',
  WorkflowErrorAsc = 'WORKFLOW_ERROR_ASC',
  WorkflowErrorDesc = 'WORKFLOW_ERROR_DESC',
  WorkflowHandlerKeyAsc = 'WORKFLOW_HANDLER_KEY_ASC',
  WorkflowHandlerKeyDesc = 'WORKFLOW_HANDLER_KEY_DESC'
}

/** All input for the `updateLocation` mutation. */
export type UpdateLocationInput = {
  _locationInfo?: InputMaybe<LocationInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `updateLocation` mutation. */
export type UpdateLocationPayload = {
  __typename: 'UpdateLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  /** An edge for our `Location`. May be used by Relay 1. */
  locationEdge?: Maybe<LocationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LocResident` that is related to this `Location`. */
  resident?: Maybe<LocResident>;
  /** Reads a single `LocTenant` that is related to this `Location`. */
  tenant?: Maybe<LocTenant>;
};


/** The output of our `updateLocation` mutation. */
export type UpdateLocationPayloadLocationEdgeArgs = {
  orderBy?: Array<LocationsOrderBy>;
};

/** All input for the `updateProfile` mutation. */
export type UpdateProfileInput = {
  _displayName?: InputMaybe<Scalars['String']['input']>;
  _firstName?: InputMaybe<Scalars['String']['input']>;
  _lastName?: InputMaybe<Scalars['String']['input']>;
  _phone?: InputMaybe<Scalars['String']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `updateProfile` mutation. */
export type UpdateProfilePayload = {
  __typename: 'UpdateProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  /** An edge for our `Profile`. May be used by Relay 1. */
  profileEdge?: Maybe<ProfilesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `updateProfile` mutation. */
export type UpdateProfilePayloadProfileEdgeArgs = {
  orderBy?: Array<ProfilesOrderBy>;
};

/** All input for the `updateTodo` mutation. */
export type UpdateTodoInput = {
  _description?: InputMaybe<Scalars['String']['input']>;
  _name?: InputMaybe<Scalars['String']['input']>;
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `updateTodo` mutation. */
export type UpdateTodoPayload = {
  __typename: 'UpdateTodoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `updateTodo` mutation. */
export type UpdateTodoPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

/** All input for the `updateTodoStatus` mutation. */
export type UpdateTodoStatusInput = {
  _status?: InputMaybe<TodoStatus>;
  _todoId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `updateTodoStatus` mutation. */
export type UpdateTodoStatusPayload = {
  __typename: 'UpdateTodoStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Location` that is related to this `Todo`. */
  location?: Maybe<Location>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  parentTodo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TodoResident` that is related to this `Todo`. */
  resident?: Maybe<TodoResident>;
  /** Reads a single `Todo` that is related to this `Todo`. */
  rootTodo?: Maybe<Todo>;
  /** Reads a single `TodoTenant` that is related to this `Todo`. */
  tenant?: Maybe<TodoTenant>;
  todo?: Maybe<Todo>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
  /** Reads a single `Topic` that is related to this `Todo`. */
  topic?: Maybe<Topic>;
};


/** The output of our `updateTodoStatus` mutation. */
export type UpdateTodoStatusPayloadTodoEdgeArgs = {
  orderBy?: Array<TodosOrderBy>;
};

/** All input for the `upsertMessage` mutation. */
export type UpsertMessageInput = {
  _messageInfo?: InputMaybe<MessageInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `upsertMessage` mutation. */
export type UpsertMessagePayload = {
  __typename: 'UpsertMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Reads a single `MsgResident` that is related to this `Message`. */
  postedByMsgResident?: Maybe<MsgResident>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgTenant` that is related to this `Message`. */
  tenant?: Maybe<MsgTenant>;
  /** Reads a single `Topic` that is related to this `Message`. */
  topic?: Maybe<Topic>;
};


/** The output of our `upsertMessage` mutation. */
export type UpsertMessagePayloadMessageEdgeArgs = {
  orderBy?: Array<MessagesOrderBy>;
};

/** All input for the `upsertProject` mutation. */
export type UpsertProjectInput = {
  _projectInfo?: InputMaybe<ProjectInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `upsertProject` mutation. */
export type UpsertProjectPayload = {
  __typename: 'UpsertProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Reads a single `ProjectType` that is related to this `Project`. */
  projectType?: Maybe<ProjectType>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `upsertProject` mutation. */
export type UpsertProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectsOrderBy>;
};

/** All input for the `upsertSubscriber` mutation. */
export type UpsertSubscriberInput = {
  _subscriberInfo?: InputMaybe<SubscriberInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `upsertSubscriber` mutation. */
export type UpsertSubscriberPayload = {
  __typename: 'UpsertSubscriberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `MsgResident` that is related to this `Subscriber`. */
  msgResident?: Maybe<MsgResident>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  subscriber?: Maybe<Subscriber>;
  /** An edge for our `Subscriber`. May be used by Relay 1. */
  subscriberEdge?: Maybe<SubscribersEdge>;
  /** Reads a single `MsgTenant` that is related to this `Subscriber`. */
  tenant?: Maybe<MsgTenant>;
  /** Reads a single `Topic` that is related to this `Subscriber`. */
  topic?: Maybe<Topic>;
};


/** The output of our `upsertSubscriber` mutation. */
export type UpsertSubscriberPayloadSubscriberEdgeArgs = {
  orderBy?: Array<SubscribersOrderBy>;
};

/** All input for the `upsertTopic` mutation. */
export type UpsertTopicInput = {
  _topicInfo?: InputMaybe<TopicInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `upsertTopic` mutation. */
export type UpsertTopicPayload = {
  __typename: 'UpsertTopicPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgTenant` that is related to this `Topic`. */
  tenant?: Maybe<MsgTenant>;
  topic?: Maybe<Topic>;
  /** An edge for our `Topic`. May be used by Relay 1. */
  topicEdge?: Maybe<TopicsEdge>;
};


/** The output of our `upsertTopic` mutation. */
export type UpsertTopicPayloadTopicEdgeArgs = {
  orderBy?: Array<TopicsOrderBy>;
};

/** All input for the `upsertUow` mutation. */
export type UpsertUowInput = {
  _projectId?: InputMaybe<Scalars['UUID']['input']>;
  _uowInfo?: InputMaybe<UowInfoInput>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `upsertUow` mutation. */
export type UpsertUowPayload = {
  __typename: 'UpsertUowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uow?: Maybe<Uow>;
  /** An edge for our `Uow`. May be used by Relay 1. */
  uowEdge?: Maybe<UowsEdge>;
};


/** The output of our `upsertUow` mutation. */
export type UpsertUowPayloadUowEdgeArgs = {
  orderBy?: Array<UowsOrderBy>;
};

/** All input for the `waitingUow` mutation. */
export type WaitingUowInput = {
  _uowId?: InputMaybe<Scalars['UUID']['input']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our `waitingUow` mutation. */
export type WaitingUowPayload = {
  __typename: 'WaitingUowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Project` that is related to this `Uow`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uow?: Maybe<Uow>;
  /** An edge for our `Uow`. May be used by Relay 1. */
  uowEdge?: Maybe<UowsEdge>;
};


/** The output of our `waitingUow` mutation. */
export type WaitingUowPayloadUowEdgeArgs = {
  orderBy?: Array<UowsOrderBy>;
};

export enum WorkflowInputDataType {
  Boolean = 'BOOLEAN',
  Number = 'NUMBER',
  String = 'STRING'
}

export type WorkflowInputDefinition = {
  __typename: 'WorkflowInputDefinition';
  dataType?: Maybe<WorkflowInputDataType>;
  name?: Maybe<Scalars['String']['output']>;
};

/** An input for mutations affecting `WorkflowInputDefinition` */
export type WorkflowInputDefinitionInput = {
  dataType?: InputMaybe<WorkflowInputDataType>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type JoinAddressBookMutationVariables = Exact<{ [key: string]: never; }>;


export type JoinAddressBookMutation = { __typename: 'Mutation', joinAddressBook?: { __typename: 'JoinAddressBookPayload', profile?: { __typename: 'Profile', id: any, email: string, displayName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, fullName?: string | null, isPublic: boolean } | null } | null };

export type LeaveAddressBookMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveAddressBookMutation = { __typename: 'Mutation', leaveAddressBook?: { __typename: 'LeaveAddressBookPayload', profile?: { __typename: 'Profile', id: any, email: string, displayName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, fullName?: string | null, isPublic: boolean } | null } | null };

export type GetAbListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAbListingsQuery = { __typename: 'Query', getAbListings?: Array<{ __typename: 'AbListing', profileId?: any | null, fullName?: string | null, email?: string | null, phone?: string | null, displayName?: string | null, canInvite?: boolean | null } | null> | null };

export type ApplicationFragment = { __typename: 'Application', key: string, name: string };

export type LicenseFragment = { __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null };

export type LicensePackFragment = { __typename: 'LicensePack', key: string, displayName: string, description: string };

export type LicensePackLicenseTypeFragment = { __typename: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null };

export type LicenseTypeFragment = { __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope };

export type LicenseTypePermissionFragment = { __typename: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string };

export type ProfileFragment = { __typename: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: ProfileStatus, createdAt: any, updatedAt: any };

export type ProfileClaimFragment = { __typename: 'ProfileClaim', profileId?: any | null, tenantId?: any | null, residentId?: any | null, actualResidentId?: any | null, profileStatus?: ProfileStatus | null, permissions?: Array<string | null> | null, email?: string | null, displayName?: string | null, tenantName?: string | null, applicationKey?: string | null };

export type ResidentFragment = { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType };

export type TenantFragment = { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, licenses: { __typename: 'LicensesConnection', totalCount: number } };

export type TenantSubscriptionFragment = { __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus };

export type ActivateTenantMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type ActivateTenantMutation = { __typename: 'Mutation', activateTenant?: { __typename: 'ActivateTenantPayload', tenant?: { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null } | null };

export type AssumeResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type AssumeResidentMutation = { __typename: 'Mutation', assumeResidency?: { __typename: 'AssumeResidencyPayload', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null };

export type BecomeSupportMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type BecomeSupportMutation = { __typename: 'Mutation', becomeSupport?: { __typename: 'BecomeSupportPayload', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null };

export type BlockResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type BlockResidentMutation = { __typename: 'Mutation', blockResident?: { __typename: 'BlockResidentPayload', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null };

export type CreateTenantMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateTenantMutation = { __typename: 'Mutation', createTenant?: { __typename: 'CreateTenantPayload', tenant?: { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null } | null };

export type DeactivateTenantMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type DeactivateTenantMutation = { __typename: 'Mutation', deactivateTenant?: { __typename: 'DeactivateTenantPayload', tenant?: { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null } | null };

export type DeactivateTenantSubscriptionMutationVariables = Exact<{
  tenantSubscriptionId: Scalars['UUID']['input'];
}>;


export type DeactivateTenantSubscriptionMutation = { __typename: 'Mutation', deactivateTenantSubscription?: { __typename: 'DeactivateTenantSubscriptionPayload', tenantSubscription?: { __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus } | null } | null };

export type DeclineResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type DeclineResidentMutation = { __typename: 'Mutation', declineResidency?: { __typename: 'DeclineResidencyPayload', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null };

export type ExitSupportModeMutationVariables = Exact<{ [key: string]: never; }>;


export type ExitSupportModeMutation = { __typename: 'Mutation', exitSupportMode?: { __typename: 'ExitSupportModePayload', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null };

export type GrantUserLicenseMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
  licenseTypeKey: Scalars['String']['input'];
}>;


export type GrantUserLicenseMutation = { __typename: 'Mutation', grantUserLicense?: { __typename: 'GrantUserLicensePayload', license?: { __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null } | null } | null };

export type ReactivateTenantSubscriptionMutationVariables = Exact<{
  tenantSubscriptionId: Scalars['UUID']['input'];
}>;


export type ReactivateTenantSubscriptionMutation = { __typename: 'Mutation', reactivateTenantSubscription?: { __typename: 'ReactivateTenantSubscriptionPayload', tenantSubscription?: { __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus } | null } | null };

export type RevokeUserLicenseMutationVariables = Exact<{
  licenseId: Scalars['UUID']['input'];
}>;


export type RevokeUserLicenseMutation = { __typename: 'Mutation', revokeUserLicense?: { __typename: 'RevokeUserLicensePayload', boolean?: boolean | null } | null };

export type SubscribeTenantToLicensePackMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
  licensePackKey: Scalars['String']['input'];
}>;


export type SubscribeTenantToLicensePackMutation = { __typename: 'Mutation', subscribeTenantToLicensePack?: { __typename: 'SubscribeTenantToLicensePackPayload', tenantSubscription?: { __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus } | null } | null };

export type UnblockResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type UnblockResidentMutation = { __typename: 'Mutation', unblockResident?: { __typename: 'UnblockResidentPayload', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  displayName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename: 'Mutation', updateProfile?: { __typename: 'UpdateProfilePayload', profile?: { __typename: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: ProfileStatus, createdAt: any, updatedAt: any } | null } | null };

export type ActiveLicensePacksQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveLicensePacksQuery = { __typename: 'Query', licensePacksList?: Array<{ __typename: 'LicensePack', key: string, displayName: string, description: string }> | null };

export type AllAppProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAppProfilesQuery = { __typename: 'Query', profiles?: { __typename: 'ProfilesConnection', nodes: Array<{ __typename: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: ProfileStatus, createdAt: any, updatedAt: any, residents: Array<{ __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType, licenses: Array<{ __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null }> }> } | null> } | null };

export type AllApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllApplicationsQuery = { __typename: 'Query', applications?: Array<{ __typename: 'Application', key: string, name: string, licenseTypes: Array<{ __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope, permissions: Array<{ __typename: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string }>, licenses: { __typename: 'LicensesConnection', totalCount: number } }> }> | null };

export type AllLicensePacksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLicensePacksQuery = { __typename: 'Query', licensePacks?: Array<{ __typename: 'LicensePack', key: string, displayName: string, description: string, licensePackLicenseTypes: Array<{ __typename: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null, licenseType?: { __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope, permissions: Array<{ __typename: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string }>, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null }>, tenantSubscriptions: { __typename: 'TenantSubscriptionsConnection', totalCount: number } }> | null };

export type AllResidentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllResidentsQuery = { __typename: 'Query', residents?: Array<{ __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType, licenses: Array<{ __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null, licenseType?: { __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope } | null }> }> | null };

export type TenantByIdQueryVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type TenantByIdQuery = { __typename: 'Query', tenant?: { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, residents: { __typename: 'ResidentsConnection', totalCount: number }, tenantSubscriptions: Array<{ __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus, licenses: { __typename: 'LicensesConnection', totalCount: number } }>, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null };

export type TenantLicensesQueryVariables = Exact<{ [key: string]: never; }>;


export type TenantLicensesQuery = { __typename: 'Query', tenantLicenses?: Array<{ __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null, resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null } | null> | null };

export type TenantResidentsQueryVariables = Exact<{ [key: string]: never; }>;


export type TenantResidentsQuery = { __typename: 'Query', residents?: Array<{ __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType }> | null };

export type TenantSubscriptionsQueryVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type TenantSubscriptionsQuery = { __typename: 'Query', tenantSubscriptions?: Array<{ __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus, tenant?: { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null, licenses: { __typename: 'LicensesConnection', totalCount: number }, licensePack?: { __typename: 'LicensePack', key: string, displayName: string, description: string, licensePackLicenseTypes: Array<{ __typename: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null, licenseType?: { __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope, permissions: Array<{ __typename: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string }>, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null }> } | null }> | null };

export type AvailableModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableModulesQuery = { __typename: 'Query', availableModules?: Array<{ __typename: 'ModuleInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, toolsByModuleKeyList?: Array<{ __typename: 'ToolInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, route?: string | null } | null> | null } | null> | null };

export type CurrentProfileClaimsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentProfileClaimsQuery = { __typename: 'Query', currentProfileClaims?: { __typename: 'ProfileClaim', profileId?: any | null, tenantId?: any | null, residentId?: any | null, actualResidentId?: any | null, profileStatus?: ProfileStatus | null, permissions?: Array<string | null> | null, email?: string | null, displayName?: string | null, tenantName?: string | null, applicationKey?: string | null } | null, availableModules?: Array<{ __typename: 'ModuleInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, toolsByModuleKeyList?: Array<{ __typename: 'ToolInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, route?: string | null } | null> | null } | null> | null, activeResidency?: Array<{ __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType }> | null };

export type GetMyselfQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyselfQuery = { __typename: 'Query', getMyself?: { __typename: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: ProfileStatus, createdAt: any, updatedAt: any } | null };

export type MyProfileResidenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileResidenciesQuery = { __typename: 'Query', myProfileResidenciesList?: Array<{ __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType, licenses: Array<{ __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null, licenseType?: { __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope } | null }> } | null> | null };

export type ResidentByIdQueryVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type ResidentByIdQuery = { __typename: 'Query', resident?: { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType, licenses: Array<{ __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null }> } | null };

export type SearchProfilesQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchProfilesQuery = { __typename: 'Query', searchProfiles?: { __typename: 'ProfilesConnection', nodes: Array<{ __typename: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: ProfileStatus, createdAt: any, updatedAt: any } | null> } | null };

export type SearchResidentsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchResidentsQuery = { __typename: 'Query', searchResidents?: { __typename: 'ResidentsConnection', nodes: Array<{ __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType } | null> } | null };

export type SearchTenantsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchTenantsQuery = { __typename: 'Query', searchTenants?: { __typename: 'TenantsConnection', nodes: Array<{ __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, subscriptions: Array<{ __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus, licensePack?: { __typename: 'LicensePack', key: string, displayName: string, description: string, licenseTypes: Array<{ __typename: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null }> } | null }>, licenses: { __typename: 'LicensesConnection', totalCount: number } } | null> } | null };

export type SiteUserByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type SiteUserByIdQuery = { __typename: 'Query', siteUserById?: any | null };

export type ThrowErrorQueryVariables = Exact<{
  message?: InputMaybe<Scalars['String']['input']>;
}>;


export type ThrowErrorQuery = { __typename: 'Query', throwError?: boolean | null };

export type MessageFragment = { __typename: 'Message', id: any, createdAt: any, status: MessageStatus, content: string, postedBy?: { __typename: 'MsgResident', residentId: any, displayName: string } | null };

export type SubscriberFragment = { __typename: 'Subscriber', id: any, status: SubscriberStatus, lastRead: any, msgResident?: { __typename: 'MsgResident', residentId: any, displayName: string } | null };

export type TopicFragment = { __typename: 'Topic', id: any, name: string, identifier?: string | null, status: TopicStatus };

export type UpsertMessageMutationVariables = Exact<{
  messageInfo: MessageInfoInput;
}>;


export type UpsertMessageMutation = { __typename: 'Mutation', upsertMessage?: { __typename: 'UpsertMessagePayload', message?: { __typename: 'Message', id: any, createdAt: any, content: string, tags: Array<string | null> } | null } | null };

export type UpsertTopicMutationVariables = Exact<{
  topicInfo: TopicInfoInput;
}>;


export type UpsertTopicMutation = { __typename: 'Mutation', upsertTopic?: { __typename: 'UpsertTopicPayload', topic?: { __typename: 'Topic', id: any, name: string, identifier?: string | null } | null } | null };

export type AllDiscussionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDiscussionsQuery = { __typename: 'Query', topics?: { __typename: 'TopicsConnection', nodes: Array<{ __typename: 'Topic', id: any, name: string, identifier?: string | null, status: TopicStatus, subscribers: Array<{ __typename: 'Subscriber', id: any, status: SubscriberStatus, lastRead: any, msgResident?: { __typename: 'MsgResident', residentId: any, displayName: string } | null }>, messages: { __typename: 'MessagesConnection', totalCount: number } } | null> } | null };

export type DiscussionByIdQueryVariables = Exact<{
  topicId: Scalars['UUID']['input'];
}>;


export type DiscussionByIdQuery = { __typename: 'Query', topic?: { __typename: 'Topic', id: any, name: string, identifier?: string | null, status: TopicStatus, subscribers: Array<{ __typename: 'Subscriber', id: any, status: SubscriberStatus, lastRead: any, msgResident?: { __typename: 'MsgResident', residentId: any, displayName: string } | null }>, messages: Array<{ __typename: 'Message', id: any, createdAt: any, status: MessageStatus, content: string, postedBy?: { __typename: 'MsgResident', residentId: any, displayName: string } | null }> } | null };

export type TopicMessageSubscriptionVariables = Exact<{
  topicId: Scalars['UUID']['input'];
}>;


export type TopicMessageSubscription = { __typename: 'Subscription', topicMessage?: { __typename: 'TopicMessageSubscriptionPayload', event?: string | null, messageId?: any | null, message?: { __typename: 'Message', id: any, createdAt: any, status: MessageStatus, content: string, postedBy?: { __typename: 'MsgResident', residentId: any, displayName: string } | null } | null } | null };

export type LocationFragment = { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null };

export type CreateLocationMutationVariables = Exact<{
  locationInfo: LocationInfoInput;
}>;


export type CreateLocationMutation = { __typename: 'Mutation', createLocation?: { __typename: 'CreateLocationPayload', location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null } | null };

export type DeleteLocationMutationVariables = Exact<{
  locationId: Scalars['UUID']['input'];
}>;


export type DeleteLocationMutation = { __typename: 'Mutation', deleteLocation?: { __typename: 'DeleteLocationPayload', boolean?: boolean | null } | null };

export type UpdateLocationMutationVariables = Exact<{
  locationInfo: LocationInfoInput;
}>;


export type UpdateLocationMutation = { __typename: 'Mutation', updateLocation?: { __typename: 'UpdateLocationPayload', location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null } | null };

export type AllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLocationsQuery = { __typename: 'Query', locations?: Array<{ __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null }> | null };

export type TodoFragment = { __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any };

export type CreateTodoMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  parentTodoId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type CreateTodoMutation = { __typename: 'Mutation', createTodo?: { __typename: 'CreateTodoPayload', todo?: { __typename: 'Todo', id: any, name: string, description?: string | null, status: TodoStatus, type: TodoType, createdAt: any, updatedAt: any, parentTodoId?: any | null, isTemplate: boolean } | null } | null };

export type DeleteTodoMutationVariables = Exact<{
  todoId: Scalars['UUID']['input'];
}>;


export type DeleteTodoMutation = { __typename: 'Mutation', deleteTodo?: { __typename: 'DeleteTodoPayload', boolean?: boolean | null } | null };

export type MakeTemplateFromTodoMutationVariables = Exact<{
  todoId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type MakeTemplateFromTodoMutation = { __typename: 'Mutation', makeTemplateFromTodo?: { __typename: 'MakeTemplateFromTodoPayload', todo?: { __typename: 'Todo', id: any, name: string } | null } | null };

export type MakeTodoFromTemplateMutationVariables = Exact<{
  todoId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type MakeTodoFromTemplateMutation = { __typename: 'Mutation', makeTodoFromTemplate?: { __typename: 'MakeTodoFromTemplatePayload', todo?: { __typename: 'Todo', id: any, name: string } | null } | null };

export type UpdateTodoMutationVariables = Exact<{
  todoId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTodoMutation = { __typename: 'Mutation', updateTodo?: { __typename: 'UpdateTodoPayload', todo?: { __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null } | null } | null };

export type UpdateTodoStatusMutationVariables = Exact<{
  todoId: Scalars['UUID']['input'];
  status: TodoStatus;
}>;


export type UpdateTodoStatusMutation = { __typename: 'Mutation', updateTodoStatus?: { __typename: 'UpdateTodoStatusPayload', todo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type AssignTodoMutationVariables = Exact<{
  todoId: Scalars['UUID']['input'];
  residentId: Scalars['UUID']['input'];
}>;


export type AssignTodoMutation = { __typename: 'Mutation', assignTodo?: { __typename: 'AssignTodoPayload', todo?: { __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null } | null } | null };

export type SearchTodosQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  todoType?: InputMaybe<TodoType>;
  rootsOnly?: InputMaybe<Scalars['Boolean']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchTodosQuery = { __typename: 'Query', searchTodos?: { __typename: 'TodosConnection', nodes: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, resident?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, parentTodo?: { __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any } | null, tenant?: { __typename: 'TodoTenant', tenantId: any, name: string } | null } | null> } | null };

export type TodoByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type TodoByIdQuery = { __typename: 'Query', todo?: { __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, hiddenChildren: { __typename: 'TodosConnection', totalCount: number } }> }> }> } | null };

export type TodoByIdForRefreshQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type TodoByIdForRefreshQuery = { __typename: 'Query', todo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type ProjectFragment = { __typename: 'Project', id: any, createdAt: any, updatedAt: any, tenantId: any, identifier?: string | null, isTemplate: boolean, type: string, workflowData: any, inputDefinitions: Array<{ __typename: 'WorkflowInputDefinition', name?: string | null, dataType?: WorkflowInputDataType | null } | null> };

export type AllProjectTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectTemplatesQuery = { __typename: 'Query', projectTemplates?: Array<{ __typename: 'Project', id: any, createdAt: any, updatedAt: any, tenantId: any, identifier?: string | null, isTemplate: boolean, type: string, workflowData: any, inputDefinitions: Array<{ __typename: 'WorkflowInputDefinition', name?: string | null, dataType?: WorkflowInputDataType | null } | null> }> | null };

export const ApplicationFragmentDoc = gql`
    fragment Application on Application {
  key
  name
}
    `;
export const LicenseFragmentDoc = gql`
    fragment License on License {
  id
  licenseTypeKey
  createdAt
  expiresAt
}
    `;
export const LicensePackFragmentDoc = gql`
    fragment LicensePack on LicensePack {
  key
  displayName
  description
}
    `;
export const LicensePackLicenseTypeFragmentDoc = gql`
    fragment LicensePackLicenseType on LicensePackLicenseType {
  licensePackKey
  licenseTypeKey
  numberOfLicenses
  expirationIntervalType
  expirationIntervalMultiplier
  issuedCount
}
    `;
export const LicenseTypeFragmentDoc = gql`
    fragment LicenseType on LicenseType {
  key
  displayName
  assignmentScope
}
    `;
export const LicenseTypePermissionFragmentDoc = gql`
    fragment LicenseTypePermission on LicenseTypePermission {
  licenseTypeKey
  permissionKey
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on Profile {
  id
  email
  identifier
  firstName
  lastName
  fullName
  phone
  isPublic
  displayName
  avatarKey
  status
  createdAt
  updatedAt
}
    `;
export const ProfileClaimFragmentDoc = gql`
    fragment ProfileClaim on ProfileClaim {
  profileId
  tenantId
  residentId
  actualResidentId
  profileStatus
  permissions
  email
  displayName
  tenantName
  applicationKey
}
    `;
export const ResidentFragmentDoc = gql`
    fragment Resident on Resident {
  id
  profileId
  tenantId
  tenantName
  status
  displayName
  email
  type
  tenantId
}
    `;
export const TenantFragmentDoc = gql`
    fragment Tenant on Tenant {
  id
  name
  createdAt
  identifier
  status
  type
  licenses {
    totalCount
  }
}
    `;
export const TenantSubscriptionFragmentDoc = gql`
    fragment TenantSubscription on TenantSubscription {
  id
  licensePackKey
  status
}
    `;
export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  createdAt
  status
  content
  postedBy: postedByMsgResident {
    residentId
    displayName
  }
}
    `;
export const SubscriberFragmentDoc = gql`
    fragment Subscriber on Subscriber {
  id
  status
  lastRead
  msgResident {
    residentId
    displayName
  }
}
    `;
export const TopicFragmentDoc = gql`
    fragment Topic on Topic {
  id
  name
  identifier
  status
}
    `;
export const LocationFragmentDoc = gql`
    fragment Location on Location {
  id
  name
  address1
  address2
  city
  state
  country
  postalCode
  lat
  lon
}
    `;
export const TodoFragmentDoc = gql`
    fragment Todo on Todo {
  id
  name
  description
  type
  status
  createdAt
  updatedAt
  parentTodoId
  rootTodoId
  isTemplate
  topicId
}
    `;
export const ProjectFragmentDoc = gql`
    fragment Project on Project {
  id
  createdAt
  updatedAt
  tenantId
  identifier
  isTemplate
  type
  inputDefinitions {
    name
    dataType
  }
  workflowData
}
    `;
export const JoinAddressBookDocument = gql`
    mutation JoinAddressBook {
  joinAddressBook(input: {}) {
    profile {
      id
      email
      displayName
      firstName
      lastName
      phone
      fullName
      isPublic
    }
  }
}
    `;

export function useJoinAddressBookMutation() {
  return Urql.useMutation<JoinAddressBookMutation, JoinAddressBookMutationVariables>(JoinAddressBookDocument);
};
export const LeaveAddressBookDocument = gql`
    mutation LeaveAddressBook {
  leaveAddressBook(input: {}) {
    profile {
      id
      email
      displayName
      firstName
      lastName
      phone
      fullName
      isPublic
    }
  }
}
    `;

export function useLeaveAddressBookMutation() {
  return Urql.useMutation<LeaveAddressBookMutation, LeaveAddressBookMutationVariables>(LeaveAddressBookDocument);
};
export const GetAbListingsDocument = gql`
    query GetAbListings {
  getAbListings: getAbListingsList {
    profileId
    fullName
    email
    phone
    displayName
    canInvite
  }
}
    `;

export function useGetAbListingsQuery(options: Omit<Urql.UseQueryArgs<never, GetAbListingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAbListingsQuery, GetAbListingsQueryVariables>({ query: GetAbListingsDocument, ...options });
};
export const ActivateTenantDocument = gql`
    mutation ActivateTenant($tenantId: UUID!) {
  activateTenant(input: {_tenantId: $tenantId}) {
    tenant {
      ...Tenant
    }
  }
}
    ${TenantFragmentDoc}`;

export function useActivateTenantMutation() {
  return Urql.useMutation<ActivateTenantMutation, ActivateTenantMutationVariables>(ActivateTenantDocument);
};
export const AssumeResidentDocument = gql`
    mutation AssumeResident($residentId: UUID!) {
  assumeResidency(input: {_residentId: $residentId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useAssumeResidentMutation() {
  return Urql.useMutation<AssumeResidentMutation, AssumeResidentMutationVariables>(AssumeResidentDocument);
};
export const BecomeSupportDocument = gql`
    mutation BecomeSupport($tenantId: UUID!) {
  becomeSupport(input: {_tenantId: $tenantId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useBecomeSupportMutation() {
  return Urql.useMutation<BecomeSupportMutation, BecomeSupportMutationVariables>(BecomeSupportDocument);
};
export const BlockResidentDocument = gql`
    mutation BlockResident($residentId: UUID!) {
  blockResident(input: {_residentId: $residentId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useBlockResidentMutation() {
  return Urql.useMutation<BlockResidentMutation, BlockResidentMutationVariables>(BlockResidentDocument);
};
export const CreateTenantDocument = gql`
    mutation CreateTenant($name: String!, $email: String!) {
  createTenant(input: {_name: $name, _email: $email}) {
    tenant {
      ...Tenant
    }
  }
}
    ${TenantFragmentDoc}`;

export function useCreateTenantMutation() {
  return Urql.useMutation<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument);
};
export const DeactivateTenantDocument = gql`
    mutation DeactivateTenant($tenantId: UUID!) {
  deactivateTenant(input: {_tenantId: $tenantId}) {
    tenant {
      ...Tenant
    }
  }
}
    ${TenantFragmentDoc}`;

export function useDeactivateTenantMutation() {
  return Urql.useMutation<DeactivateTenantMutation, DeactivateTenantMutationVariables>(DeactivateTenantDocument);
};
export const DeactivateTenantSubscriptionDocument = gql`
    mutation DeactivateTenantSubscription($tenantSubscriptionId: UUID!) {
  deactivateTenantSubscription(
    input: {_tenantSubscriptionId: $tenantSubscriptionId}
  ) {
    tenantSubscription {
      ...TenantSubscription
    }
  }
}
    ${TenantSubscriptionFragmentDoc}`;

export function useDeactivateTenantSubscriptionMutation() {
  return Urql.useMutation<DeactivateTenantSubscriptionMutation, DeactivateTenantSubscriptionMutationVariables>(DeactivateTenantSubscriptionDocument);
};
export const DeclineResidentDocument = gql`
    mutation DeclineResident($residentId: UUID!) {
  declineResidency(input: {_residentId: $residentId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useDeclineResidentMutation() {
  return Urql.useMutation<DeclineResidentMutation, DeclineResidentMutationVariables>(DeclineResidentDocument);
};
export const ExitSupportModeDocument = gql`
    mutation ExitSupportMode {
  exitSupportMode(input: {}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useExitSupportModeMutation() {
  return Urql.useMutation<ExitSupportModeMutation, ExitSupportModeMutationVariables>(ExitSupportModeDocument);
};
export const GrantUserLicenseDocument = gql`
    mutation GrantUserLicense($residentId: UUID!, $licenseTypeKey: String!) {
  grantUserLicense(
    input: {_residentId: $residentId, _licenseTypeKey: $licenseTypeKey}
  ) {
    license {
      ...License
    }
  }
}
    ${LicenseFragmentDoc}`;

export function useGrantUserLicenseMutation() {
  return Urql.useMutation<GrantUserLicenseMutation, GrantUserLicenseMutationVariables>(GrantUserLicenseDocument);
};
export const ReactivateTenantSubscriptionDocument = gql`
    mutation ReactivateTenantSubscription($tenantSubscriptionId: UUID!) {
  reactivateTenantSubscription(
    input: {_tenantSubscriptionId: $tenantSubscriptionId}
  ) {
    tenantSubscription {
      ...TenantSubscription
    }
  }
}
    ${TenantSubscriptionFragmentDoc}`;

export function useReactivateTenantSubscriptionMutation() {
  return Urql.useMutation<ReactivateTenantSubscriptionMutation, ReactivateTenantSubscriptionMutationVariables>(ReactivateTenantSubscriptionDocument);
};
export const RevokeUserLicenseDocument = gql`
    mutation RevokeUserLicense($licenseId: UUID!) {
  revokeUserLicense(input: {_licenseId: $licenseId}) {
    boolean
  }
}
    `;

export function useRevokeUserLicenseMutation() {
  return Urql.useMutation<RevokeUserLicenseMutation, RevokeUserLicenseMutationVariables>(RevokeUserLicenseDocument);
};
export const SubscribeTenantToLicensePackDocument = gql`
    mutation SubscribeTenantToLicensePack($tenantId: UUID!, $licensePackKey: String!) {
  subscribeTenantToLicensePack(
    input: {_tenantId: $tenantId, _licensePackKey: $licensePackKey}
  ) {
    tenantSubscription {
      ...TenantSubscription
    }
  }
}
    ${TenantSubscriptionFragmentDoc}`;

export function useSubscribeTenantToLicensePackMutation() {
  return Urql.useMutation<SubscribeTenantToLicensePackMutation, SubscribeTenantToLicensePackMutationVariables>(SubscribeTenantToLicensePackDocument);
};
export const UnblockResidentDocument = gql`
    mutation UnblockResident($residentId: UUID!) {
  unblockResident(input: {_residentId: $residentId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useUnblockResidentMutation() {
  return Urql.useMutation<UnblockResidentMutation, UnblockResidentMutationVariables>(UnblockResidentDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($displayName: String!, $firstName: String!, $lastName: String!, $phone: String) {
  updateProfile(
    input: {_displayName: $displayName, _firstName: $firstName, _lastName: $lastName, _phone: $phone}
  ) {
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};
export const ActiveLicensePacksDocument = gql`
    query ActiveLicensePacks {
  licensePacksList {
    ...LicensePack
  }
}
    ${LicensePackFragmentDoc}`;

export function useActiveLicensePacksQuery(options: Omit<Urql.UseQueryArgs<never, ActiveLicensePacksQueryVariables>, 'query'>) {
  return Urql.useQuery<ActiveLicensePacksQuery, ActiveLicensePacksQueryVariables>({ query: ActiveLicensePacksDocument, ...options });
};
export const AllAppProfilesDocument = gql`
    query AllAppProfiles {
  profiles {
    nodes {
      ...Profile
      residents: residentsList {
        ...Resident
        licenses: licensesList {
          ...License
        }
      }
    }
  }
}
    ${ProfileFragmentDoc}
${ResidentFragmentDoc}
${LicenseFragmentDoc}`;

export function useAllAppProfilesQuery(options: Omit<Urql.UseQueryArgs<never, AllAppProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllAppProfilesQuery, AllAppProfilesQueryVariables>({ query: AllAppProfilesDocument, ...options });
};
export const AllApplicationsDocument = gql`
    query AllApplications {
  applications: applicationsList {
    ...Application
    licenseTypes: licenseTypesByApplicationKeyList {
      ...LicenseType
      permissions: licenseTypePermissionsByLicenseTypeKeyList {
        ...LicenseTypePermission
      }
      licenses: licensesByLicenseTypeKey {
        totalCount
      }
    }
  }
}
    ${ApplicationFragmentDoc}
${LicenseTypeFragmentDoc}
${LicenseTypePermissionFragmentDoc}`;

export function useAllApplicationsQuery(options: Omit<Urql.UseQueryArgs<never, AllApplicationsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllApplicationsQuery, AllApplicationsQueryVariables>({ query: AllApplicationsDocument, ...options });
};
export const AllLicensePacksDocument = gql`
    query AllLicensePacks {
  licensePacks: licensePacksList {
    ...LicensePack
    licensePackLicenseTypes: licensePackLicenseTypesByLicensePackKeyList {
      ...LicensePackLicenseType
      licenseType {
        ...LicenseType
        permissions: licenseTypePermissionsByLicenseTypeKeyList {
          ...LicenseTypePermission
        }
        licenses: licensesByLicenseTypeKey {
          totalCount
        }
      }
    }
    tenantSubscriptions: tenantSubscriptionsByLicensePackKey {
      totalCount
    }
  }
}
    ${LicensePackFragmentDoc}
${LicensePackLicenseTypeFragmentDoc}
${LicenseTypeFragmentDoc}
${LicenseTypePermissionFragmentDoc}`;

export function useAllLicensePacksQuery(options: Omit<Urql.UseQueryArgs<never, AllLicensePacksQueryVariables>, 'query'>) {
  return Urql.useQuery<AllLicensePacksQuery, AllLicensePacksQueryVariables>({ query: AllLicensePacksDocument, ...options });
};
export const AllResidentsDocument = gql`
    query AllResidents {
  residents: residentsList {
    ...Resident
    licenses: licensesList {
      ...License
      licenseType {
        ...LicenseType
      }
    }
  }
}
    ${ResidentFragmentDoc}
${LicenseFragmentDoc}
${LicenseTypeFragmentDoc}`;

export function useAllResidentsQuery(options: Omit<Urql.UseQueryArgs<never, AllResidentsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllResidentsQuery, AllResidentsQueryVariables>({ query: AllResidentsDocument, ...options });
};
export const TenantByIdDocument = gql`
    query TenantById($tenantId: UUID!) {
  tenant(id: $tenantId) {
    ...Tenant
    residents: residents {
      totalCount
    }
    tenantSubscriptions: tenantSubscriptionsList {
      ...TenantSubscription
      licenses: licenses {
        totalCount
      }
    }
  }
}
    ${TenantFragmentDoc}
${TenantSubscriptionFragmentDoc}`;

export function useTenantByIdQuery(options: Omit<Urql.UseQueryArgs<never, TenantByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<TenantByIdQuery, TenantByIdQueryVariables>({ query: TenantByIdDocument, ...options });
};
export const TenantLicensesDocument = gql`
    query TenantLicenses {
  tenantLicenses: tenantLicensesList {
    ...License
    resident {
      ...Resident
    }
  }
}
    ${LicenseFragmentDoc}
${ResidentFragmentDoc}`;

export function useTenantLicensesQuery(options: Omit<Urql.UseQueryArgs<never, TenantLicensesQueryVariables>, 'query'>) {
  return Urql.useQuery<TenantLicensesQuery, TenantLicensesQueryVariables>({ query: TenantLicensesDocument, ...options });
};
export const TenantResidentsDocument = gql`
    query TenantResidents {
  residents: residentsList {
    ...Resident
  }
}
    ${ResidentFragmentDoc}`;

export function useTenantResidentsQuery(options: Omit<Urql.UseQueryArgs<never, TenantResidentsQueryVariables>, 'query'>) {
  return Urql.useQuery<TenantResidentsQuery, TenantResidentsQueryVariables>({ query: TenantResidentsDocument, ...options });
};
export const TenantSubscriptionsDocument = gql`
    query TenantSubscriptions($tenantId: UUID!) {
  tenantSubscriptions: tenantSubscriptionsList(condition: {tenantId: $tenantId}) {
    ...TenantSubscription
    tenant {
      ...Tenant
    }
    licenses {
      totalCount
    }
    licensePack {
      ...LicensePack
      licensePackLicenseTypes: licensePackLicenseTypesByLicensePackKeyList {
        ...LicensePackLicenseType
        licenseType {
          ...LicenseType
          permissions: licenseTypePermissionsByLicenseTypeKeyList {
            ...LicenseTypePermission
          }
          licenses: licensesByLicenseTypeKey {
            totalCount
          }
        }
      }
    }
  }
}
    ${TenantSubscriptionFragmentDoc}
${TenantFragmentDoc}
${LicensePackFragmentDoc}
${LicensePackLicenseTypeFragmentDoc}
${LicenseTypeFragmentDoc}
${LicenseTypePermissionFragmentDoc}`;

export function useTenantSubscriptionsQuery(options: Omit<Urql.UseQueryArgs<never, TenantSubscriptionsQueryVariables>, 'query'>) {
  return Urql.useQuery<TenantSubscriptionsQuery, TenantSubscriptionsQueryVariables>({ query: TenantSubscriptionsDocument, ...options });
};
export const AvailableModulesDocument = gql`
    query AvailableModules {
  availableModules {
    key
    name
    permissionKeys
    defaultIconKey
    ordinal
    toolsByModuleKeyList: tools {
      key
      name
      permissionKeys
      defaultIconKey
      ordinal
      route
    }
  }
}
    `;

export function useAvailableModulesQuery(options: Omit<Urql.UseQueryArgs<never, AvailableModulesQueryVariables>, 'query'>) {
  return Urql.useQuery<AvailableModulesQuery, AvailableModulesQueryVariables>({ query: AvailableModulesDocument, ...options });
};
export const CurrentProfileClaimsDocument = gql`
    query CurrentProfileClaims {
  currentProfileClaims {
    ...ProfileClaim
  }
  availableModules {
    key
    name
    permissionKeys
    defaultIconKey
    ordinal
    toolsByModuleKeyList: tools {
      key
      name
      permissionKeys
      defaultIconKey
      ordinal
      route
    }
  }
  activeResidency: residentsList(condition: {status: ACTIVE}) {
    ...Resident
  }
}
    ${ProfileClaimFragmentDoc}
${ResidentFragmentDoc}`;

export function useCurrentProfileClaimsQuery(options: Omit<Urql.UseQueryArgs<never, CurrentProfileClaimsQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentProfileClaimsQuery, CurrentProfileClaimsQueryVariables>({ query: CurrentProfileClaimsDocument, ...options });
};
export const GetMyselfDocument = gql`
    query GetMyself {
  getMyself {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

export function useGetMyselfQuery(options: Omit<Urql.UseQueryArgs<never, GetMyselfQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyselfQuery, GetMyselfQueryVariables>({ query: GetMyselfDocument, ...options });
};
export const MyProfileResidenciesDocument = gql`
    query MyProfileResidencies {
  myProfileResidenciesList {
    ...Resident
    licenses: licensesList {
      ...License
      licenseType {
        ...LicenseType
      }
    }
  }
}
    ${ResidentFragmentDoc}
${LicenseFragmentDoc}
${LicenseTypeFragmentDoc}`;

export function useMyProfileResidenciesQuery(options: Omit<Urql.UseQueryArgs<never, MyProfileResidenciesQueryVariables>, 'query'>) {
  return Urql.useQuery<MyProfileResidenciesQuery, MyProfileResidenciesQueryVariables>({ query: MyProfileResidenciesDocument, ...options });
};
export const ResidentByIdDocument = gql`
    query ResidentById($residentId: UUID!) {
  resident(id: $residentId) {
    ...Resident
    licenses: licensesList {
      ...License
    }
  }
}
    ${ResidentFragmentDoc}
${LicenseFragmentDoc}`;

export function useResidentByIdQuery(options: Omit<Urql.UseQueryArgs<never, ResidentByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ResidentByIdQuery, ResidentByIdQueryVariables>({ query: ResidentByIdDocument, ...options });
};
export const SearchProfilesDocument = gql`
    query SearchProfiles($searchTerm: String) {
  searchProfiles(_options: {searchTerm: $searchTerm}) {
    nodes {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useSearchProfilesQuery(options: Omit<Urql.UseQueryArgs<never, SearchProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchProfilesQuery, SearchProfilesQueryVariables>({ query: SearchProfilesDocument, ...options });
};
export const SearchResidentsDocument = gql`
    query SearchResidents($searchTerm: String) {
  searchResidents(_options: {searchTerm: $searchTerm}) {
    nodes {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useSearchResidentsQuery(options: Omit<Urql.UseQueryArgs<never, SearchResidentsQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchResidentsQuery, SearchResidentsQueryVariables>({ query: SearchResidentsDocument, ...options });
};
export const SearchTenantsDocument = gql`
    query SearchTenants($searchTerm: String) {
  searchTenants(_options: {searchTerm: $searchTerm}) {
    nodes {
      ...Tenant
      subscriptions: tenantSubscriptionsList(orderBy: LICENSE_PACK_KEY_ASC) {
        ...TenantSubscription
        licensePack {
          ...LicensePack
          licenseTypes: licensePackLicenseTypesByLicensePackKeyList(
            orderBy: LICENSE_TYPE_KEY_ASC
          ) {
            ...LicensePackLicenseType
          }
        }
      }
    }
  }
}
    ${TenantFragmentDoc}
${TenantSubscriptionFragmentDoc}
${LicensePackFragmentDoc}
${LicensePackLicenseTypeFragmentDoc}`;

export function useSearchTenantsQuery(options: Omit<Urql.UseQueryArgs<never, SearchTenantsQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchTenantsQuery, SearchTenantsQueryVariables>({ query: SearchTenantsDocument, ...options });
};
export const SiteUserByIdDocument = gql`
    query SiteUserById($id: UUID!) {
  siteUserById(_id: $id)
}
    `;

export function useSiteUserByIdQuery(options: Omit<Urql.UseQueryArgs<never, SiteUserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteUserByIdQuery, SiteUserByIdQueryVariables>({ query: SiteUserByIdDocument, ...options });
};
export const ThrowErrorDocument = gql`
    query ThrowError($message: String) {
  throwError(_message: $message)
}
    `;

export function useThrowErrorQuery(options: Omit<Urql.UseQueryArgs<never, ThrowErrorQueryVariables>, 'query'>) {
  return Urql.useQuery<ThrowErrorQuery, ThrowErrorQueryVariables>({ query: ThrowErrorDocument, ...options });
};
export const UpsertMessageDocument = gql`
    mutation UpsertMessage($messageInfo: MessageInfoInput!) {
  upsertMessage(input: {_messageInfo: $messageInfo}) {
    message {
      id
      createdAt
      content
      tags
    }
  }
}
    `;

export function useUpsertMessageMutation() {
  return Urql.useMutation<UpsertMessageMutation, UpsertMessageMutationVariables>(UpsertMessageDocument);
};
export const UpsertTopicDocument = gql`
    mutation UpsertTopic($topicInfo: TopicInfoInput!) {
  upsertTopic(input: {_topicInfo: $topicInfo}) {
    topic {
      id
      name
      identifier
    }
  }
}
    `;

export function useUpsertTopicMutation() {
  return Urql.useMutation<UpsertTopicMutation, UpsertTopicMutationVariables>(UpsertTopicDocument);
};
export const AllDiscussionsDocument = gql`
    query AllDiscussions {
  topics {
    nodes {
      ...Topic
      subscribers: subscribersList {
        ...Subscriber
      }
      messages {
        totalCount
      }
    }
  }
}
    ${TopicFragmentDoc}
${SubscriberFragmentDoc}`;

export function useAllDiscussionsQuery(options: Omit<Urql.UseQueryArgs<never, AllDiscussionsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllDiscussionsQuery, AllDiscussionsQueryVariables>({ query: AllDiscussionsDocument, ...options });
};
export const DiscussionByIdDocument = gql`
    query DiscussionById($topicId: UUID!) {
  topic(id: $topicId) {
    ...Topic
    subscribers: subscribersList {
      ...Subscriber
    }
    messages: messagesList {
      ...Message
    }
  }
}
    ${TopicFragmentDoc}
${SubscriberFragmentDoc}
${MessageFragmentDoc}`;

export function useDiscussionByIdQuery(options: Omit<Urql.UseQueryArgs<never, DiscussionByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<DiscussionByIdQuery, DiscussionByIdQueryVariables>({ query: DiscussionByIdDocument, ...options });
};
export const TopicMessageDocument = gql`
    subscription TopicMessage($topicId: UUID!) {
  topicMessage(topicId: $topicId) {
    message {
      ...Message
      __typename
    }
    event
    messageId
  }
}
    ${MessageFragmentDoc}`;

export function useTopicMessageSubscription<R = TopicMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, TopicMessageSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandlerArg<TopicMessageSubscription, R>) {
  return Urql.useSubscription<TopicMessageSubscription, R, TopicMessageSubscriptionVariables>({ query: TopicMessageDocument, ...options }, handler);
};
export const CreateLocationDocument = gql`
    mutation CreateLocation($locationInfo: LocationInfoInput!) {
  createLocation(input: {_locationInfo: $locationInfo}) {
    location {
      ...Location
    }
  }
}
    ${LocationFragmentDoc}`;

export function useCreateLocationMutation() {
  return Urql.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument);
};
export const DeleteLocationDocument = gql`
    mutation DeleteLocation($locationId: UUID!) {
  deleteLocation(input: {_locationId: $locationId}) {
    boolean
  }
}
    `;

export function useDeleteLocationMutation() {
  return Urql.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument);
};
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($locationInfo: LocationInfoInput!) {
  updateLocation(input: {_locationInfo: $locationInfo}) {
    location {
      ...Location
    }
  }
}
    ${LocationFragmentDoc}`;

export function useUpdateLocationMutation() {
  return Urql.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument);
};
export const AllLocationsDocument = gql`
    query AllLocations {
  locations: locationsList {
    ...Location
  }
}
    ${LocationFragmentDoc}`;

export function useAllLocationsQuery(options: Omit<Urql.UseQueryArgs<never, AllLocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllLocationsQuery, AllLocationsQueryVariables>({ query: AllLocationsDocument, ...options });
};
export const CreateTodoDocument = gql`
    mutation CreateTodo($name: String!, $description: String, $parentTodoId: UUID) {
  createTodo(
    input: {_name: $name, _options: {description: $description, parentTodoId: $parentTodoId}}
  ) {
    todo {
      id
      name
      description
      status
      type
      createdAt
      updatedAt
      parentTodoId
      isTemplate
    }
  }
}
    `;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument);
};
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($todoId: UUID!) {
  deleteTodo(input: {_todoId: $todoId}) {
    boolean
  }
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};
export const MakeTemplateFromTodoDocument = gql`
    mutation MakeTemplateFromTodo($todoId: UUID) {
  makeTemplateFromTodo(input: {_todoId: $todoId}) {
    todo {
      id
      name
    }
  }
}
    `;

export function useMakeTemplateFromTodoMutation() {
  return Urql.useMutation<MakeTemplateFromTodoMutation, MakeTemplateFromTodoMutationVariables>(MakeTemplateFromTodoDocument);
};
export const MakeTodoFromTemplateDocument = gql`
    mutation MakeTodoFromTemplate($todoId: UUID) {
  makeTodoFromTemplate(input: {_todoId: $todoId}) {
    todo {
      id
      name
    }
  }
}
    `;

export function useMakeTodoFromTemplateMutation() {
  return Urql.useMutation<MakeTodoFromTemplateMutation, MakeTodoFromTemplateMutationVariables>(MakeTodoFromTemplateDocument);
};
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($todoId: UUID!, $name: String!, $description: String) {
  updateTodo(input: {_todoId: $todoId, _name: $name, _description: $description}) {
    todo {
      id
      name
      description
      type
      status
      createdAt
      updatedAt
      parentTodoId
    }
  }
}
    `;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument);
};
export const UpdateTodoStatusDocument = gql`
    mutation UpdateTodoStatus($todoId: UUID!, $status: TodoStatus!) {
  updateTodoStatus(input: {_todoId: $todoId, _status: $status}) {
    todo {
      id
      status
      parentTodo {
        id
        status
        parentTodo {
          id
          status
          parentTodo {
            id
            status
            parentTodo {
              id
              status
              parentTodo {
                id
                status
                parentTodo {
                  id
                  status
                  parentTodo {
                    id
                    status
                    parentTodo {
                      id
                      status
                      parentTodo {
                        id
                        status
                        parentTodo {
                          id
                          status
                          parentTodo {
                            id
                            status
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

export function useUpdateTodoStatusMutation() {
  return Urql.useMutation<UpdateTodoStatusMutation, UpdateTodoStatusMutationVariables>(UpdateTodoStatusDocument);
};
export const AssignTodoDocument = gql`
    mutation AssignTodo($todoId: UUID!, $residentId: UUID!) {
  assignTodo(input: {_todoId: $todoId, _residentId: $residentId}) {
    todo {
      ...Todo
      owner: resident {
        residentId
        displayName
      }
    }
  }
}
    ${TodoFragmentDoc}`;

export function useAssignTodoMutation() {
  return Urql.useMutation<AssignTodoMutation, AssignTodoMutationVariables>(AssignTodoDocument);
};
export const SearchTodosDocument = gql`
    query SearchTodos($searchTerm: String, $todoType: TodoType, $rootsOnly: Boolean, $isTemplate: Boolean) {
  searchTodos(
    _options: {searchTerm: $searchTerm, todoType: $todoType, rootsOnly: $rootsOnly, isTemplate: $isTemplate}
  ) {
    nodes {
      ...Todo
      resident {
        residentId
        displayName
      }
      parentTodo {
        ...Todo
      }
      tenant {
        tenantId
        name
      }
    }
  }
}
    ${TodoFragmentDoc}`;

export function useSearchTodosQuery(options: Omit<Urql.UseQueryArgs<never, SearchTodosQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchTodosQuery, SearchTodosQueryVariables>({ query: SearchTodosDocument, ...options });
};
export const TodoByIdDocument = gql`
    query TodoById($id: UUID!) {
  todo(id: $id) {
    ...Todo
    location {
      ...Location
    }
    owner: resident {
      residentId
      displayName
    }
    children: todosByParentTodoIdList {
      ...Todo
      location {
        ...Location
      }
      owner: resident {
        residentId
        displayName
      }
      children: todosByParentTodoIdList {
        ...Todo
        location {
          ...Location
        }
        owner: resident {
          residentId
          displayName
        }
        children: todosByParentTodoIdList {
          ...Todo
          location {
            ...Location
          }
          owner: resident {
            residentId
            displayName
          }
          hiddenChildren: todosByParentTodoId {
            totalCount
          }
        }
      }
    }
  }
}
    ${TodoFragmentDoc}
${LocationFragmentDoc}`;

export function useTodoByIdQuery(options: Omit<Urql.UseQueryArgs<never, TodoByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<TodoByIdQuery, TodoByIdQueryVariables>({ query: TodoByIdDocument, ...options });
};
export const TodoByIdForRefreshDocument = gql`
    query TodoByIdForRefresh($id: UUID!) {
  todo(id: $id) {
    id
    status
    parentTodo {
      id
      status
      parentTodo {
        id
        status
        parentTodo {
          id
          status
          parentTodo {
            id
            status
            parentTodo {
              id
              status
              parentTodo {
                id
                status
                parentTodo {
                  id
                  status
                  parentTodo {
                    id
                    status
                    parentTodo {
                      id
                      status
                      parentTodo {
                        id
                        status
                        parentTodo {
                          id
                          status
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

export function useTodoByIdForRefreshQuery(options: Omit<Urql.UseQueryArgs<never, TodoByIdForRefreshQueryVariables>, 'query'>) {
  return Urql.useQuery<TodoByIdForRefreshQuery, TodoByIdForRefreshQueryVariables>({ query: TodoByIdForRefreshDocument, ...options });
};
export const AllProjectTemplatesDocument = gql`
    query AllProjectTemplates {
  projectTemplates: projectsList(condition: {isTemplate: true}) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;

export function useAllProjectTemplatesQuery(options: Omit<Urql.UseQueryArgs<never, AllProjectTemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllProjectTemplatesQuery, AllProjectTemplatesQueryVariables>({ query: AllProjectTemplatesDocument, ...options });
};