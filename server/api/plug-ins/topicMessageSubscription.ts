import { makeExtendSchemaPlugin, gql } from "graphile-utils";
import { context, lambda, listen } from "postgraphile/grafast";
import { jsonParse } from "postgraphile/@dataplan/json";

const TopicMessageSubscriptionPlugin = makeExtendSchemaPlugin((build) => {
  const { message, topic, currentProfileClaims } = build.input.pgRegistry.pgResources;
  return {
    typeDefs: gql`
      extend type Subscription {
        topicMessage(topicId: UUID!): TopicMessageSubscriptionPayload,
      }

      type TopicMessageSubscriptionPayload {
        event: String
        message: Message
        messageId: UUID
      }
    `,
    plans: {
      Subscription: {
        topicMessage: {
          subscribePlan(_$root, args) {
            const $pgSubscriber = context().get("pgSubscriber");
            const $topicId = args.get("topicId");
            const $topic = lambda($topicId, (id) => `topic:${id}:message`);
            return listen($pgSubscriber, $topic, jsonParse);
          },
          plan($event) {
            return $event;
          },
        },
      },
      TopicMessageSubscriptionPayload: {
        event($event) {
          return $event.get("event");
        },
        message($event) {
          const $id = $event.get("id");
          return message.get({ id: $id });
        },
        messageId($event) {
          const $msgId = $event.get("id");
          return $msgId;
        },
      },
    },
  };
});

export default TopicMessageSubscriptionPlugin
