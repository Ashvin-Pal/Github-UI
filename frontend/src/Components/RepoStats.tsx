import { Text, Box } from "grommet";
import { Star, Bug, Network, Code } from "grommet-icons";

//This components takes porps from a parent component
//and display the repo statistics.

interface IProps {
    language: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}
const RepoStats = ({ language, stargazers_count, forks_count, open_issues_count }: IProps) => {
    const textIconMargin = { left: "xsmall" };

    return (
        <Box direction="row" pad="small" align="center">
            <Box direction="row" margin={{ right: "medium" }} align="center">
                <Code />
                <Text margin={textIconMargin}>{language}</Text>
            </Box>
            <Box direction="row" margin={{ right: "medium" }} align="center">
                <Star />
                <Text margin={textIconMargin}>{stargazers_count}</Text>
            </Box>
            <Box direction="row" margin={{ right: "medium" }} align="center">
                <Network />
                <Text margin={textIconMargin}>{forks_count}</Text>
            </Box>
            <Box direction="row" margin={{ right: "medium" }} align="center">
                <Bug />
                <Text margin={textIconMargin}>{open_issues_count}</Text>
            </Box>
        </Box>
    );
};

export default RepoStats;
