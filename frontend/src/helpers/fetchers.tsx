export const fetcherGet = (url: string, options?: RequestInit) => () => fetch(url, options);

export const fetcherPost = (url: string, data = {}, options?: RequestInit) => {
    return () =>
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        });
};

export const fetcherPut = (url: string, data = {}, options?: RequestInit) => {
    return () =>
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        });
};

export const fetcherDelete = (url: string, options?: RequestInit) => {
    return () => fetch(url, { method: "DELETE", ...options });
};
