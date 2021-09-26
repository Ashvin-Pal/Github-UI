import { useState, useEffect, useCallback } from "react";
import { Button } from "grommet";
import { CirclesToRhombusesSpinner } from "react-epic-spinners";

import { useFetch, useTrackRepo, useUntrackRepo } from "../hooks";
import { API, buildApiUrl } from "../config";
import ErrorMsg from "./ErrorMsg";
import { Repo } from "../types";

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

const TrackRepo = ({ node_id: nodeId, owner: { login }, name }: Repo) => {
    const url = buildApiUrl(API.REPO, { nodeId });
    const { data, error, loading }: Response = useFetch({}, url);

    const [tracked, setTracked] = useState(false);

    const handleTrackSucess = useCallback(() => setTracked(true), []);
    const handleUntrackSucess = useCallback(() => setTracked(false), []);

    const handleError = useCallback(() => setTracked(false), []);

    const [handleSave, isSaving] = useTrackRepo(handleTrackSucess, handleError);
    const [handleDelete, isDeleting] = useUntrackRepo(handleUntrackSucess, handleError);

    useEffect(() => {
        if (Object.keys(data).length) setTracked(true);
    }, [data]);

    //Saves a repo that a user wants to track in the database
    const handleTrackRepo = () => handleSave({ nodeId, owner: login, name });

    //Deletes a tracked repo for the database
    const handleUntrackRepo = () => handleDelete({ nodeId });

    if (loading || isSaving || isDeleting) {
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
                onClick={handleUntrackRepo}
                disabled={false}
            />
        );
    }

    return (
        <Button
            primary
            label={"Follow Repository"}
            color={"black"}
            onClick={handleTrackRepo}
            disabled={false}
        />
    );
};

export default TrackRepo;
