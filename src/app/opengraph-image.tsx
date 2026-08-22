import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "NovaServe – Modern Cloud Infrastructure Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#07060A",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255, 176, 32, 0.18) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(255, 176, 32, 0.08) 0%, transparent 40%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "#FFB020",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(255, 176, 32, 0.4)",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: "4px solid #000000",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              NovaServe
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 176, 32, 0.1)",
              border: "1px solid rgba(255, 176, 32, 0.3)",
              color: "#FFB020",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            <span>novaserve.cloud</span>
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "950px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            Cloud Infrastructure for Developers
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#9CA3AF",
              fontWeight: 500,
            }}
          >
            Deploy, manage, and scale cloud applications across providers with
            deterministic AST compilation and zero-drift state guarantees.
          </div>
        </div>

        {/* Bottom Footer / Creator Attribution */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "16px",
              color: "#D1D5DB",
              fontFamily: "monospace",
            }}
          >
            <span>⚡ Multi-Cloud Engine</span>
            <span>🔒 Zero-Drift IAM</span>
            <span>🚀 Pure TypeScript</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
              color: "#9CA3AF",
            }}
          >
            <span>Created by</span>
            <span
              style={{
                color: "#FFB020",
                fontWeight: 700,
              }}
            >
              Md Shadab Azam Ansari
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
