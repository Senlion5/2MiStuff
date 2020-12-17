export interface MessagePack {
    id: string;
    listing: { 
      id: string; 
      title: string;
    };
    dataTime: Date;
    content: string;
    fromUser: {
      id: string;
      name: string;
    };
    toUser: {
      id: string;
      name: string;
    };
    images: [
      {
      url: string;
      thumbnailUrl: string;
      }
    ];
    expoPushToken?: string;
  }