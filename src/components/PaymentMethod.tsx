import { HStack, Text, useTheme } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, PencilSimpleLine, Power, 
    TrashSimple, Money, QrCode } from 'phosphor-react-native'
; 
import { useEffect } from "react";

export function PaymentMethods({ item }){
    const {colors, sizes} = useTheme();

    useEffect(() => {
        
        // const {actionId} = response.action as any;

        switch (qualquercoisa) {
            case '1': return <Barcode size={sizes[5]} color={colors.gray[700]} />;
            case '2': return <QrCode size={sizes[5]} color={colors.gray[700]} />;
            case '3': return <Money size={sizes[5]} color={colors.gray[700]} />;
            case '4': return <CreditCard size={sizes[5]} color={colors.gray[700]} />;
            case '5': return <Bank size={sizes[5]} color={colors.gray[700]} />;
            default: return console.log('Nenhum método de pagamento foi selecionado');
        }
    
        // return () => unsubscribe;
    
    },[])

    return(
        <HStack space={2}>
            <Icone size={sizes[5]} color={colors.gray[700]}>
                <Barcode size={sizes[5]} color={colors.gray[700]} />
            </Icone>

            <Text fontSize="sm" color="gray.700">
                {payment_method}
            </Text>
        </HStack>
    );
}

