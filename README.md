# Github interview exercise

## Installation

1. Run `npm install` in the frontend folder.
2. In the frontend folder, once you have completed step 1 succesfully, run `npm run build`.
3. In the backend folder run `npm install`.
4. In the backend folder, once you have completed set 3 successfully, run `npm start`.
5. Go to your brower and visit this url `http://localhost:9001/`.

## Architecture

### Frontend

-   React app bootstrapped with create-react-app with default typescript template.
-   Used styled-components based on Grommet https://github.com/grommet/grommet-starter-new-app
-   Used Typescript for the frontend.

### Backend

-   Used NodeJS for the backend.
-   Used express for the server.
-   Used lowdb as the database.
-   Used Typescript for the backend.

### Description

This project allows a user to monitor an Organisation's repositories in a beautiful web app.
The web app has two views. The first view is the main page where a user can set which
organization he/she would like to view repositories from. The second view allows a user to
see more a more detailed view of a particular repository. A user can follow and unfollow
a repository. This information is stored in the database. The db.json folder stores all the
tracked repositories.
