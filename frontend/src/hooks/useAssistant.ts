import { useState } from "react";
import { askAssistant } from "../services/assistantService";
import type { ChatMessage } from "../types/chat";

export function useAssistant() {

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loading, setLoading] =
    useState(false);

  const send = async (
    question: string
  ) => {

    setMessages((old) => [
      ...old,
      {
        role: "user",
        content: question,
      },
    ]);

    setLoading(true);

    const answer =
      await askAssistant(question);

    setMessages((old) => [
      ...old,
      {
        role: "assistant",
        content: JSON.stringify(
          answer,
          null,
          2
        ),
      },
    ]);

    setLoading(false);
  };

  return {
    messages,
    loading,
    send,
  };
}
