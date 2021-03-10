import { Button, Box } from "grommet";
import { Previous } from "grommet-icons";
import { Link } from "react-router-dom";

interface IProps {
    linkTo: string;
}

const LinkNavigationButton = ({ linkTo }: IProps) => {
    return (
        <Box alignSelf="start" animation="fadeIn">
            <Link to={linkTo}>
                <Button icon={<Previous color="plain" size="large" />} hoverIndicator />
            </Link>
        </Box>
    );
};

export default LinkNavigationButton;
