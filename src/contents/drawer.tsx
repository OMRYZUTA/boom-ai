import type {
    PlasmoCSConfig,
    PlasmoCSUIProps,
} from "plasmo";
import {useState, useEffect, FC} from "react";
import {Layout, Row, Col, Button, Drawer, Collapse} from "antd";
import CustomTabs from "../components/tabs";

const {Footer} = Layout;
const {Panel} = Collapse;

export const config: PlasmoCSConfig = {
    matches: ["https://web.whatsapp.com/*"],
};

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Row>
            <Button
                onClick={() => setIsOpen(!isOpen)}
            >
                Boom
            </Button>
            {isOpen &&
                <Drawer
                    title="Boom"
                    placement="left"
                    closable={false}
                    mask={false}
                    open={true}
                    width={isOpen ? 350 : 60}
                >
                    <CustomTabs/>
                </Drawer>
            }
        </Row>
    );
};

export default PlasmoOverlay;
  