import React, { useState } from 'react';
import { Instagram } from 'lucide-react';

const VideoCredits = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const creators = [
    {
      name: 'Rohith',
      handle: 'rohithh.q',
      url: 'https://www.instagram.com/rohithh.q?igsh=eXphM3kxOHE0Mm16'
    },
    {
      name: 'Arjun',
      handle: 'ig.arjuuuhh',
      url: 'https://www.instagram.com/ig.arjuuuhh?igsh=MXJ1eHZxcHNqNTRlbQ%3D%3D&utm_source=qr'
    },
    {
      name: 'Hazard',
      handle: 'hxzx_xrd',
      url: 'https://www.instagram.com/hxzx_xrd?igsh=MWtxNzlycjV6emQ0dg=='
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Instagram Button */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Video Credits"
        >
          <Instagram className="w-6 h-6 text-white" />
        </button>

        {/* Expanded Creator Profiles */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-[200px] animate-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
              Video Credits 🎥
            </h3>
            <div className="space-y-2">
              {creators.map((creator, index) => (
                <a
                  key={index}
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {creator.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      @{creator.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Thank you for the amazing video! 🙏
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop to close when clicking outside */}
      {isExpanded && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default VideoCredits;