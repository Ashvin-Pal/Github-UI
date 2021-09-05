import { useState } from "react";
import { Form, FormField, Box, Button, TextInput, Heading } from "grommet";

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
    const [edit, setEdit] = useState(true);

    const handleSubmit = () => {
        if (value) {
            setEdit(!edit);
            setOrg(value);
        }
    };

    if (edit) {
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
                    onClick={() => setEdit(!edit)}
                    hoverIndicator
                />
            </Box>
        );
    }
    return (
        <Box width="large" alignSelf="center" margin="medium" height="small" animation="fadeIn">
            <Form onReset={() => setValue("")} onSubmit={handleSubmit}>
                <FormField name="name" htmlFor="text-input-id" label={title}>
                    <TextInput
                        id="text-input-id"
                        value={value}
                        name="name"
                        onChange={(e) => setValue(e.target.value)}
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
