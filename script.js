document.getElementById('streamForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const streamUrl = document.getElementById('streamUrl').value.trim();
  const rtmpUrl = document.getElementById('rtmpUrl').value.trim();
  const streamKey = document.getElementById('streamKey').value.trim();
  const playerContainer = document.querySelector('.player-container');
  const videoSource = document.getElementById('videoSource');

  // Basic validation
  if (!streamUrl || !rtmpUrl || !streamKey) {
    alert('Please fill in all fields.');
    return;
  }

  // Check if streamUrl is a valid YouTube or M3U8 URL
  const isYouTube = streamUrl.includes('youtube.com') || streamUrl.includes('youtu.be');
  const isM3U8 = streamUrl.endsWith('.m3u8');
  if (!isYouTube && !isM3U8) {
    alert('Please enter a valid YouTube or M3U8 URL.');
    return;
  }

  // For this example, we'll display the M3U8 stream or a placeholder for YouTube
  if (isM3U8) {
    videoSource.src = streamUrl;
    videoSource.type = 'application/x-mpegURL';
  } else {
    // YouTube streams require conversion to HLS or embedding via iframe
    alert('YouTube streaming requires server-side processing. Displaying placeholder.');
    videoSource.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'; // Placeholder M3U8 for testing
    videoSource.type = 'application/x-mpegURL';
  }

  // Simulate RTMP destination logging (in a real app, this would send to a server)
  console.log(`Streaming to RTMP: ${rtmpUrl}/${streamKey}`);

  // Initialize Video.js player
  const player = videojs('videoPlayer');
  player.src({ src: videoSource.src, type: videoSource.type });
  playerContainer.classList.add('active');

  // Note: Actual RTMP streaming requires a backend server to handle the RTMP protocol
  alert('Stream initiated (simulated). Check console for RTMP details.');
});
