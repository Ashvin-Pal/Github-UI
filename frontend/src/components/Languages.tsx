import { CirclesToRhombusesSpinner } from "react-epic-spinners";
import { Card, CardHeader, CardBody, Heading } from "grommet";

import { useFetch } from "../hooks";
import { API_GITHUB, builGithubUrl } from "../config";
import ErrorMsg from "./ErrorMsg";
import { motion } from "framer-motion";

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

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const Languages = ({ org, repoName }: IProps) => {
    const url = builGithubUrl(API_GITHUB.LANGUAGES, { org, repoName });
    const { data, loading, error }: Response = useFetch({}, url);

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
                    Top Languages
                </Heading>
            </CardHeader>
            <CardBody wrap alignSelf="start" alignContent="start" pad="xsmall">
                <motion.ul variants={container} initial="hidden" animate="visible">
                    {Object.keys(data)
                        .splice(0, 3)
                        .map((lan: string) => (
                            <motion.li key={lan} variants={item}>
                                {lan}
                            </motion.li>
                        ))}
                </motion.ul>
            </CardBody>
        </Card>
    );
};

export default Languages;
