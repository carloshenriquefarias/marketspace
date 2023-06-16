import React, { useState } from "react";
import { Radio, Stack } from "native-base";

export function RadiosAtual(){

    const [valueRadio, setValueRadio] = useState(1); //Deixar o radio vazio

    function handleSelectRadio (defaultValue: '1' | '2') {
        // setValueRadio(defaultValue)
    }

    return (
        <Radio.Group 
            name="exampleGroup" 
            defaultValue="1" 
            accessibilityLabel="pick a size"
        >
            <Stack 
                mt={5}
                direction={{
                    base: "row",
                    md: "row"
                }} 
                alignItems={{
                    base: "space-between",
                    md: "space-between"
                }} 
                space={10} 
                w="100%" maxW="300px"
            >
                
                <Radio 
                    value="1" 
                    colorScheme="blue" 
                    size="md" 
                    my={1}
                    // onPress={() => handleSelectRadio('1')}
                >
                    Produto Novo
                </Radio>

                <Radio 
                    value="2" 
                    colorScheme="blue" 
                    size="md" 
                    my={1}
                    // onPress={() => handleSelectRadio('2')}
                >
                    Produto Usado
                </Radio>
                
            </Stack>
        </Radio.Group>
    );
}
