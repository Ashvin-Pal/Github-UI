import * as React from "react";
import { Box, TextInput } from "grommet";

//This component is used as a search field. It has an input field
//which passes data to a parent component for every change to the
//input field

interface Iprops {
    setSearch: (search: string) => void;
}

const SearchRepo = ({ setSearch }: Iprops) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    return (
        <Box width="large" alignSelf="center" height="xsmall" animation="fadeIn">
            <TextInput
                id="text-input-id"
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Search for a repository"
            />
        </Box>
    );
};

export default SearchRepo;
