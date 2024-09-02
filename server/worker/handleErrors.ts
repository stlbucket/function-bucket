import { GraphQLError } from "graphql";
import { camelCase } from "lodash";
import { doQuery } from "./pg-client.js";

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const ERROR_PROPERTIES_TO_EXPOSE =
  isDev || isTest
    ? [
        "code",
        "severity",
        "detail",
        "hint",
        "positon",
        "internalPosition",
        "internalQuery",
        "where",
        "schema",
        "table",
        "column",
        "dataType",
        "constraint",
      ]
    : ["code"];

// This would be better as a macro...
const pluck = (err: any): { [key: string]: any } => {
  return ERROR_PROPERTIES_TO_EXPOSE.reduce((memo, key) => {
    const value =
      key === "code"
        ? // err.errcode is equivalent to err.code; replace it
          err.code || err.errcode
        : err[key];
    if (value != null) {
      memo[key] = value;
    }
    return memo;
  }, {});
};

/**
 * This map allows you to override the error object output to users from
 * database errors.
 *
 * See `docs/error_codes.md` for a list of error codes we use internally.
 *
 * See https://www.postgresql.org/docs/current/errcodes-appendix.html for a
 * list of error codes that PostgreSQL produces.
 */
export const ERROR_MESSAGE_OVERRIDES: { [code: string]: typeof pluck } = {
  "42501": (err) => ({
    ...pluck(err),
    message: "Permission denied (by RLS)",
  }),
  "23505": (err) => ({
    ...pluck(err),
    message: "Conflict occurred",
    fields: conflictFieldsFromError(err),
    code: "NUNIQ",
  }),
};

function conflictFieldsFromError(err: any) {
  const { table, constraint } = err;
  // TODO: extract a list of constraints from the DB
  if (constraint && table) {
    const PREFIX = `${table}_`;
    const SUFFIX = `_key`;
    if (constraint.startsWith(PREFIX) && constraint.endsWith(SUFFIX)) {
      const maybeColumnNames = constraint.substr(
        PREFIX.length,
        constraint.length - PREFIX.length - SUFFIX.length
      );
      return [camelCase(maybeColumnNames)];
    }
  }
  return undefined;
}

export default function handleErrors(
  errors: readonly GraphQLError[],
  req: any
): Array<any> {
  // console.log('ALL ERRORS', req.user, errors)
  return errors.map((error) => {
    if (req.user) {
      console.log('req.user.appUserId', req.user.appUserId)
      console.log('req.user.actualAppUserId', req.user.actualAppUserId)  
      console.log('req.user.appRole', req.user.appRole)  
      console.log('req.body.operationName', req.body.operationName)
      console.log('req.body.variables', req.body.variables)
    }

    // TODO: possible push this to another datastore, but for now it's right in the app
    const { message: rawMessage, locations, path, originalError } = error;
    // console.log('rawMessage', rawMessage)
    // console.log('locations', locations)
    // console.log('path', path)
    // console.log('originalError', originalError)

    if (error.message === 'SESSION EXPIRED') {
      console.log('ERROR', errors)      
      return {
        message: error.message,
        locations,
        path
      }
    } else if (req.user) {
      doQuery(`select app_fn.report_app_errors(
        array[
          row(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )::app_fn.error_report_info
        ]::app_fn.error_report_info[]
      )`,
      [
        req.user.appUserId,
        req.user.actualAppUserId,
        '',
        req.body.operationName,
        1,
        error.message,
        req.body.variables
      ])
      const code = originalError ? originalError["code"] : null;
      const localPluck = ERROR_MESSAGE_OVERRIDES[code] || pluck;
      const exception = localPluck(originalError || error);
      return {
        message: exception.message || rawMessage,
        locations,
        path,
        extensions: {
          exception,
        },
      }
    } else {
      return {
        message: rawMessage
      }
    }
  })
}
