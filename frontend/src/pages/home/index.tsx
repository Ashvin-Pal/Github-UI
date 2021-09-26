import { useEffect, useState } from "react";
import { Box, Text } from "grommet";
import { motion } from "framer-motion";

import { useFetch } from "../../hooks";
import { RepoList } from "../../types/RepoList";
import RepoSummary from "../../components/RepoSummary";
import SearchOrg from "../../components/SearchOrg";
import LoadingIndicator from "../../components/LoadingIndicator";
import { API_GITHUB, APP_CONSTANT, builGithubUrl } from "../../config";
import SearchRepo from "../../components/SearchRepo";
import { Animate } from "../../components/Animations";
import {
    getLastSearchedOrg,
    organisationNotFound,
    saveOrgInLocalStorage,
    searchRepos,
    sortMostRecent,
} from "../../helpers";

interface Response {
    data: RepoList[];
    loading: boolean;
    error: boolean;
}

const OrganisationRepos = () => {
    //Try to get savedOrg from storage If not found, used facebook on default.
    const [org, setOrg] = useState(getLastSearchedOrg() || APP_CONSTANT.DEFAULT_ORG);
    const [search, setSearch] = useState("");

    const url = builGithubUrl(API_GITHUB.ORG, { org });
    const { data, loading, error }: Response = useFetch([], url);

    const [repos, setRepos] = useState<RepoList[]>([]);

    useEffect(() => {
        if (data && data.length) setRepos([...sortMostRecent(data)]);
    }, [data]);

    //Every time org changes, the new org state is saved in local storage
    useEffect(() => {
        saveOrgInLocalStorage(org);
    }, [org]);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <motion.div
            className="thumbnails"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.01 } } }}
        >
            <Box overflow="hidden" alignContent="center" pad="medium">
                <Animate>
                    <Box overflow="hidden" alignContent="center" pad="medium">
                        <SearchOrg org={org} setOrg={setOrg} title="Organisation name" />
                    </Box>
                </Animate>
                <Box animation="slideUp" alignSelf="center">
                    {error ? (
                        <Text>{organisationNotFound(org)}</Text>
                    ) : (
                        <Box gap="medium">
                            <Animate>
                                <SearchRepo setSearch={setSearch} />
                            </Animate>

                            {searchRepos(repos, search).map((repo) => (
                                <Animate key={repo.node_id}>
                                    <RepoSummary {...repo} />
                                </Animate>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </motion.div>
    );
};

export default OrganisationRepos;
