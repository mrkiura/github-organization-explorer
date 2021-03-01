import { useMemo } from 'react';


export const usePaginate = (data, pageLimit, pageNumber) => {
    const page = useMemo(() => {
        return data.slice((pageNumber - 1) * pageLimit, pageNumber * pageLimit);
    }, [data, pageLimit, pageNumber]);

    return { page };
};