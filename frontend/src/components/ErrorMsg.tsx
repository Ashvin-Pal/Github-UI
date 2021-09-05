import { Box, Text } from "grommet";

//This component displays an error msg that used thorugh out the app.

const ErrorMsg = () => {
    return (
        <Box width="medium" gap="small" alignSelf="center">
            <Text wordBreak="break-word">
                Opps! Something went wrong. Please refresh your browser or check your internet
                connection.
            </Text>
        </Box>
    );
};

export default ErrorMsg;
