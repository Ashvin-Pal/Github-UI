import { Route } from "react-router-dom";

import Home from "../pages/home";
import RepoDetail from "../pages/repository";
import { APP_ROUTE } from "../config";

/**
 * This file lists all the routes within this SPA.
 * @returns
 */

const Routes = () => {
    return (
        <>
            <Route exact path={APP_ROUTE.HOME} render={() => <Home />} />
            <Route exact path={APP_ROUTE.REPO_DETAIL} render={() => <RepoDetail />} />
        </>
    );
};

export default Routes;
