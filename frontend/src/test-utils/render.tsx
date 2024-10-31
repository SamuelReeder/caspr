import React from "react";
import { render } from "@testing-library/react";
import { Providers } from "@/app/providers";

const customRender = (ui: React.ReactElement) => {
  return render(<Providers>{ui}</Providers>);
};

export default customRender;