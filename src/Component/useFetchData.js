
import { useQuery, } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

const fetchData = ({ queryKey }) => {
    const [key, limit, marker] = queryKey;
    let baseURL = `https://api-us-east-at-1.openstack.acecloudhosting.com:8774/v2.1/servers?limit=${limit}`;

    if (marker !== '') {
        baseURL = baseURL + `&marker=${marker}`;
    }

    const headers = {
        "X-Auth-Token": "gAAAAABlOiblqMWSggjFGU331WvFU1VJkwAXgcaYzHlH5IwI2ocJpQZRcO-pTGOa-K0snh3XgELJkcWhiaXeTcnZXnFYwMAFbTtCyc5HXkym1Y-Svf3PzhOdY51Ef_BpQCsoSgoj8ODrZlCC7qkMlbPYne_i3r9gCtrvz32IYHvgZt2sT6DFSTw"
    }

    return axios.get(baseURL, { headers });

}

const useFetchData = (limit, marker) => {
    console.log(marker);
    return useQuery({
        queryKey: ['fetchData', limit, marker],
        queryFn: (limit, marker) => fetchData(limit, marker),
        keepPreviousData: true
    });

}

export default useFetchData;
