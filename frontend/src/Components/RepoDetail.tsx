import { Heading, Card, CardHeader, CardBody, CardFooter, Text, Box, Anchor } from "grommet";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { API, buildUrl } from "../config";
import { Repo } from "../types/Repo";
import useFetch from "../hooks/useFetch";
import LoadingIndicator from "./LoadingIndicator";
import TrackRepo from "./TrackRepo";
import Contributors from "./Contributors";
import Languages from "./Languages";
import Commits from "./Commits";
import UserAvatar from "./UserAvatar";
import LinkNavigationButton from "./LinkNavigationButton";
import RepoStats from "./RepoStats";
import ErrorMsg from "./ErrorMsg";

//This component display the a repository in detail.
//It renders other components to display data.
//It makes an api call to get data for a specific repository
//based on the url parameters.

interface Response {
    data: Repo;
    loading: boolean;
    error: boolean;
}

interface Urlparams {
    org: string;
    repoName: string;
}

const RepoDetail = () => {
    const { org, repoName } = useParams<Urlparams>();
    const url = buildUrl(API.REPO_DETAIL, {
        org,
        repoName,
    });
    const { data: repo, loading, error }: Response = useFetch({}, url);

    const textMargin = { top: "medium", bottom: "medium" };

    return loading ? (
        <LoadingIndicator />
    ) : error ? (
        <ErrorMsg />
    ) : (
        <Box align="center" animation="fadeIn">
            <LinkNavigationButton linkTo="/" />
            <Box direction="row" gap="small">
                <Box direction="column" gap="small">
                    <Contributors repoName={repo.name} org={repo.owner.login} />
                    <Languages repoName={repo.name} org={repo.owner.login} />
                </Box>
                <Card height="large" width="large" background="light-1" elevation="large">
                    <CardHeader
                        pad={{ top: "small", bottom: "none", left: "medium", right: "none" }}
                    >
                        <Heading level="2" margin="none">
                            {repo.name}
                        </Heading>
                        <Box pad={{ top: "xsmall", right: "medium" }}>
                            <UserAvatar url={repo.owner?.avatar_url} />
                        </Box>
                    </CardHeader>
                    <CardBody pad="medium">
                        <Text margin={textMargin}>{repo.description}</Text>
                        <Anchor
                            margin="small"
                            href={repo.html_url}
                            target="_blank"
                            label="See on github"
                        />
                        <Anchor
                            margin="small"
                            href={repo.homepage}
                            target="_blank"
                            label={repo.homepage}
                        />
                    </CardBody>
                    <CardFooter pad={{ horizontal: "medium" }} background="light-2">
                        <Text>Updated on {dayjs(repo.updated_at).format("DD/MM/YYYY")}</Text>
                        <RepoStats {...repo} />
                    </CardFooter>
                </Card>
                <Box alignContent="between" direction="column" width="medium">
                    <Box margin="large">
                        <TrackRepo
                            nodeId={repo.node_id}
                            name={repo.name}
                            owner={repo.owner.login}
                        />
                    </Box>
                    <Commits repoName={repo.name} org={repo.owner.login} />
                </Box>
            </Box>
        </Box>
    );
};

export default RepoDetail;
