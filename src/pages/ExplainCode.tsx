import React, { useState, useEffect } from 'react';
import { Code2, Sparkles, AlertCircle, Copy, Check, Settings } from 'lucide-react';

const ExplainCode = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter some code to explain');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please add your Google Gemini API key in settings');
      setShowSettings(true);
      return;
    }

    setIsLoading(true);
    setExplanation('');
    setError('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful coding tutor. Analyze this code and provide a clear, detailed explanation. Include:

1. **Language Detection**: What programming language is this?
2. **Overall Purpose**: What does this code do?
3. **Line-by-Line Breakdown**: Explain key sections or lines
4. **Key Concepts**: What programming concepts are being used?
5. **Potential Issues**: Any bugs, improvements, or best practices to consider?

Code to explain:
\`\`\`
${code}
\`\`\`

Format your response in a clear, educational way with markdown formatting.`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setExplanation(data.candidates[0].content.parts[0].text);
      } else if (data.error) {
        setError(`API Error: ${data.error.message}`);
      } else {
        setError('Unable to generate explanation. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to AI service. Please check your API key and connection.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setShowSettings(false);
    setError('');
  };

  // Load API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-12 h-12 text-teal-400" />
            <h1 className="text-5xl font-bold text-white">
              Code<span className="text-teal-400">Seek</span> AI
            </h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="ml-4 p-2 text-gray-400 hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-800/50"
              title="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-300 text-lg">
            Paste any code in any language, and AI will explain it to you
          </p>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 bg-slate-800/70 backdrop-blur rounded-2xl p-6 border border-teal-500/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-teal-400" />
              API Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-900/80 text-gray-100 rounded-lg p-3 border border-teal-500/30 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Get your free API key at:{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 underline"
                  >
                    aistudio.google.com/app/apikey
                  </a>
                </p>
              </div>
              <button
                onClick={saveApiKey}
                className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Save API Key
              </button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-teal-500/20 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl font-semibold text-white">Your Code</h2>
            </div>
            
            <textarea
              className="w-full h-96 bg-slate-900/80 text-gray-100 rounded-xl p-4 font-mono text-sm border border-teal-500/30 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="// Paste your code here...
// Any language: Python, JavaScript, Java, C++, Rust, Go, etc.

function example() {
  console.log('Hello, CodeSeek!');
}"
            />
            
            <button
              onClick={handleSubmit}
              disabled={isLoading || !code.trim()}
              className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Explain Code with AI
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-teal-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h2 className="text-xl font-semibold text-white">AI Explanation</h2>
              </div>
              {explanation && (
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-teal-400 transition-colors p-2 rounded-lg hover:bg-slate-700/50"
                  title="Copy explanation"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              )}
            </div>

            <div className="h-96 overflow-y-auto bg-slate-900/80 rounded-xl p-4 border border-teal-500/30">
              {!explanation && !isLoading && (
                <div className="h-full flex items-center justify-center text-gray-500 text-center">
                  <div>
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Your AI explanation will appear here</p>
                    <p className="text-sm mt-2">
                      {!apiKey ? 'Click settings icon to add API key' : 'Paste code and click "Explain Code with AI"'}
                    </p>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-teal-400 font-semibold">AI is analyzing your code...</p>
                    <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
                  </div>
                </div>
              )}

              {explanation && (
                <div className="text-gray-100 prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {explanation.split(/(\n```.*\n[\s\S]*?\n```\n|\n#+\s.*|\n\*\*.*\*\*|\n- .*)/g).map((part, idx) => {
                        if (part.startsWith('\n```')) {
                            const lang = part.match(/```(\w*)/)?.[1] || '';
                            const codeBlock = part.replace(/`{3}.*?\n/,'').replace(/`{3}/, '').trim();
                            return <pre key={idx} className="bg-slate-950/70 p-3 rounded-md my-2 overflow-x-auto"><code className={`language-${lang}`}>{codeBlock}</code></pre>;
                        }
                        if (part.startsWith('\n# ')) {
                            return <h1 key={idx} className="text-2xl font-bold text-teal-400 mt-4 mb-2">{part.slice(3)}</h1>;
                        }
                        if (part.startsWith('\n## ')) {
                            return <h2 key={idx} className="text-xl font-bold text-teal-300 mt-4 mb-2">{part.slice(4)}</h2>;
                        }
                        if (part.startsWith('\n### ')) {
                            return <h3 key={idx} className="text-lg font-semibold text-teal-200 mt-3 mb-1">{part.slice(5)}</h3>;
                        }
                        if (part.startsWith('\n**') && part.endsWith('**')) {
                            return <p key={idx} className="font-bold text-teal-300 mt-2">{part.slice(3, -2)}</p>;
                        }
                        if (part.startsWith('\n- ')) {
                            return <li key={idx} className="ml-4 text-gray-300 list-disc list-inside">{part.slice(3)}</li>;
                        }
                        return part.split('\n').map((line, lineIdx) => line.trim() && <p key={`${idx}-${lineIdx}`} className="text-gray-300 my-1">{line}</p>);
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Footer */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/30 backdrop-blur rounded-xl p-4 border border-teal-500/20">
            <h3 className="text-teal-400 font-semibold mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Any Language
            </h3>
            <p className="text-gray-400 text-sm">
              Python, JavaScript, Java, C++, Rust, Go, Ruby, PHP, and more!
            </p>
          </div>
          <div className="bg-slate-800/30 backdrop-blur rounded-xl p-4 border border-teal-500/20">
            <h3 className="text-teal-400 font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by Google Gemini
            </h3>
            <p className="text-gray-400 text-sm">
              Free AI provides detailed, accurate explanations with context
            </p>
          </div>
          <div className="bg-slate-800/30 backdrop-blur rounded-xl p-4 border border-teal-500/20">
            <h3 className="text-teal-400 font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Best Practices
            </h3>
            <p className="text-gray-400 text-sm">
              Get suggestions for improvements and potential issues
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainCode;