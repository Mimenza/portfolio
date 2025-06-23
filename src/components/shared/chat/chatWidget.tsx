import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { TbReload } from "react-icons/tb";
import { ImSpinner2 } from "react-icons/im"; // Ícono de spinner
type Message = {
    text: string;
    sender: "user" | "bot";
}

const suggestedQuestions = [
    "What are your main skills and areas of expertise?",
    "Give me a detailed summary of your past work experience",
    "What are some of your most outstanding projects?",
];

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [cleaning, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const functionUrl = "/api/chat";
    //const functionUrl = 'http://localhost:5000/api/chat'
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Nueva función para enviar mensajes, reutilizable para input y sugerencias
    const handleSend = async (e?: React.FormEvent, customText?: string) => {
        if (e) e.preventDefault();
        const text = customText !== undefined ? customText : input;
        if (!text.trim()) return;
        const newMessages = [...messages, { text, sender: "user" as const }];
        setMessages(newMessages);
        setInput("");
        try {
            const response = await fetch(functionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: newMessages,
                    context: "home"
                }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                setMessages(prev => [
                    ...prev,
                    {
                        text: errorData?.response
                            ? `Error: ${errorData.response}`
                            : `Error: ${response.status} ${response.statusText}`,
                        sender: "bot"
                    }
                ]);
                return;
            }
            const data = await response.json();
            setMessages(prev => [...prev, { text: data.response, sender: "bot" }]);
        } catch (error: any) {
            setMessages(prev => [
                ...prev,
                {
                    text: error?.message
                        ? `Error: ${error.message}`
                        : "Sorry, there was an error processing your request.",
                    sender: "bot"
                }
            ]);
        }
    }

    const handleReload = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false); // ejecuta función de recarga real si existe
            setShowSuggestions(true); // muestra las preguntas sugeridas nuevamente
            setMessages([]); // limpia los mensajes
        }, 1000);
    };
    return (
        <>
            {/* Chat Box */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="fixed bottom-4 right-4 z-50 w-96 max-w-[95vw] h-[500px] dark:bg-dark-muted bg-muted text-text_primary dark:text-dark-text_primary rounded-3xl shadow-2xl flex flex-col p-0 mb-5"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#23232a]">
                            <div className="bg-muted_light dark:bg-dark-muted_light rounded-full p-2">
                                <Bot className="w-7 h-7 text-secondary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold leading-tight">AI Assistant</h2>
                                <p className="text-xs text-text_secondary dark:text-dark-text_secondary">Built by Endika</p>
                            </div>
                            <div className="ml-auto flex items-center gap-4">
                                <button
                                    onClick={handleReload}
                                    className="ml-auto text-gray-400 hover:text-text_primary dark:hover:text-dark-text_primary text-xl transition-transform duration-300"
                                    aria-label="Reload"
                                >
                                    {cleaning ? (
                                        <ImSpinner2 className="animate-spin" /> // spinner animado
                                    ) : (
                                        <TbReload />
                                    )}
                                </button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="ml-auto text-gray-400 hover:text-text_primary dark:hover:text-dark-text_primary text-xl"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        {/* Body */}
                        <div className="flex-1 flex flex-col px-6 py-4 overflow-y-auto">
                            <AnimatePresence>
                                {messages.length === 0 && (
                                    <motion.p
                                        className="text-sm text-text_secondary dark:text-dark-text_secondary mb-5"
                                        initial={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Hello! I am Endika's personal assistant. Ask me about his work, experience, skills, or projects, or choose a suggested question:
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {showSuggestions && messages.length === 0 && (
                                    <motion.div
                                        key="suggestions"
                                        initial={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col gap-3"
                                    >
                                        {suggestedQuestions.map((q, i) => (
                                            <button
                                                key={i}
                                                className="bg-muted_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary rounded-2xl py-2 px-4 text-sm font-medium text-left transition"
                                                onClick={() => {
                                                    setShowSuggestions(false);
                                                    handleSend(undefined, q);
                                                }}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="flex flex-col gap-3 mb-4">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.25 }}
                                            className={`p-2 rounded-xl max-w-[80%] ${msg.sender === "user"
                                                ? "bg-secondary text-white self-end"
                                                : "bg-muted_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary self-start"
                                                }`}
                                        >
                                            {msg.text}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        {/* Input */}
                        <form
                            className="flex items-center gap-2 px-6 py-4 border-t border-[#23232a] dark:bg-dark-muted bg-muted rounded-b-3xl"
                            onSubmit={handleSend}
                        >
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                className="flex-1 p-3 rounded-2xl bg-muted_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary outline-none text-sm"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-secondary rounded-full p-2 transition"
                                aria-label="Send"
                            >
                                <Send className="w-5 h-5 text-white" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-lg"
                aria-label="Open chat"
                style={{ display: isOpen ? "none" : "flex" }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 1 }}
            >
                <Bot className="text-white w-7 h-7" />
            </motion.button>
        </>
    );
};

export default ChatWidget;