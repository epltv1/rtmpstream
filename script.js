document.getElementById('streamForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const streamUrl = document.getElementById('streamUrl').value.trim();
  const rtmpUrl = document.getElementById('rtmpUrl').value.trim();
  const streamKey = document.getElementById('streamKey').value.trim();

  // Basic validation
  if (!streamUrl || !rtmpUrl || !streamKey) {
    alert('Please fill in all fields.');
    return;
  }

  const isYouTube = streamUrl.includes('youtube.com') || streamUrl.includes('youtu.be');
  const isM3U8 = streamUrl.endsWith('.m3u8');
  if (!isYouTube && !isM3U8) {
    alert('Please enter a valid YouTube or M3U8 URL.');
    return;
  }

  // Save stream data to localStorage
  const stream = {
    id: Date.now(),
    streamUrl: isYouTube ? 'YouTube stream (requires processing)' : streamUrl,
    rtmpUrl: `${rtmpUrl}/${streamKey}`,
    status: 'Pending',
    startedAt: new Date().toISOString(),
  };

  const streams = JSON.parse(localStorage.getItem('streams') || '[]');
  streams.push(stream);
  localStorage.setItem('streams', JSON.stringify(streams));

  // Simulate RTMP streaming initiation
  console.log(`Initiating stream to ${stream.rtmpUrl}`);

  // Redirect to history page
  window.location.href = 'history.html';
});
