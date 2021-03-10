import { Commiter } from "../types/Commits";
import UserAvatar from "./UserAvatar";
import { Card, Text } from "grommet";

const CommitAuthor = ({ commit, author }: Commiter) => {
    return (
        <Card pad="small" direction="row" alignContent="center">
            <UserAvatar url={author?.avatar_url} />
            <Text alignSelf="center" margin={{ left: "small" }} truncate>
                {commit.author.name}
            </Text>
        </Card>
    );
};

export default CommitAuthor;
