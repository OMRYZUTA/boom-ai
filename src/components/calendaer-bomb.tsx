import CalenderIcon from "data-base64:~assets/pic-calendar_bomb.png";
import CalenderFireIcon from "data-base64:~assets/pic-calendar_bomb_fire.png";
import styled, { keyframes } from 'styled-components';

import {useState} from "react"
import {Col, Row, Typography, Button} from "antd";
import { sendToBackground } from "@plasmohq/messaging"
import { log } from "console";

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
const extractMessages = () =>{
    let messageContainers = Array.from(document.querySelectorAll('.message-in, .message-out'));
    let result = ""
    if (messageContainers.length > 0){
    let endIdx = messageContainers.length;
    let startIdx = Math.max(0, endIdx - 10);
    let lastMessages = messageContainers.slice(startIdx, endIdx).map(container => {
        let copyableTextElement = container.querySelector('.copyable-text');
        let timestamp = copyableTextElement ? copyableTextElement.getAttribute('data-pre-plain-text') : '';
        let messageText = container.innerText;
        return timestamp + " " + messageText;
    });
    result = lastMessages.join(', ')
}
else {
    result = document.body.innerText
}
    return result;
}


const CalenderBomb = () => {
    const [calendarStatus, setCalendarStatus] = useState("ready")

    const onCalendarBombClick = async () => {
        setCalendarStatus("pending")
        console.log("sendigng")
        const text = extractMessages()
        const resp = await sendToBackground({
            name: "summarize",
            body: {
            "summaryType": "meeting",
            text
            }
          })
           
          console.log(resp)
    }

    return (
        <>
            <Row gutter={[16, 0]}>
                <Col>

                <Button
                        onClick={onCalendarBombClick}
                        // style={isCalenderBombFire ? bombs.calenderBombFire.style : bombs.calenderBomb.style}
                        style={bombs.calenderBomb.style }
                    >
</Button>
                    {/* {isCalenderBombFire ?
                        <Button
                        onClick={onCalendarBombClick}
                        // style={isCalenderBombFire ? bombs.calenderBombFire.style : bombs.calenderBomb.style}
                        style={bombs.calenderBomb.style }
                    >
                    </Button> :
                        <Button
                        onClick={onCalendarBombClick}
                        // style={isCalenderBombFire ? bombs.calenderBombFire.style : bombs.calenderBomb.style}
                        style={bombs.calenderBombFire.style }
                    >
                        </Button>

                    } */}
                </Col>
                <Col>
                    <Typography>
                        {calendarStatus}
                    </Typography>
                </Col>
                <Col>
                    <Typography>
                        Generate a Meeting
                    </Typography>
                </Col>
            </Row>
        </>
    )

}
const style = {
    transform: 'rotate(180deg)', 
    transition: 'transform 150ms ease', 
   }

export default CalenderBomb