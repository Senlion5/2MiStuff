import client from "./client";

const endpoint = '/messages';

const getMessages = () => client.get(endpoint);

const deleteMessage = (messageId: string) => 
    client.delete(endpoint, { messageId });

const send = (message: string, listingId: string) => 
    client.post(endpoint, {
        message, listingId
    });

const response = (message: string, buyerId: string, listingId: string) => 
    client.post(`${endpoint}/${listingId}`, { message, buyerId, listingId });

export default {
    deleteMessage,
    getMessages,
    response,
    send
}