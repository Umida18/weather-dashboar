import React from "react";

import { List, Card, Row, Col, Typography } from "antd";

import { useTheme } from "../contexts/ThemeContext";

const { Text } = Typography;

interface Forecast {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

interface ForecastListProps {
  forecasts: Forecast[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecasts }) => {
  const { darkMode } = useTheme();

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      dataSource={forecasts}
      renderItem={(forecast) => (
        <List.Item>
          <Card
            hoverable
            className={darkMode ? "bg-[#1f2937] border-[#374151]" : ""}
          >
            <Row align="middle" gutter={[8, 8]}>
              <Col span={24}>
                <Text strong>{forecast.date}</Text>
              </Col>
              <Col span={24}>
                <div className="flex items-center justify-center">
                  <img
                    src={forecast.icon}
                    alt={forecast.description}
                    className="w-16 h-16"
                  />
                </div>
              </Col>
              <Col span={24}>
                <div className="text-center">
                  <Text strong className="text-xl">
                    {forecast.temperature}°
                  </Text>
                  <br />
                  <Text type="secondary" className="capitalize">
                    {forecast.description}
                  </Text>
                </div>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ForecastList;
