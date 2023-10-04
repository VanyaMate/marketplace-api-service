export type Product = {
    product_name: string
    brand: string
    brand_name: string
    category: string
    price: number
    available: boolean
    quantity: number
    description: string
    weight: number
    expiration_date: string
    manufacturer: string
    country_of_origin: string
    barcode: number
    nutritional_facts: string
    allergens: string
    ingredients: string
    net_weight: number
    serving_size: number
    calories: number
    fat: number
    carbohydrates: number
    protein: number
    sugar: number
    fiber: number
    vitamin_a: number
    vitamin_c: number
    calcium: number
    iron: number
    image_url: string
    images: string[]
    reviews: number
    rating: number
}

export type ProductCreateDto =
    Partial<Omit<Product, 'brand_name'>>
    & Pick<Product, 'barcode' | 'brand_name'>;

export type ProductUpdateDto =
    Partial<Omit<Product, 'barcode'>>
    & Pick<Product, 'barcode'>;