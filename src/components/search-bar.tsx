import { Flex, TextField, Text, Button } from '@radix-ui/themes'

export const SearchBar = () => {
    return (
    <Flex gap="3" align="center" justify="center">
        <Text>保戶編號</Text>
        <TextField.Root size="3" placeholder="Search..." />
        <Button>查詢</Button>
    </Flex>
    );
};
