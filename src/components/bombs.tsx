import CalenderIcon from "data-base64:~assets/pic-calendar_bomb.png";
import CalenderFireIcon from "data-base64:~assets/pic-calendar_bomb_fire.png";
import styled, { keyframes } from 'styled-components';
import CalenderBomb from "./calendaer-bomb";
import {useState} from "react"
import {Col, Row, Typography, Button} from "antd";

const bombs = {
    "calenderBomb": {
        style: {
            borderRadius: "50%",
            backgroundImage: `url('${CalenderIcon}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width: "40px",
            height: "40px",
            border: 'none',
        }
    },
    "calenderBombFire": {
        style: {
            borderRadius: "50%",
            backgroundImage: `url('${CalenderFireIcon}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            border: 'none',
            cursor: 'default',
            animation: 'spin 1s infinite',
            transform: 'rotate(180deg)', 
            transition: 'transform 150ms ease', 
        }
    }
}


const Bombs = () => {
    const [isCalenderBombFire, setIsCalenderBombFire] = useState(false)
    const onCalendarBombClick = () => {
        setIsCalenderBombFire(true)
    }

    return (
        <>
            <Row>
            <CalenderBomb/>

            </Row>
        </>
    )

}
const style = {
    transform: 'rotate(180deg)', 
    transition: 'transform 150ms ease', 
   }

export default Bombs