"use client";

// import type { RootState } from "../lib/store/index";
// import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
// import { counterActions } from "../lib/store/counter";
import LayoutComponent from "@/components/layout/client";
import BodyComponent from "@/components/body";
import MenuComponent from "@/components/menu";
import { getValueFromScreen, useScreenWidth } from "@/utils/screenUtils";

export default function Home() {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  // const dispatch = useAppDispatch();

  const screenWidth = useScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = getValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );

  return (
    <div>
      <LayoutComponent>
        {!responsive ? (
          <MenuComponent
            mode="horizontal"
            responsive={responsive}
            defaultSelectedKeys={["1"]}
          />
        ) : (
          <></>
        )}
        <BodyComponent>asdas</BodyComponent>
      </LayoutComponent>
    </div>
  );
}
