import { Grommet, Heading, Main } from "grommet";

import AppBar from "./components/AppBar";
import Routes from "./routes";
import { APP_THEME } from "./config/theme";

//This is the main component. It display the app bar
//and changes the body based on the route navigated too.
//It navigates users to the main page and a repository
//detail page based on the route.

const App = () => {
    return (
        <Grommet theme={APP_THEME}>
            <AppBar>
                <Heading level="3" margin="none">
                    Github Repos
                </Heading>
            </AppBar>
            <Main margin="small" pad="medium" alignContent="center">
                <Routes />
            </Main>
        </Grommet>
    );
};

export default App;
