import { useState, useRef, useEffect } from "react";
import { Send, Trash2, Bot } from "lucide-react";
import { useAssistant } from "../hooks/useAssistant";

export default function Assistant() {
  const { messages, loading, send } = useAssistant();

  const [question, setQuestion] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

const handleSend = async () => {
  if (!question.trim()) return;

  const currentQuestion = question;

  setQuestion("");

  await send(currentQuestion);
};
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main className="flex-1 bg-slate-950 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Assistant
          </h1>

          <p className="text-slate-400 mt-2">
            Ask anything about your Kubernetes cluster.
          </p>

        </div>

      </div>

      {/* Chat Window */}

      <div className="bg-slate-900 rounded-xl border border-slate-800 h-[70vh] flex flex-col">

        {/* Messages */}

<div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
          {messages.length === 0 && (

            <div className="flex flex-col items-center justify-center h-full text-slate-400">

              <Bot size={48} />

              <p className="mt-4 text-lg">
                Ask me anything about your cluster.
              </p>

            </div>

          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`max-w-[80%] rounded-xl px-4 py-3 whitespace-pre-wrap ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {msg.content}
            </div>

          ))}

          {loading && (

            <div className="bg-slate-800 rounded-xl px-4 py-3 text-slate-300 inline-block">
              AI is thinking...
            </div>

          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}

        <div className="border-t border-slate-800 p-4 flex gap-3">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-800 rounded-lg px-4 py-3 text-white outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-5 text-white"
          >
            <Send size={20} />
          </button>

        </div>

      </div>

    </main>
  );
}
