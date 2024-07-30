import React from "react";
import { ChildrenComponentProps } from "../../types/children";
import { redirect } from 'next/navigation'
import styles from './homepage.module.css';

import { Button, Flex, Space, Typography } from 'antd';
import { COLOR } from "../../constant/color";

import Route_1 from '../../public/images/homepage/route_1.jpg';
import Route_4 from '../../public/images/homepage/route_4.jpg';
import Route_3 from '../../public/images/homepage/route_3.jpg';

import Shipday from '../../public/images/homepage/shipday.jpg';
import Circuit from '../../public/images/homepage/circuit.jpg';
import Routific from '../../public/images/homepage/routific.png';
import Clickup from '../../public/images/homepage/click_up.png';
import RouteManager from '../../public/images/homepage/route_manager.png';
import RouteDescription from '../../public/images/homepage/routing.jpg';
import RightArrow from '../../public/svg/homepage/right_arrow.svg';
import Link from "next/link";



const { Title, Text, Paragraph } = Typography;

const HompageComponent: React.FC = () => {
  return (
    <div className={styles['wrapper']}>

      <div className={styles['body-container']}>
        <Title level={4} style={{ color: COLOR.PRIMARY }}>For shipping route management services</Title>

        <Title style={{
          fontSize: "4.5rem",
          marginTop: "1rem",
          fontWeight: 700,
          color: COLOR.TEXT
        }}>Be the best route management business in your town</Title>

        <Paragraph style={{
          fontSize: "1.3rem",
          marginTop: "2.2rem"
        }}>Offering advanced shipping route planning and tracking for efficient deliveries</Paragraph>

        <Button type="primary" style={{
          margin: "2rem",
          fontSize: "1.2rem",
          padding: "1.6rem 2.7rem",
        }}>Get started</Button>

        <Flex justify="space-between" align="center" style={{
          marginTop: "3.5rem",
        }}>
          <img className={styles['img-routing']} src={Route_1.src} alt="route-1" />
          <img className={styles['img-routing']} src={Route_4.src} alt="route-4" />
          <img className={styles['img-routing']} src={Route_3.src} alt="route-3" />
        </Flex>

        <Title style={{
          fontSize: "2rem",
          marginTop: "5rem",
          fontWeight: 700,
          color: COLOR.TEXT
        }}> Similar websites</Title>

        <Flex justify="center" align="center" style={{
          marginTop: "3rem",
          gap: "3rem",
        }}>
          <img className={styles['img-website']} src={Shipday.src} alt="shipday" />
          <img className={styles['img-website']} src={Circuit.src} alt="circuit" />
          <img className={styles['img-website']} src={Routific.src} alt="routific" />
          <img className={styles['img-website']} src={Clickup.src} alt="clickup" />
          <img className={styles['img-website']} src={RouteManager.src} alt="route-manager" />
        </Flex>

        <div className={styles['description-container']}>
          <div className={styles['content-container']}>
            <Title style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: COLOR.TEXT,
              textAlign: "left"
            }}> Efficient deliveries through planning and tracking</Title>

            <Paragraph style={{
              fontSize: "1.2rem",
              marginTop: "3rem",
              textAlign: "left"
            }}>Instead of looking up locations and estimating travel times on Google, you can now track everything through the website with complete information and create corresponding routes.
            </Paragraph>

            <Link href="/auth/login">
              <Flex align="center" style={{ gap: "1rem", marginTop: "4rem", }}>
                <Title level={5}
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "0.3rem",
                    textAlign: "left",
                    color: COLOR.PRIMARY
                  }}>Start tracking routes</Title>
                <img style={{ width: "1rem" }} src={RightArrow.src} alt="right-arrow" />
              </Flex>
            </Link>
          </div>
          <img className={styles['img-container']} src={RouteDescription.src} alt="route-description" />
        </div>



      </div>

    </div>
  );
};

export default HompageComponent;
