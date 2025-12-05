'use client';

export default function ChatbotFab() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.open('/cmis-chatbot.html', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open CMIS Assistant chatbot in new tab"
      className="
        fixed bottom-6 right-6 z-50
        rounded-full px-4 py-3
        bg-aggie-maroon text-white
        shadow-lg
        hover:bg-aggie-dark_maroon
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aggie-maroon
      "
    >
      Chat with CMIS
    </button>
  );
}
