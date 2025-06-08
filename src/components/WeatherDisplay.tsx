import React from "react";

import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  CloudOutlined,
  ThunderboltOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface WeatherDisplayProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  city,
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
}) => {
  return (
    <div>
      <Card className="mb-4 bg-gradient-to-r from-[#9cd5ff] to-[#c1e5ff]">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12}>
            <div className="flex items-center ">
              <img src={icon} alt={description} className="w-20 h-20" />
              <div className="ml-4">
                <Title level={3} className="mb-0 ">
                  {city}
                </Title>
                <p className="text-lg capitalize !text-white">{description}</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Temperature"
                  value={temperature}
                  suffix="°"
                  prefix={<CloudOutlined />}
                />
              </Col>
              {humidity !== undefined && (
                <Col span={8}>
                  <Statistic
                    title="Humidity"
                    value={humidity}
                    suffix="%"
                    prefix={<ThunderboltOutlined />}
                  />
                </Col>
              )}
              {windSpeed !== undefined && (
                <Col span={8}>
                  <Statistic
                    title="Wind"
                    value={windSpeed}
                    suffix="m/s"
                    prefix={<CompassOutlined />}
                  />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default WeatherDisplay;
