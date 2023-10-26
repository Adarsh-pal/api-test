import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import useFetchData from './useFetchData'
import { useState } from 'react';


import ".//style.css";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";

function SimpleButton(props) {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit | Show";
    return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

const historyArr = [];

const Home = () => {

    const [limit, setLimit] = useState(1);
    const marker = useRef(-1);

    const { data: fetchedData, isLoading, error, isSuccess, refetch } = useFetchData(limit, historyArr.length > 0 ? historyArr[marker.current] : '');

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;

    const newData = fetchedData?.data?.servers?.map((item) => {
        return {
            name: item.name,
            id: item.id,
            status: item.status
        }
    });

    if (newData) {
        historyArr.push(newData[newData.length - 1].id);
        if (historyArr.length > 1) {
            marker.current = marker.current + 1;
        }
        else {

            marker.current = 0;
            // console.log(marker, historyArr);
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


    const options = {
        height: 150,
        movableRows: true,
        movableColumns: true
    };
    return (
        <div>

            <h3>
                Asynchronous data: (e.g. fetch) -{" "}
                {/* <button onClick={updateData} disabled={!isAvailable}>Set Data</button>
                <button onClick={clearData}>Clear</button> */}
            </h3>
            {newData &&
                <>
                    <ReactTabulator columns={columns} data={newData} />
                    <div>
                        <input type='number' onChange={(e) => setLimit(e.target.value)} value={limit}></input>
                        <button onClick={() => {
                            marker--;
                            refetch(limit, historyArr[marker]);
                        }}

                            disabled={historyArr.length == 1}>Prev</button>
                        <button onClick={() => {
                            refetch(limit, marker);
                        }}>Next</button>
                    </div>
                </>
            }


        </div>
    );
}

export default Home;
