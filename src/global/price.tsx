import React from 'react';
import { Text } from 'react-native';

const FormattedNumberInReais = (numero: number) => {
  const numeroFormatado = numero.toFixed(2).replace('.', ',');
  return `R$ ${numeroFormatado}`;
};

const FormattedNumber = ({ numero }: { numero: number }) => {
  const numeroFormatado = FormattedNumberInReais(numero);
  return <Text>{numeroFormatado}</Text>;
};

export default FormattedNumber;