import { Box, Text } from "grommet";

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
