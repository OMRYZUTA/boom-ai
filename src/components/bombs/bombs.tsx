import CalenderBomb from "./calendar-bomb";
import { Row, Divider} from "antd";
import SummaryBomb from "./summary-bomb";
import SuggestionBomb from "./suggestion-bomb";
import { Form, Input, Button, Tooltip, Typography } from "antd";
const { Title, Text } = Typography;


const Bombs = () => {

    return (
        <>
            <Row>
                <Title  level={4}>
                    Click on a bomb to generate answer
                </Title>
            </Row>
            <Row>
                <CalenderBomb/>
            </Row>
            <Divider/>
            <Row>
                <SummaryBomb />
            </Row>
            <Divider/>
            <Row>
                <SuggestionBomb />
            </Row>
        </>
    )
}

export default Bombs