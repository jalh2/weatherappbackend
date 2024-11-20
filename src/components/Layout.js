import { Outlet } from "react-router-dom";
import NavbarH from '../components/navbar'


const Layout = () => {


  return (
    <>
      <NavbarH /> 
      <Outlet />
    </>
  );
};

export default Layout;

