'use client';

/**
 * Last-resort boundary. It replaces the root layout when active, so it must
 * supply its own <html> and <body>.
 *
 * Everything here is deliberately self-contained: no CSS modules, no fonts, no
 * component imports. If global CSS or the font pipeline is what failed, any
 * dependency would fail with it and leave the visitor with a blank page.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fcf9f8',
          color: '#1c1b1b',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: '24px',
        }}
      >
        <title>Something went wrong | Butt Bricks</title>

        <main style={{ maxWidth: '520px', textAlign: 'center' }}>
          <p
            style={{
              margin: '0 0 16px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6d2416',
            }}
          >
            Butt Bricks
          </p>

          <h1 style={{ margin: '0 0 16px', fontSize: '32px', lineHeight: 1.2, fontWeight: 700 }}>
            Something went wrong.
          </h1>

          <p style={{ margin: '0 0 28px', fontSize: '16px', lineHeight: 1.6, color: '#5f5e5e' }}>
            The site hit an unexpected problem. Please try again, or reload the page if the issue
            continues.
          </p>

          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              appearance: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 28px',
              borderRadius: '0.25rem',
              backgroundColor: '#6d2416',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
            }}
          >
            Try Again
          </button>

          {error.digest && (
            <p style={{ margin: '24px 0 0', fontSize: '12px', color: '#71717a', wordBreak: 'break-all' }}>
              Reference code: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
