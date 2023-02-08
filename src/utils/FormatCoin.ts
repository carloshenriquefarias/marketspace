export function formatCoin(value: number){
    const valor = value
    const formatoDeMoeda = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    const formattedValue = formatoDeMoeda.format(valor);
    return `${formattedValue}`;
}
