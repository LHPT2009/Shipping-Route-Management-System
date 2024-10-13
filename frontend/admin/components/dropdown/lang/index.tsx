import React from "react";
import { Select } from "antd";
import Image, { StaticImageData } from "next/image";
import Vietnam from "@/public/country/Vietnam.png";
import America from "@/public/country/America.png";

type LanguageList = {
  [key: string]: {
    nativeName: string;
    image: StaticImageData;
  };
};

const listLanguage: LanguageList = {
  vn: { nativeName: "Vietnam", image: Vietnam },
  en: { nativeName: "English", image: America },
};

const langComponent = () => {
  return (
    <>
      <Select
        defaultValue="vn"
        style={{ width: 80, height: 50, top: "12px" }}
        onChange={(value) => {
        }}
      >
        {Object.keys(listLanguage).map((lng) => (
          <Select.Option key={lng} value={lng}>
            <Image
              src={listLanguage[lng].image}
              alt=""
              style={{ height: "30px", width: "40px" }}
            />
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
export default langComponent;
