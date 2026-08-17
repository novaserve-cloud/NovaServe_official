"use client";

import { useState } from "react";
import { Copy, Check, FileCode2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Syntax Highlight (lightweight CSS-class-based)                     */
/* ------------------------------------------------------------------ */

function highlightCode(code: string, language: string): string {
  let res = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (language === "bash" || language === "shell") {
    res = res
      .replace(/(#.*)$/gm, '[[SYN:syn-comment]]$1[[/SYN]]')
      .replace(/^(\$\s)/gm, '[[SYN:syn-prompt]]$1[[/SYN]]')
      .replace(/("(?:[^"\\]|\\.)*")/g, '[[SYN:syn-string]]$1[[/SYN]]')
      .replace(
        /\b(npm|npx|pnpm|yarn|bun|nova|novaserve|curl|cd|git|clone|install|run|build|dev|deploy|init|compile|plan|drift|destroy|doctor)\b/g,
        '[[SYN:syn-keyword]]$1[[/SYN]]'
      )
      .replace(/(--?[\w-]+)/g, '[[SYN:syn-flag]]$1[[/SYN]]');
  } else if (language === "typescript" || language === "ts" || language === "javascript" || language === "js") {
    res = res
      .replace(/(\/\/.*)$/gm, '[[SYN:syn-comment]]$1[[/SYN]]')
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '[[SYN:syn-string]]$1[[/SYN]]')
      .replace(
        /\b(import|export|from|const|let|var|function|async|await|return|if|else|try|catch|throw|new|typeof|for|of|in|class|extends|interface|type)\b/g,
        '[[SYN:syn-keyword]]$1[[/SYN]]'
      )
      .replace(/\b(true|false|null|undefined|void)\b/g, '[[SYN:syn-literal]]$1[[/SYN]]')
      .replace(/\b(\d+)\b/g, '[[SYN:syn-number]]$1[[/SYN]]')
      .replace(/\b(defineApp|defineConfig|api|storage|queue|database)\b/g, '[[SYN:syn-fn]]$1[[/SYN]]');
  } else if (language === "json") {
    res = res
      .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '[[SYN:syn-key]]$1[[/SYN]]$2')
      .replace(/:(\s*)("(?:[^"\\]|\\.)*")/g, ':$1[[SYN:syn-string]]$2[[/SYN]]')
      .replace(/\b(true|false|null)\b/g, '[[SYN:syn-literal]]$1[[/SYN]]')
      .replace(/\b(\d+\.?\d*)\b/g, '[[SYN:syn-number]]$1[[/SYN]]');
  } else if (language === "text" || language === "plaintext") {
    res = res
      .replace(/^(\s*[✓✗✕+~\-●▸▹→])/gm, '[[SYN:syn-prompt]]$1[[/SYN]]')
      .replace(/(\[[\w\s]+\])/g, '[[SYN:syn-keyword]]$1[[/SYN]]');
  }

  return res
    .replace(/\[\[SYN:([a-z-]+)\]\]/g, '<span class="$1">')
    .replace(/\[\[\/SYN\]\]/g, '</span>');
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlightCode(code, language);

  return (
    <div className="rounded-xl bg-[#0D1117] border border-gray-800 dark:border-gray-700 shadow-lg overflow-hidden group">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161B22] border-b border-gray-800 dark:border-gray-700">
          <span className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <FileCode2 className="w-3.5 h-3.5 text-amber-500" />
            <span>{filename || language}</span>
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer
              text-gray-400 hover:text-white hover:bg-white/10"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-[13px] leading-relaxed font-mono text-gray-200">
          {showLineNumbers ? (
            <code>
              {code.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-8 shrink-0 text-right pr-4 text-gray-600 text-xs leading-relaxed">
                    {i + 1}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(line, language),
                    }}
                  />
                </div>
              ))}
            </code>
          ) : (
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          )}
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline Code (for use in paragraphs)                                */
/* ------------------------------------------------------------------ */

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[13px] font-mono font-semibold text-amber-700 dark:text-amber-400">
      {children}
    </code>
  );
}
