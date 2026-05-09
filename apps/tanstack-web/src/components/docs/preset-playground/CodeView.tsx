import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  title: string;
  code: React.ReactNode;
  onCopy: () => void;
  copied: boolean;
}

export function CodeBlock({ title, code, onCopy, copied }: CodeBlockProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs text-white/50 font-medium">{title}</span>
        <button
          onClick={onCopy}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          aria-label={copied ? `${title} copied` : `Copy ${title}`}
        >
          {copied ? (
            <Check className="size-3.5 text-green-400" />
          ) : (
            <Copy className="size-3.5 text-white/40" />
          )}
        </button>
      </div>
      <pre className="p-2 text-[10px] font-mono leading-relaxed overflow-x-auto bg-dark-100 rounded-b-lg border border-white/5">
        <code className="text-white/70">{code}</code>
      </pre>
    </div>
  );
}

// Colores para el código
const C = {
  tag: "text-pink-400",
  component: "text-yellow-400",
  prop: "text-orange-400",
  assign: "text-blue-400",
  keyword: "text-purple-400",
  string: "text-green-400",
  var: "text-cyan-400",
  brace: "text-cyan-400",
};

interface CodePreviewProps {
  direction: string;
  showDirection: boolean;
  blur?: number;
  scale?: number;
}

export function CodePreview({ direction, showDirection, blur, scale }: CodePreviewProps) {
  return (
    <>
      {/* Importaciones */}
      <CodeBlock
        title="Importaciones"
        code={
          <>
            <span className={C.keyword}>import</span>
            <span> </span>
            <span className={C.var}>fade</span>
            <span> </span>
            <span className={C.keyword}>from</span>
            <span> </span>
            <span className={C.string}>"@blaze-motion/motion"</span>;
            <br />
            <span className={C.keyword}>import</span>
            <span> </span>
            <span className="text-white/50">{"{ motion }"}</span>
            <span> </span>
            <span className={C.keyword}>from</span>
            <span> </span>
            <span className={C.string}>"motion/react"</span>;
          </>
        }
        onCopy={() => {}}
        copied={false}
      />

      {/* Elemento */}
      <CodeBlock
        title="Elemento"
        code={
          <>
            <span className={C.tag}>&lt;</span>
            <span className={C.component}>motion.div</span>
            <span> </span>
            <span className={C.prop}>variants</span>
            <span className={C.assign}>=</span>
            <span className={C.keyword}>fade</span>
            (<span className={C.brace}>{"{"}</span>
            {showDirection && <span className={C.string}>{direction}</span>}
            {showDirection && (blur !== undefined || scale !== undefined) && <span>, </span>}
            {blur !== undefined && (
              <>
                <span className="text-red-400">blur</span>
                <span>: </span>
                <span className="text-yellow-300">{blur}</span>
              </>
            )}
            {blur !== undefined && scale !== undefined && <span>, </span>}
            {scale !== undefined && (
              <>
                <span className="text-red-400">scale</span>
                <span>: </span>
                <span className="text-yellow-300">{scale}</span>
              </>
            )}
            <span className={C.brace}>{"}"}</span>)
            <span className={C.tag}>/&gt;</span>
          </>
        }
        onCopy={() => {}}
        copied={false}
      />
    </>
  );
}