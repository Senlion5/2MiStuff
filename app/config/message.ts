export interface Message {
    id: string;
    listing: {
        id: number | string;
        title: string;
    };
    dateTime: Date | number;
    content: string;
    fromUser: {
        id: number | string;
        name: string;
    };
    toUser: {
        id: number | string;
        name: string;
    };
    images: [];
    expoPushToken?: string;
}