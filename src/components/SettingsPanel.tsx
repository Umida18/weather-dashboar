import React from "react";

import { Form, Switch, InputNumber, Select } from "antd";

import { useTheme } from "../contexts/ThemeContext";

const { Option } = Select;

interface Settings {
  units: "celsius" | "fahrenheit";
  refreshRate: number;
  darkMode: boolean;
}

interface SettingsPanelProps {
  onSettingsChange: (settings: Partial<Settings>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange }) => {
  const [form] = Form.useForm();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    onSettingsChange(values);
  };

  const handleDarkModeChange = (checked: boolean) => {
    toggleDarkMode();
    onSettingsChange({ darkMode: checked });
  };

  return (
    <div className="py-6">
      <Form form={form} onValuesChange={handleValuesChange} layout="vertical">
        <Form.Item
          label="Units"
          name="units"
          initialValue="celsius"
          style={{ paddingTop: "20px" }}
        >
          <Select>
            <Option value="celsius">Celsius</Option>
            <Option value="fahrenheit">Fahrenheit</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Refresh Rate (seconds)"
          name="refreshRate"
          initialValue={60}
        >
          <InputNumber min={30} max={300} />
        </Form.Item>
        <Form.Item
          label="Dark Mode"
          name="darkMode"
          valuePropName="checked"
          initialValue={darkMode}
        >
          <Switch checked={darkMode} onChange={handleDarkModeChange} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPanel;
