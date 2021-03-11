import RepoDetail from "./Components/RepoDetail";
import { Route } from "react-router-dom";
import OrganisationRepos from "./Components/OrganisationRepos";
import AppBar from "./Components/AppBar";
import { Grommet, Heading, Main } from "grommet";

//This is the main component. It display the app bar
//and changes the body based on the route navigated too.
//It navigates users to the main page and a repository
//detail page based on the route.

const theme = {
    global: {
        colors: {
            brand: "#000000",
        },
        font: {
            family: "Roboto",
            size: "18px",
            height: "20px",
        },
    },
};

const App = () => {
    return (
        <Grommet theme={theme}>
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
