import { Checkbox } from "native-base";
import React from "react";

export function CheckBoxAtual(){

    const [groupValues, setGroupValues] = React.useState([]);

    return(
        <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
            <Checkbox value="1">Boleto</Checkbox>
            <Checkbox value="2" mt={2} >Pix</Checkbox>
            <Checkbox value="3" mt={2}>Dinheiro</Checkbox>
            <Checkbox value="4" mt={2}>Cartão de crédito</Checkbox>
            <Checkbox value="5" mt={2}>Depósito Bancário</Checkbox>
        </Checkbox.Group>
    );
}