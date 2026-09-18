import { ImageResponse } from "next/og";

export const alt = "ISGC — Ingeniería en Sistemas y Gráficas Computacionales";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

const OpenGraphImage = () =>
  new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #8a1538 0%, #70112e 100%)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
      }}
    >
      <p
        style={{
          color: "#b08d4f",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.2em",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        ISGC
      </p>
      <p
        style={{
          color: "#f7f4ee",
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.15,
          margin: "32px 0 0",
          maxWidth: 900,
          textAlign: "center",
        }}
      >
        Ingeniería en Sistemas y Gráficas Computacionales
      </p>
      <p
        style={{
          color: "#e2c58f",
          fontSize: 28,
          margin: "24px 0 0",
        }}
      >
        Universidad Panamericana · Guadalajara
      </p>
    </div>,
    { ...size }
  );

export default OpenGraphImage;
