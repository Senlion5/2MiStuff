export interface Image {
    url: string;
    thumbnailUrl: string;
}

export interface Listing {
    _id?: string;
    id?: string;
    title: string;
    description?: string;
    images: Array<Image>;
    price: number;
    categoryId: number;
    sectionId: number;
    userId?: number | string;
    location?: {
        latitude: number;
        longitude: number;
    } 
}
