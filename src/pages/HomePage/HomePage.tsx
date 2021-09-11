import React from "react";
import { Page } from "../../components/Page/Page";
import ShopPage from "../ShopPage/ShopPage";

export function HomePage() {
  return (
    <>
      <Page title="Build Great Games">
        <ShopPage />
      </Page>
    </>
  );
}

export default HomePage;
