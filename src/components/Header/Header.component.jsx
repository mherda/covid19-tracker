import React from 'react';
import { v4 as uuid } from 'uuid';
import {FormControl, MenuItem, Select} from "@material-ui/core";

const Header = ({ countries, onCountryChange, country }) => {
  console.log(countries);
  return(
    <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className='app_dropdown'>
        <Select variant='outlined' onChange={onCountryChange} value={country}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {
            countries.map((country) => (
              <MenuItem value={country.value} key={uuid()}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;