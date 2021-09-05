import { Card, CardHeader, CardBody, Heading } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import { useFetch } from "../hooks";
import { API_GITHUB, builGithubUrl } from "../config";
import { Contributor } from "../types/Contributors";
import ErrorMsg from "./ErrorMsg";
import UserAvatar from "./UserAvatar";

//This component makes an api call to the most recent contributors to
//a repository. it renders a list of it. Only the 5 most recent
//contribution is display.

interface IProps {
    org: string;
    repoName: string;
}

interface Response {
    data: Contributor[];
    loading: boolean;
    error: boolean;
}

const Contributors = ({ org, repoName }: IProps) => {
    const url = builGithubUrl(API_GITHUB.CONTRIBUTORS, { org, repoName });
    const { data, loading, error }: Response = useFetch([], url);

    if (loading) {
        return <CirclesToRhombusesSpinner color="brand" />;
    }

    if (error) {
        return <ErrorMsg />;
    }

    return (
        <Card pad="small" width="small" height="small" background="light-1" elevation="large">
            <CardHeader alignSelf="start" pad="xsmall">
                <Heading level="4" margin="none">
                    Contributors
                </Heading>
            </CardHeader>
            <CardBody direction="row" wrap alignSelf="center" alignContent="center" pad="small">
                {data.slice(0, 6).map((contributer) => (
                    <UserAvatar key={contributer.node_id} url={contributer.avatar_url} />
                ))}
            </CardBody>
        </Card>
    );
};

export default Contributors;
