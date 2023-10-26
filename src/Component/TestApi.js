import React from 'react'
import useFetchData from './useFetchData'

export const TestApi = () => {

    const { data, isLoading, error, isSuccess } = useFetchData();

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;

    if (isSuccess) console.log(data);

    return (
        <div>
            hello
        </div>
    )
}
