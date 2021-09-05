import { buildUrl } from "./api";

export const APP_ROUTE = {
    HOME: "/",
    REPO_DETAIL: "/:org/:repoName",
};

/**
 * Builds url for the backend server
 * @param path in pathToRegexp format
 * @param params key value pairs to build url
 * @param query query params in object format eg. {id : 1234}
 * @returns a complete url.
 */
export const buildRoute = (path: string, params = {}, query = {}) =>
    buildUrl("", path, params, query);
