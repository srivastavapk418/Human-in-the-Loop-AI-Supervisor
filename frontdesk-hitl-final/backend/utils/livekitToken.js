// backend/utils/livekitToken.js
const { AccessToken, VideoGrant } = require('livekit-server-sdk');

async function issueLiveKitToken({ room, identity }) {
  const key = process.env.LIVEKIT_API_KEY;
  const secret = process.env.LIVEKIT_API_SECRET;
  const url = process.env.LIVEKIT_URL;

  if (!key || !secret || !url) {
    console.error('[LIVEKIT] API key, secret, or URL not set in env');
    return null;
  }

  const at = new AccessToken(key, secret, { identity });
  at.addGrant(new VideoGrant({ roomJoin: true, room }));

  const token = await at.toJwt();
  return { token, url };
}

module.exports = { issueLiveKitToken };
