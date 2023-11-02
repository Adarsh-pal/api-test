
import { useInfiniteQuery, } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

const fetchData = (pageParam) => {

    console.log(pageParam);

    let baseURL = `https://api-us-east-at-1.openstack.acecloudhosting.com:8774/v2.1/os-keypairs?limit=3`;

    if (pageParam) {
        baseURL = baseURL + `&marker=${pageParam}`;
    }

    const headers = {
        "X-Auth-Token": "gAAAAABlQ0F-P7DOBN5ow9ZbhjJITDpcK_M2JAYW-bFpIpyOsXq9IzcPRTdtX5UffGkFfHtAhMtwEMSXnguAfP_Xs4siCa2X_GqbGL9tikxC5FriimBsot7SG0NicHzwWzQ_5_zGPnUWqzZMnqfOiVbK1eKuR3yhs03X9X7Nu-3EJ8Shy94y3JA",
        "openstack-api-version": "compute 2.35"
    }

    return axios.get(baseURL, { headers });

}

const useFetchData = () => {

    return useInfiniteQuery({
        queryKey: ['fetchData'],
        queryFn: ({pageParam = ''}) => fetchData(pageParam),
        
        getNextPageParam: (lastPage, allPages) =>{
            if(allPages.length < 25){
                
                const keypairs = lastPage?.data?.keypairs;
                const nextMarker = keypairs[keypairs.length-1]?.keypair?.name;
                return nextMarker;
            }
            else{
                return undefined;
            }
        },

        select: (data) => {
            
            const newData = []
            
            data?.pages.map((group, i) => {
        
                {
                    group.data.keypairs.forEach(item => {
                        item = item.keypair;
                        newData.push({
                            name: item.name,
                            fingerprint: item.fingerprint,
                            type: item.type
                        })
                    })
                    
                }
                    
            })

            return newData;
        }
    });

}

export default useFetchData;
