import { FormControl, Select, MenuItem } from '@mui/material';
import './Header.css'


function Header({ countries, country, onCountryChange }) {
    return (
        <div className="app_header">
            <h1>Virus Tracker</h1>
            <FormControl className="app_dropdown">
                <Select variant="outlined" onChange={onCountryChange} value={country}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {countries.map(country => (
                        <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default Header
