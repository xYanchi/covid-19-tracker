import React from 'react'
import numeral from "numeral"
import './Table.css';

function Table({ countries }) {
    return (
        <div className="table">
            {/* For each country which has cases, take country object, 
            split and take individual values like cases and 
            put it to 'cases' and country to 'country'*/}
            {countries.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
