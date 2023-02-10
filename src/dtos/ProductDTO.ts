export type ProductDTO = {
    id?: string;
    name: string;
    description: string;
    price: number;
    is_new: boolean;
    accept_trade: boolean;
    payment_methods: string[];
    product_images: ImageStyleProps[]; 
    user: UserProps;
    onPress?: (id: string) => Promise<void>;
};

export type ImageStyleProps = {
    id: string;
    path: string;
};

export type UserProps = {
    avatar?: string;
};