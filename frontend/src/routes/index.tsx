import { Route, Switch } from "react-router-dom";

import Home from "../pages/home";
import RepoDetail from "../pages/repository";
import { APP_ROUTE } from "../config";
import { AnimatePresence } from "framer-motion";

/**
 * This file lists all the routes within this SPA.
 */

const Routes = () => {
    return (
        <Route
            render={({ location }) => (
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path={APP_ROUTE.HOME} render={() => <Home />} />
                        <Route exact path={APP_ROUTE.REPO_DETAIL} render={() => <RepoDetail />} />
                    </Switch>
                </AnimatePresence>
            )}
        />
    );
};

export default Routes;
