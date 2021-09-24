import { useState, useEffect } from "react";
import { API, buildApiUrl } from "../config";
import { fetcherPut, tryThis } from "../helpers";

interface iTrack {
    nodeId?: string;
    owner?: string;
    name?: string;
}

type iCallFunction = () => void;

type iTrackReturn = [(val: iTrack) => void, boolean];

export const useTrackRepo = (onSuccess?: iCallFunction, onError?: iCallFunction): iTrackReturn => {
    const [data, setData] = useState<iTrack>({});
    const [loading, setLoading] = useState(false);

    const handleSave = (val: iTrack) => setData({ ...val });

    useEffect(() => {
        let mounted = true;

        const trackRepo = async () => {
            setLoading(true);
            const url = buildApiUrl(API.REPO, { nodeId: data.nodeId });
            const [result, putError] = await tryThis(fetcherPut(url, data));
            if (mounted && result && onSuccess) onSuccess();
            if (mounted && putError && onError) onError();
            if (mounted) setLoading(false);
        };

        if (data?.nodeId) trackRepo();

        return () => {
            mounted = false;
        };
    }, [data, onError, onSuccess]);

    return [handleSave, loading];
};
