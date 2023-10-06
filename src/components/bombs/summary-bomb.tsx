import SummaryIcon from "data-base64:~assets/pic-task_bomb.png";
import { Col, Row, Typography, Button, Tooltip } from "antd";
import { sendToBackground } from "@plasmohq/messaging";
import { textExtractor } from "../../services/text-extractor";
import { useStorage } from "@plasmohq/storage/hook";

const bombs = {
  "summaryBomb": {
    style: {
      borderRadius: "50%",
      backgroundImage: `url('${SummaryIcon}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      width: "40px",
      height: "40px",
      border: 'none',
    }
  }
}

const SummaryBomb = () => {
  const [summaryStatus, setSummaryStatus] = useStorage("summaryGeneratingStatus", (v) => v === undefined ? "Ready" : v);

  const onSummaryBombClick = async () => {
    setSummaryStatus("pending");
    const text = textExtractor();
    const resp = await sendToBackground({
      name: "summarize",
      body: {
        "summaryType": "task",
        text
      }
    });
    
    console.log(resp);
  }

  return (
    <>
      <Row gutter={[16, 0]}>
        <Col>
          <Tooltip title={`${summaryStatus}`}>
            <Button
              onClick={onSummaryBombClick}
              style={bombs.summaryBomb.style}
            >
            </Button>
          </Tooltip>
        </Col>
        <Col style={{ marginTop: '6px' }}>
          <Typography>
            Generate a Summary
          </Typography>
        </Col>
      </Row>
    </>
  );
}

export default SummaryBomb;
