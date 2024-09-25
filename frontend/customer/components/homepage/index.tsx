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
import { fetchCookies } from "@/utils/token/fetch_cookies.token";

const { Title, Text, Paragraph } = Typography;

const HompageComponent: React.FC = () => {
  const router = useRouter();

  const clickHandler = async () => {
    const { accessToken, expiresIn } = await fetchCookies();
    if (accessToken && expiresIn) {
      router.push(URL.ROUTE);
    } else {
      router.push(URL.REGISTER);
    }
  };

  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  return (
    <div className={styles["wrapper"]}>
      {/* Title */}
      <div className={styles["title-container"]}>
        <h5 className={styles["for-top-title-header"]}>
          For shipping route management services
        </h5>

        <Title
          style={{
            fontSize: responsive ? "2.2rem" : "4.5rem",
            marginTop: "2rem",
            fontWeight: 700,
            color: COLOR.TEXT,
          }}
        >
          Be the best route management business in your area
        </Title>

        <Paragraph
          style={{
            fontSize: responsive ? "1rem" : "1.3rem",
            marginTop: "2.2rem",
          }}
        >
          Offering advanced shipping route planning and tracking for efficient
          deliveries
        </Paragraph>

        <Button
          onClick={clickHandler}
          type="primary"
          style={responsive ? {
            margin: "2rem",
            fontSize: "1rem",
            padding: "1.5rem 2.3rem",
            border: "none",
          } : {
            margin: "2rem",
            fontSize: "1.2rem",
            padding: "1.8rem 2.7rem",
            border: "none",
          }
          }
        >
          Get started
        </Button>
      </div>

      {/* Routing images */}
      <Flex
        vertical={responsive}
        gap={responsive ? "2.5rem" : "0"}
        justify="space-between"
        align="center"
        style={responsive ? {
          margin: "0 auto",
          width: "100%",
          padding: "2rem"
        } : {
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
            fontSize: responsive ? "1.8rem" : "2rem",
            marginTop: responsive ? "3rem" : "6rem",
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
            flexWrap: responsive ? "wrap" : "nowrap",
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
        style={{
          marginTop: "5rem",
          padding: "1rem"
        }}
      >
        {responsive ?
          <div style={{
            border: responsive ? "2px solid #dee2e6" : "none",
            borderRadius: "1.5rem",
            paddingBottom: "1rem"
          }}>
            <img
              className={styles["img-container"]}
              src={Map.src}
              alt="route-description"
            />
            <div className={styles["content-container"]}>
              <div className={styles["for-customer-container"]}>
                <h5 className={styles["for-customer-header"]}>For customers</h5>
              </div>

              <Title
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: COLOR.TEXT,
                  textAlign: "left",
                  marginTop: "2rem",
                }}
              >
                {" "}
                Simplified shipping route discovery through our website
              </Title>

              <Paragraph
                style={{
                  fontSize: "1rem",
                  marginTop: "2rem",
                  textAlign: "left",
                }}
              >
                Instead of researching locations and estimating delivery times on
                mutiple platforms, you can now get everything through the website
                with complete information.
              </Paragraph>

              <Flex align="center" style={{ gap: "1rem", marginTop: "2.5rem" }} onClick={clickHandler}>
                <Title
                  level={5}
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.3rem",
                    textAlign: "left",
                    color: COLOR.PRIMARY,
                  }}
                >
                  Start viewing routes
                </Title>
                <img
                  style={{ width: "0.9rem" }}
                  src={RightArrow.src}
                  alt="right-arrow"
                />
              </Flex>

            </div>
          </div> :
          <div style={{ display: "flex", border: "2px solid #dee2e6", borderRadius: "1.7rem" }}>
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
                Simplified shipping route discovery through our website
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


              <Flex align="center" style={{ gap: "1rem", marginTop: "4rem" }} onClick={clickHandler}>
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
            </div>
          </div>
        }

      </div>

      {/* Description managers*/}
      <div
        className={styles["description-container"]}
        style={{
          marginTop: responsive ? "2rem" : "6rem",
          padding: "1rem",
        }}
      >
        {responsive ?
          <div style={{
            border: responsive ? "2px solid #dee2e6" : "none",
            borderRadius: "1.5rem",
            paddingBottom: "1rem"
          }}>
            <img
              className={styles["img-container"]}
              src={RouteDescription.src}
              alt="route-description"
            />
            <div className={styles["content-container"]}>
              <div className={styles["for-customer-container"]}>
                <h5 className={styles["for-customer-header"]}>For managers</h5>
              </div>

              <Title
                style={{
                  fontSize: "1.8rem",
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
                  fontSize: "1rem",
                  marginTop: "2rem",
                  textAlign: "left",
                }}
              >
                Effortlessly design and manage routes with our intuitive and
                accessible tools, crafted to simplify your planning process and
                improve operational efficiency.
              </Paragraph>

              <Link href={"http://localhost:4000"}>
                <Flex align="center" style={{ gap: "1rem", marginTop: "2.5rem" }}>
                  <Title
                    level={5}
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "0.3rem",
                      textAlign: "left",
                      color: COLOR.PRIMARY,
                    }}
                  >
                    Start creating routes
                  </Title>
                  <img
                    style={{ width: "0.9rem" }}
                    src={RightArrow.src}
                    alt="right-arrow"
                  />
                </Flex>
              </Link>
            </div>
          </div> :
          <div style={{ display: "flex", border: "2px solid #dee2e6", borderRadius: "1.7rem" }}>
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

              <Link href={"http://localhost:4000"}>
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
        }

      </div>

      {/* Support */}
      <div className={styles["support-container"]}>
        <div className={styles["support-content"]}>
          <Title
            style={{
              fontSize: responsive ? "1.6rem" : "3rem",
              fontWeight: 700,
              color: COLOR.TEXT,
            }}
          >
            Always-Available Support
          </Title>

          <Paragraph
            style={{
              fontSize: responsive ? "1.1rem" : "1.2rem",
              marginTop: "2rem",
              marginBottom: "0",
            }}
          >
            {" "}
            24/7 Support Across All Channels: Reliable Assistance Anytime, Anywhere.
          </Paragraph>

          <Flex
            vertical={responsive}
            justify="center"
            align="center"
            style={{ margin: responsive ? "3.5rem auto 0 auto" : "4.5rem auto 0 auto" }}
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
                style={{ color: COLOR.TEXT, marginTop: responsive ? "1rem" : "1.5rem" }}
              >
                Phone support
              </Title>
              <Paragraph style={{ marginBottom: responsive ? "3rem" : "0" }}>0602249017</Paragraph>
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
                style={{ color: COLOR.TEXT, marginTop: responsive ? "1rem" : "1.5rem" }}
              >
                Email support
              </Title>
              <Paragraph style={{ marginBottom: responsive ? "3rem" : "0" }}>
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
                style={{ color: COLOR.TEXT, marginTop: responsive ? "1rem" : "1.5rem" }}
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
            fontSize: responsive ? "2rem" : "3rem",
            marginTop: responsive ? "4rem" : "6rem",
            fontWeight: 700,
            color: COLOR.TEXT,
          }}
        >
          Our Amazing Team
        </Title>

        <Paragraph
          style={{
            fontSize: responsive ? "1.1rem" : "1.2rem",
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
            fontSize: responsive ? "1.1rem" : "1.2rem",
          }}
        >
          Get to know the faces behind our project.
        </Paragraph>

        {/* Team members */}
        <Flex
          vertical={responsive}
          justify="center"
          align={responsive ? "center" : "flex-start"}
          style={{ marginTop: responsive ? "3.5rem" : "4.5rem", gap: responsive ? "4rem" : "8rem" }}
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
          vertical={responsive}
          justify="space-between"
          align="center"
          style={{ gap: "2rem", width: responsive ? "90%" : "85%" }}
        >
          <div>
            <h1 className={styles["get-started-header"]}>
              Ready to get started?
            </h1>
            <Paragraph
              style={{
                fontSize: responsive ? "1.1rem" : "1.3rem",
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
              fontSize: responsive ? "1.1rem" : "1.2rem",
              padding: responsive ? "1.55rem 2.2rem" : "2rem 2.7rem",
              width: responsive ? "100%" : "auto",
              marginBottom: responsive ? "1rem" : "0",
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
