require('dotenv').config();
const { issueLiveKitToken } = require('./utils/livekitToken');

(async () => {
  const tokenResp = await issueLiveKitToken({ room: 'demo-room', identity: 'test-agent' });
  if (!tokenResp) {
    console.error('Token generation failed.');
  } else {
    console.log('Token generated successfully:', tokenResp);
  }
})();
