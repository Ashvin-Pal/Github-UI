import { useState, useEffect } from "react";
import { API, buildApiUrl } from "../config";
import { fetcherDelete, tryThis } from "../helpers";

interface iTrack {
    nodeId?: string;
    owner?: string;
    name?: string;
}

type iCallFunction = () => void;

type iTrackReturn = [(val: iTrack) => void, boolean];

export const useUntrackRepo = (
    onSuccess?: iCallFunction,
    onError?: iCallFunction
): iTrackReturn => {
    const [data, setData] = useState<iTrack>({});
    const [loading, setLoading] = useState(false);

    const triggerDeleteFor = (val: iTrack) => setData({ ...val });

    useEffect(() => {
        let mounted = true;

        const untrackRepo = async () => {
            setLoading(true);
            const url = buildApiUrl(API.REPO, { nodeId: data.nodeId });
            const [result, putError] = await tryThis(fetcherDelete(url));
            if (mounted && result && onSuccess) onSuccess();
            if (mounted && putError && onError) onError();
            if (mounted) setLoading(false);
        };

        if (data?.nodeId) untrackRepo();

        return () => {
            mounted = false;
        };
    }, [data, onError, onSuccess]);

    return [triggerDeleteFor, loading];
};
