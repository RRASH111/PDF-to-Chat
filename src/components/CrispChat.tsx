"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("3d1748b1-735b-4a44-9e02-1dfa9f520100");
  });

  return null;
};

export default CrispChat;
