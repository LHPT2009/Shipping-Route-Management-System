import React from "react";
import { Modal } from "antd";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose }) => (
  <Modal
    title="Modal 1000px width"
    centered
    open={open}
    onOk={onClose}
    onCancel={onClose}
    width={1000}
  >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </Modal>
);

export default CustomModal;
