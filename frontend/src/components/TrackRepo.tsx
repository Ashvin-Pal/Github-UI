import { useState, useEffect } from "react";
import { Button } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import { useFetch } from "../hooks";
import { API, buildApiUrl } from "../config";
import ErrorMsg from "./ErrorMsg";
import { fetcherDelete, fetcherPut, tryThis } from "../helpers";

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
interface iProps {
    nodeId: string;
    owner: string;
    name: string;
}

const TrackRepo = ({ nodeId, owner, name }: iProps) => {
    const url = buildApiUrl(API.REPO, { nodeId });
    const { data, loading, error }: Response = useFetch({}, url);
    const [tracked, setTracked] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (data?.nodeId) setTracked(true);
    }, [data]);

    //Saves a repo that a user wants to track in the database
    const saveRepo = async () => {
        const repoDetails = { nodeId, owner, name };
        setDisable(true);
        const [result, putError] = await tryThis(fetcherPut(url, repoDetails));
        setTracked(true);
        setDisable(false);
    };

    //Deletes a tracked repo for the database
    const deleteRepo = async () => {
        setDisable(true);
        const [result, putError] = await tryThis(fetcherDelete(url));
        setTracked(false);
        setDisable(false);
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
