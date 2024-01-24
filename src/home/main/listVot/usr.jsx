import { Link } from 'react-router-dom'
import Service from '../../db/dataFirestore'
import { useEffect, useState } from 'react'

const ListUrs = () => {
  const service = new Service()
  const [rows, setRow] = useState(null)
  const fetch = async () => {
    service.setCollectionRef('specialDocument')
    const set = await service.isCollectionExist()
    if (set.exists) {
      const response = await service.getDoc('pollname', 'specialDocument')
      if (!response.error) {
        const pollnameArray = response.data['pollname']
        setRow(
          pollnameArray.length > 0 ? (
            pollnameArray.map((poll, index) => (
              <tr key={index}>
                <td>{poll}</td>
                <td>
                  <Link to={`/SignUp/${poll}`}>Sign-Up</Link>
                </td>
                <td>
                  <Link to={`/Login/${poll}`}>Login</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>{pollnameArray.lenght}No polls yet</td>
            </tr>
          ),
        )
      }
    } else {
      setRow(
        <tr>
          <td colSpan={3}>No polls yet</td>
        </tr>,
      )
    }
  }
  useEffect(() => {
    fetch()
  }, [])

  return rows ? (
    rows
  ) : (
    <tr>
      <td colSpan={3}>Loading...</td>
    </tr>
  )
}

export default ListUrs
