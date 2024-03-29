import { Avatar } from "grommet";

interface Iprops {
    url: string;
}

//This component is used to display a users avatar.

const UserAvatar = ({ url }: Iprops) => {
    if (url) {
        return <Avatar src={url} />;
    }

    return <Avatar background="brand"></Avatar>;
};

export default UserAvatar;
