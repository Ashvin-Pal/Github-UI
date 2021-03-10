import { Box } from "grommet";

const AppBar = (props: any) => {
    return (
        <Box
            tag="header"
            direction="row"
            align="center"
            justify="between"
            background="brand"
            pad={{ left: "medium", right: "small", vertical: "small" }}
            elevation="large"
            style={{ zIndex: "1" }}
            {...props}
        />
    );
};

export default AppBar;
