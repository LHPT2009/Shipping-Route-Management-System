import React from "react";
import { ChildrenComponentProps } from "../../types/children";
import styles from './homepage.module.css';

import { Button, Space, Typography } from 'antd';
import { COLOR } from "../../constant/color";

const { Title, Text, Paragraph } = Typography;

const HompageComponent: React.FC = () => {
    return (
        <div className={styles['wrapper']}>

            <div className={styles['body-container']}>
                <Title level={4} style={{ color: COLOR.PRIMARY }}>For route management services</Title>

                <Title style={{
                    fontSize: "4.5rem",
                    marginTop: "1rem",
                    fontWeight: 700,
                    color: COLOR.TEXT
                }}>Be the best route management business in your town</Title>

                <Paragraph style={{
                    fontSize: "1.3rem",
                    marginTop: "2.2rem"
                }}>Offering advanced route planning and tracking for efficient deliveries</Paragraph>

                <Button type="primary" style={{
                    margin: "2rem",
                    fontSize: "1.2rem",
                    padding: "1.6rem 2.7rem",
                }}>Get started</Button>
                
            </div>

        </div>
    );
};

export default HompageComponent;
