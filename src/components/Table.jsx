import numeral from 'numeral'
import './Table.css'


function Table({ countries, casesType }) {
  return (
    <div className='table'>
      <table>
        <tbody>
          {
            countries.map((country) => (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td>
                  <strong>{numeral(country[casesType]).format("0.0")}</strong>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
