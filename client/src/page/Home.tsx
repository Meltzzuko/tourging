import * as React from 'react';
import UserNavbar from '../components/UserNavbar';
import {Button,Card,Row,Col,Container,Navbar} from 'react-bootstrap';
import FigureImage from 'react-bootstrap/FigureImage'
import Cardsimilan from '../components/Cardsimilan';

const Homepage = () => {
    return (
        <div style={{
            backgroundImage: `url(https://i.imgur.com/WGh30Ok.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
          }}>
            <UserNavbar/>
            <Cardsimilan/>
        </div>

    )
}
export default Homepage;
