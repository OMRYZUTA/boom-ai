import type {
    PlasmoCSConfig,
    PlasmoCSUIProps,
} from "plasmo";
import {useState, FC} from "react";
import {Layout, Row, Button, Drawer, Collapse} from "antd";
import CustomTabs from "../components/tabs";
import LogoIcon from "data-base64:~assets/pic-icon.png";

export const config: PlasmoCSConfig = {
    matches: ["https://web.whatsapp.com/*"],
};

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Row>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                style={logoStyle}
            >
            </Button>
            {isOpen &&
                <Drawer
                    title=""
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

const logoStyle = {
            borderRadius: "50%",
            backgroundImage: `url('${LogoIcon}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
    backgroundSize: 'cover',
            backgroundColor: 'transparent',
            width: "40px",
            height: "40px",
    border: 'none',
    cursor: 'pointer',

    }


export default PlasmoOverlay;
  