import { useState, useEffect } from "react";
import { GITHUB_HEADERS } from "../config";
import { fetcherGet, tryThis } from "../helpers";

export const useFetch = (initVal: any, url: string) => {
    const [data, setData] = useState(initVal);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            setError(false);
            setLoading(true);
            const [result, fetchError] = await tryThis(fetcherGet(url, { ...GITHUB_HEADERS }));
            if (mounted && result) setData(result);
            if (mounted && fetchError) setError(true);
            if (mounted) setLoading(false);
        })();

        return () => {
            mounted = false;
        };
    }, [url]);

    return { data, loading, error };
};
