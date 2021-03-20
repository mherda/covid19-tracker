import React from 'react';
import { v4 as uuid } from 'uuid';
import './Table.styles.css';

const Table = ({ countries }) => {
  return (
    <div className='table'>
      <table>
      <tbody>
      {countries.map(({ country, cases, countryInfo }) => {
          return(
            <tr key={uuid()}>
              <td>{country}</td>
              <td><strong>{cases}</strong></td>
            </tr>
          )
      })}
      </tbody>
      </table>
    </div>
  );
};

export default Table;