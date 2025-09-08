"use client";

import Link from "next/link";
import React from "react";

const LandingPageComponent = () => {
  return (
    <section>
      LandingPageComponent
      <Link href="/auth/signin">Sign In</Link>
    </section>
  );
};

export default LandingPageComponent;
