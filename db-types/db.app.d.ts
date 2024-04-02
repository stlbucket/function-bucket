import type { ColumnType } from "kysely";

export type AppExpirationIntervalType = "day" | "explicit" | "month" | "none" | "quarter" | "week" | "year";

export type AppLicenseStatus = "active" | "expired" | "inactive";

export type AppLicenseTypeAssignmentScope = "admin" | "all" | "none" | "superadmin" | "support" | "user";

export type AppProfileStatus = "active" | "blocked" | "inactive";

export type AppResidentStatus = "active" | "blocked_individual" | "blocked_tenant" | "declined" | "inactive" | "invited" | "supporting";

export type AppResidentType = "guest" | "home" | "support";

export type AppTenantStatus = "active" | "inactive" | "paused";

export type AppTenantSubscriptionStatus = "active" | "inactive";

export type AppTenantType = "anchor" | "customer" | "demo" | "test" | "trial";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AppApplication {
  key: string;
  name: string;
}

export interface AppAppSettings {
  key: string;
  applicationKey: string;
  displayName: string;
  value: string;
}

export interface AppLicense {
  id: Generated<string>;
  tenantId: string;
  residentId: string;
  tenantSubscriptionId: string;
  licenseTypeKey: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  expiresAt: Timestamp | null;
  status: Generated<AppLicenseStatus>;
}

export interface AppLicensePack {
  key: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  displayName: string;
  description: string;
  autoSubscribe: Generated<boolean>;
}

export interface AppLicensePackLicenseType {
  id: Generated<string>;
  licensePackKey: string;
  licenseTypeKey: string;
  numberOfLicenses: Generated<number>;
  expirationIntervalType: Generated<AppExpirationIntervalType>;
  expirationIntervalMultiplier: Generated<number>;
}

export interface AppLicenseType {
  key: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  applicationKey: string;
  displayName: string;
  assignmentScope: AppLicenseTypeAssignmentScope;
}

export interface AppLicenseTypePermission {
  licenseTypeKey: string;
  permissionKey: string;
}

export interface AppPermission {
  key: string;
}

export interface AppProfile {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  email: string;
  identifier: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  displayName: string | null;
  avatarKey: string | null;
  status: Generated<AppProfileStatus>;
  isPublic: Generated<boolean>;
  fullName: Generated<string | null>;
}

export interface AppResident {
  id: Generated<string>;
  profileId: string | null;
  invitedByProfileId: string | null;
  invitedByDisplayName: string | null;
  tenantId: string;
  tenantName: string;
  email: string;
  displayName: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  status: Generated<AppResidentStatus>;
  type: AppResidentType;
}

export interface AppTenant {
  id: Generated<string>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  identifier: string | null;
  name: string;
  type: Generated<AppTenantType>;
  status: Generated<AppTenantStatus>;
}

export interface AppTenantSubscription {
  id: Generated<string>;
  tenantId: string;
  licensePackKey: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  status: Generated<AppTenantSubscriptionStatus>;
}

export interface DB {
  "app.application": AppApplication;
  "app.appSettings": AppAppSettings;
  "app.license": AppLicense;
  "app.licensePack": AppLicensePack;
  "app.licensePackLicenseType": AppLicensePackLicenseType;
  "app.licenseType": AppLicenseType;
  "app.licenseTypePermission": AppLicenseTypePermission;
  "app.permission": AppPermission;
  "app.profile": AppProfile;
  "app.resident": AppResident;
  "app.tenant": AppTenant;
  "app.tenantSubscription": AppTenantSubscription;
}
