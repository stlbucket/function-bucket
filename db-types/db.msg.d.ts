import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type MsgMessageStatus = "deleted" | "draft" | "sent";

export type MsgSubscriberStatus = "active" | "blocked" | "inactive";

export type MsgTopicStatus = "closed" | "locked" | "open";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface MsgMessage {
  id: Generated<string>;
  tenantId: string;
  createdAt: Generated<Timestamp>;
  status: Generated<MsgMessageStatus>;
  topicId: string;
  content: string;
  postedByMsgResidentId: string;
  tags: Generated<string[]>;
}

export interface MsgMsgResident {
  residentId: string;
  tenantId: string;
  displayName: string;
}

export interface MsgMsgTenant {
  tenantId: string;
  name: string;
}

export interface MsgSubscriber {
  id: Generated<string>;
  tenantId: string;
  createdAt: Generated<Timestamp>;
  status: Generated<MsgSubscriberStatus>;
  topicId: string;
  msgResidentId: string;
  lastRead: Generated<Timestamp>;
}

export interface MsgTopic {
  id: Generated<string>;
  tenantId: string;
  createdAt: Generated<Timestamp>;
  name: string;
  identifier: string | null;
  tags: Generated<string[]>;
  status: Generated<MsgTopicStatus>;
}

export interface DB {
  "msg.message": MsgMessage;
  "msg.msgResident": MsgMsgResident;
  "msg.msgTenant": MsgMsgTenant;
  "msg.subscriber": MsgSubscriber;
  "msg.topic": MsgTopic;
}
