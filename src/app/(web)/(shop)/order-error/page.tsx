import React from "react";

import { Button } from "@/ui";

const Page: React.FC<PageProps<"/order-error">> = () => (
  <div className="error">
    <h1 className="error__title">Objednávka nenalezena</h1>

    <img
      alt="Failed."
      className="error__image"
      src="/images/failed_img.png"
    />

    <Button href="/">Hlavní stránka</Button>
  </div>
);

export default Page;
