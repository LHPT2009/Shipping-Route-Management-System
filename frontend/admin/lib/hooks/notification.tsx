import { COLOR } from '@/constant/color';
import { CheckCircleFilled, CloseCircleFilled, SmileOutlined } from '@ant-design/icons';
import { Button, notification, Space } from 'antd';
import { useState } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useAntNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    notification.open({
      message: (<b style={{ color: COLOR.TEXT }}>{message}</b>),
      description: (<>
        {description.split("\n").map(e => { return (<>{e}<br /></>) })}
      </>),
      style: { borderRadius: 10 },
      icon: type === "success" ?
        <CheckCircleFilled style={{ color: COLOR.PRIMARY }} /> :
        <CloseCircleFilled style={{ color: "#f03e3e " }} />,
    });
  };

  return { openNotificationWithIcon, contextHolder };
};

export default useAntNotification;