import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import s from "./ChatMessages.module.css";

function sanitizeBackticks(text, threshold = 10) {
  const count = (text.match(/`[^`]+`/g) || []).length;
  return count > threshold ? text.replace(/`([^`\n]+)`/g, "$1") : text;
}

const MarkdownComponents = {
  code({ inline, node, children }) {
    const classes = Array.isArray(node?.properties?.className)
      ? node.properties.className
      : [];
    const langClass = classes.find(c => c.startsWith("language-"));
    const lang = langClass ? langClass.replace("language-", "") : "";

    if (!inline && lang) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={lang}
          PreTag="div"
          wrapLongLines
          customStyle={{ borderRadius: "0.6rem", margin: "0.4rem 0", fontSize: "0.875rem", padding: "0.65rem 1rem" }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }
    return <code className={s.inlineCode}>{children}</code>;
  },
  p({ children }) {
    return <p className={s.para}>{children}</p>;
  },
  a({ href, children }) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={s.mdLink}>{children}</a>;
  },
};

export default React.forwardRef(function ChatMessages({ messages, thinking }, ref) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  function scrollToBottom() {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
    setTimeout(() => setShowScrollBtn(false), 400);
  }

  function handleScroll(e) {
    const el = e.currentTarget;
    setShowScrollBtn(el.scrollTop + 200 < el.scrollHeight);
  }

  return (
    <div className={s.messages} ref={ref} onScroll={handleScroll}>
      {showScrollBtn && (
        <button className={s.scrollBtn} onClick={scrollToBottom}>
          <i className="fa fa-chevron-down" />
        </button>
      )}

      {messages.map((msg, i) => {
        const isUser = msg.role === "user";
        const text = sanitizeBackticks(msg.text ?? "", 12);

        return (
          <motion.div
            key={i}
            className={`${s.message} ${isUser ? s.userMessage : s.assistantMessage}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={isUser ? "./icon/icon.png" : "./icon/botIcon.png"}
              alt={isUser ? "User" : "BotBry"}
              className={s.avatar}
            />
            <div className={`${s.bubble} ${isUser ? s.userBubble : s.assistantBubble}`}>
              {isUser ? (
                <p className={s.para}>{text}</p>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                  {text}
                </ReactMarkdown>
              )}
            </div>
          </motion.div>
        );
      })}

      {thinking && (
        <div className={`${s.message} ${s.assistantMessage}`}>
          <img src="./icon/botIcon.png" alt="BotBry" className={s.avatar} />
          <div className={s.thinkingBubble}>
            <div className={s.dot} />
            <div className={s.dot} />
            <div className={s.dot} />
          </div>
        </div>
      )}
    </div>
  );
});
