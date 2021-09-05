import { compile } from "path-to-regexp";

const GITHUB_BASE_URL = "https://api.github.com";

/**
 * API URI's for the backend server
 */
export const API = {
    REPO: "/api/favorites/:nodeId",
};

/**
 * API URI's for github api's
 */
export const API_GITHUB = {
    COMMITS: "/repos/:org/:repoName/commits",
    ORG: "/orgs/:org/repos",
    REPO_DETAIL: "/repos/:org/:repoName",
    CONTRIBUTORS: "/repos/:org/:repoName/contributors",
    LANGUAGES: "/repos/:org/:repoName/languages",
};

/**
 *  A genral url builder used to build url's.
 * @param apiUrl in pathToRegexp format
 * @param params key value pairs to build url
 * @param baseUrl the baseurl eg. http://localhost:3000.
 * @param query query params in object format eg. {id : 1234}
 * @returns a complete url.
 */
export const buildUrl = (baseUrl = "", path: string, params = {}, query = {}) => {
    return `${baseUrl}${compile(path, { encode: encodeURIComponent })(params)}${
        Object.keys(query).length ? "?" : ""
    }${new URLSearchParams(query).toString()}`;
};

/**
 * Builds url for the backend server
 * @param apiUrl in pathToRegexp format
 * @param params key value pairs to build url
 * @param query query params in object format eg. {id : 1234}
 * @returns a complete url.
 */
export const buildApiUrl = (path: string, params = {}, query = {}) =>
    buildUrl("", path, params, query);

/**
 * Builds url for github api's
 * @param apiUrl in pathToRegexp format
 * @param params key value pairs to build url
 * @param query query params in object format eg. {id : 1234}
 * @returns a complete url.
 */
export const builGithubUrl = (path: string, params = {}, query = {}) =>
    buildUrl(GITHUB_BASE_URL, path, params, query);
