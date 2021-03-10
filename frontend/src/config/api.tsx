import { compile } from "path-to-regexp";

const API = {
    REPO: "/api/favorites/:nodeId",
    COMMITS: "/repos/:org/:repoName/commits",
    ORG: "/orgs/:org/repos",
    REPO_DETAIL: "/repos/:org/:repoName",
    CONTRIBUTORS: "/repos/:org/:repoName/contributors",
    LANGUAGES: "/repos/:org/:repoName/languages",
};

/**

 * remove empty query params from url and sanitizes special characters
 * @param {String} apiUrl in pathToRegexp format
 * @param {Object} params key value pairs to build queryString
 */
export const buildUrl = (apiUrl: string, params: object = {}) => {
    const [endpoint, queryString = ""] = compile(apiUrl, { encode: encodeURIComponent })(
        params
    ).split("?");

    return `${endpoint}${queryString && "?"}${queryString
        .split("&")
        .filter((query) => query.includes("="))
        .join("&")}`;
};

export const baseUrl = "https://api.github.com";

export default API;
