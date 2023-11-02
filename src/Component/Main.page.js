import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import useFetchData from './useFetchData'
import { useState } from 'react';
import Tabulator from './TabulatorContext';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

function SimpleButton(props) {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit | Show";
    return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}


const Home = () => {

    const observerElem = useRef(null);
    const { data, isLoading, error,isFetchingNextPage , fetchNextPage, hasNextPage} = useFetchData();
    const [scrollPosY,setScrollPosY] = useState(window.scrollY);

    const handleObserver = useCallback((entries) => {
        const [target] = entries
        if(target.isIntersecting && hasNextPage) {
            setScrollPosY(window.scrollY);
            fetchNextPage()
        }
    }, [fetchNextPage, hasNextPage])


    useEffect(() => {
       
        const element = observerElem.current
        const option = { threshold: 0 }
      
        const observer = new IntersectionObserver(handleObserver, option);
        if(element){
            observer.observe(element);
        }
        return () => {
            if(element){
                observer.unobserve(element);
            }
        }    
    }, [fetchNextPage, hasNextPage, handleObserver])

    


    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;

    const columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Id", field: "id", hozAlign: "left" },
        { title: "Status", field: "status" },
    ];

    return (
        <div>

            <h3>
                Key-Pairs
            </h3>
            
            <Tabulator data={data}/>

            {hasNextPage && <div ref={observerElem}>Loading...</div>}

        </div>
    );
}

export default Home;
