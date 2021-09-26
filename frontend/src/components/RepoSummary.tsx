import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from "grommet";

import { RepoList } from "../types/RepoList";
import RepoStats from "./RepoStats";
import { buildRoute, APP_ROUTE } from "../config/routes";
import { dataFormatter } from "../helpers";

const RepoSummary = ({
    name,
    owner: { login },
    description,
    stargazers_count,
    forks_count,
    open_issues_count,
    language,
    updated_at,
}: RepoList) => {
    const repoUrl = buildRoute(APP_ROUTE.REPO_DETAIL, { org: login, repoName: name });
    //Styles
    const cardHeaderPad = { top: "small", bottom: "none", left: "medium", right: "none" };
    const removeLinkStyle = { textDecoration: "none", color: "inherit" };
    //This component display a summary of a repository.

    return (
        <Link to={repoUrl} style={removeLinkStyle}>
            <Card height="small" width="large" background="light-1" elevation="large">
                <CardHeader pad={cardHeaderPad}>
                    <Heading level="3" margin="none">
                        {name}
                    </Heading>
                </CardHeader>
                <CardBody pad="medium">{description}</CardBody>
                <CardFooter pad={{ horizontal: "small" }} background="light-2">
                    <Text>Updated {dataFormatter(updated_at)}</Text>
                    <RepoStats
                        forks_count={forks_count}
                        language={language}
                        open_issues_count={open_issues_count}
                        stargazers_count={stargazers_count}
                    />
                </CardFooter>
            </Card>
        </Link>
    );
};

export default RepoSummary;
