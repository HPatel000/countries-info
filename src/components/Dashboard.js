import React, { useEffect, useState } from 'react'
import { Fragment } from 'react/cjs/react.development'
import axios from 'axios'
import Loader from './Loader'

const Dashboard = () => {
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getApiData()
  }, [])

  const getApiData = async () => {
    setLoading(true)
    const res = await axios.get('https://restcountries.com/v3.1/region/asia')
    setApiData(res.data)
    setLoading(false)
  }

  return (
    <Fragment>
      <div className='dashboard'>
        <table>
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Capital</th>
              <th>Flag</th>
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
                <td colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : (
              <Fragment>
                {apiData.map((data) => (
                  <tr key={data.name.common}>
                    <td>{data.name.common}</td>
                    <td>{data.capital ? data.capital : '--'}</td>
                    <td>
                      {' '}
                      <img className='flag' src={data.flags.png} />
                    </td>
                    <td>{data.region ? data.region : '--'}</td>
                    <td>{data.subregion ? data.subregion : '--'}</td>
                    <td>
                      {new Intl.NumberFormat('en-IN').format(data.population)}
                    </td>
                    <td>
                      {data.borders
                        ? data.borders?.map((border) => <p key={border}>{border}</p>)
                        : '--'}
                    </td>
                    <td>
                      {Object.values(data.languages).map((lang) => (
                        <p key={lang}>{lang}</p>
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
