import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/authStorage";
import settings from "../config/settings";

const apiClient = create({
    baseURL: settings.apiUrl
});

apiClient.addAsyncRequestTransform(async(req) => {
    const authToken = await authStorage.getToken();
    if (!authToken) return;
    req.headers["x-auth-token"] = authToken;
});

const get: any = apiClient.get;
apiClient.get = async (url: string, params?: {}, axiosConfig?: any) => {
    const response: any = await get(url, params, axiosConfig);

    if (response.ok) {
        cache.store(url, response.data);
        return response;
    }

    const data = await cache.get(url);
    return data ? { ok: true, data } : response;
}

export default apiClient;
