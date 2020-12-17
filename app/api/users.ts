import client from "./client";
import authStorage from "../auth/authStorage";

export interface UserInfoProps {
    id?: number | string,
    email: string;
    name: string;
    password: string;
    iat?: number
}

const register = (userInfo: UserInfoProps) => client.post("/users", userInfo);

const getUserProps = (userId: string) => client.get(`/user/${userId}`, { itemOwnerId: userId }); //* owner of the item

const deleteUser = () => client.delete("/user");

const getUserIcon = () => client.get("/user");

const addUserIcon = async (userImages: any, onUploadProgress: any) => {

    const user: any = await authStorage.getUser();

    const data: any = new FormData();

    userImages.images.forEach((image: any, index: number) => 
      data.append("images", {
        name: "image" + index,
        type: "image/jpeg",
        uri: image
    }));

    return client.post(`/user/${user.userId}`, data, {
        onUploadProgress: progress => 
          onUploadProgress(progress.loaded / progress.total)
    });
} 

export default { 
  addUserIcon, 
  deleteUser, 
  getUserIcon, 
  getUserProps, 
  register 
};

