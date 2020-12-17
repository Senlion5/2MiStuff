import { useState } from "react";

const useApi = (apiFunc: (...args: any) => any ) => {
    const [data, setData] = useState<any>(undefined);
    const [hasError, setHasError] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [emptyItems, setEmptyItems] = useState<Boolean>(false);

    const request = async (...args: any) => {
        setIsLoading(true);
        const response = await apiFunc(...args);
        setIsLoading(false);
    
        if (!response.ok) {
           setHasError(true);
           return response; 
        };

        setHasError(false);
        setData(response.data);
        setEmptyItems(response.data.length === 0);
        return response;
    };

    return { data, hasError, isLoading, emptyItems, request }
}

export default useApi;
