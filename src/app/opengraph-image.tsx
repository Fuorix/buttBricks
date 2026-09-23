import { ImageResponse } from 'next/og';

/**
 * Default social share card, used for any route that does not define its own.
 *
 * Deliberately built from system fonts and flat colour: ImageResponse has no
 * access to next/font, and fetching a webfont at render time is a failure mode
 * we do not want on a card that must always produce an image.
 */

export const alt = "Butt Bricks, Pakistan's premier brick manufacturer since 1979";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Brand tokens, mirrored from globals.css (CSS variables are not available here).
const CHARCOAL = '#1c1b1b';
const TERRACOTTA = '#8b3a2a';
const TERRACOTTA_LIGHT = '#ffb4a5';
const CREAM = '#fcf9f8';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: CHARCOAL,
          // Subtle running-bond brick pattern behind the wordmark.
          backgroundImage: `linear-gradient(90deg, ${TERRACOTTA}22 1px, transparent 1px), linear-gradient(${TERRACOTTA}22 1px, transparent 1px)`,
          backgroundSize: '120px 60px',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 18,
              height: 72,
              backgroundColor: TERRACOTTA,
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              letterSpacing: 14,
              color: CREAM,
              fontWeight: 700,
            }}
          >
            BUTT BRICKS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 78,
              lineHeight: 1.05,
              color: CREAM,
              fontWeight: 700,
              maxWidth: 940,
            }}
          >
            Pakistan&apos;s Premier Brick Manufacturer
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: TERRACOTTA_LIGHT,
              maxWidth: 900,
            }}
          >
            Face bricks, gutka, architectural tiles, floor designs and khaprail.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `2px solid ${TERRACOTTA}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: CREAM }}>
            EST. 1979
          </div>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: CREAM, opacity: 0.7 }}>
            LAHORE, PAKISTAN
          </div>
        </div>
      </div>
    ),
    size
  );
}
