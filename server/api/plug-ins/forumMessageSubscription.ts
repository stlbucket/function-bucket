import { makeExtendSchemaPlugin, gql } from "postgraphile/utils";
import { context, lambda, listen } from "postgraphile/grafast";
import { jsonParse } from "postgraphile/@dataplan/json";

const ForumMessageSubscriptionPlugin = makeExtendSchemaPlugin((build) => {
  const { messages } = build.input.pgRegistry.pgResources;
  return {
    typeDefs: gql`
      extend type Subscription {
        forumMessage(forumId: Int!): ForumMessageSubscriptionPayload
      }

      type ForumMessageSubscriptionPayload {
        event: String
        message: Message
      }
    `,
    plans: {
      Subscription: {
        forumMessage: {
          subscribePlan(_$root, args) {
            const $pgSubscriber = context().get("pgSubscriber");
            const $forumId = args.get("forumId");
            const $topic = lambda($forumId, (id) => `forum:${id}:message`);
            return listen($pgSubscriber, $topic, jsonParse);
          },
          plan($event) {
            return $event;
          },
        },
      },
      ForumMessageSubscriptionPayload: {
        event($event) {
          return $event.get("event");
        },
        message($event) {
          const $id = $event.get("id");
          return messages.get({ id: $id });
        },
      },
    },
  };
});

export default ForumMessageSubscriptionPlugin