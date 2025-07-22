import React from "react"

const Embed = ({ html }) => (
  <div
    className="fixed bottom-4 right-4 z-[999]"
    data-testid="live-embed"
    style={{
      maxWidth: "320px",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
    }}
  >
    <div
      className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 flex justify-between items-center"
      data-testid="live-embed-header"
    >
      <span className="text-sm font-semibold">Radio Kashana - En vivo</span>
      <button
        id="toggleLiveBtn"
        className="border-none bg-white/20 hover:bg-white/30 text-white cursor-pointer text-sm px-2 py-1 rounded transition-colors"
        data-testid="live-embed-toggle"
        onClick={() => {
          const content = document.getElementById('liveContent');
          const btn = document.getElementById('toggleLiveBtn');
          if (content.style.display === 'none') {
            content.style.display = 'block';
            btn.innerHTML = '−';
          } else {
            content.style.display = 'none';
            btn.innerHTML = '+';
          }
        }}
      >
        −
      </button>
    </div>
    <div id="liveContent" className="bg-white" data-testid="live-embed-content">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </div>
)

export default Embed
