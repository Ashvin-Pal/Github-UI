import { Button, Box } from "grommet";
import { Previous } from "grommet-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//This component can beused for a back button. You can
//pass in a prop with the link to navigate to.

interface IProps {
    linkTo: string;
}

const LinkNavigationButton = ({ linkTo }: IProps) => {
    return (
        <Box alignSelf="start" animation="fadeIn">
            <motion.div className="container" whileTap={{ scale: 0.5 }}>
                <Link to={linkTo}>
                    <Button icon={<Previous color="plain" size="large" />} />
                </Link>
            </motion.div>
        </Box>
    );
};

export default LinkNavigationButton;
