document.addEventListener('DOMContentLoaded', function () {
  const streamList = document.getElementById('streamList');
  const videoSource = document.getElementById('videoSource');
  const player = videojs('videoPlayer');

  // Load streams from localStorage
  const streams = JSON.parse(localStorage.getItem('streams') || '[]');

  if (streams.length === 0) {
    streamList.innerHTML = '<tr><td colspan="4">No streams found.</td></tr>';
    return;
  }

  // Display streams
  streams.forEach((stream, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stream.streamUrl}</td>
      <td>${stream.rtmpUrl}</td>
      <td class="status-${stream.status.toLowerCase()}">${stream.status}</td>
      <td>${new Date(stream.startedAt).toLocaleString()}</td>
    `;
    row.addEventListener('click', () => {
      // Set video player source
      const src = stream.streamUrl.includes('YouTube')
        ? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' // Placeholder for YouTube
        : stream.streamUrl;
      videoSource.src = src;
      videoSource.type = 'application/x-mpegURL';
      player.src({ src, type: 'application/x-mpegURL' });
    });
    streamList.appendChild(row);

    // Simulate status transitions
    if (stream.status === 'Pending') {
      setTimeout(() => {
        stream.status = 'Live';
        localStorage.setItem('streams', JSON.stringify(streams));
        row.querySelector('td:nth-child(3)').textContent = 'Live';
        row.querySelector('td:nth-child(3)').className = 'status-live';
      }, 3000); // Simulate 3s delay to "Live"

      setTimeout(() => {
        stream.status = 'Ended';
        localStorage.setItem('streams', JSON.stringify(streams));
        row.querySelector('td:nth-child(3)').textContent = 'Ended';
        row.querySelector('td:nth-child(3)').className = 'status-ended';
      }, 10000); // Simulate 10s to "Ended"
    }
  });

  // Initialize player with the latest stream
  const latestStream = streams[streams.length - 1];
  const src = latestStream.streamUrl.includes('YouTube')
    ? 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    : latestStream.streamUrl;
  videoSource.src = src;
  videoSource.type = 'application/x-mpegURL';
  player.src({ src, type: 'application/x-mpegURL' });
});
