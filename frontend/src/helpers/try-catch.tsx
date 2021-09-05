export const tryThis = async (promise: any): Promise<[{} | null, any]> => {
    let data;
    try {
        const response = await promise();

        if (response.ok) {
            data = await response.json();
            return [data, null];
        } else {
            throw response;
        }
    } catch (error) {
        console.log("🚀 ~ file: try-catch.tsx ~ line 13 ~ tryThis ~ error", error);
        return [null, error];
    }
};
