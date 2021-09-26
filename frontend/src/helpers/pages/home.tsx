import { APP_CONSTANT } from "../../config";
import { RepoList } from "../../types";

//Function that sorts an array of objects by most recent date.
export const sortMostRecent = (a: RepoList[]) =>
    a.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));

export const organisationNotFound = (organisationName: string) => {
    return `Could not find any organisations with the name "${organisationName}". Please check the spelling and try again.`;
};

export const getLastSearchedOrg = () => localStorage.getItem(APP_CONSTANT.ORG_KEY);

export const saveOrgInLocalStorage = (org: string) =>
    localStorage.setItem(APP_CONSTANT.ORG_KEY, org);

//Function used to filter an array for by object keys
export const searchRepos = (val: RepoList[], searchVal: string) => {
    return val.filter((repo) => repo.name.toLowerCase().search(searchVal.toLowerCase()) !== -1);
};
