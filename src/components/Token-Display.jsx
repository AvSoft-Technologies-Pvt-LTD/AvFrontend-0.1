import React, { useState, useEffect } from 'react';
import { Monitor, Volume2, Clock, AlertCircle } from 'lucide-react';

const TOKENS_KEY = 'hospital_tokens';

const DisplayBoard = ({ tokens }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [allTokens, setAllTokens] = useState(tokens || []);

  // On mount or when tokens prop changes, load from localStorage if no tokens prop
  useEffect(() => {
    if (tokens && tokens.length > 0) {
      setAllTokens(tokens);
    } else {
      const stored = localStorage.getItem(TOKENS_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored).map(t => ({ ...t, generatedAt: new Date(t.generatedAt) }));
          setAllTokens(parsed);
        } catch {
          setAllTokens([]);
        }
      } else {
        setAllTokens([]);
      }
    }
  }, [tokens]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const waitingTokens = (allTokens || []).filter(token => token.status === 'waiting').slice(0, 10);
  const calledTokens = (allTokens || []).filter(token => token.status === 'called').slice(0, 5);
  const currentlyServing = (allTokens || []).find(token => token.status === 'called');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1630] to-[#1a2847] text-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-[var(--accent-color)]">
          Hospital Queue Management
        </h1>
        <div className="flex items-center justify-center gap-4 text-xl">
          <Clock size={24} />
          <span>{currentTime.toLocaleTimeString()}</span>
          <span className="mx-4">|</span>
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Currently Serving */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[var(--accent-color)] flex items-center gap-3">
                <Monitor size={28} />
                Now Serving
              </h2>
              <Volume2 size={28} className="text-[var(--accent-color)]" />
            </div>

            <div className="text-center">
              {currentlyServing ? (
                <div className="space-y-4">
                  <div className="text-8xl font-black text-[var(--accent-color)] animate-pulse">
                    {currentlyServing.tokenNumber}
                  </div>
                  <div className="text-2xl font-semibold">
                    {currentlyServing.patientName}
                  </div>
                  <div className="text-xl text-gray-300">
                    {currentlyServing.department}- {currentlyServing.doctorName}
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    currentlyServing.priority === 'emergency' ? 'bg-red-500' :
                    currentlyServing.priority === 'urgent' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}>
                    <AlertCircle size={16} />
                    {currentlyServing.priority.toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="text-6xl font-bold text-gray-400">
                  No Token Called
                </div>
              )}
            </div>
          </div>

          {/* Called Tokens */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-[var(--accent-color)]">
              Recently Called
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {calledTokens.length > 0 ? calledTokens.map((token) => (
                <div
                  key={token.id}
                  className="text-center p-4 bg-white/10 rounded-lg border border-white/10"
                >
                  <div className="text-2xl font-bold text-[var(--accent-color)]">
                    {token.tokenNumber}
                  </div>
                  <div className="text-sm text-gray-300 truncate">
                    {token.patientName}
                  </div>
                </div>
              )) : (
                <div className="col-span-5 text-center text-gray-400">No tokens called yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Waiting Queue */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-[var(--accent-color)]">
              Waiting Queue ({waitingTokens.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {waitingTokens.length > 0 ? waitingTokens.map((token, index) => (
                <div
                  key={token.id}
                  className={`p-4 rounded-lg border ${
                    index === 0 
                      ? 'bg-[var(--accent-color)]/20 border-[var(--accent-color)]/50' 
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[var(--accent-color)]">
                        {token.tokenNumber}
                      </span>
                      <div>
                        <div className="font-medium">{token.patientName}</div>
                        <div className="text-sm text-gray-300">
                          {token.department}
                        </div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      token.priority === 'emergency' ? 'bg-red-500' :
                      token.priority === 'urgent' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Est. Time: {token.estimatedTime}
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-400">No waiting tokens.</div>
              )}
            </div>
          </div>

          {/* Queue Statistics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-[var(--accent-color)]">
              Queue Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Waiting:</span>
                <span className="font-bold">{waitingTokens.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency:</span>
                <span className="font-bold text-red-400">
                  {waitingTokens.filter(t => t.priority === 'emergency').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Urgent:</span>
                <span className="font-bold text-orange-400">
                  {waitingTokens.filter(t => t.priority === 'urgent').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Normal:</span>
                <span className="font-bold text-green-400">
                  {waitingTokens.filter(t => t.priority === 'normal').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBoard;