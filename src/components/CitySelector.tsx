import React from "react";

import { Select } from "antd";

const { Option } = Select;

const cities = [
  "London",
  "New York",
  "Tokyo",
  "Sydney",
  "Cairo",
  "Paris",
  "Tashkent",
];

const CitySelector: React.FC<{ onCityChange: (city: string) => void }> = ({
  onCityChange,
}) => {
  return (
    <div className="mb-4">
      <Select
        showSearch
        style={{ width: "100%", height: "40px" }}
        placeholder="Select a city"
        onChange={onCityChange}
        filterOption={(input, option) =>
          (option?.children as unknown as string)
            ?.toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
        // className="!min-h-34"
        className="bg-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500  "
      >
        {cities.map((city) => (
          <Option key={city} value={city}>
            {city}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CitySelector;
