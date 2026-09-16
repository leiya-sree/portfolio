import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, X } from 'lucide-react';

const initialMessages = [
	{
		id: 1,
		role: 'assistant',
		text: "Hi! I'm Leiya's AI assistant. Ask me about my skills, projects, experience, or education.",
	},
];

export default function AIChatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState(initialMessages);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		if (isOpen) inputRef.current?.focus();
	}, [isOpen]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const text = input.trim();
		if (!text || isLoading) return;

		setMessages((currentMessages) => [
			...currentMessages,
			{ id: `${Date.now()}-user`, role: 'user', text },
		]);
		setInput('');
		setIsLoading(true);

		try {
                console.log("API URL:", import.meta.env.VITE_API_URL);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: text }),
			});

			if (!response.ok) throw new Error(`Chat request failed: ${response.status}`);

			const data = await response.json();
			if (typeof data.reply !== 'string' || !data.reply.trim()) {
				throw new Error('Chat response did not contain a reply');
			}

			setMessages((currentMessages) => [
				...currentMessages,
				{ id: `${Date.now()}-assistant`, role: 'assistant', text: data.reply },
			]);
		} catch (error) {
			console.error('AI chatbot request failed:', error);
			setMessages((currentMessages) => [
				...currentMessages,
				{
					id: `${Date.now()}-assistant-error`,
					role: 'assistant',
					text: 'The chatbot backend is currently unavailable. Please try again soon.',
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
			<AnimatePresence>
				{isOpen && (
					<motion.section
						initial={{ opacity: 0, y: 16, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 16, scale: 0.96 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						aria-label="Ask Leiya AI chat"
						className="absolute bottom-16 right-0 flex h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1F]/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:bottom-[4.5rem]"
					>
						<header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
							<div className="flex items-center gap-2.5">
								<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300">
									<Sparkles size={17} aria-hidden="true" />
								</span>
								<div>
									<h2 className="text-sm font-semibold text-white">✨ Ask Leiya AI</h2>
									<p className="text-[11px] text-white/40">Your portfolio assistant</p>
								</div>
							</div>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								aria-label="Close chat"
								className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
							>
								<X size={17} aria-hidden="true" />
							</button>
						</header>
												<div className="border-b border-white/10 bg-white/[0.03] px-4 py-3">
							<p className="text-[10px] font-medium leading-relaxed text-white/60">
								<span className="text-blue-300">ℹ️ AI Assistant Information</span>
								<br />
								This AI assistant currently runs locally on Leiya’s computer using
								Ollama and is available for demonstration when the local AI server
								is running. The assistant may not be available on the deployed
								portfolio website. Further improvements and enhancements are
								planned for future updates.
							</p>
						</div>

						<div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
								>
									<div
										className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
											message.role === 'user'
												? 'rounded-br-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
												: 'rounded-bl-md border border-white/10 bg-white/[0.05] text-white/70'
										}`}
									>
										{message.role === 'assistant' && (
											<Bot size={13} className="mb-1 text-blue-300" aria-hidden="true" />
										)}
										{message.text}
									</div>
								</div>
							))}
							{isLoading && (
								<div className="flex justify-start">
									<div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-xs text-white/50">
										<span>✨ Thinking...</span>
										<span className="flex items-center gap-0.5" aria-label="Assistant is thinking">
											<span className="h-1 w-1 animate-bounce rounded-full bg-white/50 [animation-delay:-0.3s]" />
											<span className="h-1 w-1 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
											<span className="h-1 w-1 animate-bounce rounded-full bg-white/50" />
										</span>
									</div>
								</div>
							)}
						</div>

						<form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
							<div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 focus-within:border-blue-400/40">
								<input
									ref={inputRef}
									type="text"
									value={input}
									onChange={(event) => setInput(event.target.value)}
									placeholder="Ask me about Leiya..."
									aria-label="Ask me about Leiya"
									className="min-w-0 flex-1 bg-transparent px-2 text-xs text-white outline-none placeholder:text-white/30"
								/>
								<button
									type="submit"
									aria-label="Send message"
									disabled={!input.trim() || isLoading}
									className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
								>
									<Send size={14} aria-hidden="true" />
								</button>
							</div>
						</form>
					</motion.section>
				)}
			</AnimatePresence>

			<motion.button
				type="button"
				onClick={() => setIsOpen((open) => !open)}
				aria-label={isOpen ? 'Close Leiya AI chat' : 'Open Leiya AI chat'}
				aria-expanded={isOpen}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.96 }}
				className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 transition focus:outline-none focus:ring-2 focus:ring-blue-300/50 sm:h-14 sm:w-14"
			>
				{isOpen ? <X size={20} aria-hidden="true" /> : <Sparkles size={20} aria-hidden="true" />}
			</motion.button>
		</div>
	);
}
