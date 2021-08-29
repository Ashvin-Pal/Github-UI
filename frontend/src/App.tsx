import { Route } from "react-router-dom";
import { Grommet, Heading, Main } from "grommet";

import OrganisationRepos from "./pages/home";
import RepoDetail from "./pages/repository";
import AppBar from "./Components/AppBar";
import { APP_THEME } from "./theme";

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
                <Route exact path="/" render={() => <OrganisationRepos />} />
                <Route exact path="/:org/:repoName" render={() => <RepoDetail />} />
            </Main>
        </Grommet>
    );
};

export default App;
