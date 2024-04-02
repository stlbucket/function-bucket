import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface LocLocation {
  id: Generated<string>;
  tenantId: string;
  residentId: string;
  name: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  lat: string | null;
  lon: string | null;
}

export interface LocLocResident {
  residentId: string;
  tenantId: string;
  displayName: string;
}

export interface LocLocTenant {
  tenantId: string;
  name: string;
}

export interface DB {
  "loc.location": LocLocation;
  "loc.locResident": LocLocResident;
  "loc.locTenant": LocLocTenant;
}
