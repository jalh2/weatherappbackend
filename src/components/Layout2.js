import { Outlet } from "react-router-dom";
import NavbarH2 from '../components/navbar2'


const Layout2 = () => {


  return (
    <>
      <NavbarH2 /> 
      <Outlet />
    </>
  );
};

export default Layout2;

