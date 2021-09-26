import { useState } from "react";
import { Form, FormField, Box, Button, TextInput, Heading } from "grommet";
import { motion } from "framer-motion";

import { FormEdit } from "grommet-icons";

//This component has an input field. The user has to clink the submit button
//to pass the input field data to a parent component

interface IProps {
    org: string;
    setOrg: (org: string) => void;
    title: string;
}

const SearchOrg = ({ title, org, setOrg }: IProps) => {
    const [value, setValue] = useState(org);
    const [isEditing, setEditing] = useState(true);

    const handleClick = () => setEditing(!isEditing);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const handleReset = () => setValue("");

    const handleSubmit = () => {
        if (value) {
            setEditing(!isEditing);
            setOrg(value);
        }
    };

    if (isEditing) {
        return (
            <Box
                direction="row"
                height="small"
                alignSelf="center"
                margin="medium"
                animation="fadeIn"
            >
                <Heading alignSelf="center" level="2">
                    {value}
                </Heading>
                <Button
                    alignSelf="center"
                    focusIndicator={false}
                    icon={<FormEdit color="green" size="medium" />}
                    onClick={handleClick}
                    hoverIndicator
                />
            </Box>
        );
    }
    return (
        <Box width="large" alignSelf="center" margin="medium" height="small" animation="fadeIn">
            <Form onReset={handleReset} onSubmit={handleSubmit}>
                <FormField name="name" htmlFor="text-input-id" label={title}>
                    <TextInput
                        id="text-input-id"
                        value={value}
                        name="name"
                        onChange={handleInput}
                    />
                </FormField>
                <Box direction="row" gap="medium">
                    <Button type="submit" primary label="Submit" />
                    <Button type="reset" label="Reset" />
                </Box>
            </Form>
        </Box>
    );
};

export default SearchOrg;
