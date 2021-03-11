import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import useFetch from "../hooks/useFetch";
import { API, buildUrl } from "../config";
import { Card, CardHeader, CardBody, Heading } from "grommet";
import ErrorMsg from "./ErrorMsg";

//This component display the top 3 languages used by a repository.
//It makes an api call to get the data.

interface IProps {
    org: string;
    repoName: string;
}

interface Response {
    data: Language;
    loading: boolean;
    error: boolean;
}

interface Language {
    [key: string]: { prop: number };
}

const Languages = ({ org, repoName }: IProps) => {
    const url = buildUrl(API.LANGUAGES, { org, repoName });
    const { data, loading, error }: Response = useFetch({}, url);
    return loading ? (
        <CirclesToRhombusesSpinner color="brand" />
    ) : error ? (
        <ErrorMsg />
    ) : (
        <Card pad="small" width="small" height="small" background="light-1" elevation="large">
            <CardHeader alignSelf="start" pad="xsmall">
                <Heading level="4" margin="none">
                    Top Languages
                </Heading>
            </CardHeader>
            <CardBody wrap alignSelf="start" alignContent="start" pad="xsmall">
                <ul>
                    {Object.keys(data)
                        .splice(0, 3)
                        .map((lan: string) => (
                            <li key={lan}>{lan}</li>
                        ))}
                </ul>
            </CardBody>
        </Card>
    );
};

export default Languages;
