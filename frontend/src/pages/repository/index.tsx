import { Heading, Card, CardHeader, CardBody, CardFooter, Text, Box, Anchor } from "grommet";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { API_GITHUB, APP_ROUTE, builGithubUrl } from "../../config";
import { Repo } from "../../types/Repo";
import { useFetch } from "../../hooks";
import LoadingIndicator from "../../components/LoadingIndicator";
import TrackRepo from "../../components/TrackRepo";
import Contributors from "../../components/Contributors";
import Languages from "../../components/Languages";
import Commits from "../../components/Commits";
import UserAvatar from "../../components/UserAvatar";
import LinkNavigationButton from "../../components/LinkNavigationButton";
import RepoStats from "../../components/RepoStats";
import ErrorMsg from "../../components/ErrorMsg";
import { dataFormatter } from "../../helpers";

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
    const url = builGithubUrl(API_GITHUB.REPO_DETAIL, {
        org,
        repoName,
    });

    const { data: repo, loading, error }: Response = useFetch({}, url);

    const textMargin = { top: "medium", bottom: "medium" };

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorMsg />;
    }

    return (
        <Box align="center" animation="fadeIn">
            <LinkNavigationButton linkTo={APP_ROUTE.HOME} />
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
                        <Text>Updated on {dataFormatter(repo.updated_at)}</Text>
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
