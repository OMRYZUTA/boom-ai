import SuggestionIcon from "data-base64:~assets/pic-mystery_bomb.png";
import { Col, Row, Typography, Button, Tooltip } from "antd";
import { sendToBackground } from "@plasmohq/messaging";
import { textExtractor } from "../../services/text-extractor";
import { useStorage } from "@plasmohq/storage/hook";

const bombs = {
  "suggestionBomb": {
    style: {
      borderRadius: "50%",
      backgroundImage: `url('${SuggestionIcon}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      width: "40px",
      height: "40px",
      border: 'none',
    }
  }
}

const SuggestionBomb = () => {
  const [suggestionStatus, setSuggestionStatus] = useStorage("suggestionGeneratingStatus", (v) => v === undefined ? "Ready" : v);

  const onSuggestionBombClick = async () => {
    setSuggestionStatus("Pending");
    const text = textExtractor();
    const resp = await sendToBackground({
      name: "summarize",
      body: {
        "summaryType": "suggestion",
        text
      }
    });

    console.log(resp);
  }

  return (
    <>
      <Row gutter={[16, 0]}>
        <Col>
          <Tooltip title={`${suggestionStatus}`}>
            <Button
              onClick={onSuggestionBombClick}
              style={bombs.suggestionBomb.style}
            >
            </Button>
          </Tooltip>
        </Col>
        <Col style={{ marginTop: '6px' }}>
          <Typography>
            Generate a Suggestion
          </Typography>
        </Col>
      </Row>
    </>
  );
}

export default SuggestionBomb;
