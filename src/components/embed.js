import React from "react"

const Embed = ({ html }) => (
  <div 
    className="fixed bottom-2 z-[999]" 
    data-testid="live-embed"
    style={{ 
      maxWidth: "300px", // Made narrower as requested
      right: "20px", // Moved further to the right
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      borderRadius: "8px",
      overflow: "hidden" 
    }}
  >
    <div 
      className="bg-blue-900 text-white p-2 flex justify-between items-center"
      style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
      data-testid="live-embed-header"
    >
      <span className="text-xs font-bold">Radio Kashana - En vivo</span>
      <button 
        id="toggleLiveBtn"
        className="border-none bg-transparent text-white cursor-pointer text-xs" 
        style={{ cursor: "pointer" }}
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
    <div id="liveContent" data-testid="live-embed-content">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </div>
)

export default Embed