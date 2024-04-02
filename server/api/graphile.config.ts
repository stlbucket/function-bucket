// Only needed for TypeScript types support
import "postgraphile";
import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";
import { PostGraphileAmberPreset as amber} from "postgraphile/presets/amber";
// Use the 'pg' module to connect to the database
import { makePgService } from "postgraphile/adaptors/pg";
import { makeV4Preset } from "postgraphile/presets/v4";
import { isSafeError } from "postgraphile/grafast";
import { GraphQLError } from "postgraphile/graphql";
import TopicMessageSubscriptionPlugin from "./plug-ins/topicMessageSubscription.js";
import ForumMessageSubscriptionPlugin from "./plug-ins/forumMessageSubscription.js";
// import { ForumMessageSubscriptionPlugin } from "./plug-ins/forumMessageSubscription.js";

const preset: GraphileConfig.Preset = {
  extends: [
    amber,
    makeV4Preset({
      simpleCollections: "both",
      disableDefaultMutations: true,
      dynamicJson: true
    }),
    PgSimplifyInflectionPreset,
    /* Add more presets here */
  ],

  plugins: [
    TopicMessageSubscriptionPlugin,
    ForumMessageSubscriptionPlugin
  ],

  inflection: {
    /* options for the inflection system */
  },
  pgServices: [
    /* list of PG database configurations, e.g.: */
    makePgService({
      // Database connection string:
      connectionString: process.env.SUPABASE_URI || 'postgresql://postgres:postgres@localhost:54322/postgres',

      // List of database schemas to expose:
      schemas: (process.env.GRAPHQL_SCHEMAS || 'public').split(','),

      // Enable LISTEN/NOTIFY:
      pubsub: true,
    }),
  ],
  gather: {
    /* options for the gather phase */
  },
  schema: {
    /* options for the schema build phase */
  },
  grafast: {
    explain: true,  
    /* options for Grafast, including setting GraphQL context*/
    context: async (requestContext, args) => {
      // this is where user session data set in 
      // server/middleware/auth is used to pass into the query context
      const session = requestContext.h3v1?.event.context.session
      if (session === 'INVALID SESSION') {
        throw new Error(session)
      }
      const user = session?.user
      const claims = requestContext.h3v1?.event.context.claims
      const GRAPHILE_DEBUG_LOG = useRuntimeConfig().GRAPHILE_DEBUG_LOG

      if (GRAPHILE_DEBUG_LOG) {
        console.log('GRAPHILE REQUEST......................', {
          user,
          claims
        })
      }
      const jwtClaims = JSON.stringify({
        ...user,
        user_metadata: claims
      })

      const additionalSettings = {
        role: user?.aud || 'anon',
        'request.jwt.claim.sub': user?.id,
        'request.jwt.claim.aud': user?.aud,
        'request.jwt.claim.email': user?.email,
        'request.jwt.claim': jwtClaims
      }
      return {
        pgSettings: {
          ...args.contextValue?.pgSettings,
          ...additionalSettings
        }
      }
    }
  },
  grafserv: {
    graphiql: true,
    graphqlPath: "/api/graphql",
    graphiqlPath: "/api/graphiql",
    graphiqlOnGraphQLGET: true,
    graphqlOverGET: false,
    websockets: true,

    maskError(error) {
      // console.error("------------------------------ maskError was called with the following error:");
      // console.error(error);
      console.error("------------------------------ ERROR ---------------");
      console.error(error.originalError);
      console.error("------------------------------ END ERROR -----------");

      // You probably don't want this level of debugging in production as the
      // results are sent to the client and it may leak implementation details
      // you wish to keep private.
      //
      //   return error;

      // Here's a more careful implementation:

      if (error.originalError instanceof GraphQLError) {
        return error
        // return {
        //   originalError: error,
        //   path: error.path
        // }
      } else if (
        error.originalError != null &&
        isSafeError(error.originalError)
      ) {
        return error
        // return new GraphQLError(
        //   error.originalError.message,
        //   error.nodes,
        //   error.source,
        //   error.positions,
        //   error.path,
        //   error.originalError,
        //   error.originalError.extensions ?? null,
        // );
      } else {
        // Hash so that similar errors can easily be grouped
        // const hash = sha1(String(error));
        // console.error(`------------------------------ Masked GraphQL error (hash: '${hash}')`, error);
        return error
        // return new GraphQLError(
        //   `An error occurred (logged with hash: '${hash}')`,
        //   error.nodes,
        //   error.source,
        //   error.positions,
        //   error.path,
        //   error.originalError,
        //   // Deliberately wipe the extensions
        //   {},
        // );
      }
    }
  }
};

export default preset;

function sha1(arg0: string) {
  throw new Error("Function not implemented.");
}
