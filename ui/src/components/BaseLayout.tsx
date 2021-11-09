import { FC } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const BaseLayout: FC = () => {
  
  const pathname = useLocation().pathname.substr(1);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>3-do</Navbar.Brand>
          <Nav>
            <Nav.Link active={pathname === ""} as={Link} to="/">
              tasks
            </Nav.Link>
            <Nav.Link active={pathname === "new"} as={Link} to="/new">
              create task
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Outlet />
    </>
  );
};

export default BaseLayout;
