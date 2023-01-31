import { createContext, ReactNode, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageAdsGet, storageAdsSave, storageAdsRemove } from '@storage/storageAds';
import { AdsDTO } from "@dtos/AdsDTO";
import { api } from "@services/api";

import { AuthContext } from "./AuthContext";
import { useToast } from "native-base";
import { AppError } from "@utils/AppError";

export type AdsContextDataProps = {
    ads: AdsDTO;
    createNewAd: (images: string, name: string, description: string, price: number,
    is_new: boolean, accept_trade: boolean, payment_methods: string[]) => Promise<void>;
}

type AdsContextProviderProps = { 
    children: ReactNode;
}

export const AdsContext = createContext<AdsContextDataProps>({} as AdsContextDataProps);

export function AdsContextProvider({children} : AdsContextProviderProps){ 

    const [ads, setAds] = useState<AdsDTO>({} as AdsDTO);

    const toast= useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState<string | null>(null);  

    const [statusProduto, setStatusProduto] = useState<string | undefined>(undefined);

    async function storageAdsSave(AdsData: AdsDTO) {

        try{
        await storageAdsSave(AdsData);

        } catch (error) {
            throw error;
        }    
    }

    function setPrice(amount : string) {
        return parseFloat(amount);
    }

    function getConverteStatusProdutoBoolean(status : string): boolean {
        if (statusProduto == "new") {
            return true;
        } else {
            return false;
        }
    } 

    async function createNewAd (images: string, name: string, description: string, price: number,
        is_new: boolean, accept_trade: boolean, payment_methods: string[]) {

        //FAZER VERIFICAÇÃO SE JA EXISTE O PRODUTO CADASTRADO NO BANCO COM O MESMO NOME

        try {
            setIsLoading(true)   

            if ( !statusProduto ) {
                const title = 'Atenção! Por favor, informe se o produto novo ou usado.';

                toast.show({    
                    title,
                    placement: 'top',
                    bgColor: 'blue.500'
                })           
                return
            }

            if ( !userPhoto ) {
                const title = 'Atenção! Por favor, escolha uma imagem.';

                toast.show({    
                    title,
                    placement: 'top',
                    bgColor: 'blue.500'
                })           
                return
            }

            const name_product = name
            const description =  "Essa é a melhor luminária do mundo. Você não vai se arrepender";
            const is_new =  getConverteStatusProdutoBoolean(statusProduto);
            const price_product = setPrice(price)
            const accept_trade =  true;
            const payment_methods =  ["pix"];  

            const response_product = await api.post('/products', 
                { images, name , description, is_new,  price : setPrice(price)  ,
                accept_trade, payment_methods },
                
            );  

            storageAdsSave(response_product.data); //VER COM PRISCO SE E AQUI MESMO QUE SALVA
                        
            if (response_product.data.id) {   

                let formData = new FormData(); 

                formData.append("images", {
                    uri: userPhoto,
                    name: "image.jpg",
                    type: "image/jpg",
                });
    
                formData.append('product_id', response_product.data.id)
               
                const response = await api.post('/products/images', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: (data, headers) => {                        
                        return formData;
                    },
                });

                const title = 'Seu produto foi salvo com sucesso!';
                toast.show({    
                    title,
                    placement: 'top',
                    bgColor: 'green.500'
                })

                return

            } else {
                throw new Error();
            }         
                  
        } catch (error) {
            setIsLoading(false);
        
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 
            'Não foi possível enviar os dados. Tente novamente mais tarde';
        
            toast.show({    
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }        
    }

    async function loadAdsData() { //RECUPERANDO AS ADS ARMAZENADAS (VER COM PRISCO)
        try { 
            const adsSaves = await storageAdsGet();

            if(adsSaves){
                setAds(adsSaves);
            }

        } catch (error) {
            throw error

        } finally {

        }
    }

    useEffect(() => {
        loadAdsData();
    },[])

    return (
        <AuthContext.Provider 
            value={{ ads, createNewAd }}
        >
        {children}
        </AuthContext.Provider>
        
    )
}
