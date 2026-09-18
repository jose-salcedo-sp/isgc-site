import { ImageResponse } from "next/og";

import { getDictionary } from "@/lib/dictionary";
import { defaultLocale, hasLocale } from "@/lib/i18n";

export const alt = "ISGC";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

const OpenGraphImage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : defaultLocale);

  return new ImageResponse(
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
        {dict.pages.home.hero.title.replace(/\.$/u, "")}
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
};

export default OpenGraphImage;
