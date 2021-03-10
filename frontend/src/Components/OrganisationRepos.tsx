import * as React from "react";
import { Box, Text } from "grommet";

import useFetch from "../hooks/useFetch";
import { RepoList } from "../types/RepoList";
import RepoSummary from "./RepoSummary";
import SearchOrg from "./SearchOrg";
import LoadingIndicator from "./LoadingIndicator";
import { API, buildUrl } from "../config";
import SearchRepo from "./SearchRepo";

interface Response {
    data: RepoList[];
    loading: boolean;
    error: boolean;
}

const OrganisationRepos = () => {
    //Try to get savedOrg from storage If not found, used facebook on default.
    const [org, setOrg] = React.useState(localStorage.getItem("savedOrg") || "facebook");
    const [search, setSearch] = React.useState("");

    const url = buildUrl(API.ORG, { org });

    const { data, loading, error }: Response = useFetch([], url);
    const errorMsg = `Could not find any organisations with the name "${org}". Please check the spelling and try again.`;

    //Every time org changes, the new org state is saved in local storage
    React.useEffect(() => {
        localStorage.setItem("savedOrg", org);
    }, [org]);

    //Function that sorts an array of objects by most recent date.
    const sortMostRecent = (a: RepoList[]) => {
        return a.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
    };

    //Function used to filter an array for by object keys
    const searchRepos = (val: RepoList[], searchVal: string) => {
        return val.filter((repo) => {
            if (repo.name.toLowerCase().search(searchVal.toLowerCase()) !== -1) {
                return repo;
            }
            return null;
        });
    };

    return loading ? (
        <LoadingIndicator />
    ) : (
        <Box overflow="hidden" alignContent="center" pad="medium">
            <SearchOrg org={org} setOrg={setOrg} title="Organisation name" />
            <Box animation="slideUp" alignSelf="center">
                {error ? (
                    <Text>{errorMsg}</Text>
                ) : (
                    <Box gap="medium">
                        <SearchRepo setSearch={setSearch} />
                        {searchRepos(sortMostRecent([...data]), search).map((repo) => (
                            <RepoSummary key={repo.node_id} {...repo} />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default OrganisationRepos;
