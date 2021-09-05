import { Box, Heading } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import { useFetch } from "../hooks";
import { Commiter } from "../types/Commits";
import CommitAuthor from "./CommitAuthor";
import { API_GITHUB, builGithubUrl } from "../config";
import ErrorMsg from "./ErrorMsg";

//This component makes an api call to the most recent commits to
//a repository. it renders a list of it. Only the 5 most recent
//commits is displayed.

interface iProps {
    org: string;
    repoName: string;
}

interface Response {
    data: Commiter[];
    loading?: boolean;
    error?: boolean;
}

const Commits = ({ org, repoName }: iProps) => {
    const url = builGithubUrl(API_GITHUB.COMMITS, { org, repoName });
    const { data, loading, error }: Response = useFetch([], url);

    if (loading) return <CirclesToRhombusesSpinner color="brand" />;

    if (error) return <ErrorMsg />;

    return (
        <Box width="medium" gap="small">
            <Heading level="4" margin="none">
                Latest commits
            </Heading>
            {data.splice(0, 5).map((author) => (
                <CommitAuthor key={author.node_id} {...author} />
            ))}
        </Box>
    );
};

export default Commits;
