import React from "react";
import { Modal } from "antd";
import MapComponent from "@/components/route/map";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  departure: number[];
  arrival: number[];
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, departure, arrival }) => {
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
      heightProps="35rem"
    />
  </Modal>
}


export default CustomModal;
