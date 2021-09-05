import * as React from "react";
import { Box, TextInput } from "grommet";

//This component is used as a search field. It has an input field
//which passes data to a parent component for every change to the
//input field

interface iProps {
    setSearch: (search: string) => void;
}

const SearchRepo = ({ setSearch }: iProps) => {
    return (
        <Box width="large" alignSelf="center" height="xsmall" animation="fadeIn">
            <TextInput
                id="text-input-id"
                name="name"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a repository"
            />
        </Box>
    );
};

export default SearchRepo;
