import { Avatar } from "grommet";

interface Iprops {
    url: string;
}

const UserAvatar = ({ url }: Iprops) => {
    if (url) {
        return <Avatar src={url} />;
    } else {
        return <Avatar background="brand"></Avatar>;
    }
};

export default UserAvatar;
