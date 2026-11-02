import { ImageResponse } from 'next/og';
import { HERO, SITE } from '@/lib/profile';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Colours mirror the tokens in app/globals.css (--background, --primary, --foreground).
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    background: '#212121',
                    color: '#dedede',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ fontSize: 40, color: '#b5b5b5' }}>{SITE.name}</div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 120,
                        fontWeight: 800,
                        lineHeight: 1,
                        marginTop: 24,
                    }}
                >
                    <span style={{ color: '#00F050' }}>{HERO.titleTop}</span>
                    <span>{HERO.titleBottom}</span>
                </div>
                <div style={{ fontSize: 32, marginTop: 40, color: '#b5b5b5' }}>
                    Offline-first, AI and mobile money products for East Africa
                </div>
                <div style={{ fontSize: 28, marginTop: 'auto', color: '#00F050' }}>
                    ashelycole.dev
                </div>
            </div>
        ),
        size,
    );
}
