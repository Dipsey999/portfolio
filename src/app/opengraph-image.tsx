import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jizan K — Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5F0",
          backgroundImage:
            "radial-gradient(circle, #C4C4BA 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Code block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#1E1E1E",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            width: "520px",
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#2D2D2D",
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "7px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#FF5F57",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#FEBC2E",
                }}
              />
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#28C840",
                }}
              />
            </div>
            <span
              style={{
                color: "#808080",
                fontSize: "12px",
                fontFamily: "monospace",
                marginLeft: "6px",
              }}
            >
              jizan.config.ts
            </span>
          </div>

          {/* Code content */}
          <div
            style={{
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "16px",
              lineHeight: "1.8",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#6A9955", fontStyle: "italic" }}>
              // craft({"{"} design, code {"}"})
            </span>
            <span>
              <span style={{ color: "#C586C0" }}>export default</span>
              <span style={{ color: "#D4D4D4" }}> {"{"}</span>
            </span>
            <span>
              <span style={{ color: "#D4D4D4" }}>{"  "}</span>
              <span style={{ color: "#9CDCFE" }}>name</span>
              <span style={{ color: "#808080" }}>: </span>
              <span style={{ color: "#CE9178" }}>&quot;Jizan K&quot;</span>
            </span>
            <span>
              <span style={{ color: "#D4D4D4" }}>{"  "}</span>
              <span style={{ color: "#9CDCFE" }}>role</span>
              <span style={{ color: "#808080" }}>: </span>
              <span style={{ color: "#CE9178" }}>
                &quot;Design Engineer&quot;
              </span>
            </span>
            <span>
              <span style={{ color: "#D4D4D4" }}>{"  "}</span>
              <span style={{ color: "#9CDCFE" }}>at</span>
              <span style={{ color: "#808080" }}>: </span>
              <span style={{ color: "#CE9178" }}>&quot;Recotap&quot;</span>
            </span>
            <span style={{ color: "#D4D4D4" }}>{"}"}</span>
          </div>
        </div>

        {/* Yellow sticky */}
        <div
          style={{
            position: "absolute",
            right: "180px",
            top: "120px",
            background: "#FEF3B7",
            padding: "14px 18px",
            borderRadius: "3px",
            transform: "rotate(2deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "13px",
            color: "rgba(27,27,24,0.6)",
            maxWidth: "180px",
            lineHeight: "1.5",
          }}
        >
          I design products and then build them.
        </div>

        {/* Green sticky */}
        <div
          style={{
            position: "absolute",
            left: "160px",
            bottom: "130px",
            background: "#C4E8C2",
            padding: "12px 16px",
            borderRadius: "3px",
            transform: "rotate(-1.5deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "12px",
            color: "rgba(27,27,24,0.5)",
            fontFamily: "monospace",
          }}
        >
          systems + product + brand + code
        </div>

        {/* Bottom toolbar */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "#2C2C2C",
            borderRadius: "12px",
            padding: "8px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: "13px",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.12)",
            }}
          >
            ~/jizan
          </span>
          <span
            style={{
              width: "1px",
              height: "16px",
              background: "rgba(255,255,255,0.1)",
              margin: "0 6px",
            }}
          />
          <span style={{ color: "#999", fontSize: "13px", padding: "4px 10px" }}>
            Work
          </span>
          <span style={{ color: "#999", fontSize: "13px", padding: "4px 10px" }}>
            About
          </span>
          <span style={{ color: "#999", fontSize: "13px", padding: "4px 10px" }}>
            Contact
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
