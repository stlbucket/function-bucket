import { offlineExchange } from '@urql/exchange-graphcache';
import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

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
  exitSupportMode?: Maybe<ExitSupportModePayload>;
  grantUserLicense?: Maybe<GrantUserLicensePayload>;
  joinAddressBook?: Maybe<JoinAddressBookPayload>;
  leaveAddressBook?: Maybe<LeaveAddressBookPayload>;
  makeTemplateFromTodo?: Maybe<MakeTemplateFromTodoPayload>;
  makeTodoFromTemplate?: Maybe<MakeTodoFromTemplatePayload>;
  pinTodo?: Maybe<PinTodoPayload>;
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
  upsertSubscriber?: Maybe<UpsertSubscriberPayload>;
  upsertTopic?: Maybe<UpsertTopicPayload>;
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
export type MutationExitSupportModeArgs = {
  input: ExitSupportModeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGrantUserLicenseArgs = {
  input: GrantUserLicenseInput;
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
export type MutationPinTodoArgs = {
  input: PinTodoInput;
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
export type MutationUpsertSubscriberArgs = {
  input: UpsertSubscriberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertTopicArgs = {
  input: UpsertTopicInput;
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
  /** Get a single `Topic`. */
  topic?: Maybe<Topic>;
  /** Reads a single `Topic` using its globally unique `ID`. */
  topicByNodeId?: Maybe<Topic>;
  /** Reads and enables pagination through a set of `Topic`. */
  topics?: Maybe<TopicsConnection>;
  /** Reads a set of `Topic`. */
  topicsList?: Maybe<Array<Topic>>;
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

export type JoinAddressBookMutationVariables = Exact<{ [key: string]: never; }>;


export type JoinAddressBookMutation = { __typename: 'Mutation', joinAddressBook?: { __typename: 'JoinAddressBookPayload', profile?: { __typename: 'Profile', id: any, email: string, displayName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, fullName?: string | null, isPublic: boolean } | null } | null };

export type LeaveAddressBookMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveAddressBookMutation = { __typename: 'Mutation', leaveAddressBook?: { __typename: 'LeaveAddressBookPayload', profile?: { __typename: 'Profile', id: any, email: string, displayName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, fullName?: string | null, isPublic: boolean } | null } | null };

export type GetAbListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAbListingsQuery = { __typename: 'Query', getAbListings?: { __typename: 'AbListingsConnection', nodes: Array<{ __typename: 'AbListing', profileId?: any | null, fullName?: string | null, email?: string | null, phone?: string | null, displayName?: string | null, canInvite?: boolean | null } | null> } | null };

export type ApplicationFragment = { __typename: 'Application', key: string, name: string };

export type LicenseFragment = { __typename: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null };

export type LicensePackFragment = { __typename: 'LicensePack', key: string, displayName: string, description: string };

export type LicensePackLicenseTypeFragment = { __typename: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null };

export type LicenseTypeFragment = { __typename: 'LicenseType', key: string, displayName: string, assignmentScope: LicenseTypeAssignmentScope };

export type LicenseTypePermissionFragment = { __typename: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string };

export type ProfileFragment = { __typename: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: ProfileStatus, createdAt: any, updatedAt: any };

export type ProfileClaimFragment = { __typename: 'ProfileClaim', profileId?: any | null, tenantId?: any | null, residentId?: any | null, actualResidentId?: any | null, profileStatus?: ProfileStatus | null, permissions?: Array<string | null> | null, email?: string | null, displayName?: string | null, tenantName?: string | null };

export type ResidentFragment = { __typename: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: ResidentStatus, displayName?: string | null, email: string, type: ResidentType };

export type TenantFragment = { __typename: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: TenantStatus, type: TenantType, licenses: { __typename: 'LicensesConnection', totalCount: number } };

export type TenantSubscriptionFragment = { __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus };

export type ActivateTenantMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type ActivateTenantMutation = { __typename: 'Mutation', activateTenant?: { __typename: 'ActivateTenantPayload', tenant?: { __typename: 'Tenant', id: any, name: string, status: TenantStatus } | null } | null };

export type AssumeResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type AssumeResidentMutation = { __typename: 'Mutation', assumeResidency?: { __typename: 'AssumeResidencyPayload', resident?: { __typename: 'Resident', id: any, tenantId: any, profileId?: any | null, tenantName: string, createdAt: any, email: string, status: ResidentStatus } | null } | null };

export type BecomeSupportMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type BecomeSupportMutation = { __typename: 'Mutation', becomeSupport?: { __typename: 'BecomeSupportPayload', resident?: { __typename: 'Resident', id: any, email: string, displayName?: string | null, tenantName: string, status: ResidentStatus } | null } | null };

export type BlockResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type BlockResidentMutation = { __typename: 'Mutation', blockResident?: { __typename: 'BlockResidentPayload', resident?: { __typename: 'Resident', id: any, email: string, tenantName: string, status: ResidentStatus, displayName?: string | null } | null } | null };

export type CreateTenantMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateTenantMutation = { __typename: 'Mutation', createTenant?: { __typename: 'CreateTenantPayload', tenant?: { __typename: 'Tenant', id: any, name: string } | null } | null };

export type DeactivateTenantMutationVariables = Exact<{
  tenantId: Scalars['UUID']['input'];
}>;


export type DeactivateTenantMutation = { __typename: 'Mutation', deactivateTenant?: { __typename: 'DeactivateTenantPayload', tenant?: { __typename: 'Tenant', id: any, name: string, status: TenantStatus } | null } | null };

export type DeactivateTenantSubscriptionMutationVariables = Exact<{
  tenantSubscriptionId: Scalars['UUID']['input'];
}>;


export type DeactivateTenantSubscriptionMutation = { __typename: 'Mutation', deactivateTenantSubscription?: { __typename: 'DeactivateTenantSubscriptionPayload', tenantSubscription?: { __typename: 'TenantSubscription', id: any, licensePackKey: string, status: TenantSubscriptionStatus } | null } | null };

export type DeclineResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type DeclineResidentMutation = { __typename: 'Mutation', declineResidency?: { __typename: 'DeclineResidencyPayload', resident?: { __typename: 'Resident', id: any, tenantId: any, profileId?: any | null, tenantName: string, createdAt: any, email: string, status: ResidentStatus } | null } | null };

export type ExitSupportModeMutationVariables = Exact<{ [key: string]: never; }>;


export type ExitSupportModeMutation = { __typename: 'Mutation', exitSupportMode?: { __typename: 'ExitSupportModePayload', resident?: { __typename: 'Resident', id: any, email: string, tenantName: string, status: ResidentStatus } | null } | null };

export type GrantUserLicenseMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
  licenseTypeKey: Scalars['String']['input'];
}>;


export type GrantUserLicenseMutation = { __typename: 'Mutation', grantUserLicense?: { __typename: 'GrantUserLicensePayload', license?: { __typename: 'License', id: any, licenseTypeKey: string } | null } | null };

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


export type SubscribeTenantToLicensePackMutation = { __typename: 'Mutation', subscribeTenantToLicensePack?: { __typename: 'SubscribeTenantToLicensePackPayload', tenantSubscription?: { __typename: 'TenantSubscription', id: any, licensePackKey: string } | null } | null };

export type UnblockResidentMutationVariables = Exact<{
  residentId: Scalars['UUID']['input'];
}>;


export type UnblockResidentMutation = { __typename: 'Mutation', unblockResident?: { __typename: 'UnblockResidentPayload', resident?: { __typename: 'Resident', id: any, email: string, tenantName: string, status: ResidentStatus, displayName?: string | null } | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  displayName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename: 'Mutation', updateProfile?: { __typename: 'UpdateProfilePayload', profile?: { __typename: 'Profile', id: any, email: string, displayName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null } | null } | null };

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

export type CurrentProfileClaimsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentProfileClaimsQuery = { __typename: 'Query', currentProfileClaims?: { __typename: 'ProfileClaim', profileId?: any | null, tenantId?: any | null, residentId?: any | null, actualResidentId?: any | null, profileStatus?: ProfileStatus | null, permissions?: Array<string | null> | null, email?: string | null, displayName?: string | null, tenantName?: string | null } | null };

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

export type UpsertMessageMutationVariables = Exact<{
  messageInfo: MessageInfoInput;
}>;


export type UpsertMessageMutation = { __typename: 'Mutation', upsertMessage?: { __typename: 'UpsertMessagePayload', message?: { __typename: 'Message', id: any, createdAt: any, content: string, tags: Array<string | null> } | null } | null };

export type UpsertTopicMutationVariables = Exact<{
  topicInfo: TopicInfoInput;
}>;


export type UpsertTopicMutation = { __typename: 'Mutation', upsertTopic?: { __typename: 'UpsertTopicPayload', topic?: { __typename: 'Topic', id: any, name: string, identifier?: string | null } | null } | null };

export type AllDiscussionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDiscussionsQuery = { __typename: 'Query', topics?: { __typename: 'TopicsConnection', nodes: Array<{ __typename: 'Topic', id: any, name: string, status: TopicStatus, subscribers: Array<{ __typename: 'Subscriber', id: any, status: SubscriberStatus, msgResident?: { __typename: 'MsgResident', residentId: any, displayName: string } | null }>, messages: { __typename: 'MessagesConnection', totalCount: number } } | null> } | null };

export type DiscussionByIdQueryVariables = Exact<{
  topicId: Scalars['UUID']['input'];
}>;


export type DiscussionByIdQuery = { __typename: 'Query', topic?: { __typename: 'Topic', id: any, name: string, identifier?: string | null, status: TopicStatus, subscribers: Array<{ __typename: 'Subscriber', id: any, status: SubscriberStatus, lastRead: any, msgResident?: { __typename: 'MsgResident', residentId: any, displayName: string } | null }>, messages: Array<{ __typename: 'Message', id: any, createdAt: any, status: MessageStatus, content: string, postedBy?: { __typename: 'MsgResident', residentId: any, displayName: string } | null }> } | null };

export type TopicMessageSubscriptionVariables = Exact<{
  topicId: Scalars['UUID']['input'];
}>;


export type TopicMessageSubscription = { __typename: 'Subscription', topicMessage?: { __typename: 'TopicMessageSubscriptionPayload', event?: string | null, messageId?: any | null, message?: { __typename: 'Message', id: any, createdAt: any, status: MessageStatus, content: string, postedBy?: { __typename: 'MsgResident', residentId: any, displayName: string } | null } | null } | null };

export type CreateLocationMutationVariables = Exact<{
  locationInfo: LocationInfoInput;
}>;


export type CreateLocationMutation = { __typename: 'Mutation', createLocation?: { __typename: 'CreateLocationPayload', location?: { __typename: 'Location', id: any, tenantId: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, lat?: string | null, lon?: string | null, resident?: { __typename: 'LocResident', displayName: string, residentId: any } | null } | null } | null };

export type DeleteLocationMutationVariables = Exact<{
  locationId: Scalars['UUID']['input'];
}>;


export type DeleteLocationMutation = { __typename: 'Mutation', deleteLocation?: { __typename: 'DeleteLocationPayload', boolean?: boolean | null } | null };

export type UpdateLocationMutationVariables = Exact<{
  locationInfo: LocationInfoInput;
}>;


export type UpdateLocationMutation = { __typename: 'Mutation', updateLocation?: { __typename: 'UpdateLocationPayload', location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null } | null };

export type AllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLocationsQuery = { __typename: 'Query', locations?: { __typename: 'LocationsConnection', nodes: Array<{ __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null> } | null };

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


export type AssignTodoMutation = { __typename: 'Mutation', assignTodo?: { __typename: 'AssignTodoPayload', todo?: { __typename: 'Todo', id: any, name: string, description?: string | null, residentId?: any | null, status: TodoStatus, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null } | null } | null };

export type SearchTodosQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  todoType?: InputMaybe<TodoType>;
  rootsOnly?: InputMaybe<Scalars['Boolean']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchTodosQuery = { __typename: 'Query', searchTodos?: { __typename: 'TodosConnection', nodes: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, status: TodoStatus, type: TodoType, createdAt: any, updatedAt: any, resident?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, parentTodo?: { __typename: 'Todo', id: any, name: string, description?: string | null } | null, tenant?: { __typename: 'TodoTenant', tenantId: any, name: string } | null } | null> } | null };

export type TodoByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type TodoByIdQuery = { __typename: 'Query', todo?: { __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename: 'Todo', id: any, name: string, description?: string | null, type: TodoType, status: TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, location?: { __typename: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename: 'TodoResident', residentId: any, displayName: string } | null, hiddenChildren: { __typename: 'TodosConnection', totalCount: number } }> }> }> } | null };

export type TodoByIdForRefreshQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type TodoByIdForRefreshQuery = { __typename: 'Query', todo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus, parentTodo?: { __typename: 'Todo', id: any, status: TodoStatus } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };

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
  getAbListings {
    nodes {
      profileId
      fullName
      email
      phone
      displayName
      canInvite
    }
  }
}
    `;

export function useGetAbListingsQuery(options: Omit<Urql.UseQueryArgs<never, GetAbListingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAbListingsQuery>({ query: GetAbListingsDocument, ...options });
};
export const ActivateTenantDocument = gql`
    mutation ActivateTenant($tenantId: UUID!) {
  activateTenant(input: {_tenantId: $tenantId}) {
    tenant {
      id
      name
      status
    }
  }
}
    `;

export function useActivateTenantMutation() {
  return Urql.useMutation<ActivateTenantMutation, ActivateTenantMutationVariables>(ActivateTenantDocument);
};
export const AssumeResidentDocument = gql`
    mutation AssumeResident($residentId: UUID!) {
  assumeResidency(input: {_residentId: $residentId}) {
    resident {
      id
      tenantId
      profileId
      tenantName
      createdAt
      email
      status
    }
  }
}
    `;

export function useAssumeResidentMutation() {
  return Urql.useMutation<AssumeResidentMutation, AssumeResidentMutationVariables>(AssumeResidentDocument);
};
export const BecomeSupportDocument = gql`
    mutation BecomeSupport($tenantId: UUID!) {
  becomeSupport(input: {_tenantId: $tenantId}) {
    resident {
      id
      email
      displayName
      tenantName
      status
    }
  }
}
    `;

export function useBecomeSupportMutation() {
  return Urql.useMutation<BecomeSupportMutation, BecomeSupportMutationVariables>(BecomeSupportDocument);
};
export const BlockResidentDocument = gql`
    mutation BlockResident($residentId: UUID!) {
  blockResident(input: {_residentId: $residentId}) {
    resident {
      id
      email
      tenantName
      status
      displayName
    }
  }
}
    `;

export function useBlockResidentMutation() {
  return Urql.useMutation<BlockResidentMutation, BlockResidentMutationVariables>(BlockResidentDocument);
};
export const CreateTenantDocument = gql`
    mutation CreateTenant($name: String!, $email: String!) {
  createTenant(input: {_name: $name, _email: $email}) {
    tenant {
      id
      name
    }
  }
}
    `;

export function useCreateTenantMutation() {
  return Urql.useMutation<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument);
};
export const DeactivateTenantDocument = gql`
    mutation DeactivateTenant($tenantId: UUID!) {
  deactivateTenant(input: {_tenantId: $tenantId}) {
    tenant {
      id
      name
      status
    }
  }
}
    `;

export function useDeactivateTenantMutation() {
  return Urql.useMutation<DeactivateTenantMutation, DeactivateTenantMutationVariables>(DeactivateTenantDocument);
};
export const DeactivateTenantSubscriptionDocument = gql`
    mutation DeactivateTenantSubscription($tenantSubscriptionId: UUID!) {
  deactivateTenantSubscription(
    input: {_tenantSubscriptionId: $tenantSubscriptionId}
  ) {
    tenantSubscription {
      id
      licensePackKey
      status
    }
  }
}
    `;

export function useDeactivateTenantSubscriptionMutation() {
  return Urql.useMutation<DeactivateTenantSubscriptionMutation, DeactivateTenantSubscriptionMutationVariables>(DeactivateTenantSubscriptionDocument);
};
export const DeclineResidentDocument = gql`
    mutation DeclineResident($residentId: UUID!) {
  declineResidency(input: {_residentId: $residentId}) {
    resident {
      id
      tenantId
      profileId
      tenantName
      createdAt
      email
      status
    }
  }
}
    `;

export function useDeclineResidentMutation() {
  return Urql.useMutation<DeclineResidentMutation, DeclineResidentMutationVariables>(DeclineResidentDocument);
};
export const ExitSupportModeDocument = gql`
    mutation ExitSupportMode {
  exitSupportMode(input: {}) {
    resident {
      id
      email
      tenantName
      status
    }
  }
}
    `;

export function useExitSupportModeMutation() {
  return Urql.useMutation<ExitSupportModeMutation, ExitSupportModeMutationVariables>(ExitSupportModeDocument);
};
export const GrantUserLicenseDocument = gql`
    mutation GrantUserLicense($residentId: UUID!, $licenseTypeKey: String!) {
  grantUserLicense(
    input: {_residentId: $residentId, _licenseTypeKey: $licenseTypeKey}
  ) {
    license {
      id
      licenseTypeKey
    }
  }
}
    `;

export function useGrantUserLicenseMutation() {
  return Urql.useMutation<GrantUserLicenseMutation, GrantUserLicenseMutationVariables>(GrantUserLicenseDocument);
};
export const ReactivateTenantSubscriptionDocument = gql`
    mutation ReactivateTenantSubscription($tenantSubscriptionId: UUID!) {
  reactivateTenantSubscription(
    input: {_tenantSubscriptionId: $tenantSubscriptionId}
  ) {
    tenantSubscription {
      id
      licensePackKey
      status
    }
  }
}
    `;

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
      id
      licensePackKey
    }
  }
}
    `;

export function useSubscribeTenantToLicensePackMutation() {
  return Urql.useMutation<SubscribeTenantToLicensePackMutation, SubscribeTenantToLicensePackMutationVariables>(SubscribeTenantToLicensePackDocument);
};
export const UnblockResidentDocument = gql`
    mutation UnblockResident($residentId: UUID!) {
  unblockResident(input: {_residentId: $residentId}) {
    resident {
      id
      email
      tenantName
      status
      displayName
    }
  }
}
    `;

export function useUnblockResidentMutation() {
  return Urql.useMutation<UnblockResidentMutation, UnblockResidentMutationVariables>(UnblockResidentDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($displayName: String!, $firstName: String!, $lastName: String!, $phone: String) {
  updateProfile(
    input: {_displayName: $displayName, _firstName: $firstName, _lastName: $lastName, _phone: $phone}
  ) {
    profile {
      id
      email
      displayName
      firstName
      lastName
      phone
    }
  }
}
    `;

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

export function useActiveLicensePacksQuery(options: Omit<Urql.UseQueryArgs<never, ActiveLicensePacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ActiveLicensePacksQuery>({ query: ActiveLicensePacksDocument, ...options });
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

export function useAllAppProfilesQuery(options: Omit<Urql.UseQueryArgs<never, AllAppProfilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllAppProfilesQuery>({ query: AllAppProfilesDocument, ...options });
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

export function useAllApplicationsQuery(options: Omit<Urql.UseQueryArgs<never, AllApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllApplicationsQuery>({ query: AllApplicationsDocument, ...options });
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

export function useAllLicensePacksQuery(options: Omit<Urql.UseQueryArgs<never, AllLicensePacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllLicensePacksQuery>({ query: AllLicensePacksDocument, ...options });
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

export function useAllResidentsQuery(options: Omit<Urql.UseQueryArgs<never, AllResidentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllResidentsQuery>({ query: AllResidentsDocument, ...options });
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

export function useTenantByIdQuery(options: Omit<Urql.UseQueryArgs<never, TenantByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantByIdQuery>({ query: TenantByIdDocument, ...options });
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

export function useTenantLicensesQuery(options: Omit<Urql.UseQueryArgs<never, TenantLicensesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantLicensesQuery>({ query: TenantLicensesDocument, ...options });
};
export const TenantResidentsDocument = gql`
    query TenantResidents {
  residents: residentsList {
    ...Resident
  }
}
    ${ResidentFragmentDoc}`;

export function useTenantResidentsQuery(options: Omit<Urql.UseQueryArgs<never, TenantResidentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantResidentsQuery>({ query: TenantResidentsDocument, ...options });
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

export function useTenantSubscriptionsQuery(options: Omit<Urql.UseQueryArgs<never, TenantSubscriptionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantSubscriptionsQuery>({ query: TenantSubscriptionsDocument, ...options });
};
export const CurrentProfileClaimsDocument = gql`
    query CurrentProfileClaims {
  currentProfileClaims {
    ...ProfileClaim
  }
}
    ${ProfileClaimFragmentDoc}`;

export function useCurrentProfileClaimsQuery(options: Omit<Urql.UseQueryArgs<never, CurrentProfileClaimsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentProfileClaimsQuery>({ query: CurrentProfileClaimsDocument, ...options });
};
export const GetMyselfDocument = gql`
    query GetMyself {
  getMyself {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

export function useGetMyselfQuery(options: Omit<Urql.UseQueryArgs<never, GetMyselfQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMyselfQuery>({ query: GetMyselfDocument, ...options });
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

export function useMyProfileResidenciesQuery(options: Omit<Urql.UseQueryArgs<never, MyProfileResidenciesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyProfileResidenciesQuery>({ query: MyProfileResidenciesDocument, ...options });
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

export function useResidentByIdQuery(options: Omit<Urql.UseQueryArgs<never, ResidentByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResidentByIdQuery>({ query: ResidentByIdDocument, ...options });
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

export function useSearchProfilesQuery(options: Omit<Urql.UseQueryArgs<never, SearchProfilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchProfilesQuery>({ query: SearchProfilesDocument, ...options });
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

export function useSearchResidentsQuery(options: Omit<Urql.UseQueryArgs<never, SearchResidentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchResidentsQuery>({ query: SearchResidentsDocument, ...options });
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

export function useSearchTenantsQuery(options: Omit<Urql.UseQueryArgs<never, SearchTenantsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchTenantsQuery>({ query: SearchTenantsDocument, ...options });
};
export const SiteUserByIdDocument = gql`
    query SiteUserById($id: UUID!) {
  siteUserById(_id: $id)
}
    `;

export function useSiteUserByIdQuery(options: Omit<Urql.UseQueryArgs<never, SiteUserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SiteUserByIdQuery>({ query: SiteUserByIdDocument, ...options });
};
export const ThrowErrorDocument = gql`
    query ThrowError($message: String) {
  throwError(_message: $message)
}
    `;

export function useThrowErrorQuery(options: Omit<Urql.UseQueryArgs<never, ThrowErrorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ThrowErrorQuery>({ query: ThrowErrorDocument, ...options });
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
      id
      name
      status
      subscribers: subscribersList {
        id
        status
        msgResident {
          residentId
          displayName
        }
      }
      messages {
        totalCount
      }
    }
  }
}
    `;

export function useAllDiscussionsQuery(options: Omit<Urql.UseQueryArgs<never, AllDiscussionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllDiscussionsQuery>({ query: AllDiscussionsDocument, ...options });
};
export const DiscussionByIdDocument = gql`
    query DiscussionById($topicId: UUID!) {
  topic(id: $topicId) {
    id
    name
    identifier
    status
    subscribers: subscribersList {
      id
      status
      lastRead
      msgResident {
        residentId
        displayName
      }
    }
    messages: messagesList {
      id
      createdAt
      status
      content
      postedBy: postedByMsgResident {
        residentId
        displayName
      }
    }
  }
}
    `;

export function useDiscussionByIdQuery(options: Omit<Urql.UseQueryArgs<never, DiscussionByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DiscussionByIdQuery>({ query: DiscussionByIdDocument, ...options });
};
export const TopicMessageDocument = gql`
    subscription TopicMessage($topicId: UUID!) {
  topicMessage(topicId: $topicId) {
    message {
      id
      createdAt
      status
      content
      postedBy: postedByMsgResident {
        residentId
        displayName
      }
      __typename
    }
    event
    messageId
  }
}
    `;

export function useTopicMessageSubscription<R = TopicMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, TopicMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<TopicMessageSubscription, R>) {
  return Urql.useSubscription<TopicMessageSubscription, R, TopicMessageSubscriptionVariables>({ query: TopicMessageDocument, ...options }, handler);
};
export const CreateLocationDocument = gql`
    mutation CreateLocation($locationInfo: LocationInfoInput!) {
  createLocation(input: {_locationInfo: $locationInfo}) {
    location {
      id
      resident {
        displayName
        residentId
      }
      tenantId
      name
      address1
      address2
      city
      state
      postalCode
      country
      lat
      lon
    }
  }
}
    `;

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
  }
}
    `;

export function useUpdateLocationMutation() {
  return Urql.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument);
};
export const AllLocationsDocument = gql`
    query AllLocations {
  locations {
    nodes {
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
  }
}
    `;

export function useAllLocationsQuery(options: Omit<Urql.UseQueryArgs<never, AllLocationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllLocationsQuery>({ query: AllLocationsDocument, ...options });
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
      id
      name
      description
      residentId
      status
      owner: resident {
        residentId
        displayName
      }
    }
  }
}
    `;

export function useAssignTodoMutation() {
  return Urql.useMutation<AssignTodoMutation, AssignTodoMutationVariables>(AssignTodoDocument);
};
export const SearchTodosDocument = gql`
    query SearchTodos($searchTerm: String, $todoType: TodoType, $rootsOnly: Boolean, $isTemplate: Boolean) {
  searchTodos(
    _options: {searchTerm: $searchTerm, todoType: $todoType, rootsOnly: $rootsOnly, isTemplate: $isTemplate}
  ) {
    nodes {
      id
      name
      description
      status
      type
      createdAt
      updatedAt
      resident {
        residentId
        displayName
      }
      parentTodo {
        id
        name
        description
      }
      tenant {
        tenantId
        name
      }
    }
  }
}
    `;

export function useSearchTodosQuery(options: Omit<Urql.UseQueryArgs<never, SearchTodosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchTodosQuery>({ query: SearchTodosDocument, ...options });
};
export const TodoByIdDocument = gql`
    query TodoById($id: UUID!) {
  todo(id: $id) {
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
    location {
      id
      name
      address1
      address2
      city
      state
      postalCode
      country
      lat
      lon
    }
    owner: resident {
      residentId
      displayName
    }
    children: todosByParentTodoIdList {
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
      location {
        id
        name
        address1
        address2
        city
        state
        postalCode
        country
        lat
        lon
      }
      owner: resident {
        residentId
        displayName
      }
      children: todosByParentTodoIdList {
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
        location {
          id
          name
          address1
          address2
          city
          state
          postalCode
          country
          lat
          lon
        }
        owner: resident {
          residentId
          displayName
        }
        children: todosByParentTodoIdList {
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
          location {
            id
            name
            address1
            address2
            city
            state
            postalCode
            country
            lat
            lon
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
    `;

export function useTodoByIdQuery(options: Omit<Urql.UseQueryArgs<never, TodoByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodoByIdQuery>({ query: TodoByIdDocument, ...options });
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

export function useTodoByIdForRefreshQuery(options: Omit<Urql.UseQueryArgs<never, TodoByIdForRefreshQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodoByIdForRefreshQuery>({ query: TodoByIdForRefreshDocument, ...options });
};
export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AbListing?: (data: WithTypename<AbListing>) => null | string,
  AbListingsConnection?: (data: WithTypename<AbListingsConnection>) => null | string,
  AbListingsEdge?: (data: WithTypename<AbListingsEdge>) => null | string,
  ActivateTenantPayload?: (data: WithTypename<ActivateTenantPayload>) => null | string,
  AppSetting?: (data: WithTypename<AppSetting>) => null | string,
  AppSettingsConnection?: (data: WithTypename<AppSettingsConnection>) => null | string,
  AppSettingsEdge?: (data: WithTypename<AppSettingsEdge>) => null | string,
  Application?: (data: WithTypename<Application>) => null | string,
  ApplicationsConnection?: (data: WithTypename<ApplicationsConnection>) => null | string,
  ApplicationsEdge?: (data: WithTypename<ApplicationsEdge>) => null | string,
  AssignTodoPayload?: (data: WithTypename<AssignTodoPayload>) => null | string,
  AssumeResidencyPayload?: (data: WithTypename<AssumeResidencyPayload>) => null | string,
  BecomeSupportPayload?: (data: WithTypename<BecomeSupportPayload>) => null | string,
  BlockResidentPayload?: (data: WithTypename<BlockResidentPayload>) => null | string,
  CreateLocationPayload?: (data: WithTypename<CreateLocationPayload>) => null | string,
  CreateTenantPayload?: (data: WithTypename<CreateTenantPayload>) => null | string,
  CreateTodoPayload?: (data: WithTypename<CreateTodoPayload>) => null | string,
  DeactivateSubscriberPayload?: (data: WithTypename<DeactivateSubscriberPayload>) => null | string,
  DeactivateTenantPayload?: (data: WithTypename<DeactivateTenantPayload>) => null | string,
  DeactivateTenantSubscriptionPayload?: (data: WithTypename<DeactivateTenantSubscriptionPayload>) => null | string,
  DeclineInvitationPayload?: (data: WithTypename<DeclineInvitationPayload>) => null | string,
  DeclineResidencyPayload?: (data: WithTypename<DeclineResidencyPayload>) => null | string,
  DeleteLocationPayload?: (data: WithTypename<DeleteLocationPayload>) => null | string,
  DeleteTodoPayload?: (data: WithTypename<DeleteTodoPayload>) => null | string,
  DeleteTopicPayload?: (data: WithTypename<DeleteTopicPayload>) => null | string,
  ExitSupportModePayload?: (data: WithTypename<ExitSupportModePayload>) => null | string,
  GrantUserLicensePayload?: (data: WithTypename<GrantUserLicensePayload>) => null | string,
  JoinAddressBookPayload?: (data: WithTypename<JoinAddressBookPayload>) => null | string,
  LeaveAddressBookPayload?: (data: WithTypename<LeaveAddressBookPayload>) => null | string,
  License?: (data: WithTypename<License>) => null | string,
  LicensePack?: (data: WithTypename<LicensePack>) => null | string,
  LicensePackLicenseType?: (data: WithTypename<LicensePackLicenseType>) => null | string,
  LicensePackLicenseTypesConnection?: (data: WithTypename<LicensePackLicenseTypesConnection>) => null | string,
  LicensePackLicenseTypesEdge?: (data: WithTypename<LicensePackLicenseTypesEdge>) => null | string,
  LicensePacksConnection?: (data: WithTypename<LicensePacksConnection>) => null | string,
  LicensePacksEdge?: (data: WithTypename<LicensePacksEdge>) => null | string,
  LicenseType?: (data: WithTypename<LicenseType>) => null | string,
  LicenseTypePermission?: (data: WithTypename<LicenseTypePermission>) => null | string,
  LicenseTypePermissionsConnection?: (data: WithTypename<LicenseTypePermissionsConnection>) => null | string,
  LicenseTypePermissionsEdge?: (data: WithTypename<LicenseTypePermissionsEdge>) => null | string,
  LicenseTypesConnection?: (data: WithTypename<LicenseTypesConnection>) => null | string,
  LicenseTypesEdge?: (data: WithTypename<LicenseTypesEdge>) => null | string,
  LicensesConnection?: (data: WithTypename<LicensesConnection>) => null | string,
  LicensesEdge?: (data: WithTypename<LicensesEdge>) => null | string,
  LocResident?: (data: WithTypename<LocResident>) => null | string,
  LocResidentsConnection?: (data: WithTypename<LocResidentsConnection>) => null | string,
  LocResidentsEdge?: (data: WithTypename<LocResidentsEdge>) => null | string,
  LocTenant?: (data: WithTypename<LocTenant>) => null | string,
  LocTenantsConnection?: (data: WithTypename<LocTenantsConnection>) => null | string,
  LocTenantsEdge?: (data: WithTypename<LocTenantsEdge>) => null | string,
  Location?: (data: WithTypename<Location>) => null | string,
  LocationsConnection?: (data: WithTypename<LocationsConnection>) => null | string,
  LocationsEdge?: (data: WithTypename<LocationsEdge>) => null | string,
  MakeTemplateFromTodoPayload?: (data: WithTypename<MakeTemplateFromTodoPayload>) => null | string,
  MakeTodoFromTemplatePayload?: (data: WithTypename<MakeTodoFromTemplatePayload>) => null | string,
  Message?: (data: WithTypename<Message>) => null | string,
  MessagesConnection?: (data: WithTypename<MessagesConnection>) => null | string,
  MessagesEdge?: (data: WithTypename<MessagesEdge>) => null | string,
  MsgResident?: (data: WithTypename<MsgResident>) => null | string,
  MsgResidentsConnection?: (data: WithTypename<MsgResidentsConnection>) => null | string,
  MsgResidentsEdge?: (data: WithTypename<MsgResidentsEdge>) => null | string,
  MsgTenant?: (data: WithTypename<MsgTenant>) => null | string,
  MsgTenantsConnection?: (data: WithTypename<MsgTenantsConnection>) => null | string,
  MsgTenantsEdge?: (data: WithTypename<MsgTenantsEdge>) => null | string,
  PageInfo?: (data: WithTypename<PageInfo>) => null | string,
  Permission?: (data: WithTypename<Permission>) => null | string,
  PermissionsConnection?: (data: WithTypename<PermissionsConnection>) => null | string,
  PermissionsEdge?: (data: WithTypename<PermissionsEdge>) => null | string,
  PinTodoPayload?: (data: WithTypename<PinTodoPayload>) => null | string,
  Profile?: (data: WithTypename<Profile>) => null | string,
  ProfileClaim?: (data: WithTypename<ProfileClaim>) => null | string,
  ProfilesConnection?: (data: WithTypename<ProfilesConnection>) => null | string,
  ProfilesEdge?: (data: WithTypename<ProfilesEdge>) => null | string,
  ReactivateTenantSubscriptionPayload?: (data: WithTypename<ReactivateTenantSubscriptionPayload>) => null | string,
  Resident?: (data: WithTypename<Resident>) => null | string,
  ResidentsConnection?: (data: WithTypename<ResidentsConnection>) => null | string,
  ResidentsEdge?: (data: WithTypename<ResidentsEdge>) => null | string,
  RevokeUserLicensePayload?: (data: WithTypename<RevokeUserLicensePayload>) => null | string,
  SubscribeTenantToLicensePackPayload?: (data: WithTypename<SubscribeTenantToLicensePackPayload>) => null | string,
  Subscriber?: (data: WithTypename<Subscriber>) => null | string,
  SubscribersConnection?: (data: WithTypename<SubscribersConnection>) => null | string,
  SubscribersEdge?: (data: WithTypename<SubscribersEdge>) => null | string,
  Tenant?: (data: WithTypename<Tenant>) => null | string,
  TenantSubscription?: (data: WithTypename<TenantSubscription>) => null | string,
  TenantSubscriptionsConnection?: (data: WithTypename<TenantSubscriptionsConnection>) => null | string,
  TenantSubscriptionsEdge?: (data: WithTypename<TenantSubscriptionsEdge>) => null | string,
  TenantsConnection?: (data: WithTypename<TenantsConnection>) => null | string,
  TenantsEdge?: (data: WithTypename<TenantsEdge>) => null | string,
  Thing?: (data: WithTypename<Thing>) => null | string,
  ThingsConnection?: (data: WithTypename<ThingsConnection>) => null | string,
  ThingsEdge?: (data: WithTypename<ThingsEdge>) => null | string,
  Todo?: (data: WithTypename<Todo>) => null | string,
  TodoResident?: (data: WithTypename<TodoResident>) => null | string,
  TodoResidentsConnection?: (data: WithTypename<TodoResidentsConnection>) => null | string,
  TodoResidentsEdge?: (data: WithTypename<TodoResidentsEdge>) => null | string,
  TodoTenant?: (data: WithTypename<TodoTenant>) => null | string,
  TodoTenantsConnection?: (data: WithTypename<TodoTenantsConnection>) => null | string,
  TodoTenantsEdge?: (data: WithTypename<TodoTenantsEdge>) => null | string,
  TodosConnection?: (data: WithTypename<TodosConnection>) => null | string,
  TodosEdge?: (data: WithTypename<TodosEdge>) => null | string,
  Topic?: (data: WithTypename<Topic>) => null | string,
  TopicMessageSubscriptionPayload?: (data: WithTypename<TopicMessageSubscriptionPayload>) => null | string,
  TopicsConnection?: (data: WithTypename<TopicsConnection>) => null | string,
  TopicsEdge?: (data: WithTypename<TopicsEdge>) => null | string,
  UnblockResidentPayload?: (data: WithTypename<UnblockResidentPayload>) => null | string,
  UnpinTodoPayload?: (data: WithTypename<UnpinTodoPayload>) => null | string,
  UpdateLocationPayload?: (data: WithTypename<UpdateLocationPayload>) => null | string,
  UpdateProfilePayload?: (data: WithTypename<UpdateProfilePayload>) => null | string,
  UpdateTodoPayload?: (data: WithTypename<UpdateTodoPayload>) => null | string,
  UpdateTodoStatusPayload?: (data: WithTypename<UpdateTodoStatusPayload>) => null | string,
  UpsertMessagePayload?: (data: WithTypename<UpsertMessagePayload>) => null | string,
  UpsertSubscriberPayload?: (data: WithTypename<UpsertSubscriberPayload>) => null | string,
  UpsertTopicPayload?: (data: WithTypename<UpsertTopicPayload>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    appSetting?: GraphCacheResolver<WithTypename<Query>, QueryAppSettingArgs, WithTypename<AppSetting> | string>,
    appSettingByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryAppSettingByNodeIdArgs, WithTypename<AppSetting> | string>,
    appSettings?: GraphCacheResolver<WithTypename<Query>, QueryAppSettingsArgs, WithTypename<AppSettingsConnection> | string>,
    appSettingsList?: GraphCacheResolver<WithTypename<Query>, QueryAppSettingsListArgs, Array<WithTypename<AppSetting> | string>>,
    application?: GraphCacheResolver<WithTypename<Query>, QueryApplicationArgs, WithTypename<Application> | string>,
    applicationByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryApplicationByNodeIdArgs, WithTypename<Application> | string>,
    applications?: GraphCacheResolver<WithTypename<Query>, QueryApplicationsArgs, WithTypename<ApplicationsConnection> | string>,
    applicationsList?: GraphCacheResolver<WithTypename<Query>, QueryApplicationsListArgs, Array<WithTypename<Application> | string>>,
    currentProfileClaims?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<ProfileClaim> | string>,
    demoProfileResidencies?: GraphCacheResolver<WithTypename<Query>, QueryDemoProfileResidenciesArgs, WithTypename<ResidentsConnection> | string>,
    demoProfileResidenciesList?: GraphCacheResolver<WithTypename<Query>, QueryDemoProfileResidenciesListArgs, Array<WithTypename<Resident> | string>>,
    getAbListings?: GraphCacheResolver<WithTypename<Query>, QueryGetAbListingsArgs, WithTypename<AbListingsConnection> | string>,
    getAbListingsList?: GraphCacheResolver<WithTypename<Query>, QueryGetAbListingsListArgs, Array<WithTypename<AbListing> | string>>,
    getMyself?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Profile> | string>,
    license?: GraphCacheResolver<WithTypename<Query>, QueryLicenseArgs, WithTypename<License> | string>,
    licenseByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLicenseByNodeIdArgs, WithTypename<License> | string>,
    licenseByResidentIdAndLicenseTypeKey?: GraphCacheResolver<WithTypename<Query>, QueryLicenseByResidentIdAndLicenseTypeKeyArgs, WithTypename<License> | string>,
    licensePack?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackArgs, WithTypename<LicensePack> | string>,
    licensePackByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackByNodeIdArgs, WithTypename<LicensePack> | string>,
    licensePackLicenseType?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackLicenseTypeArgs, WithTypename<LicensePackLicenseType> | string>,
    licensePackLicenseTypeByLicensePackKeyAndLicenseTypeKey?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackLicenseTypeByLicensePackKeyAndLicenseTypeKeyArgs, WithTypename<LicensePackLicenseType> | string>,
    licensePackLicenseTypeByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackLicenseTypeByNodeIdArgs, WithTypename<LicensePackLicenseType> | string>,
    licensePackLicenseTypes?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackLicenseTypesArgs, WithTypename<LicensePackLicenseTypesConnection> | string>,
    licensePackLicenseTypesList?: GraphCacheResolver<WithTypename<Query>, QueryLicensePackLicenseTypesListArgs, Array<WithTypename<LicensePackLicenseType> | string>>,
    licensePacks?: GraphCacheResolver<WithTypename<Query>, QueryLicensePacksArgs, WithTypename<LicensePacksConnection> | string>,
    licensePacksList?: GraphCacheResolver<WithTypename<Query>, QueryLicensePacksListArgs, Array<WithTypename<LicensePack> | string>>,
    licenseType?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypeArgs, WithTypename<LicenseType> | string>,
    licenseTypeByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypeByNodeIdArgs, WithTypename<LicenseType> | string>,
    licenseTypePermissionByLicenseTypeKeyAndPermissionKey?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypePermissionByLicenseTypeKeyAndPermissionKeyArgs, WithTypename<LicenseTypePermission> | string>,
    licenseTypePermissions?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypePermissionsArgs, WithTypename<LicenseTypePermissionsConnection> | string>,
    licenseTypePermissionsList?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypePermissionsListArgs, Array<WithTypename<LicenseTypePermission> | string>>,
    licenseTypes?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypesArgs, WithTypename<LicenseTypesConnection> | string>,
    licenseTypesList?: GraphCacheResolver<WithTypename<Query>, QueryLicenseTypesListArgs, Array<WithTypename<LicenseType> | string>>,
    licenses?: GraphCacheResolver<WithTypename<Query>, QueryLicensesArgs, WithTypename<LicensesConnection> | string>,
    licensesList?: GraphCacheResolver<WithTypename<Query>, QueryLicensesListArgs, Array<WithTypename<License> | string>>,
    locResident?: GraphCacheResolver<WithTypename<Query>, QueryLocResidentArgs, WithTypename<LocResident> | string>,
    locResidentByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLocResidentByNodeIdArgs, WithTypename<LocResident> | string>,
    locResidents?: GraphCacheResolver<WithTypename<Query>, QueryLocResidentsArgs, WithTypename<LocResidentsConnection> | string>,
    locResidentsList?: GraphCacheResolver<WithTypename<Query>, QueryLocResidentsListArgs, Array<WithTypename<LocResident> | string>>,
    locTenant?: GraphCacheResolver<WithTypename<Query>, QueryLocTenantArgs, WithTypename<LocTenant> | string>,
    locTenantByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLocTenantByNodeIdArgs, WithTypename<LocTenant> | string>,
    locTenants?: GraphCacheResolver<WithTypename<Query>, QueryLocTenantsArgs, WithTypename<LocTenantsConnection> | string>,
    locTenantsList?: GraphCacheResolver<WithTypename<Query>, QueryLocTenantsListArgs, Array<WithTypename<LocTenant> | string>>,
    location?: GraphCacheResolver<WithTypename<Query>, QueryLocationArgs, WithTypename<Location> | string>,
    locationByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryLocationByNodeIdArgs, WithTypename<Location> | string>,
    locations?: GraphCacheResolver<WithTypename<Query>, QueryLocationsArgs, WithTypename<LocationsConnection> | string>,
    locationsList?: GraphCacheResolver<WithTypename<Query>, QueryLocationsListArgs, Array<WithTypename<Location> | string>>,
    message?: GraphCacheResolver<WithTypename<Query>, QueryMessageArgs, WithTypename<Message> | string>,
    messageByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryMessageByNodeIdArgs, WithTypename<Message> | string>,
    messages?: GraphCacheResolver<WithTypename<Query>, QueryMessagesArgs, WithTypename<MessagesConnection> | string>,
    messagesList?: GraphCacheResolver<WithTypename<Query>, QueryMessagesListArgs, Array<WithTypename<Message> | string>>,
    msgResident?: GraphCacheResolver<WithTypename<Query>, QueryMsgResidentArgs, WithTypename<MsgResident> | string>,
    msgResidentByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryMsgResidentByNodeIdArgs, WithTypename<MsgResident> | string>,
    msgResidents?: GraphCacheResolver<WithTypename<Query>, QueryMsgResidentsArgs, WithTypename<MsgResidentsConnection> | string>,
    msgResidentsList?: GraphCacheResolver<WithTypename<Query>, QueryMsgResidentsListArgs, Array<WithTypename<MsgResident> | string>>,
    msgTenant?: GraphCacheResolver<WithTypename<Query>, QueryMsgTenantArgs, WithTypename<MsgTenant> | string>,
    msgTenantByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryMsgTenantByNodeIdArgs, WithTypename<MsgTenant> | string>,
    msgTenants?: GraphCacheResolver<WithTypename<Query>, QueryMsgTenantsArgs, WithTypename<MsgTenantsConnection> | string>,
    msgTenantsList?: GraphCacheResolver<WithTypename<Query>, QueryMsgTenantsListArgs, Array<WithTypename<MsgTenant> | string>>,
    myProfileResidencies?: GraphCacheResolver<WithTypename<Query>, QueryMyProfileResidenciesArgs, WithTypename<ResidentsConnection> | string>,
    myProfileResidenciesList?: GraphCacheResolver<WithTypename<Query>, QueryMyProfileResidenciesListArgs, Array<WithTypename<Resident> | string>>,
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<AppSetting> | WithTypename<Application> | WithTypename<License> | WithTypename<LicensePack> | WithTypename<LicensePackLicenseType> | WithTypename<LicenseType> | WithTypename<LocResident> | WithTypename<LocTenant> | WithTypename<Location> | WithTypename<Message> | WithTypename<MsgResident> | WithTypename<MsgTenant> | WithTypename<Permission> | WithTypename<Profile> | WithTypename<Query> | WithTypename<Resident> | WithTypename<Subscriber> | WithTypename<Tenant> | WithTypename<TenantSubscription> | WithTypename<Thing> | WithTypename<Todo> | WithTypename<TodoResident> | WithTypename<TodoTenant> | WithTypename<Topic> | string>,
    nodeId?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Scalars['ID'] | string>,
    permission?: GraphCacheResolver<WithTypename<Query>, QueryPermissionArgs, WithTypename<Permission> | string>,
    permissionByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryPermissionByNodeIdArgs, WithTypename<Permission> | string>,
    permissions?: GraphCacheResolver<WithTypename<Query>, QueryPermissionsArgs, WithTypename<PermissionsConnection> | string>,
    permissionsList?: GraphCacheResolver<WithTypename<Query>, QueryPermissionsListArgs, Array<WithTypename<Permission> | string>>,
    profile?: GraphCacheResolver<WithTypename<Query>, QueryProfileArgs, WithTypename<Profile> | string>,
    profileByDisplayName?: GraphCacheResolver<WithTypename<Query>, QueryProfileByDisplayNameArgs, WithTypename<Profile> | string>,
    profileByEmail?: GraphCacheResolver<WithTypename<Query>, QueryProfileByEmailArgs, WithTypename<Profile> | string>,
    profileByIdentifier?: GraphCacheResolver<WithTypename<Query>, QueryProfileByIdentifierArgs, WithTypename<Profile> | string>,
    profileByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryProfileByNodeIdArgs, WithTypename<Profile> | string>,
    profiles?: GraphCacheResolver<WithTypename<Query>, QueryProfilesArgs, WithTypename<ProfilesConnection> | string>,
    profilesList?: GraphCacheResolver<WithTypename<Query>, QueryProfilesListArgs, Array<WithTypename<Profile> | string>>,
    query?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<Query>, QueryResidentArgs, WithTypename<Resident> | string>,
    residentByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryResidentByNodeIdArgs, WithTypename<Resident> | string>,
    residentByTenantIdAndProfileIdAndType?: GraphCacheResolver<WithTypename<Query>, QueryResidentByTenantIdAndProfileIdAndTypeArgs, WithTypename<Resident> | string>,
    residents?: GraphCacheResolver<WithTypename<Query>, QueryResidentsArgs, WithTypename<ResidentsConnection> | string>,
    residentsList?: GraphCacheResolver<WithTypename<Query>, QueryResidentsListArgs, Array<WithTypename<Resident> | string>>,
    searchProfiles?: GraphCacheResolver<WithTypename<Query>, QuerySearchProfilesArgs, WithTypename<ProfilesConnection> | string>,
    searchProfilesList?: GraphCacheResolver<WithTypename<Query>, QuerySearchProfilesListArgs, Array<WithTypename<Profile> | string>>,
    searchResidents?: GraphCacheResolver<WithTypename<Query>, QuerySearchResidentsArgs, WithTypename<ResidentsConnection> | string>,
    searchResidentsList?: GraphCacheResolver<WithTypename<Query>, QuerySearchResidentsListArgs, Array<WithTypename<Resident> | string>>,
    searchTenants?: GraphCacheResolver<WithTypename<Query>, QuerySearchTenantsArgs, WithTypename<TenantsConnection> | string>,
    searchTenantsList?: GraphCacheResolver<WithTypename<Query>, QuerySearchTenantsListArgs, Array<WithTypename<Tenant> | string>>,
    searchTodos?: GraphCacheResolver<WithTypename<Query>, QuerySearchTodosArgs, WithTypename<TodosConnection> | string>,
    searchTodosList?: GraphCacheResolver<WithTypename<Query>, QuerySearchTodosListArgs, Array<WithTypename<Todo> | string>>,
    siteUserById?: GraphCacheResolver<WithTypename<Query>, QuerySiteUserByIdArgs, Scalars['JSON'] | string>,
    subscriber?: GraphCacheResolver<WithTypename<Query>, QuerySubscriberArgs, WithTypename<Subscriber> | string>,
    subscriberByNodeId?: GraphCacheResolver<WithTypename<Query>, QuerySubscriberByNodeIdArgs, WithTypename<Subscriber> | string>,
    subscriberByTopicIdAndMsgResidentId?: GraphCacheResolver<WithTypename<Query>, QuerySubscriberByTopicIdAndMsgResidentIdArgs, WithTypename<Subscriber> | string>,
    subscribers?: GraphCacheResolver<WithTypename<Query>, QuerySubscribersArgs, WithTypename<SubscribersConnection> | string>,
    subscribersList?: GraphCacheResolver<WithTypename<Query>, QuerySubscribersListArgs, Array<WithTypename<Subscriber> | string>>,
    tenant?: GraphCacheResolver<WithTypename<Query>, QueryTenantArgs, WithTypename<Tenant> | string>,
    tenantByIdentifier?: GraphCacheResolver<WithTypename<Query>, QueryTenantByIdentifierArgs, WithTypename<Tenant> | string>,
    tenantByName?: GraphCacheResolver<WithTypename<Query>, QueryTenantByNameArgs, WithTypename<Tenant> | string>,
    tenantByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryTenantByNodeIdArgs, WithTypename<Tenant> | string>,
    tenantLicenses?: GraphCacheResolver<WithTypename<Query>, QueryTenantLicensesArgs, WithTypename<LicensesConnection> | string>,
    tenantLicensesList?: GraphCacheResolver<WithTypename<Query>, QueryTenantLicensesListArgs, Array<WithTypename<License> | string>>,
    tenantProfileResidencies?: GraphCacheResolver<WithTypename<Query>, QueryTenantProfileResidenciesArgs, WithTypename<ResidentsConnection> | string>,
    tenantProfileResidenciesList?: GraphCacheResolver<WithTypename<Query>, QueryTenantProfileResidenciesListArgs, Array<WithTypename<Resident> | string>>,
    tenantSubscription?: GraphCacheResolver<WithTypename<Query>, QueryTenantSubscriptionArgs, WithTypename<TenantSubscription> | string>,
    tenantSubscriptionByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryTenantSubscriptionByNodeIdArgs, WithTypename<TenantSubscription> | string>,
    tenantSubscriptions?: GraphCacheResolver<WithTypename<Query>, QueryTenantSubscriptionsArgs, WithTypename<TenantSubscriptionsConnection> | string>,
    tenantSubscriptionsList?: GraphCacheResolver<WithTypename<Query>, QueryTenantSubscriptionsListArgs, Array<WithTypename<TenantSubscription> | string>>,
    tenants?: GraphCacheResolver<WithTypename<Query>, QueryTenantsArgs, WithTypename<TenantsConnection> | string>,
    tenantsList?: GraphCacheResolver<WithTypename<Query>, QueryTenantsListArgs, Array<WithTypename<Tenant> | string>>,
    thing?: GraphCacheResolver<WithTypename<Query>, QueryThingArgs, WithTypename<Thing> | string>,
    thingByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryThingByNodeIdArgs, WithTypename<Thing> | string>,
    things?: GraphCacheResolver<WithTypename<Query>, QueryThingsArgs, WithTypename<ThingsConnection> | string>,
    thingsList?: GraphCacheResolver<WithTypename<Query>, QueryThingsListArgs, Array<WithTypename<Thing> | string>>,
    throwError?: GraphCacheResolver<WithTypename<Query>, QueryThrowErrorArgs, Scalars['Boolean'] | string>,
    todo?: GraphCacheResolver<WithTypename<Query>, QueryTodoArgs, WithTypename<Todo> | string>,
    todoByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryTodoByNodeIdArgs, WithTypename<Todo> | string>,
    todoResident?: GraphCacheResolver<WithTypename<Query>, QueryTodoResidentArgs, WithTypename<TodoResident> | string>,
    todoResidentByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryTodoResidentByNodeIdArgs, WithTypename<TodoResident> | string>,
    todoResidents?: GraphCacheResolver<WithTypename<Query>, QueryTodoResidentsArgs, WithTypename<TodoResidentsConnection> | string>,
    todoResidentsList?: GraphCacheResolver<WithTypename<Query>, QueryTodoResidentsListArgs, Array<WithTypename<TodoResident> | string>>,
    todoTenant?: GraphCacheResolver<WithTypename<Query>, QueryTodoTenantArgs, WithTypename<TodoTenant> | string>,
    todoTenantByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryTodoTenantByNodeIdArgs, WithTypename<TodoTenant> | string>,
    todoTenants?: GraphCacheResolver<WithTypename<Query>, QueryTodoTenantsArgs, WithTypename<TodoTenantsConnection> | string>,
    todoTenantsList?: GraphCacheResolver<WithTypename<Query>, QueryTodoTenantsListArgs, Array<WithTypename<TodoTenant> | string>>,
    todos?: GraphCacheResolver<WithTypename<Query>, QueryTodosArgs, WithTypename<TodosConnection> | string>,
    todosList?: GraphCacheResolver<WithTypename<Query>, QueryTodosListArgs, Array<WithTypename<Todo> | string>>,
    topic?: GraphCacheResolver<WithTypename<Query>, QueryTopicArgs, WithTypename<Topic> | string>,
    topicByNodeId?: GraphCacheResolver<WithTypename<Query>, QueryTopicByNodeIdArgs, WithTypename<Topic> | string>,
    topics?: GraphCacheResolver<WithTypename<Query>, QueryTopicsArgs, WithTypename<TopicsConnection> | string>,
    topicsList?: GraphCacheResolver<WithTypename<Query>, QueryTopicsListArgs, Array<WithTypename<Topic> | string>>
  },
  AbListing?: {
    canInvite?: GraphCacheResolver<WithTypename<AbListing>, Record<string, never>, Scalars['Boolean'] | string>,
    displayName?: GraphCacheResolver<WithTypename<AbListing>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<AbListing>, Record<string, never>, Scalars['String'] | string>,
    fullName?: GraphCacheResolver<WithTypename<AbListing>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<AbListing>, Record<string, never>, Scalars['String'] | string>,
    profileId?: GraphCacheResolver<WithTypename<AbListing>, Record<string, never>, Scalars['UUID'] | string>
  },
  AbListingsConnection?: {
    edges?: GraphCacheResolver<WithTypename<AbListingsConnection>, Record<string, never>, Array<WithTypename<AbListingsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<AbListingsConnection>, Record<string, never>, Array<WithTypename<AbListing> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<AbListingsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<AbListingsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  AbListingsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<AbListingsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<AbListingsEdge>, Record<string, never>, WithTypename<AbListing> | string>
  },
  ActivateTenantPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<ActivateTenantPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<ActivateTenantPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<ActivateTenantPayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantEdge?: GraphCacheResolver<WithTypename<ActivateTenantPayload>, ActivateTenantPayloadTenantEdgeArgs, WithTypename<TenantsEdge> | string>
  },
  AppSetting?: {
    application?: GraphCacheResolver<WithTypename<AppSetting>, Record<string, never>, WithTypename<Application> | string>,
    applicationKey?: GraphCacheResolver<WithTypename<AppSetting>, Record<string, never>, Scalars['String'] | string>,
    displayName?: GraphCacheResolver<WithTypename<AppSetting>, Record<string, never>, Scalars['String'] | string>,
    key?: GraphCacheResolver<WithTypename<AppSetting>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<AppSetting>, Record<string, never>, Scalars['ID'] | string>,
    value?: GraphCacheResolver<WithTypename<AppSetting>, Record<string, never>, Scalars['String'] | string>
  },
  AppSettingsConnection?: {
    edges?: GraphCacheResolver<WithTypename<AppSettingsConnection>, Record<string, never>, Array<WithTypename<AppSettingsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<AppSettingsConnection>, Record<string, never>, Array<WithTypename<AppSetting> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<AppSettingsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<AppSettingsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  AppSettingsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<AppSettingsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<AppSettingsEdge>, Record<string, never>, WithTypename<AppSetting> | string>
  },
  Application?: {
    appSettingsByApplicationKey?: GraphCacheResolver<WithTypename<Application>, ApplicationAppSettingsByApplicationKeyArgs, WithTypename<AppSettingsConnection> | string>,
    appSettingsByApplicationKeyList?: GraphCacheResolver<WithTypename<Application>, ApplicationAppSettingsByApplicationKeyListArgs, Array<WithTypename<AppSetting> | string>>,
    key?: GraphCacheResolver<WithTypename<Application>, Record<string, never>, Scalars['String'] | string>,
    licenseCount?: GraphCacheResolver<WithTypename<Application>, Record<string, never>, Scalars['Int'] | string>,
    licenseTypesByApplicationKey?: GraphCacheResolver<WithTypename<Application>, ApplicationLicenseTypesByApplicationKeyArgs, WithTypename<LicenseTypesConnection> | string>,
    licenseTypesByApplicationKeyList?: GraphCacheResolver<WithTypename<Application>, ApplicationLicenseTypesByApplicationKeyListArgs, Array<WithTypename<LicenseType> | string>>,
    name?: GraphCacheResolver<WithTypename<Application>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Application>, Record<string, never>, Scalars['ID'] | string>
  },
  ApplicationsConnection?: {
    edges?: GraphCacheResolver<WithTypename<ApplicationsConnection>, Record<string, never>, Array<WithTypename<ApplicationsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<ApplicationsConnection>, Record<string, never>, Array<WithTypename<Application> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<ApplicationsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<ApplicationsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  ApplicationsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<ApplicationsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<ApplicationsEdge>, Record<string, never>, WithTypename<Application> | string>
  },
  AssignTodoPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<AssignTodoPayload>, AssignTodoPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<AssignTodoPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  AssumeResidencyPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, AssumeResidencyPayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<AssumeResidencyPayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  BecomeSupportPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, BecomeSupportPayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<BecomeSupportPayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  BlockResidentPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<BlockResidentPayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<BlockResidentPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<BlockResidentPayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<BlockResidentPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<BlockResidentPayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<BlockResidentPayload>, BlockResidentPayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<BlockResidentPayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  CreateLocationPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<CreateLocationPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<CreateLocationPayload>, Record<string, never>, WithTypename<Location> | string>,
    locationEdge?: GraphCacheResolver<WithTypename<CreateLocationPayload>, CreateLocationPayloadLocationEdgeArgs, WithTypename<LocationsEdge> | string>,
    query?: GraphCacheResolver<WithTypename<CreateLocationPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<CreateLocationPayload>, Record<string, never>, WithTypename<LocResident> | string>,
    tenant?: GraphCacheResolver<WithTypename<CreateLocationPayload>, Record<string, never>, WithTypename<LocTenant> | string>
  },
  CreateTenantPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<CreateTenantPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<CreateTenantPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<CreateTenantPayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantEdge?: GraphCacheResolver<WithTypename<CreateTenantPayload>, CreateTenantPayloadTenantEdgeArgs, WithTypename<TenantsEdge> | string>
  },
  CreateTodoPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<CreateTodoPayload>, CreateTodoPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<CreateTodoPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  DeactivateSubscriberPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, Record<string, never>, Scalars['String'] | string>,
    msgResident?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, Record<string, never>, WithTypename<MsgResident> | string>,
    query?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, Record<string, never>, WithTypename<Query> | string>,
    subscriber?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, Record<string, never>, WithTypename<Subscriber> | string>,
    subscriberEdge?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, DeactivateSubscriberPayloadSubscriberEdgeArgs, WithTypename<SubscribersEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, Record<string, never>, WithTypename<MsgTenant> | string>,
    topic?: GraphCacheResolver<WithTypename<DeactivateSubscriberPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  DeactivateTenantPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeactivateTenantPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<DeactivateTenantPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<DeactivateTenantPayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantEdge?: GraphCacheResolver<WithTypename<DeactivateTenantPayload>, DeactivateTenantPayloadTenantEdgeArgs, WithTypename<TenantsEdge> | string>
  },
  DeactivateTenantSubscriptionPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeactivateTenantSubscriptionPayload>, Record<string, never>, Scalars['String'] | string>,
    licensePack?: GraphCacheResolver<WithTypename<DeactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<LicensePack> | string>,
    query?: GraphCacheResolver<WithTypename<DeactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<DeactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantSubscription?: GraphCacheResolver<WithTypename<DeactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<TenantSubscription> | string>,
    tenantSubscriptionEdge?: GraphCacheResolver<WithTypename<DeactivateTenantSubscriptionPayload>, DeactivateTenantSubscriptionPayloadTenantSubscriptionEdgeArgs, WithTypename<TenantSubscriptionsEdge> | string>
  },
  DeclineInvitationPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, DeclineInvitationPayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<DeclineInvitationPayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  DeclineResidencyPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, DeclineResidencyPayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<DeclineResidencyPayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  DeleteLocationPayload?: {
    boolean?: GraphCacheResolver<WithTypename<DeleteLocationPayload>, Record<string, never>, Scalars['Boolean'] | string>,
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteLocationPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<DeleteLocationPayload>, Record<string, never>, WithTypename<Query> | string>
  },
  DeleteTodoPayload?: {
    boolean?: GraphCacheResolver<WithTypename<DeleteTodoPayload>, Record<string, never>, Scalars['Boolean'] | string>,
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<DeleteTodoPayload>, Record<string, never>, WithTypename<Query> | string>
  },
  DeleteTopicPayload?: {
    boolean?: GraphCacheResolver<WithTypename<DeleteTopicPayload>, Record<string, never>, Scalars['Boolean'] | string>,
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteTopicPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<DeleteTopicPayload>, Record<string, never>, WithTypename<Query> | string>
  },
  ExitSupportModePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, ExitSupportModePayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<ExitSupportModePayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  GrantUserLicensePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, Scalars['String'] | string>,
    license?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<License> | string>,
    licenseEdge?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, GrantUserLicensePayloadLicenseEdgeArgs, WithTypename<LicensesEdge> | string>,
    licenseType?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<LicenseType> | string>,
    profile?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<Resident> | string>,
    tenant?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantSubscription?: GraphCacheResolver<WithTypename<GrantUserLicensePayload>, Record<string, never>, WithTypename<TenantSubscription> | string>
  },
  JoinAddressBookPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<JoinAddressBookPayload>, Record<string, never>, Scalars['String'] | string>,
    profile?: GraphCacheResolver<WithTypename<JoinAddressBookPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profileEdge?: GraphCacheResolver<WithTypename<JoinAddressBookPayload>, JoinAddressBookPayloadProfileEdgeArgs, WithTypename<ProfilesEdge> | string>,
    query?: GraphCacheResolver<WithTypename<JoinAddressBookPayload>, Record<string, never>, WithTypename<Query> | string>
  },
  LeaveAddressBookPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<LeaveAddressBookPayload>, Record<string, never>, Scalars['String'] | string>,
    profile?: GraphCacheResolver<WithTypename<LeaveAddressBookPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profileEdge?: GraphCacheResolver<WithTypename<LeaveAddressBookPayload>, LeaveAddressBookPayloadProfileEdgeArgs, WithTypename<ProfilesEdge> | string>,
    query?: GraphCacheResolver<WithTypename<LeaveAddressBookPayload>, Record<string, never>, WithTypename<Query> | string>
  },
  License?: {
    createdAt?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['Datetime'] | string>,
    expiresAt?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['Datetime'] | string>,
    id?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['UUID'] | string>,
    licenseType?: GraphCacheResolver<WithTypename<License>, Record<string, never>, WithTypename<LicenseType> | string>,
    licenseTypeKey?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['ID'] | string>,
    profile?: GraphCacheResolver<WithTypename<License>, Record<string, never>, WithTypename<Profile> | string>,
    profileId?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['UUID'] | string>,
    resident?: GraphCacheResolver<WithTypename<License>, Record<string, never>, WithTypename<Resident> | string>,
    residentId?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['UUID'] | string>,
    status?: GraphCacheResolver<WithTypename<License>, Record<string, never>, LicenseStatus | string>,
    tenant?: GraphCacheResolver<WithTypename<License>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['UUID'] | string>,
    tenantSubscription?: GraphCacheResolver<WithTypename<License>, Record<string, never>, WithTypename<TenantSubscription> | string>,
    tenantSubscriptionId?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['UUID'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<License>, Record<string, never>, Scalars['Datetime'] | string>
  },
  LicensePack?: {
    autoSubscribe?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['Boolean'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['Datetime'] | string>,
    description?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['String'] | string>,
    displayName?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['String'] | string>,
    key?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['String'] | string>,
    licensePackLicenseTypesByLicensePackKey?: GraphCacheResolver<WithTypename<LicensePack>, LicensePackLicensePackLicenseTypesByLicensePackKeyArgs, WithTypename<LicensePackLicenseTypesConnection> | string>,
    licensePackLicenseTypesByLicensePackKeyList?: GraphCacheResolver<WithTypename<LicensePack>, LicensePackLicensePackLicenseTypesByLicensePackKeyListArgs, Array<WithTypename<LicensePackLicenseType> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['ID'] | string>,
    tenantSubscriptionsByLicensePackKey?: GraphCacheResolver<WithTypename<LicensePack>, LicensePackTenantSubscriptionsByLicensePackKeyArgs, WithTypename<TenantSubscriptionsConnection> | string>,
    tenantSubscriptionsByLicensePackKeyList?: GraphCacheResolver<WithTypename<LicensePack>, LicensePackTenantSubscriptionsByLicensePackKeyListArgs, Array<WithTypename<TenantSubscription> | string>>,
    updatedAt?: GraphCacheResolver<WithTypename<LicensePack>, Record<string, never>, Scalars['Datetime'] | string>
  },
  LicensePackLicenseType?: {
    expirationIntervalMultiplier?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['Int'] | string>,
    expirationIntervalType?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, ExpirationIntervalType | string>,
    id?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['UUID'] | string>,
    issuedCount?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['Int'] | string>,
    licensePack?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, WithTypename<LicensePack> | string>,
    licensePackKey?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['String'] | string>,
    licenseType?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, WithTypename<LicenseType> | string>,
    licenseTypeKey?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['ID'] | string>,
    numberOfLicenses?: GraphCacheResolver<WithTypename<LicensePackLicenseType>, Record<string, never>, Scalars['Int'] | string>
  },
  LicensePackLicenseTypesConnection?: {
    edges?: GraphCacheResolver<WithTypename<LicensePackLicenseTypesConnection>, Record<string, never>, Array<WithTypename<LicensePackLicenseTypesEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LicensePackLicenseTypesConnection>, Record<string, never>, Array<WithTypename<LicensePackLicenseType> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LicensePackLicenseTypesConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LicensePackLicenseTypesConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LicensePackLicenseTypesEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LicensePackLicenseTypesEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LicensePackLicenseTypesEdge>, Record<string, never>, WithTypename<LicensePackLicenseType> | string>
  },
  LicensePacksConnection?: {
    edges?: GraphCacheResolver<WithTypename<LicensePacksConnection>, Record<string, never>, Array<WithTypename<LicensePacksEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LicensePacksConnection>, Record<string, never>, Array<WithTypename<LicensePack> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LicensePacksConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LicensePacksConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LicensePacksEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LicensePacksEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LicensePacksEdge>, Record<string, never>, WithTypename<LicensePack> | string>
  },
  LicenseType?: {
    application?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, WithTypename<Application> | string>,
    applicationKey?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, Scalars['String'] | string>,
    assignmentScope?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, LicenseTypeAssignmentScope | string>,
    createdAt?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, Scalars['Datetime'] | string>,
    displayName?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, Scalars['String'] | string>,
    key?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, Scalars['String'] | string>,
    licensePackLicenseTypesByLicenseTypeKey?: GraphCacheResolver<WithTypename<LicenseType>, LicenseTypeLicensePackLicenseTypesByLicenseTypeKeyArgs, WithTypename<LicensePackLicenseTypesConnection> | string>,
    licensePackLicenseTypesByLicenseTypeKeyList?: GraphCacheResolver<WithTypename<LicenseType>, LicenseTypeLicensePackLicenseTypesByLicenseTypeKeyListArgs, Array<WithTypename<LicensePackLicenseType> | string>>,
    licenseTypePermissionsByLicenseTypeKey?: GraphCacheResolver<WithTypename<LicenseType>, LicenseTypeLicenseTypePermissionsByLicenseTypeKeyArgs, WithTypename<LicenseTypePermissionsConnection> | string>,
    licenseTypePermissionsByLicenseTypeKeyList?: GraphCacheResolver<WithTypename<LicenseType>, LicenseTypeLicenseTypePermissionsByLicenseTypeKeyListArgs, Array<WithTypename<LicenseTypePermission> | string>>,
    licensesByLicenseTypeKey?: GraphCacheResolver<WithTypename<LicenseType>, LicenseTypeLicensesByLicenseTypeKeyArgs, WithTypename<LicensesConnection> | string>,
    licensesByLicenseTypeKeyList?: GraphCacheResolver<WithTypename<LicenseType>, LicenseTypeLicensesByLicenseTypeKeyListArgs, Array<WithTypename<License> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, Scalars['ID'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<LicenseType>, Record<string, never>, Scalars['Datetime'] | string>
  },
  LicenseTypePermission?: {
    licenseType?: GraphCacheResolver<WithTypename<LicenseTypePermission>, Record<string, never>, WithTypename<LicenseType> | string>,
    licenseTypeKey?: GraphCacheResolver<WithTypename<LicenseTypePermission>, Record<string, never>, Scalars['String'] | string>,
    permission?: GraphCacheResolver<WithTypename<LicenseTypePermission>, Record<string, never>, WithTypename<Permission> | string>,
    permissionKey?: GraphCacheResolver<WithTypename<LicenseTypePermission>, Record<string, never>, Scalars['String'] | string>
  },
  LicenseTypePermissionsConnection?: {
    edges?: GraphCacheResolver<WithTypename<LicenseTypePermissionsConnection>, Record<string, never>, Array<WithTypename<LicenseTypePermissionsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LicenseTypePermissionsConnection>, Record<string, never>, Array<WithTypename<LicenseTypePermission> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LicenseTypePermissionsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LicenseTypePermissionsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LicenseTypePermissionsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LicenseTypePermissionsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LicenseTypePermissionsEdge>, Record<string, never>, WithTypename<LicenseTypePermission> | string>
  },
  LicenseTypesConnection?: {
    edges?: GraphCacheResolver<WithTypename<LicenseTypesConnection>, Record<string, never>, Array<WithTypename<LicenseTypesEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LicenseTypesConnection>, Record<string, never>, Array<WithTypename<LicenseType> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LicenseTypesConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LicenseTypesConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LicenseTypesEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LicenseTypesEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LicenseTypesEdge>, Record<string, never>, WithTypename<LicenseType> | string>
  },
  LicensesConnection?: {
    edges?: GraphCacheResolver<WithTypename<LicensesConnection>, Record<string, never>, Array<WithTypename<LicensesEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LicensesConnection>, Record<string, never>, Array<WithTypename<License> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LicensesConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LicensesConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LicensesEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LicensesEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LicensesEdge>, Record<string, never>, WithTypename<License> | string>
  },
  LocResident?: {
    displayName?: GraphCacheResolver<WithTypename<LocResident>, Record<string, never>, Scalars['String'] | string>,
    locationsByResidentId?: GraphCacheResolver<WithTypename<LocResident>, LocResidentLocationsByResidentIdArgs, WithTypename<LocationsConnection> | string>,
    locationsByResidentIdList?: GraphCacheResolver<WithTypename<LocResident>, LocResidentLocationsByResidentIdListArgs, Array<WithTypename<Location> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<LocResident>, Record<string, never>, Scalars['ID'] | string>,
    resident?: GraphCacheResolver<WithTypename<LocResident>, Record<string, never>, WithTypename<Resident> | string>,
    residentId?: GraphCacheResolver<WithTypename<LocResident>, Record<string, never>, Scalars['UUID'] | string>,
    tenant?: GraphCacheResolver<WithTypename<LocResident>, Record<string, never>, WithTypename<LocTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<LocResident>, Record<string, never>, Scalars['UUID'] | string>
  },
  LocResidentsConnection?: {
    edges?: GraphCacheResolver<WithTypename<LocResidentsConnection>, Record<string, never>, Array<WithTypename<LocResidentsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LocResidentsConnection>, Record<string, never>, Array<WithTypename<LocResident> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LocResidentsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LocResidentsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LocResidentsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LocResidentsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LocResidentsEdge>, Record<string, never>, WithTypename<LocResident> | string>
  },
  LocTenant?: {
    locResidentsByTenantId?: GraphCacheResolver<WithTypename<LocTenant>, LocTenantLocResidentsByTenantIdArgs, WithTypename<LocResidentsConnection> | string>,
    locResidentsByTenantIdList?: GraphCacheResolver<WithTypename<LocTenant>, LocTenantLocResidentsByTenantIdListArgs, Array<WithTypename<LocResident> | string>>,
    locationsByTenantId?: GraphCacheResolver<WithTypename<LocTenant>, LocTenantLocationsByTenantIdArgs, WithTypename<LocationsConnection> | string>,
    locationsByTenantIdList?: GraphCacheResolver<WithTypename<LocTenant>, LocTenantLocationsByTenantIdListArgs, Array<WithTypename<Location> | string>>,
    name?: GraphCacheResolver<WithTypename<LocTenant>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<LocTenant>, Record<string, never>, Scalars['ID'] | string>,
    tenant?: GraphCacheResolver<WithTypename<LocTenant>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<LocTenant>, Record<string, never>, Scalars['UUID'] | string>
  },
  LocTenantsConnection?: {
    edges?: GraphCacheResolver<WithTypename<LocTenantsConnection>, Record<string, never>, Array<WithTypename<LocTenantsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LocTenantsConnection>, Record<string, never>, Array<WithTypename<LocTenant> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LocTenantsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LocTenantsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LocTenantsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LocTenantsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LocTenantsEdge>, Record<string, never>, WithTypename<LocTenant> | string>
  },
  Location?: {
    address1?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    address2?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    city?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    country?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['UUID'] | string>,
    lat?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    lon?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['ID'] | string>,
    postalCode?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    resident?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, WithTypename<LocResident> | string>,
    residentId?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['UUID'] | string>,
    state?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['String'] | string>,
    tenant?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, WithTypename<LocTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Location>, Record<string, never>, Scalars['UUID'] | string>,
    todos?: GraphCacheResolver<WithTypename<Location>, LocationTodosArgs, WithTypename<TodosConnection> | string>,
    todosList?: GraphCacheResolver<WithTypename<Location>, LocationTodosListArgs, Array<WithTypename<Todo> | string>>
  },
  LocationsConnection?: {
    edges?: GraphCacheResolver<WithTypename<LocationsConnection>, Record<string, never>, Array<WithTypename<LocationsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<LocationsConnection>, Record<string, never>, Array<WithTypename<Location> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<LocationsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<LocationsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  LocationsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<LocationsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<LocationsEdge>, Record<string, never>, WithTypename<Location> | string>
  },
  MakeTemplateFromTodoPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, MakeTemplateFromTodoPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<MakeTemplateFromTodoPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  MakeTodoFromTemplatePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, MakeTodoFromTemplatePayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<MakeTodoFromTemplatePayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  Message?: {
    content?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['String'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['Datetime'] | string>,
    id?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['UUID'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['ID'] | string>,
    postedByMsgResident?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, WithTypename<MsgResident> | string>,
    postedByMsgResidentId?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['UUID'] | string>,
    status?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, MessageStatus | string>,
    tags?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Array<Scalars['String'] | string>>,
    tenant?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, WithTypename<MsgTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['UUID'] | string>,
    topic?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, WithTypename<Topic> | string>,
    topicId?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['UUID'] | string>
  },
  MessagesConnection?: {
    edges?: GraphCacheResolver<WithTypename<MessagesConnection>, Record<string, never>, Array<WithTypename<MessagesEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<MessagesConnection>, Record<string, never>, Array<WithTypename<Message> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<MessagesConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<MessagesConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  MessagesEdge?: {
    cursor?: GraphCacheResolver<WithTypename<MessagesEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<MessagesEdge>, Record<string, never>, WithTypename<Message> | string>
  },
  MsgResident?: {
    displayName?: GraphCacheResolver<WithTypename<MsgResident>, Record<string, never>, Scalars['String'] | string>,
    messagesByPostedByMsgResidentId?: GraphCacheResolver<WithTypename<MsgResident>, MsgResidentMessagesByPostedByMsgResidentIdArgs, WithTypename<MessagesConnection> | string>,
    messagesByPostedByMsgResidentIdList?: GraphCacheResolver<WithTypename<MsgResident>, MsgResidentMessagesByPostedByMsgResidentIdListArgs, Array<WithTypename<Message> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<MsgResident>, Record<string, never>, Scalars['ID'] | string>,
    resident?: GraphCacheResolver<WithTypename<MsgResident>, Record<string, never>, WithTypename<Resident> | string>,
    residentId?: GraphCacheResolver<WithTypename<MsgResident>, Record<string, never>, Scalars['UUID'] | string>,
    subscribers?: GraphCacheResolver<WithTypename<MsgResident>, MsgResidentSubscribersArgs, WithTypename<SubscribersConnection> | string>,
    subscribersList?: GraphCacheResolver<WithTypename<MsgResident>, MsgResidentSubscribersListArgs, Array<WithTypename<Subscriber> | string>>,
    tenant?: GraphCacheResolver<WithTypename<MsgResident>, Record<string, never>, WithTypename<MsgTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<MsgResident>, Record<string, never>, Scalars['UUID'] | string>
  },
  MsgResidentsConnection?: {
    edges?: GraphCacheResolver<WithTypename<MsgResidentsConnection>, Record<string, never>, Array<WithTypename<MsgResidentsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<MsgResidentsConnection>, Record<string, never>, Array<WithTypename<MsgResident> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<MsgResidentsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<MsgResidentsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  MsgResidentsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<MsgResidentsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<MsgResidentsEdge>, Record<string, never>, WithTypename<MsgResident> | string>
  },
  MsgTenant?: {
    messagesByTenantId?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantMessagesByTenantIdArgs, WithTypename<MessagesConnection> | string>,
    messagesByTenantIdList?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantMessagesByTenantIdListArgs, Array<WithTypename<Message> | string>>,
    msgResidentsByTenantId?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantMsgResidentsByTenantIdArgs, WithTypename<MsgResidentsConnection> | string>,
    msgResidentsByTenantIdList?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantMsgResidentsByTenantIdListArgs, Array<WithTypename<MsgResident> | string>>,
    name?: GraphCacheResolver<WithTypename<MsgTenant>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<MsgTenant>, Record<string, never>, Scalars['ID'] | string>,
    subscribersByTenantId?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantSubscribersByTenantIdArgs, WithTypename<SubscribersConnection> | string>,
    subscribersByTenantIdList?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantSubscribersByTenantIdListArgs, Array<WithTypename<Subscriber> | string>>,
    tenant?: GraphCacheResolver<WithTypename<MsgTenant>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<MsgTenant>, Record<string, never>, Scalars['UUID'] | string>,
    topicsByTenantId?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantTopicsByTenantIdArgs, WithTypename<TopicsConnection> | string>,
    topicsByTenantIdList?: GraphCacheResolver<WithTypename<MsgTenant>, MsgTenantTopicsByTenantIdListArgs, Array<WithTypename<Topic> | string>>
  },
  MsgTenantsConnection?: {
    edges?: GraphCacheResolver<WithTypename<MsgTenantsConnection>, Record<string, never>, Array<WithTypename<MsgTenantsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<MsgTenantsConnection>, Record<string, never>, Array<WithTypename<MsgTenant> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<MsgTenantsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<MsgTenantsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  MsgTenantsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<MsgTenantsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<MsgTenantsEdge>, Record<string, never>, WithTypename<MsgTenant> | string>
  },
  PageInfo?: {
    endCursor?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Cursor'] | string>,
    hasNextPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    hasPreviousPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    startCursor?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Cursor'] | string>
  },
  Permission?: {
    key?: GraphCacheResolver<WithTypename<Permission>, Record<string, never>, Scalars['String'] | string>,
    licenseTypePermissionsByPermissionKey?: GraphCacheResolver<WithTypename<Permission>, PermissionLicenseTypePermissionsByPermissionKeyArgs, WithTypename<LicenseTypePermissionsConnection> | string>,
    licenseTypePermissionsByPermissionKeyList?: GraphCacheResolver<WithTypename<Permission>, PermissionLicenseTypePermissionsByPermissionKeyListArgs, Array<WithTypename<LicenseTypePermission> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<Permission>, Record<string, never>, Scalars['ID'] | string>
  },
  PermissionsConnection?: {
    edges?: GraphCacheResolver<WithTypename<PermissionsConnection>, Record<string, never>, Array<WithTypename<PermissionsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<PermissionsConnection>, Record<string, never>, Array<WithTypename<Permission> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<PermissionsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<PermissionsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  PermissionsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<PermissionsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<PermissionsEdge>, Record<string, never>, WithTypename<Permission> | string>
  },
  PinTodoPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<PinTodoPayload>, PinTodoPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<PinTodoPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  Profile?: {
    avatarKey?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['Datetime'] | string>,
    displayName?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    firstName?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    fullName?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['UUID'] | string>,
    identifier?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    isPublic?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['Boolean'] | string>,
    lastName?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    licenses?: GraphCacheResolver<WithTypename<Profile>, ProfileLicensesArgs, WithTypename<LicensesConnection> | string>,
    licensesList?: GraphCacheResolver<WithTypename<Profile>, ProfileLicensesListArgs, Array<WithTypename<License> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['ID'] | string>,
    phone?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    residents?: GraphCacheResolver<WithTypename<Profile>, ProfileResidentsArgs, WithTypename<ResidentsConnection> | string>,
    residentsByInvitedByProfileId?: GraphCacheResolver<WithTypename<Profile>, ProfileResidentsByInvitedByProfileIdArgs, WithTypename<ResidentsConnection> | string>,
    residentsByInvitedByProfileIdList?: GraphCacheResolver<WithTypename<Profile>, ProfileResidentsByInvitedByProfileIdListArgs, Array<WithTypename<Resident> | string>>,
    residentsList?: GraphCacheResolver<WithTypename<Profile>, ProfileResidentsListArgs, Array<WithTypename<Resident> | string>>,
    status?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, ProfileStatus | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['Datetime'] | string>
  },
  ProfileClaim?: {
    actualResidentId?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['UUID'] | string>,
    displayName?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['String'] | string>,
    permissions?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Array<Scalars['String'] | string>>,
    profileId?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['UUID'] | string>,
    profileStatus?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, ProfileStatus | string>,
    residentId?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['UUID'] | string>,
    tenantId?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['UUID'] | string>,
    tenantName?: GraphCacheResolver<WithTypename<ProfileClaim>, Record<string, never>, Scalars['String'] | string>
  },
  ProfilesConnection?: {
    edges?: GraphCacheResolver<WithTypename<ProfilesConnection>, Record<string, never>, Array<WithTypename<ProfilesEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<ProfilesConnection>, Record<string, never>, Array<WithTypename<Profile> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<ProfilesConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<ProfilesConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  ProfilesEdge?: {
    cursor?: GraphCacheResolver<WithTypename<ProfilesEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<ProfilesEdge>, Record<string, never>, WithTypename<Profile> | string>
  },
  ReactivateTenantSubscriptionPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<ReactivateTenantSubscriptionPayload>, Record<string, never>, Scalars['String'] | string>,
    licensePack?: GraphCacheResolver<WithTypename<ReactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<LicensePack> | string>,
    query?: GraphCacheResolver<WithTypename<ReactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<ReactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantSubscription?: GraphCacheResolver<WithTypename<ReactivateTenantSubscriptionPayload>, Record<string, never>, WithTypename<TenantSubscription> | string>,
    tenantSubscriptionEdge?: GraphCacheResolver<WithTypename<ReactivateTenantSubscriptionPayload>, ReactivateTenantSubscriptionPayloadTenantSubscriptionEdgeArgs, WithTypename<TenantSubscriptionsEdge> | string>
  },
  Resident?: {
    createdAt?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['Datetime'] | string>,
    displayName?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['UUID'] | string>,
    invitedByDisplayName?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, WithTypename<Profile> | string>,
    invitedByProfileId?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['UUID'] | string>,
    licenses?: GraphCacheResolver<WithTypename<Resident>, ResidentLicensesArgs, WithTypename<LicensesConnection> | string>,
    licensesList?: GraphCacheResolver<WithTypename<Resident>, ResidentLicensesListArgs, Array<WithTypename<License> | string>>,
    locResident?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, WithTypename<LocResident> | string>,
    msgResident?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, WithTypename<MsgResident> | string>,
    nodeId?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['ID'] | string>,
    profile?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, WithTypename<Profile> | string>,
    profileId?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['UUID'] | string>,
    status?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, ResidentStatus | string>,
    tenant?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['UUID'] | string>,
    tenantName?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['String'] | string>,
    todoResident?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, WithTypename<TodoResident> | string>,
    type?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, ResidentType | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Resident>, Record<string, never>, Scalars['Datetime'] | string>
  },
  ResidentsConnection?: {
    edges?: GraphCacheResolver<WithTypename<ResidentsConnection>, Record<string, never>, Array<WithTypename<ResidentsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<ResidentsConnection>, Record<string, never>, Array<WithTypename<Resident> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<ResidentsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<ResidentsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  ResidentsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<ResidentsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<ResidentsEdge>, Record<string, never>, WithTypename<Resident> | string>
  },
  RevokeUserLicensePayload?: {
    boolean?: GraphCacheResolver<WithTypename<RevokeUserLicensePayload>, Record<string, never>, Scalars['Boolean'] | string>,
    clientMutationId?: GraphCacheResolver<WithTypename<RevokeUserLicensePayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<RevokeUserLicensePayload>, Record<string, never>, WithTypename<Query> | string>
  },
  SubscribeTenantToLicensePackPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<SubscribeTenantToLicensePackPayload>, Record<string, never>, Scalars['String'] | string>,
    licensePack?: GraphCacheResolver<WithTypename<SubscribeTenantToLicensePackPayload>, Record<string, never>, WithTypename<LicensePack> | string>,
    query?: GraphCacheResolver<WithTypename<SubscribeTenantToLicensePackPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<SubscribeTenantToLicensePackPayload>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantSubscription?: GraphCacheResolver<WithTypename<SubscribeTenantToLicensePackPayload>, Record<string, never>, WithTypename<TenantSubscription> | string>,
    tenantSubscriptionEdge?: GraphCacheResolver<WithTypename<SubscribeTenantToLicensePackPayload>, SubscribeTenantToLicensePackPayloadTenantSubscriptionEdgeArgs, WithTypename<TenantSubscriptionsEdge> | string>
  },
  Subscriber?: {
    createdAt?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['Datetime'] | string>,
    id?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['UUID'] | string>,
    lastRead?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['Datetime'] | string>,
    msgResident?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, WithTypename<MsgResident> | string>,
    msgResidentId?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['UUID'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['ID'] | string>,
    status?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, SubscriberStatus | string>,
    tenant?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, WithTypename<MsgTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['UUID'] | string>,
    topic?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, WithTypename<Topic> | string>,
    topicId?: GraphCacheResolver<WithTypename<Subscriber>, Record<string, never>, Scalars['UUID'] | string>
  },
  SubscribersConnection?: {
    edges?: GraphCacheResolver<WithTypename<SubscribersConnection>, Record<string, never>, Array<WithTypename<SubscribersEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<SubscribersConnection>, Record<string, never>, Array<WithTypename<Subscriber> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<SubscribersConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<SubscribersConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  SubscribersEdge?: {
    cursor?: GraphCacheResolver<WithTypename<SubscribersEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<SubscribersEdge>, Record<string, never>, WithTypename<Subscriber> | string>
  },
  Tenant?: {
    createdAt?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, Scalars['Datetime'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, Scalars['UUID'] | string>,
    identifier?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, Scalars['String'] | string>,
    licenses?: GraphCacheResolver<WithTypename<Tenant>, TenantLicensesArgs, WithTypename<LicensesConnection> | string>,
    licensesList?: GraphCacheResolver<WithTypename<Tenant>, TenantLicensesListArgs, Array<WithTypename<License> | string>>,
    locTenant?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, WithTypename<LocTenant> | string>,
    msgTenant?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, WithTypename<MsgTenant> | string>,
    name?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, Scalars['ID'] | string>,
    residents?: GraphCacheResolver<WithTypename<Tenant>, TenantResidentsArgs, WithTypename<ResidentsConnection> | string>,
    residentsList?: GraphCacheResolver<WithTypename<Tenant>, TenantResidentsListArgs, Array<WithTypename<Resident> | string>>,
    status?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, TenantStatus | string>,
    tenantSubscriptions?: GraphCacheResolver<WithTypename<Tenant>, TenantTenantSubscriptionsArgs, WithTypename<TenantSubscriptionsConnection> | string>,
    tenantSubscriptionsList?: GraphCacheResolver<WithTypename<Tenant>, TenantTenantSubscriptionsListArgs, Array<WithTypename<TenantSubscription> | string>>,
    things?: GraphCacheResolver<WithTypename<Tenant>, TenantThingsArgs, WithTypename<ThingsConnection> | string>,
    thingsList?: GraphCacheResolver<WithTypename<Tenant>, TenantThingsListArgs, Array<WithTypename<Thing> | string>>,
    todoTenant?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, WithTypename<TodoTenant> | string>,
    type?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, TenantType | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Tenant>, Record<string, never>, Scalars['Datetime'] | string>
  },
  TenantSubscription?: {
    createdAt?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, Scalars['Datetime'] | string>,
    id?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, Scalars['UUID'] | string>,
    licensePack?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, WithTypename<LicensePack> | string>,
    licensePackKey?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, Scalars['String'] | string>,
    licenses?: GraphCacheResolver<WithTypename<TenantSubscription>, TenantSubscriptionLicensesArgs, WithTypename<LicensesConnection> | string>,
    licensesList?: GraphCacheResolver<WithTypename<TenantSubscription>, TenantSubscriptionLicensesListArgs, Array<WithTypename<License> | string>>,
    nodeId?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, Scalars['ID'] | string>,
    status?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, TenantSubscriptionStatus | string>,
    tenant?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, Scalars['UUID'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<TenantSubscription>, Record<string, never>, Scalars['Datetime'] | string>
  },
  TenantSubscriptionsConnection?: {
    edges?: GraphCacheResolver<WithTypename<TenantSubscriptionsConnection>, Record<string, never>, Array<WithTypename<TenantSubscriptionsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<TenantSubscriptionsConnection>, Record<string, never>, Array<WithTypename<TenantSubscription> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<TenantSubscriptionsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<TenantSubscriptionsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  TenantSubscriptionsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<TenantSubscriptionsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<TenantSubscriptionsEdge>, Record<string, never>, WithTypename<TenantSubscription> | string>
  },
  TenantsConnection?: {
    edges?: GraphCacheResolver<WithTypename<TenantsConnection>, Record<string, never>, Array<WithTypename<TenantsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<TenantsConnection>, Record<string, never>, Array<WithTypename<Tenant> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<TenantsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<TenantsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  TenantsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<TenantsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<TenantsEdge>, Record<string, never>, WithTypename<Tenant> | string>
  },
  Thing?: {
    id?: GraphCacheResolver<WithTypename<Thing>, Record<string, never>, Scalars['UUID'] | string>,
    name?: GraphCacheResolver<WithTypename<Thing>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Thing>, Record<string, never>, Scalars['ID'] | string>,
    status?: GraphCacheResolver<WithTypename<Thing>, Record<string, never>, ThingStatus | string>,
    tenant?: GraphCacheResolver<WithTypename<Thing>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Thing>, Record<string, never>, Scalars['UUID'] | string>
  },
  ThingsConnection?: {
    edges?: GraphCacheResolver<WithTypename<ThingsConnection>, Record<string, never>, Array<WithTypename<ThingsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<ThingsConnection>, Record<string, never>, Array<WithTypename<Thing> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<ThingsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<ThingsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  ThingsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<ThingsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<ThingsEdge>, Record<string, never>, WithTypename<Thing> | string>
  },
  Todo?: {
    createdAt?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['Datetime'] | string>,
    description?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    isTemplate?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['Boolean'] | string>,
    location?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, WithTypename<Location> | string>,
    locationId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    name?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['ID'] | string>,
    ordinal?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['Int'] | string>,
    parentTodo?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, WithTypename<Todo> | string>,
    parentTodoId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    pinned?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['Boolean'] | string>,
    resident?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, WithTypename<TodoResident> | string>,
    residentId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    rootTodo?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, WithTypename<Todo> | string>,
    rootTodoId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    status?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, TodoStatus | string>,
    tags?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Array<Scalars['String'] | string>>,
    tenant?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, WithTypename<TodoTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    todosByParentTodoId?: GraphCacheResolver<WithTypename<Todo>, TodoTodosByParentTodoIdArgs, WithTypename<TodosConnection> | string>,
    todosByParentTodoIdList?: GraphCacheResolver<WithTypename<Todo>, TodoTodosByParentTodoIdListArgs, Array<WithTypename<Todo> | string>>,
    todosByRootTodoId?: GraphCacheResolver<WithTypename<Todo>, TodoTodosByRootTodoIdArgs, WithTypename<TodosConnection> | string>,
    todosByRootTodoIdList?: GraphCacheResolver<WithTypename<Todo>, TodoTodosByRootTodoIdListArgs, Array<WithTypename<Todo> | string>>,
    topic?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, WithTypename<Topic> | string>,
    topicId?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['UUID'] | string>,
    type?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, TodoType | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Todo>, Record<string, never>, Scalars['Datetime'] | string>
  },
  TodoResident?: {
    displayName?: GraphCacheResolver<WithTypename<TodoResident>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<TodoResident>, Record<string, never>, Scalars['ID'] | string>,
    resident?: GraphCacheResolver<WithTypename<TodoResident>, Record<string, never>, WithTypename<Resident> | string>,
    residentId?: GraphCacheResolver<WithTypename<TodoResident>, Record<string, never>, Scalars['UUID'] | string>,
    tenant?: GraphCacheResolver<WithTypename<TodoResident>, Record<string, never>, WithTypename<TodoTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<TodoResident>, Record<string, never>, Scalars['UUID'] | string>,
    todosByResidentId?: GraphCacheResolver<WithTypename<TodoResident>, TodoResidentTodosByResidentIdArgs, WithTypename<TodosConnection> | string>,
    todosByResidentIdList?: GraphCacheResolver<WithTypename<TodoResident>, TodoResidentTodosByResidentIdListArgs, Array<WithTypename<Todo> | string>>
  },
  TodoResidentsConnection?: {
    edges?: GraphCacheResolver<WithTypename<TodoResidentsConnection>, Record<string, never>, Array<WithTypename<TodoResidentsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<TodoResidentsConnection>, Record<string, never>, Array<WithTypename<TodoResident> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<TodoResidentsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<TodoResidentsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  TodoResidentsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<TodoResidentsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<TodoResidentsEdge>, Record<string, never>, WithTypename<TodoResident> | string>
  },
  TodoTenant?: {
    name?: GraphCacheResolver<WithTypename<TodoTenant>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<TodoTenant>, Record<string, never>, Scalars['ID'] | string>,
    tenant?: GraphCacheResolver<WithTypename<TodoTenant>, Record<string, never>, WithTypename<Tenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<TodoTenant>, Record<string, never>, Scalars['UUID'] | string>,
    todoResidentsByTenantId?: GraphCacheResolver<WithTypename<TodoTenant>, TodoTenantTodoResidentsByTenantIdArgs, WithTypename<TodoResidentsConnection> | string>,
    todoResidentsByTenantIdList?: GraphCacheResolver<WithTypename<TodoTenant>, TodoTenantTodoResidentsByTenantIdListArgs, Array<WithTypename<TodoResident> | string>>,
    todosByTenantId?: GraphCacheResolver<WithTypename<TodoTenant>, TodoTenantTodosByTenantIdArgs, WithTypename<TodosConnection> | string>,
    todosByTenantIdList?: GraphCacheResolver<WithTypename<TodoTenant>, TodoTenantTodosByTenantIdListArgs, Array<WithTypename<Todo> | string>>
  },
  TodoTenantsConnection?: {
    edges?: GraphCacheResolver<WithTypename<TodoTenantsConnection>, Record<string, never>, Array<WithTypename<TodoTenantsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<TodoTenantsConnection>, Record<string, never>, Array<WithTypename<TodoTenant> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<TodoTenantsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<TodoTenantsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  TodoTenantsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<TodoTenantsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<TodoTenantsEdge>, Record<string, never>, WithTypename<TodoTenant> | string>
  },
  TodosConnection?: {
    edges?: GraphCacheResolver<WithTypename<TodosConnection>, Record<string, never>, Array<WithTypename<TodosEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<TodosConnection>, Record<string, never>, Array<WithTypename<Todo> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<TodosConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<TodosConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  TodosEdge?: {
    cursor?: GraphCacheResolver<WithTypename<TodosEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<TodosEdge>, Record<string, never>, WithTypename<Todo> | string>
  },
  Topic?: {
    createdAt?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Scalars['Datetime'] | string>,
    id?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Scalars['UUID'] | string>,
    identifier?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Scalars['String'] | string>,
    messages?: GraphCacheResolver<WithTypename<Topic>, TopicMessagesArgs, WithTypename<MessagesConnection> | string>,
    messagesList?: GraphCacheResolver<WithTypename<Topic>, TopicMessagesListArgs, Array<WithTypename<Message> | string>>,
    name?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Scalars['String'] | string>,
    nodeId?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Scalars['ID'] | string>,
    status?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, TopicStatus | string>,
    subscribers?: GraphCacheResolver<WithTypename<Topic>, TopicSubscribersArgs, WithTypename<SubscribersConnection> | string>,
    subscribersList?: GraphCacheResolver<WithTypename<Topic>, TopicSubscribersListArgs, Array<WithTypename<Subscriber> | string>>,
    tags?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Array<Scalars['String'] | string>>,
    tenant?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, WithTypename<MsgTenant> | string>,
    tenantId?: GraphCacheResolver<WithTypename<Topic>, Record<string, never>, Scalars['UUID'] | string>,
    todos?: GraphCacheResolver<WithTypename<Topic>, TopicTodosArgs, WithTypename<TodosConnection> | string>,
    todosList?: GraphCacheResolver<WithTypename<Topic>, TopicTodosListArgs, Array<WithTypename<Todo> | string>>
  },
  TopicMessageSubscriptionPayload?: {
    event?: GraphCacheResolver<WithTypename<TopicMessageSubscriptionPayload>, Record<string, never>, Scalars['String'] | string>,
    message?: GraphCacheResolver<WithTypename<TopicMessageSubscriptionPayload>, Record<string, never>, WithTypename<Message> | string>,
    messageId?: GraphCacheResolver<WithTypename<TopicMessageSubscriptionPayload>, Record<string, never>, Scalars['UUID'] | string>
  },
  TopicsConnection?: {
    edges?: GraphCacheResolver<WithTypename<TopicsConnection>, Record<string, never>, Array<WithTypename<TopicsEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<TopicsConnection>, Record<string, never>, Array<WithTypename<Topic> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<TopicsConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<TopicsConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  TopicsEdge?: {
    cursor?: GraphCacheResolver<WithTypename<TopicsEdge>, Record<string, never>, Scalars['Cursor'] | string>,
    node?: GraphCacheResolver<WithTypename<TopicsEdge>, Record<string, never>, WithTypename<Topic> | string>
  },
  UnblockResidentPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, Record<string, never>, Scalars['String'] | string>,
    invitedByProfile?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, Record<string, never>, WithTypename<Profile> | string>,
    profile?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, Record<string, never>, WithTypename<Profile> | string>,
    query?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, Record<string, never>, WithTypename<Resident> | string>,
    residentEdge?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, UnblockResidentPayloadResidentEdgeArgs, WithTypename<ResidentsEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<UnblockResidentPayload>, Record<string, never>, WithTypename<Tenant> | string>
  },
  UnpinTodoPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, UnpinTodoPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<UnpinTodoPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  UpdateLocationPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpdateLocationPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<UpdateLocationPayload>, Record<string, never>, WithTypename<Location> | string>,
    locationEdge?: GraphCacheResolver<WithTypename<UpdateLocationPayload>, UpdateLocationPayloadLocationEdgeArgs, WithTypename<LocationsEdge> | string>,
    query?: GraphCacheResolver<WithTypename<UpdateLocationPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<UpdateLocationPayload>, Record<string, never>, WithTypename<LocResident> | string>,
    tenant?: GraphCacheResolver<WithTypename<UpdateLocationPayload>, Record<string, never>, WithTypename<LocTenant> | string>
  },
  UpdateProfilePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpdateProfilePayload>, Record<string, never>, Scalars['String'] | string>,
    profile?: GraphCacheResolver<WithTypename<UpdateProfilePayload>, Record<string, never>, WithTypename<Profile> | string>,
    profileEdge?: GraphCacheResolver<WithTypename<UpdateProfilePayload>, UpdateProfilePayloadProfileEdgeArgs, WithTypename<ProfilesEdge> | string>,
    query?: GraphCacheResolver<WithTypename<UpdateProfilePayload>, Record<string, never>, WithTypename<Query> | string>
  },
  UpdateTodoPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, UpdateTodoPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<UpdateTodoPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  UpdateTodoStatusPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<Location> | string>,
    parentTodo?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<Todo> | string>,
    query?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<Query> | string>,
    resident?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<TodoResident> | string>,
    rootTodo?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<Todo> | string>,
    tenant?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<TodoTenant> | string>,
    todo?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<Todo> | string>,
    todoEdge?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, UpdateTodoStatusPayloadTodoEdgeArgs, WithTypename<TodosEdge> | string>,
    topic?: GraphCacheResolver<WithTypename<UpdateTodoStatusPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  UpsertMessagePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, Record<string, never>, Scalars['String'] | string>,
    message?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, Record<string, never>, WithTypename<Message> | string>,
    messageEdge?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, UpsertMessagePayloadMessageEdgeArgs, WithTypename<MessagesEdge> | string>,
    postedByMsgResident?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, Record<string, never>, WithTypename<MsgResident> | string>,
    query?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, Record<string, never>, WithTypename<MsgTenant> | string>,
    topic?: GraphCacheResolver<WithTypename<UpsertMessagePayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  UpsertSubscriberPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, Record<string, never>, Scalars['String'] | string>,
    msgResident?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, Record<string, never>, WithTypename<MsgResident> | string>,
    query?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, Record<string, never>, WithTypename<Query> | string>,
    subscriber?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, Record<string, never>, WithTypename<Subscriber> | string>,
    subscriberEdge?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, UpsertSubscriberPayloadSubscriberEdgeArgs, WithTypename<SubscribersEdge> | string>,
    tenant?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, Record<string, never>, WithTypename<MsgTenant> | string>,
    topic?: GraphCacheResolver<WithTypename<UpsertSubscriberPayload>, Record<string, never>, WithTypename<Topic> | string>
  },
  UpsertTopicPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<UpsertTopicPayload>, Record<string, never>, Scalars['String'] | string>,
    query?: GraphCacheResolver<WithTypename<UpsertTopicPayload>, Record<string, never>, WithTypename<Query> | string>,
    tenant?: GraphCacheResolver<WithTypename<UpsertTopicPayload>, Record<string, never>, WithTypename<MsgTenant> | string>,
    topic?: GraphCacheResolver<WithTypename<UpsertTopicPayload>, Record<string, never>, WithTypename<Topic> | string>,
    topicEdge?: GraphCacheResolver<WithTypename<UpsertTopicPayload>, UpsertTopicPayloadTopicEdgeArgs, WithTypename<TopicsEdge> | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  activateTenant?: GraphCacheOptimisticMutationResolver<MutationActivateTenantArgs, Maybe<WithTypename<ActivateTenantPayload>>>,
  assignTodo?: GraphCacheOptimisticMutationResolver<MutationAssignTodoArgs, Maybe<WithTypename<AssignTodoPayload>>>,
  assumeResidency?: GraphCacheOptimisticMutationResolver<MutationAssumeResidencyArgs, Maybe<WithTypename<AssumeResidencyPayload>>>,
  becomeSupport?: GraphCacheOptimisticMutationResolver<MutationBecomeSupportArgs, Maybe<WithTypename<BecomeSupportPayload>>>,
  blockResident?: GraphCacheOptimisticMutationResolver<MutationBlockResidentArgs, Maybe<WithTypename<BlockResidentPayload>>>,
  createLocation?: GraphCacheOptimisticMutationResolver<MutationCreateLocationArgs, Maybe<WithTypename<CreateLocationPayload>>>,
  createTenant?: GraphCacheOptimisticMutationResolver<MutationCreateTenantArgs, Maybe<WithTypename<CreateTenantPayload>>>,
  createTodo?: GraphCacheOptimisticMutationResolver<MutationCreateTodoArgs, Maybe<WithTypename<CreateTodoPayload>>>,
  deactivateSubscriber?: GraphCacheOptimisticMutationResolver<MutationDeactivateSubscriberArgs, Maybe<WithTypename<DeactivateSubscriberPayload>>>,
  deactivateTenant?: GraphCacheOptimisticMutationResolver<MutationDeactivateTenantArgs, Maybe<WithTypename<DeactivateTenantPayload>>>,
  deactivateTenantSubscription?: GraphCacheOptimisticMutationResolver<MutationDeactivateTenantSubscriptionArgs, Maybe<WithTypename<DeactivateTenantSubscriptionPayload>>>,
  declineInvitation?: GraphCacheOptimisticMutationResolver<MutationDeclineInvitationArgs, Maybe<WithTypename<DeclineInvitationPayload>>>,
  declineResidency?: GraphCacheOptimisticMutationResolver<MutationDeclineResidencyArgs, Maybe<WithTypename<DeclineResidencyPayload>>>,
  deleteLocation?: GraphCacheOptimisticMutationResolver<MutationDeleteLocationArgs, Maybe<WithTypename<DeleteLocationPayload>>>,
  deleteTodo?: GraphCacheOptimisticMutationResolver<MutationDeleteTodoArgs, Maybe<WithTypename<DeleteTodoPayload>>>,
  deleteTopic?: GraphCacheOptimisticMutationResolver<MutationDeleteTopicArgs, Maybe<WithTypename<DeleteTopicPayload>>>,
  exitSupportMode?: GraphCacheOptimisticMutationResolver<MutationExitSupportModeArgs, Maybe<WithTypename<ExitSupportModePayload>>>,
  grantUserLicense?: GraphCacheOptimisticMutationResolver<MutationGrantUserLicenseArgs, Maybe<WithTypename<GrantUserLicensePayload>>>,
  joinAddressBook?: GraphCacheOptimisticMutationResolver<MutationJoinAddressBookArgs, Maybe<WithTypename<JoinAddressBookPayload>>>,
  leaveAddressBook?: GraphCacheOptimisticMutationResolver<MutationLeaveAddressBookArgs, Maybe<WithTypename<LeaveAddressBookPayload>>>,
  makeTemplateFromTodo?: GraphCacheOptimisticMutationResolver<MutationMakeTemplateFromTodoArgs, Maybe<WithTypename<MakeTemplateFromTodoPayload>>>,
  makeTodoFromTemplate?: GraphCacheOptimisticMutationResolver<MutationMakeTodoFromTemplateArgs, Maybe<WithTypename<MakeTodoFromTemplatePayload>>>,
  pinTodo?: GraphCacheOptimisticMutationResolver<MutationPinTodoArgs, Maybe<WithTypename<PinTodoPayload>>>,
  reactivateTenantSubscription?: GraphCacheOptimisticMutationResolver<MutationReactivateTenantSubscriptionArgs, Maybe<WithTypename<ReactivateTenantSubscriptionPayload>>>,
  revokeUserLicense?: GraphCacheOptimisticMutationResolver<MutationRevokeUserLicenseArgs, Maybe<WithTypename<RevokeUserLicensePayload>>>,
  subscribeTenantToLicensePack?: GraphCacheOptimisticMutationResolver<MutationSubscribeTenantToLicensePackArgs, Maybe<WithTypename<SubscribeTenantToLicensePackPayload>>>,
  unblockResident?: GraphCacheOptimisticMutationResolver<MutationUnblockResidentArgs, Maybe<WithTypename<UnblockResidentPayload>>>,
  unpinTodo?: GraphCacheOptimisticMutationResolver<MutationUnpinTodoArgs, Maybe<WithTypename<UnpinTodoPayload>>>,
  updateLocation?: GraphCacheOptimisticMutationResolver<MutationUpdateLocationArgs, Maybe<WithTypename<UpdateLocationPayload>>>,
  updateProfile?: GraphCacheOptimisticMutationResolver<MutationUpdateProfileArgs, Maybe<WithTypename<UpdateProfilePayload>>>,
  updateTodo?: GraphCacheOptimisticMutationResolver<MutationUpdateTodoArgs, Maybe<WithTypename<UpdateTodoPayload>>>,
  updateTodoStatus?: GraphCacheOptimisticMutationResolver<MutationUpdateTodoStatusArgs, Maybe<WithTypename<UpdateTodoStatusPayload>>>,
  upsertMessage?: GraphCacheOptimisticMutationResolver<MutationUpsertMessageArgs, Maybe<WithTypename<UpsertMessagePayload>>>,
  upsertSubscriber?: GraphCacheOptimisticMutationResolver<MutationUpsertSubscriberArgs, Maybe<WithTypename<UpsertSubscriberPayload>>>,
  upsertTopic?: GraphCacheOptimisticMutationResolver<MutationUpsertTopicArgs, Maybe<WithTypename<UpsertTopicPayload>>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    activateTenant?: GraphCacheUpdateResolver<{ activateTenant: Maybe<WithTypename<ActivateTenantPayload>> }, MutationActivateTenantArgs>,
    assignTodo?: GraphCacheUpdateResolver<{ assignTodo: Maybe<WithTypename<AssignTodoPayload>> }, MutationAssignTodoArgs>,
    assumeResidency?: GraphCacheUpdateResolver<{ assumeResidency: Maybe<WithTypename<AssumeResidencyPayload>> }, MutationAssumeResidencyArgs>,
    becomeSupport?: GraphCacheUpdateResolver<{ becomeSupport: Maybe<WithTypename<BecomeSupportPayload>> }, MutationBecomeSupportArgs>,
    blockResident?: GraphCacheUpdateResolver<{ blockResident: Maybe<WithTypename<BlockResidentPayload>> }, MutationBlockResidentArgs>,
    createLocation?: GraphCacheUpdateResolver<{ createLocation: Maybe<WithTypename<CreateLocationPayload>> }, MutationCreateLocationArgs>,
    createTenant?: GraphCacheUpdateResolver<{ createTenant: Maybe<WithTypename<CreateTenantPayload>> }, MutationCreateTenantArgs>,
    createTodo?: GraphCacheUpdateResolver<{ createTodo: Maybe<WithTypename<CreateTodoPayload>> }, MutationCreateTodoArgs>,
    deactivateSubscriber?: GraphCacheUpdateResolver<{ deactivateSubscriber: Maybe<WithTypename<DeactivateSubscriberPayload>> }, MutationDeactivateSubscriberArgs>,
    deactivateTenant?: GraphCacheUpdateResolver<{ deactivateTenant: Maybe<WithTypename<DeactivateTenantPayload>> }, MutationDeactivateTenantArgs>,
    deactivateTenantSubscription?: GraphCacheUpdateResolver<{ deactivateTenantSubscription: Maybe<WithTypename<DeactivateTenantSubscriptionPayload>> }, MutationDeactivateTenantSubscriptionArgs>,
    declineInvitation?: GraphCacheUpdateResolver<{ declineInvitation: Maybe<WithTypename<DeclineInvitationPayload>> }, MutationDeclineInvitationArgs>,
    declineResidency?: GraphCacheUpdateResolver<{ declineResidency: Maybe<WithTypename<DeclineResidencyPayload>> }, MutationDeclineResidencyArgs>,
    deleteLocation?: GraphCacheUpdateResolver<{ deleteLocation: Maybe<WithTypename<DeleteLocationPayload>> }, MutationDeleteLocationArgs>,
    deleteTodo?: GraphCacheUpdateResolver<{ deleteTodo: Maybe<WithTypename<DeleteTodoPayload>> }, MutationDeleteTodoArgs>,
    deleteTopic?: GraphCacheUpdateResolver<{ deleteTopic: Maybe<WithTypename<DeleteTopicPayload>> }, MutationDeleteTopicArgs>,
    exitSupportMode?: GraphCacheUpdateResolver<{ exitSupportMode: Maybe<WithTypename<ExitSupportModePayload>> }, MutationExitSupportModeArgs>,
    grantUserLicense?: GraphCacheUpdateResolver<{ grantUserLicense: Maybe<WithTypename<GrantUserLicensePayload>> }, MutationGrantUserLicenseArgs>,
    joinAddressBook?: GraphCacheUpdateResolver<{ joinAddressBook: Maybe<WithTypename<JoinAddressBookPayload>> }, MutationJoinAddressBookArgs>,
    leaveAddressBook?: GraphCacheUpdateResolver<{ leaveAddressBook: Maybe<WithTypename<LeaveAddressBookPayload>> }, MutationLeaveAddressBookArgs>,
    makeTemplateFromTodo?: GraphCacheUpdateResolver<{ makeTemplateFromTodo: Maybe<WithTypename<MakeTemplateFromTodoPayload>> }, MutationMakeTemplateFromTodoArgs>,
    makeTodoFromTemplate?: GraphCacheUpdateResolver<{ makeTodoFromTemplate: Maybe<WithTypename<MakeTodoFromTemplatePayload>> }, MutationMakeTodoFromTemplateArgs>,
    pinTodo?: GraphCacheUpdateResolver<{ pinTodo: Maybe<WithTypename<PinTodoPayload>> }, MutationPinTodoArgs>,
    reactivateTenantSubscription?: GraphCacheUpdateResolver<{ reactivateTenantSubscription: Maybe<WithTypename<ReactivateTenantSubscriptionPayload>> }, MutationReactivateTenantSubscriptionArgs>,
    revokeUserLicense?: GraphCacheUpdateResolver<{ revokeUserLicense: Maybe<WithTypename<RevokeUserLicensePayload>> }, MutationRevokeUserLicenseArgs>,
    subscribeTenantToLicensePack?: GraphCacheUpdateResolver<{ subscribeTenantToLicensePack: Maybe<WithTypename<SubscribeTenantToLicensePackPayload>> }, MutationSubscribeTenantToLicensePackArgs>,
    unblockResident?: GraphCacheUpdateResolver<{ unblockResident: Maybe<WithTypename<UnblockResidentPayload>> }, MutationUnblockResidentArgs>,
    unpinTodo?: GraphCacheUpdateResolver<{ unpinTodo: Maybe<WithTypename<UnpinTodoPayload>> }, MutationUnpinTodoArgs>,
    updateLocation?: GraphCacheUpdateResolver<{ updateLocation: Maybe<WithTypename<UpdateLocationPayload>> }, MutationUpdateLocationArgs>,
    updateProfile?: GraphCacheUpdateResolver<{ updateProfile: Maybe<WithTypename<UpdateProfilePayload>> }, MutationUpdateProfileArgs>,
    updateTodo?: GraphCacheUpdateResolver<{ updateTodo: Maybe<WithTypename<UpdateTodoPayload>> }, MutationUpdateTodoArgs>,
    updateTodoStatus?: GraphCacheUpdateResolver<{ updateTodoStatus: Maybe<WithTypename<UpdateTodoStatusPayload>> }, MutationUpdateTodoStatusArgs>,
    upsertMessage?: GraphCacheUpdateResolver<{ upsertMessage: Maybe<WithTypename<UpsertMessagePayload>> }, MutationUpsertMessageArgs>,
    upsertSubscriber?: GraphCacheUpdateResolver<{ upsertSubscriber: Maybe<WithTypename<UpsertSubscriberPayload>> }, MutationUpsertSubscriberArgs>,
    upsertTopic?: GraphCacheUpdateResolver<{ upsertTopic: Maybe<WithTypename<UpsertTopicPayload>> }, MutationUpsertTopicArgs>
  },
  Subscription?: {
    topicMessage?: GraphCacheUpdateResolver<{ topicMessage: Maybe<WithTypename<TopicMessageSubscriptionPayload>> }, SubscriptionTopicMessageArgs>
  },
};

export type GraphCacheConfig = Parameters<typeof offlineExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};