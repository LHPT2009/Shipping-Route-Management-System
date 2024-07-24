import React from "react";
import { Select } from 'antd';
import Image from "next/image";
import Vietnam from "@/public/country/Vietnam.png"
import America from "@/public/country/America.png"
import Korea from "@/public/country/Korea.png"

const langComponent = () => {
  return (
    <>
      <Select
      defaultValue="1"
      style={{ width: 80,height:50 ,top:"12px"}}
    >
      <Select.Option value="1"><Image src={Vietnam} alt="" style={{height:"30px",width:"40px"}}/></Select.Option>
      <Select.Option value="2"><Image src={America} alt="" style={{height:"30px",width:"40px"}}/></Select.Option>
      <Select.Option value="3"><Image src={Korea} alt="" style={{height:"30px",width:"40px"}}/></Select.Option>
    </Select>
    </>
  );
};
export default langComponent;
