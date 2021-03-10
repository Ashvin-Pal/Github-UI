import { useState, useEffect } from "react";
import { githubBaseUrl } from "../config";

const headers = {
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
};

const useFetch = (initVal: any, url: string, github = true) => {
    const [data, setData] = useState(initVal);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const baseUrl = github ? githubBaseUrl : "";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(baseUrl + url, headers);
                if (response.ok) {
                    const resData = await response.json();
                    setData(resData);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, baseUrl]);
    return { data, loading, error };
};

export default useFetch;
