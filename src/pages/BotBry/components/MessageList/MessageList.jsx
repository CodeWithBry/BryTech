import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import s from './MessageList.module.css';

function CodeBlock({ className, children }) {
  const lang = (className || '').replace('language-', '');
  return (
    <SyntaxHighlighter
      style={oneDark}
      language={lang || 'text'}
      PreTag="div"
      wrapLongLines
      customStyle={{ borderRadius: '8px', margin: '8px 0', fontSize: '0.82rem', padding: '12px 14px' }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}

function ThinkingIndicator() {
  return (
    <div className={s.thinking}>
      <img src="./icon/botIcon.png" alt="BotBry" className={s.avatar} />
      <div className={s.dots}>
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function MessageList({ messages, thinking }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length, thinking]);

  return (
    <div className={s.list}>
      {messages.map((msg, i) => (
        <div key={i} className={`${s.message} ${msg.role === 'user' ? s.user : s.bot}`}>
          <img
            src={msg.role === 'user' ? './icon/icon.png' : './icon/botIcon.png'}
            alt={msg.role}
            className={s.avatar}
          />
          <div className={`${s.bubble} ${msg.role === 'user' ? s.userBubble : s.botBubble}`}>
            {msg.role === 'user' ? (
              <p>{msg.message}</p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children }) {
                    if (inline) {
                      return <code className={s.inlineCode}>{children}</code>;
                    }
                    return <CodeBlock className={className}>{children}</CodeBlock>;
                  },
                  p({ children }) { return <p className={s.para}>{children}</p>; },
                  a({ href, children }) {
                    return <a href={href} target="_blank" rel="noopener noreferrer" className={s.link}>{children}</a>;
                  },
                }}
              >
                {msg.message}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ))}
      {thinking && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
