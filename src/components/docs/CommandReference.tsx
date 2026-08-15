import { CodeBlock } from "./CodeBlock";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CommandOption {
  flag: string;
  description: string;
  defaultValue?: string;
}

interface CommandExample {
  title: string;
  command: string;
  output?: string;
}

interface CommandReferenceProps {
  name: string;
  description: string;
  syntax: string;
  options?: CommandOption[];
  examples?: CommandExample[];
  exitCodes?: { code: number; meaning: string }[];
  envVars?: { name: string; description: string }[];
  related?: { name: string; slug: string }[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CommandReference({
  name,
  description,
  syntax,
  options,
  examples,
  exitCodes,
  envVars,
  related,
}: CommandReferenceProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>

      {/* Syntax */}
      <section id="syntax">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Syntax
        </h2>
        <CodeBlock code={syntax} language="bash" filename="Terminal" />
      </section>

      {/* Options Table */}
      {options && options.length > 0 && (
        <section id="options">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Options
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-mono uppercase font-bold text-xs">
                <tr>
                  <th className="p-3">Option</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {options.map((opt, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200"
                  >
                    <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs whitespace-nowrap">
                      {opt.flag}
                    </td>
                    <td className="p-3 text-sm">{opt.description}</td>
                    <td className="p-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {opt.defaultValue || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Examples */}
      {examples && examples.length > 0 && (
        <section id="examples">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Examples
          </h2>
          <div className="space-y-4">
            {examples.map((ex, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {ex.title}
                </h3>
                <CodeBlock code={ex.command} language="bash" filename="Terminal" />
                {ex.output && (
                  <CodeBlock code={ex.output} language="text" filename="Output" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exit Codes */}
      {exitCodes && exitCodes.length > 0 && (
        <section id="exit-codes">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Exit Codes
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-mono uppercase font-bold text-xs">
                <tr>
                  <th className="p-3 w-24">Code</th>
                  <th className="p-3">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {exitCodes.map((ec, i) => (
                  <tr key={i} className="text-gray-800 dark:text-gray-200">
                    <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400">
                      {ec.code}
                    </td>
                    <td className="p-3">{ec.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Environment Variables */}
      {envVars && envVars.length > 0 && (
        <section id="env-vars">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Environment Variables
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-mono uppercase font-bold text-xs">
                <tr>
                  <th className="p-3">Variable</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {envVars.map((ev, i) => (
                  <tr key={i} className="text-gray-800 dark:text-gray-200">
                    <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
                      {ev.name}
                    </td>
                    <td className="p-3">{ev.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Commands */}
      {related && related.length > 0 && (
        <section id="related">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Related Commands
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/docs/${r.slug}`}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold text-gray-700 dark:text-gray-300 hover:border-[#FFB020] hover:text-amber-700 dark:hover:text-amber-400 transition-all"
              >
                {r.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
