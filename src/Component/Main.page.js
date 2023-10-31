import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import useFetchData from './useFetchData'
import { useState } from 'react';
import Tabulator from './TabulatorContext';
import { useQueryClient } from '@tanstack/react-query';

function SimpleButton(props) {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit | Show";
    return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

let historyArr = [];

const Home = () => {

    const [limit, setLimit] = useState(1);
    const [data, setData]= useState([]);
    const [marker, setMarker] = useState(-1);
    const [finalPage, setFinalPage] = useState(false);
  //  let currPos = useRef(-1);


    const queryClient = useQueryClient();
    const { data: fetchedData, isLoading, error} = useFetchData(limit, historyArr[marker]?? '');

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;

    let newData = fetchedData?.data?.servers?.map((item) => {
        return {
            name: item.name,
            id: item.id,
            status: item.status
        }
    });
        
    
    if (newData.length!=0) {
        const lastId = newData[newData.length - 1].id
        const isAvailable = historyArr.find((id) => {
            return id == lastId;
        });

        if(!isAvailable){
            historyArr.push(newData[newData.length - 1].id);
        }
    
    }

    

    const columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Id", field: "id", hozAlign: "left" },
        { title: "Status", field: "status" },
    ];

    // const updateData = () => {
    //     this.setState({ data });
    // };

    // const clearData = () => {
    //     this.setState({ data: [] });
    // };
    return (
        <div>

            <h3>
                Asynchronous data: (e.g. fetch) -{" "}
                {/* <button onClick={updateData} disabled={!isAvailable}>Set Data</button>
                <button onClick={clearData}>Clear</button> */}
            </h3>
            {newData &&
                <>
                    
                    <Tabulator data={newData}/>
    
                    <div>
                        <input type='number' onChange={(e) => {
                            
                            setLimit(e.target.value)
                            setMarker(-1);
                            historyArr = []
                            
                            }} value={limit}></input>
                        <button onClick={() => {
                            
                            if(marker> 0){
                                
                                
                                setMarker((marker) => marker - 1);
                            
                            }
                            else{
                               
                                setMarker(-1);
                            }
                        }}

                            disabled={marker <0}>Prev</button>
                        <button onClick={() => {
                            
                            
                            setMarker((marker) => marker + 1);

                            
                        }} disabled={newData.length == 0}>Next</button>
                    </div>
                </>
            }


        </div>
    );
}

export default Home;
