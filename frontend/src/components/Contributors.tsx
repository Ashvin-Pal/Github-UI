import { Card, CardHeader, CardBody, Heading } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";
import { motion } from "framer-motion";

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
                <motion.div
                    className="Contributors-Avatars"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {data.slice(0, 6).map((contributer) => (
                        <motion.div key={contributer.node_id} className="item" variants={item}>
                            <UserAvatar url={contributer.avatar_url} />
                        </motion.div>
                    ))}
                </motion.div>
            </CardBody>
        </Card>
    );
};

export default Contributors;
