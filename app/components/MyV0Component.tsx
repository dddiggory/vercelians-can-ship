// you can overwrite this entire file with your v0 Component.
// just copy and paste the "React" output over the entire file.

import Link from "next/link";
import React from "react";
import {V0Logo} from "./symbols";

function TestComponent() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <h3
        style={{
          maxWidth: "11em",
        }}
      >
        This would be a pretty good place for a{" "}
        <Link href="https://v0.dev/" target="_blank" rel="noopener noreferrer">
          v0 component
        </Link>
        , wouldn't it?
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <p
          style={{
            maxWidth: "20em",
          }}
        >
          Go make one, then paste it into{" "}
          <code
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              fontSize: "0.95em",
              fontFeatureSettings: "'ss09'",
            }}
          >
            app/components/MyV0Component.tsx
          </code>
        </p>

        <V0Logo />
      </div>
    </div>
  );
}

export default TestComponent;
