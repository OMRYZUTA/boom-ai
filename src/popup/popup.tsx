import React from "react";
import styled from "styled-components";
import { Col, Row, Typography } from "antd";
import CustomTabs from "../components/tabs";

const { Title } = Typography;

const StyledCol = styled(Col)`
  width: 400px;
  height: 400px;
  text-align: center;
  margin: auto;
`;

function IndexPopup() {
  return (
    <>
      <div style={{ height: "100px", width: "100px" }}
      ></div>
      {/* <Row>
        <StyledCol span={24}>
          <Title>Boom AI</Title>
          <CustomTabs />
        </StyledCol>
      </Row> */}
    </>
  );
}

export default IndexPopup;
