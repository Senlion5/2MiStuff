import client from "./client";
import { Section } from "../config/section";

const getListings = (category?: Section) => client.get("/listings", { category: category?.id });

const getMyListings = () => client.get("/my/listings");

const deleteListing = (listingId: string) => client.delete("/listing", { id: listingId });

const addListing = (listing: any, onUploadProgress: any) => {
    const data: any = new FormData();
    data.append("title", listing.title);  
    data.append("price", listing.price);
    if (listing.description) data.append("description", listing.description);
    data.append("categoryId", listing.category.id);
    data.append("sectionId", listing.section.id);

    listing.images.forEach((image: any, index: number) => 
      data.append("images", {
        name: "image" + index,
        type: "image/jpeg",
        uri: image
    }));

    if (listing.location) data.append("location", JSON.stringify(listing.location));

    return client.post("/listings", data, {
        onUploadProgress: progress => 
          onUploadProgress(progress.loaded / progress.total)
    });
} 

export default {
    deleteListing,
    getListings,
    getMyListings,
    addListing
}