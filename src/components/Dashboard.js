import React, { useEffect, useState } from 'react'
import { Fragment } from 'react/cjs/react.development'
import axios from 'axios'

const Dashboard = () => {
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('before')
    getApiData()
  }, [])

  const getApiData = async () => {
    setLoading(true)
    const res = await axios.get('https://restcountries.com/v3.1/region/asia')
    setApiData(res.data)
    console.log(res.data)
    setLoading(false)
  }

  return (
    <Fragment>
      <div className='dashboard'>
        <table>
          <thead>
            <tr>
              <th>Flag</th>
              <th>Country Name</th>
              <th>Capital</th>
              <th>Region</th>
              <th>Subregion</th>
              <th>Population</th>
              <th>Borders</th>
              <th>Languages</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>loading...</td>
              </tr>
            ) : (
              <Fragment>
                {apiData.map((data) => (
                  <tr>
                    <td>
                      {' '}
                      <img className='flag' src={data.flags.png} />
                    </td>
                    <td>{data.name.common}</td>
                    <td>{data.capital}</td>
                    <td>{data.region}</td>
                    <td>{data.subregion}</td>
                    <td>
                      {new Intl.NumberFormat('en-IN').format(data.population)}
                    </td>
                    <td>
                      {data.borders?.map((border) => (
                        <small>{border}</small>
                      ))}
                    </td>
                    <td>
                      {Object.values(data.languages).map((lang) => (
                        <small>{lang}</small>
                      ))}
                    </td>
                  </tr>
                ))}
              </Fragment>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default Dashboard
