import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Service from '../../../db/manip'
import Cookies from 'js-cookie'

const List = () => {
  const service = new Service()
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const doc = await service.getDocument('specialDocument', 'pollname')
    if (doc.exists) {
      const list = doc.data.pollname
      if (list.length > 0) {
        const li = list.map((item, index) => (
          <tr key={index}>
            <td>{item}</td>
            <td>
              <a
                href={`/SignUp/${item}`}
                onClick={() => Cookies.set('pollname', item)}
              >
                Sign-Up
              </a>
            </td>
            <td>
              <a href={`/Login/${item}`}>Login</a>
            </td>
          </tr>
        ))
        setPolls(li)
      }
    } else {
      const li = (
        <tr>
          <td colSpan={3}>No polls yet</td>
        </tr>
      )
      setPolls(li)
    }

    setLoading(false)
  }

  // console.log(polls)
  useEffect(() => {
    fetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return !loading ? (
    <Table>
      <thead>
        <tr>
          <th>Poll Name</th>
          <th>Sign-Up</th>
          <th>Login</th>
        </tr>
      </thead>
      <tbody>{polls}</tbody>
    </Table>
  ) : (
    <Table>
      <thead>
        <tr>
          <th>Poll Name</th>
          <th>Sign-Up</th>
          <th>Login</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={3}>Loading...</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default List
