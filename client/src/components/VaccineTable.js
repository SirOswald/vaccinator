import React, { useState } from 'react'

const VaccineTable = ({ data, vaccine }) => {
  const [filter, setFilter] = useState("")

  const search = (rows) => {
    if (!rows) {
      return null
    }
    const columns = rows[0] && Object.keys(rows[0])
    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1)
    )
  }

  let filteredData = search(data)

  if (!filteredData) {
    filteredData = []
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="table-container">
        <h2>{vaccine}</h2>
        <div>
          <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}></input>
        </div>
        no data to display
      </div>
    )
  }

  return (
    <div className="table-container">
      <h2>{vaccine}</h2>
      <div>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="search"></input>
      </div>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>order#</th>
            <th>contact</th>
            <th>district</th>
            <th>arrived</th>
          </tr>
          {filteredData.map(d =>
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.orderNumber}</td>
              <td>{d.responsiblePerson}</td>
              <td>{d.healthCareDistrict}</td>
              <td>{new Date(d.arrived).toLocaleString("fi-FI")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default VaccineTable