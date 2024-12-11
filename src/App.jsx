import { Outlet } from 'react-router-dom';
import AccountMenu from './components/Nav';

function App() {

  return (
    <>
    <AccountMenu />
    <Outlet />
    </>
  )
}

export default App
