import { Box, Heading } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import {useFetch} from "../hooks";
import { Commiter } from "../types/Commits";
import CommitAuthor from "./CommitAuthor";
import { API, buildUrl } from "../config";
import ErrorMsg from "./ErrorMsg";

//This component makes an api call to the most recent commits to
//a repository. it renders a list of it. Only the 5 most recent
//commits is displayed.

interface IProps {
    org: string;
    repoName: string;
}

interface Response {
    data: Commiter[];
    loading?: boolean;
    error?: boolean;
}

const Commits = ({ org, repoName }: IProps) => {
    const url = buildUrl(API.COMMITS, { org, repoName });
    const { data, loading, error }: Response = useFetch([], url);

    return loading ? (
        <CirclesToRhombusesSpinner color="brand" />
    ) : error ? (
        <ErrorMsg />
    ) : (
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
