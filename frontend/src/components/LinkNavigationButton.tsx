import { Button, Box } from "grommet";
import { Previous } from "grommet-icons";
import { Link } from "react-router-dom";

//This component can beused for a back button. You can
//pass in a prop with the link to navigate to.

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
