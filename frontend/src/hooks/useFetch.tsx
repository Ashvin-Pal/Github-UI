import { useState, useEffect } from "react";
import { githubBaseUrl } from "../config";

const headers = {
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
};

export const useFetch = (initVal: any, url: string, github = true) => {
    const [data, setData] = useState(initVal);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const baseUrl = github ? githubBaseUrl : "";

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(baseUrl + url, headers);
                if (response.ok) {
                    const resData = await response.json();
                    if (mounted) setData(resData);
                } else {
                    throw response;
                }
            } catch (error) {
                if (mounted) setError(true);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [url, baseUrl]);
    return { data, loading, error };
};

