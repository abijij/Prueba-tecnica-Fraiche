export interface Product {
    id?: string;
    name: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    price: number;
    id_category: string | undefined;
    sku: string | undefined;
    sku_alt?: string | undefined;
    purchase_department: string | undefined;
    promo_price?: number;
    stock: number;
    promo_quantity?: number;
    tax?: number;
    price3?: number;
    quantity?: number;

}

