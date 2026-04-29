import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "motion/react";
import type { DocPageData } from "@/types/docs";
import { useCodeColorizer } from "@/hooks/useCodeColorizer";

interface DocPageProps {
  data: DocPageData;
}

export function DocPage({ data }: DocPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const { title, description, content, nextPage, prevPage } = data;
  const animationDuration = shouldReduceMotion ? 0 : 0.4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animationDuration }}
      className="pb-20"
      aria-labelledby="page-title"
    >
      <header className="mb-10 pb-10 border-b border-white/10">
        <h1
          id="page-title"
          className="text-4xl font-bold text-white mb-4 tracking-tight"
        >
          {title}
        </h1>
        {description && (
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </header>

      <div className="space-y-6" role="feed">
        {content.map((block) => (
          <DocBlock key={block.id} block={block} />
        ))}
      </div>

      <nav
        className="mt-16 pt-8 border-t border-white/10"
        aria-label="Navegación de páginas"
      >
        <ul className="flex justify-between gap-4">
          {prevPage && (
            <li>
              <Link
                to={prevPage.href}
                className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300"
              >
                <Icon
                  icon="lucide:arrow-left"
                  className="size-5 text-white/50 group-hover:text-pink-400 transition-colors"
                />
                <div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">
                    Anterior
                  </span>
                  <p className="text-sm font-medium text-white group-hover:text-pink-300 transition-colors">
                    {prevPage.label}
                  </p>
                </div>
              </Link>
            </li>
          )}
          {nextPage && (
            <li className="ml-auto">
              <Link
                to={nextPage.href}
                className="group flex items-center gap-3 p-4 bg-linear-to-r from-pink-500/10 via-pink-500/5 to-transparent border border-pink-500/20 rounded-lg hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-300"
              >
                <div className="text-right">
                  <span className="text-xs text-pink-400 uppercase tracking-wider">
                    Siguiente
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                    {nextPage.label}
                  </p>
                </div>
                <Icon
                  icon="lucide:arrow-right"
                  className="size-5 text-pink-500 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </motion.article>
  );
}

function DocBlock({ block }: { block: DocPageData["content"][number] }) {
  const shouldReduceMotion = useReducedMotion();
  const staggerDelay = shouldReduceMotion ? 0 : 0.1;

  switch (block.type) {
    case "h2":
      return (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3 group">
            <span className="w-1 h-8 bg-pink-500 rounded-full" />
            <span className="scroll-mt-24">{block.text}</span>
          </h2>
        </section>
      );
    case "h3":
      return (
        <h3 className="text-xl font-semibold text-white mt-8 mb-3 flex items-center gap-2">
          <span className="w-0.5 h-6 bg-pink-500/60 rounded-full" />
          {block.text}
        </h3>
      );
    case "p":
      return <p className="text-white/70 leading-6">{block.text}</p>;
    case "list":
      return (
        <ul
          className="space-y-3 my-4"
          aria-label={`Lista de ${block.items.length} elementos`}
        >
          {block.items?.map((item, i) => (
            <motion.li
              key={item}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * staggerDelay, duration: 0.3 }}
              className="flex items-start gap-3 text-white/70"
            >
              <Icon
                icon="lucide:check-circle-2"
                className="size-5 text-pink-500 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock code={block} />;
    case "code-split":
      return <CodeSplitBlock code={block} />;
    case "command":
      return <CommandBlock command={block} />;
    case "callout":
      return <Callout intent={block.intent} text={block.text} id={block.id} />;
    default:
      return null;
  }
}

function CodeBlock({
  code,
}: {
  code: { id: string; code: string; language?: string };
}) {
  const [copied, setCopied] = useState(false);
  const colorizedCode = useCodeColorizer(code.code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <figure className="my-6 rounded-lg overflow-hidden border border-white/10 bg-dark-200">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-xs text-white/50 uppercase tracking-wider">
          {code.language || "tsx"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          aria-label={copied ? "Código copiado" : "Copiar código"}
        >
          <Icon
            icon={copied ? "lucide:check" : "lucide:copy"}
            className="size-4"
          />
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre">
        <code>{colorizedCode}</code>
      </pre>
    </figure>
  );
}

function CodeSplitBlock({
  code,
}: {
  code: {
    id: string;
    importCode: string;
    animationCode: string;
    language?: string;
  };
}) {
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedAnimation, setCopiedAnimation] = useState(false);
  const colorizedImport = useCodeColorizer(code.importCode);
  const colorizedAnimation = useCodeColorizer(code.animationCode);

  const handleCopy = async (text: string, type: "import" | "animation") => {
    await navigator.clipboard.writeText(text);
    if (type === "import") {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    } else {
      setCopiedAnimation(true);
      setTimeout(() => setCopiedAnimation(false), 2000);
    }
  };

  return (
    <div className="my-6 space-y-4">
      <figure className="rounded-lg overflow-hidden border border-white/10 bg-dark-200">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <span className="text-xs text-white/50 uppercase tracking-wider">
            Importación
          </span>
          <button
            type="button"
            onClick={() => handleCopy(code.importCode, "import")}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            aria-label={
              copiedImport ? "Importación copiada" : "Copiar importación"
            }
          >
            <Icon
              icon={copiedImport ? "lucide:check" : "lucide:copy"}
              className="size-4"
            />
            {copiedImport ? "Copiado" : "Copiar"}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre">
          <code>{colorizedImport}</code>
        </pre>
      </figure>

      <figure className="rounded-lg overflow-hidden border border-white/10 bg-dark-200">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <span className="text-xs text-white/50 uppercase tracking-wider">
            Animación
          </span>
          <button
            type="button"
            onClick={() => handleCopy(code.animationCode, "animation")}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            aria-label={
              copiedAnimation ? "Animación copiada" : "Copiar animación"
            }
          >
            <Icon
              icon={copiedAnimation ? "lucide:check" : "lucide:copy"}
              className="size-4"
            />
            {copiedAnimation ? "Copiado" : "Copiar"}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre">
          <code>{colorizedAnimation}</code>
        </pre>
      </figure>
    </div>
  );
}

function CommandBlock({
  command,
}: {
  command: {
    id: string;
    commands: { label: string; code: string }[];
    defaultIndex?: number;
  };
}) {
  const [selected, setSelected] = useState(command.defaultIndex ?? 0);
  const [copied, setCopied] = useState(false);

  const currentCommand = command.commands[selected];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-dark-200 overflow-hidden">
      <div className="flex items-center border-b border-white/10">
        {command.commands.map((cmd, i) => (
          <button
            key={cmd.label}
            type="button"
            onClick={() => setSelected(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              selected === i
                ? "text-white bg-white/10 border-b-2 border-pink-500"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {cmd.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          className="ml-auto flex items-center gap-1.5 px-4 py-2.5 text-xs text-white/50 hover:text-white transition-colors"
          aria-label={copied ? "Comando copiado" : "Copiar comando"}
        >
          <Icon
            icon={copied ? "lucide:check" : "lucide:copy"}
            className="size-4"
          />
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-white/80 font-mono">
        <code>{currentCommand.code}</code>
      </pre>
    </div>
  );
}

function Callout({
  intent,
  text,
  id,
}: {
  intent?: "info" | "warning" | "tip" | "error";
  text?: string;
  id?: string;
}) {
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: "lucide:info",
      iconColor: "text-blue-400",
      label: "Información",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      icon: "lucide:alert-triangle",
      iconColor: "text-yellow-400",
      label: "Advertencia",
    },
    tip: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: "lucide:lightbulb",
      iconColor: "text-green-400",
      label: "Consejo",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: "lucide:x-circle",
      iconColor: "text-red-400",
      label: "Error",
    },
  };

  const style = styles[intent || "info"];

  return (
    <motion.aside
      initial={false}
      className={`flex gap-4 p-5 ${style.bg} ${style.border} border rounded-lg my-6`}
      role="note"
      aria-label={style.label}
      id={id}
    >
      <Icon
        icon={style.icon}
        className={`size-6 ${style.iconColor} shrink-0 mt-0.5`}
        aria-hidden="true"
      />
      <div>
        <span className="sr-only">{style.label}: </span>
        <p className="text-white/80 leading-6">{text}</p>
      </div>
    </motion.aside>
  );
}
