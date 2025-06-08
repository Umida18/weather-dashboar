import React from "react";

import { Card, Row, Col, Statistic, Typography, Progress } from "antd";
import {
  CloudOutlined,
  ThunderboltOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface DataVisualizationProps {
  temperatureData: { date: string; value: number }[];
  humidityData: { date: string; value: number }[];
  windData: { date: string; value: number }[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  temperatureData,
  humidityData,
  windData,
}) => {
  const getAverage = (data: { value: number }[]) =>
    data.reduce((acc, curr) => acc + curr.value, 0) / data.length;

  const getMinMax = (data: { value: number }[]) => ({
    min: Math.min(...data.map((d) => d.value)),
    max: Math.max(...data.map((d) => d.value)),
  });

  const tempStats = getMinMax(temperatureData);
  const humidityStats = getMinMax(humidityData);
  const windStats = getMinMax(windData);

  return (
    <div className="space-y-4">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className="relative bottom-4 !mb-6">
            <Title level={4}>Weather Statistics</Title>
            <div className="space-y-4">
              <div>
                <Title level={5}>Temperature Range</Title>
                <Progress
                  percent={
                    ((getAverage(temperatureData) - tempStats.min) /
                      (tempStats.max - tempStats.min)) *
                    100
                  }
                  format={() =>
                    `${tempStats.min.toFixed(1)}° - ${tempStats.max.toFixed(
                      1
                    )}°`
                  }
                />
              </div>
              <div>
                <Title level={5}>Humidity Range</Title>
                <Progress
                  percent={
                    ((getAverage(humidityData) - humidityStats.min) /
                      (humidityStats.max - humidityStats.min)) *
                    100
                  }
                  format={() =>
                    `${humidityStats.min.toFixed(
                      1
                    )}% - ${humidityStats.max.toFixed(1)}%`
                  }
                />
              </div>
              <div>
                <Title level={5}>Wind Speed Range</Title>
                <Progress
                  percent={
                    ((getAverage(windData) - windStats.min) /
                      (windStats.max - windStats.min)) *
                    100
                  }
                  format={() =>
                    `${windStats.min.toFixed(1)}m/s - ${windStats.max.toFixed(
                      1
                    )}m/s`
                  }
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="!mt-6">
            <Statistic
              title="Average Temperature"
              value={getAverage(temperatureData)}
              suffix="°"
              prefix={<CloudOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Humidity"
              value={getAverage(humidityData)}
              suffix="%"
              prefix={<ThunderboltOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Wind Speed"
              value={getAverage(windData)}
              suffix="m/s"
              prefix={<CompassOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataVisualization;
