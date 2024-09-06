import React from "react";
import { Modal } from "antd";
import MapComponent from "@/components/route/map";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  departure: number[];
  arrival: number[];
  departureLocation: string;
  arrivalLocation: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, departure, arrival, departureLocation, arrivalLocation }) => {
  console.log(departureLocation)
  console.log(arrivalLocation)
  return <Modal
    footer={null}
    onCancel={onClose}
    closable={false}
    open={open}
    style={{ height: "35rem", top: 20 }}
    width={800}
  >
    <MapComponent
      isShowDirection={true}
      departure={departure}
      arrival={arrival}
      departureLocation={departureLocation}
      arrivalLocation={departureLocation}
      heightProps="35rem"
    />
  </Modal>
}


export default CustomModal;
