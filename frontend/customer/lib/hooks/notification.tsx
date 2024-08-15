import { COLOR } from '@/constant/color';
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
    api[type]({
      message: (<b style={{color: COLOR.TEXT}}>{message}</b>),
      description: (<>
        {description.split("\n").map(e => { return (<>{e}<br /></>) })}
      </>)
    });
  };

  return { openNotificationWithIcon, contextHolder };
};

export default useAntNotification;