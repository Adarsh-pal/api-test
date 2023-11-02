import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react';

import ".//style.css";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";


const Tabulator = ({data}) => {

    const columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Fingerprint", field: "fingerprint", hozAlign: "left" },
        { title: "Type", field: "type" },
    ];


    const options = {
        rowHeight : 100,
        movableRows: true,
        movableColumns: true
        
    };
   
    return (

        <ReactTabulator columns={columns} data={data} options={options}/>
    
  )

}

export default Tabulator;
