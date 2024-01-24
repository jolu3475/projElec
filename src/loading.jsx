import { Spinner } from 'react-bootstrap'
import './style/loading.css'

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        margin: '0px',
      }}
      className=" bg-dark text-white"
    >
      <h2>
        Loading
        <Spinner animation="grow" />
      </h2>
    </div>
  )
}
export default Loading
