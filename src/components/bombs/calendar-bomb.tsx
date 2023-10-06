import CalenderIcon from "data-base64:~assets/pic-calendar_bomb.png";
import CalenderFireIcon from "data-base64:~assets/pic-calendar_bomb_fire.png";
import {useState} from "react"
import {Col, Row, Typography, Button, Tooltip} from "antd";
import { sendToBackground } from "@plasmohq/messaging"
import { textExtractor } from "../../services/text-extractor";
import { useStorage } from "@plasmohq/storage/hook";

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
const CalenderBomb = () => {
    const [calendarStatus, setCalendarStatus] = useStorage("meetingGeneratingStatus", (v) => v === undefined ? "Ready": v)

    const onCalendarBombClick = async () => {
        setCalendarStatus("pending")
        const text = textExtractor()
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
                    <Tooltip title={`${calendarStatus}`}>
                        <Button
                            onClick={onCalendarBombClick}
                            style={bombs.calenderBomb.style}
                        >
                        </Button>
                    </Tooltip>
                </Col>
                <Col style={{ marginTop: '6px' }}>
                    <Typography>
                        Generate a Meeting
                    </Typography>
                </Col>
            </Row>
        </>
    );
}

export default CalenderBomb