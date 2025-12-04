import React from 'react';
import { Send, Sparkles, Zap, Code2 } from 'lucide-react';

const LandingPage = () => {
  const [input, setInput] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim()) {
      console.log('Submitted:', input);
      // Handle submission logic here
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const quickPrompts = [
    { icon: Code2, text: 'Generate a component', color: 'text-blue-400' },
    { icon: Zap, text: 'Debug my code', color: 'text-yellow-400' },
    { icon: Sparkles, text: 'Optimize performance', color: 'text-purple-400' },
  ];

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 text-white flex flex-col items-center justify-center p-4">
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full">
        <div className="mb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
            Build Faster with AI
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your intelligent coding assistant. Generate, debug, and optimize code in seconds.
          </p>
        </div>

        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInput(prompt.text)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-600 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm"
            >
              <prompt.icon className={`w-4 h-4 ${prompt.color}`} />
              <span className="text-sm text-gray-300">{prompt.text}</span>
            </button>       
          ))}
        </div>

        {/* Unified Cursor-style Prompt Bar */}
        <div className="w-full max-w-3xl">
          <div 
            className={`relative bg-white/5 backdrop-blur-sm border rounded-lg transition-all duration-200 ${
              isFocused 
                ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
                : 'border-gray-700/50 shadow-md'
            }`}
          >
            {/* Textarea Container */}
            <div className="relative p-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                className="w-full pr-12 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-sm leading-relaxed"
                style={{ 
                  maxHeight: '200px', 
                  minHeight: '24px',
                  overflowY: 'auto'
                }}
              />
              
              {/* Send Button - positioned absolute in top right */}
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className={`absolute top-4 right-4 p-2 rounded-md transition-all duration-200 ${
                  input.trim()
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white cursor-pointer shadow-lg'
                    : 'bg-gray-700/30 text-gray-600 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Keyboard hints - integrated at bottom */}
            <div className="px-4 pb-3 pt-2 border-t border-gray-700/30">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <kbd className="px-1.5 py-0.5 bg-gray-900/50 border border-gray-700/50 rounded text-gray-400 font-mono">Enter</kbd>
                <span>to send</span>
                <span className="mx-1">·</span>
                <kbd className="px-1.5 py-0.5 bg-gray-900/50 border border-gray-700/50 rounded text-gray-400 font-mono">Shift</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-900/50 border border-gray-700/50 rounded text-gray-400 font-mono">Enter</kbd>
                <span>for new line</span>
              </div>
            </div>
          </div>
          
          {/* Helper Text */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
