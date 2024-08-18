import React, { useEffect } from "react";
import { ChildrenComponentProps } from "../../types/children";
import styles from "./homepage.module.css";

import { Button, Card, Flex, Space, Typography } from "antd";
import { COLOR } from "../../constant/color";

import Route_1 from "../../public/images/homepage/route_1.jpg";
import Route_4 from "../../public/images/homepage/route_4.jpg";
import Route_3 from "../../public/images/homepage/route_3.jpg";

import Shipday from "../../public/images/homepage/shipday.jpg";
import Map from "../../public/images/homepage/map.jpg";
import Circuit from "../../public/images/homepage/circuit.jpg";
import Routific from "../../public/images/homepage/routific.png";
import Clickup from "../../public/images/homepage/click_up.png";
import RouteManager from "../../public/images/homepage/route_manager.png";
import RouteDescription from "../../public/images/homepage/routing.jpg";
import RightArrow from "../../public/svg/homepage/right_arrow.svg";
import Tung from "../../public/images/homepage/tung_2.jpg";
import Huy from "../../public/images/homepage/huy.jpg";
import Social from "../../public/images/footer/social.png";
import PhoneIcon from "../../public/svg/homepage/phone.svg";
import EmailIcon from "../../public/svg/homepage/email.svg";
import BuildingIcon from "../../public/svg/homepage/building.svg";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { URL } from "@/constant/url";

const { Title, Text, Paragraph } = Typography;

const HompageComponent: React.FC = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(URL.LOGIN);
  };

  return (
    <div className={styles["wrapper"]}>
      {/* Title */}
      <div className={styles["title-container"]}>
        <h5 className={styles["for-top-title-header"]}>
          For shipping route management services
        </h5>

        <Title
          style={{
            fontSize: "4.5rem",
            marginTop: "2rem",
            fontWeight: 700,
            color: COLOR.TEXT,
          }}
        >
          Be the best route management business in your town
        </Title>

        <Paragraph
          style={{
            fontSize: "1.3rem",
            marginTop: "2.2rem",
          }}
        >
          Offering advanced shipping route planning and tracking for efficient
          deliveries
        </Paragraph>

        <Button
          onClick={clickHandler}
          type="primary"
          style={{
            margin: "2rem",
            fontSize: "1.2rem",
            padding: "1.8rem 2.7rem",
            border: "none",
          }}
        >
          Get started
        </Button>
      </div>

      {/* Routing images */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          margin: "3.5rem auto 0 auto",
          width: "66rem",
        }}
      >
        <img
          className={styles["img-routing"]}
          src={Route_1.src}
          alt="route-1"
        />
        <img
          className={styles["img-routing"]}
          src={Route_4.src}
          alt="route-4"
        />
        <img
          className={styles["img-routing"]}
          src={Route_3.src}
          alt="route-3"
        />
      </Flex>

      {/* Similar websites */}
      <div className={styles["similar-website-container"]}>
        <Title
          style={{
            fontSize: "2rem",
            marginTop: "6rem",
            fontWeight: 700,
            color: COLOR.TEXT,
          }}
        >
          {" "}
          Similar websites
        </Title>

        <Flex
          justify="center"
          align="center"
          style={{
            marginTop: "3rem",
            gap: "3rem",
          }}
        >
          <img
            className={styles["img-website"]}
            src={Shipday.src}
            alt="shipday"
          />
          <img
            className={styles["img-website"]}
            src={Circuit.src}
            alt="circuit"
          />
          <img
            className={styles["img-website"]}
            src={Routific.src}
            alt="routific"
          />
          <img
            className={styles["img-website"]}
            src={Clickup.src}
            alt="clickup"
          />
          <img
            className={styles["img-website"]}
            src={RouteManager.src}
            alt="route-manager"
          />
        </Flex>
      </div>

      {/* Description customers*/}
      <div
        className={styles["description-container"]}
        style={{ marginTop: "6rem", border: "2px solid #dee2e6" }}
      >
        <img
          className={styles["img-container-customer"]}
          src={Map.src}
          alt="route-description"
        />
        <div className={styles["content-container-customer"]}>
          <div className={styles["for-customer-container"]}>
            <h5 className={styles["for-customer-header"]}>For customers</h5>
          </div>

          <Title
            style={{
              fontSize: "2.6rem",
              fontWeight: 700,
              color: COLOR.TEXT,
              textAlign: "left",
              marginTop: "2rem",
            }}
          >
            {" "}
            Simplified shipping route discovery through our website{" "}
          </Title>

          <Paragraph
            style={{
              fontSize: "1.2rem",
              marginTop: "2rem",
              textAlign: "left",
            }}
          >
            Instead of researching locations and estimating delivery times on
            mutiple platforms, you can now get everything through the website
            with complete information.
          </Paragraph>

          <Link href={URL.LOGIN}>
            <Flex align="center" style={{ gap: "1rem", marginTop: "4rem" }}>
              <Title
                level={5}
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.3rem",
                  textAlign: "left",
                  color: COLOR.PRIMARY,
                }}
              >
                Start viewing routes
              </Title>
              <img
                style={{ width: "1rem" }}
                src={RightArrow.src}
                alt="right-arrow"
              />
            </Flex>
          </Link>
        </div>
      </div>

      {/* Description managers*/}
      <div
        className={styles["description-container"]}
        style={{ marginTop: "6rem", border: "2px solid #dee2e6" }}
      >
        <div className={styles["content-container"]}>
          <div className={styles["for-customer-container"]}>
            <h5 className={styles["for-customer-header"]}>For managers</h5>
          </div>

          <Title
            style={{
              fontSize: "2.6rem",
              fontWeight: 700,
              color: COLOR.TEXT,
              textAlign: "left",
              marginTop: "2rem",
            }}
          >
            {" "}
            Streamlined route planning with user-friendly creation tools
          </Title>

          <Paragraph
            style={{
              fontSize: "1.2rem",
              marginTop: "2rem",
              textAlign: "left",
            }}
          >
            Effortlessly design and manage routes with our intuitive and
            accessible tools, crafted to simplify your planning process and
            improve operational efficiency.
          </Paragraph>

          <Link href={URL.LOGIN}>
            <Flex align="center" style={{ gap: "1rem", marginTop: "4rem" }}>
              <Title
                level={5}
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.3rem",
                  textAlign: "left",
                  color: COLOR.PRIMARY,
                }}
              >
                Start creating routes
              </Title>
              <img
                style={{ width: "1rem" }}
                src={RightArrow.src}
                alt="right-arrow"
              />
            </Flex>
          </Link>
        </div>
        <img
          className={styles["img-container"]}
          src={RouteDescription.src}
          alt="route-description"
        />
      </div>

      {/* Support */}
      <div className={styles["support-container"]}>
        <div className={styles["support-content"]}>
          <Title
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: COLOR.TEXT,
            }}
          >
            Always-Available Support
          </Title>

          <Paragraph
            style={{
              fontSize: "1.2rem",
              marginTop: "2rem",
              marginBottom: "0",
            }}
          >
            {" "}
            24/7 Support Across All Channels: Reliable Assistance Anytime,
            Anywhere.
          </Paragraph>

          <Flex
            justify="center"
            align="center"
            style={{ margin: "4.5rem auto 0 auto" }}
          >
            <div className={styles["team-card"]}>
              <img
                style={{ width: "11%" }}
                className={styles["icon-support"]}
                src={PhoneIcon.src}
                alt="tung"
              />
              <Title
                level={5}
                style={{ color: COLOR.TEXT, marginTop: "1.5rem" }}
              >
                Phone support
              </Title>
              <Paragraph style={{ margin: 0 }}>0602249017</Paragraph>
            </div>

            <div className={styles["team-card"]}>
              <img
                style={{ width: "12%" }}
                className={styles["icon-support"]}
                src={EmailIcon.src}
                alt="tung"
              />
              <Title
                level={5}
                style={{ color: COLOR.TEXT, marginTop: "1.5rem" }}
              >
                Email support
              </Title>
              <Paragraph style={{ margin: 0 }}>
                support.srouting@gmail.com
              </Paragraph>
            </div>

            <div className={styles["team-card"]}>
              <img
                style={{ width: "9%" }}
                className={styles["icon-support"]}
                src={BuildingIcon.src}
                alt="tung"
              />
              <Title
                level={5}
                style={{ color: COLOR.TEXT, marginTop: "1.5rem" }}
              >
                Meet at the office
              </Title>
              <Paragraph style={{ margin: 0 }}>
                1234 Main Street, Suite 567
              </Paragraph>
            </div>
          </Flex>
        </div>
      </div>

      {/* Our team */}
      <div className={styles["team-container"]}>
        <Title
          style={{
            fontSize: "3rem",
            marginTop: "6rem",
            fontWeight: 700,
            color: COLOR.TEXT,
          }}
        >
          Our Amazing Team
        </Title>

        <Paragraph
          style={{
            fontSize: "1.2rem",
            marginTop: "2rem",
            marginBottom: "0",
          }}
        >
          {" "}
          Welcome to the team! We are a group of passionate individuals working
          together to achieve our goals.
        </Paragraph>

        <Paragraph
          style={{
            fontSize: "1.2rem",
            // marginTop: "2rem",
          }}
        >
          Get to know the faces behind our project.
        </Paragraph>

        {/* Team members */}
        <Flex
          justify="center"
          align="flex-start"
          style={{ marginTop: "4.5rem", gap: "8rem" }}
        >
          <div className={styles["team-card"]}>
            <img className={styles["avatar"]} src={Tung.src} alt="tung" />
            <Title level={5} style={{ marginTop: "2rem", color: COLOR.TEXT }}>
              Le Huynh Phuong Tung
            </Title>
            <Paragraph
              style={{ marginTop: "0", fontSize: "1rem", color: "grey" }}
            >
              Lead Developer
            </Paragraph>
            <Paragraph>
              Tung is a software engineer with a passion for creating innovative
              and efficient solutions to complex problem.
            </Paragraph>
            <img
              style={{ margin: "1.5rem auto 0 auto" }}
              width={190}
              alt="credit_cert"
              src={Social.src}
            />
          </div>

          <div className={styles["team-card"]}>
            <img className={styles["avatar"]} src={Huy.src} alt="tung" />
            <Title level={5} style={{ marginTop: "2rem", color: COLOR.TEXT }}>
              Tran Dam Gia Huy
            </Title>
            <Paragraph
              style={{ marginTop: "0", fontSize: "1rem", color: "grey" }}
            >
              Fullstack Website Developer
            </Paragraph>
            <Paragraph>
              Huy is a full-stack website developer skilled in building both
              intuitive front-end interfaces and scalable back-end solutions.
            </Paragraph>
            <img
              style={{ margin: "1.5rem auto 0 auto" }}
              width={190}
              alt="credit_cert"
              src={Social.src}
            />
          </div>
        </Flex>
      </div>

      {/* Get started */}
      <div className={styles["get-started-container"]}>
        <Flex
          justify="space-between"
          align="center"
          style={{ gap: "2rem", width: "85%" }}
        >
          <div>
            <h1 className={styles["get-started-header"]}>
              Ready to get started?
            </h1>
            <Paragraph
              style={{
                fontSize: "1.3rem",
                marginTop: "1.5rem",
                textAlign: "left",
                color: "white",
              }}
            >
              Set up your account, then oversee and monitor your routes
            </Paragraph>
          </div>

          <Button
            onClick={clickHandler}
            type="primary"
            style={{
              fontSize: "1.2rem",
              padding: "2rem 2.7rem",
              border: "none",
              color: COLOR.TEXT,
              fontWeight: 600,
              background:
                "linear-gradient(90deg, hsla(191, 88%, 81%, 1) 0%, hsla(260, 72%, 82%, 1) 50%, hsla(247, 73%, 69%, 1) 100%)",
            }}
          >
            Get started
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default HompageComponent;
