
import { useQuery, } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

const fetchData = ({ queryKey }) => {
    let [key, limit, marker] = queryKey;
    if(limit=='') limit = 0;
    let baseURL = `https://api-us-east-at-1.openstack.acecloudhosting.com:8774/v2.1/servers/detail?limit=${limit}`;

    if (marker) {
        baseURL = baseURL + `&marker=${marker}`;
    }

    const headers = {
        "X-Auth-Token": "gAAAAABlQLhuUEInSIOJPLx9ub_VtbjWKvwuqg3wnYdwft9FJZMyLuXzxN7UG2CLGcvwK4iLYJhKYB-B2VOaClgQ_e3Ymz9GwqbIae96z9FgXOqdtBUFSy5WzeuYUaCZjPXCGLNWsgYWQ2ZHJPclAu2O78GkDJs75ZGdjYuUbiSrms6iLwB3YlE"
    }

    return axios.get(baseURL, { headers });

}

const useFetchData = (limit, marker) => {
  //  console.log(marker);
    return useQuery({
        queryKey: ['fetchData', limit, marker],
        queryFn: (limit, marker) => fetchData(limit, marker),
        keepPreviousData: true
    });

}

export default useFetchData;
