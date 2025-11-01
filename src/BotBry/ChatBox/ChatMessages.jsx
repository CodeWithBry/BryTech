import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import s from "./ChatMessages.module.css";

/** Optional: sanitize message if too many inline code ticks
 * If the LLM wrapped many single words with backticks it looks awful.
 * We only strip inline backticks if there are > threshold occurrences.
 */
function maybeSanitizeBackticks(text, threshold = 10) {
  const inlineTicks = (text.match(/`[^`]+`/g) || []).length;
  if (inlineTicks > threshold) {
    return text.replace(/`([^`\n]+)`/g, "$1");
  }
  return text;
}

export default function ChatMessages({ chatMemory }) {
  const convoRef = useRef()
  const [showScrollDown, setShowScrollDown] = useState(false)

  function onScrollUp() {
    const e = convoRef.current
    // e.scrollTop = e.scrollHeight
    e.scrollTo({
      top: e.scrollHeight,
      behavior: "smooth"
    });
    setTimeout(() => setShowScrollDown(false), 500)
  }

  function ScrollDown() {
    if (showScrollDown) return <button className={s.scrollDown} onClick={() => onScrollUp()}>
      Scroll Down
    </button>
  }

  return (
    <ul className={s.convo} ref={convoRef} onScroll={(e) => { e.currentTarget.scrollTop + 200 < e.currentTarget.scrollHeight ? setShowScrollDown(true) : setShowScrollDown(false) }}>
      <ScrollDown />
      {chatMemory?.convo?.map((res, i) => {
        const message = maybeSanitizeBackticks(res.message, 12); // tweak threshold if needed

        return (
          <motion.li
            key={i}
            className={res.role === "user" ? s.user : s.bryan}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <img
              src={res.role === "user" ? "./icon/icon.png" : "./icon/botIcon.png"}
              alt={res.role}
              className={s.avatar}
            />

            <div
              className={`${s.messageBox} ${res.role === "user" ? s.userBox : s.bryanBox
                }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // DON'T pass className into components themselves
                components={{
                  // For both inline and block code:
                  code({ inline, node, children }) {
                    const classList = node?.properties?.className || [];
                    // classList may be an array or string; normalize to array
                    const classes = Array.isArray(classList)
                      ? classList
                      : (classList ? String(classList).split(/\s+/) : []);
                    const languageClass = classes.find((c) =>
                      c.startsWith("language-")
                    );
                    const lang = languageClass
                      ? languageClass.replace("language-", "")
                      : "";

                    // Fenced code block (block-level)
                    if (!inline && lang) {
                      return (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={lang}
                          PreTag="div"
                          showLineNumbers={false}
                          wrapLongLines={true}
                          customStyle={{
                            borderRadius: "0.7rem",
                            margin: "0.5rem 0",
                            fontSize: "0.9rem",
                            padding: "0.65rem 0.9rem",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      );
                    }

                    // Inline code: light pill, small padding, allow wrap
                    return (
                      <code className={s.inlineCode} aria-label="inline-code">
                        {children}
                      </code>
                    );
                  },

                  // Gentle paragraph spacing
                  p({ node, children }) {
                    return <p className={s.paragraph}>{children}</p>;
                  },

                  // Links with safe target
                  a({ node, href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.link}
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
