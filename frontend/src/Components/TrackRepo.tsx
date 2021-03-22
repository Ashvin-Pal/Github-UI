import * as React from "react";
import { Button } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import useFetch from "../hooks/useFetch";
import { API, buildUrl } from "../config";
import ErrorMsg from "./ErrorMsg";

//This component is used to a track repo. It send data to
//the database. It saves data of a specific repository
//to the database and also deletes if its already save in
//the database.

interface Response {
    data: {
        nodeId: string;
        owner: string;
        name: string;
    };
    loading: boolean;
    error: boolean;
}
interface IProps {
    nodeId: string;
    owner: string;
    name: string;
}

const TrackRepo = ({ nodeId, owner, name }: IProps) => {
    const url = buildUrl(API.REPO, {
        nodeId,
    });
    const { data, loading, error }: Response = useFetch({}, url, false);
    const [tracked, setTracked] = React.useState(false);
    const [disable, setDisable] = React.useState(false);

    React.useEffect(() => {
        if (data?.nodeId) {
            setTracked(true);
        }
    }, [data]);

    //Saves a repo that a user wants to track in the database
    const saveRepo = async () => {
        const repoDetails = {
            nodeId,
            owner,
            name,
        };
        setDisable(true);
        const headers = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(repoDetails),
        };
        try {
            const data = await (await fetch(url, headers)).json();
            setTracked(true);
            setDisable(false);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };

    //Deletes a tracked repo for the database
    const deleteRepo = async () => {
        const headers = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        setDisable(true);
        try {
            const data = await (await fetch(url, headers)).json();
            setTracked(false);
            setDisable(false);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };

    if (loading) {
        return <CirclesToRhombusesSpinner color="black" />;
    }

    if (error) {
        return <ErrorMsg />;
    }

    if (tracked) {
        return (
            <Button
                primary
                label={"Unfollow Repository"}
                color={"Brand"}
                onClick={deleteRepo}
                disabled={disable}
            />
        );
    }

    return (
        <Button
            primary
            label={"Follow Repository"}
            color={"black"}
            onClick={saveRepo}
            disabled={disable}
        />
    );
};

export default TrackRepo;
