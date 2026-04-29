import { useMemo } from "react";
import type { ReactNode } from "react";

interface Token {
  type: "text" | "keyword" | "component" | "prop" | "propName" | "value" | "string" | "bracket" | "tag" | "punctuation";
  value: string;
}

const colors: Record<Token["type"], string> = {
  text: "text-white/80",
  keyword: "text-pink-400",
  component: "text-yellow-400",
  prop: "text-orange-400",
  propName: "text-red-400",
  value: "text-yellow-300",
  string: "text-green-400",
  bracket: "text-cyan-400",
  tag: "text-white/60",
  punctuation: "text-white/40",
};

const keywords = ["import", "from", "const", "export", "default", "function", "return", "true", "false", "null", "typeof", "as", "if", "else", "for", "while"];
const components = ["motion", "div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "button", "a", "input", "TextAnimate", "Marquee"];
const props = ["variants", "initial", "animate", "whileInView", "viewport", "transition", "className", "style", "onClick", "onHover", "whileHover", "whileTap", "exit", "layout", "layoutId"];

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Comments
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const comment = code.slice(i, end === -1 ? code.length : end);
      tokens.push({ type: "text", value: comment });
      i = end === -1 ? code.length : end;
      continue;
    }

    // JSX tags
    if (code[i] === "<") {
      if (code[i + 1] === "/") {
        tokens.push({ type: "tag", value: "</" });
        i += 2;
      } else {
        tokens.push({ type: "tag", value: "<" });
        i++;
      }
      continue;
    }

    if (code[i] === ">") {
      tokens.push({ type: "tag", value: ">" });
      i++;
      continue;
    }

    // Strings
    if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
      const quote = code[i];
      let str = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === "\\" && i + 1 < code.length) {
          str += code[i] + code[i + 1];
          i += 2;
        } else {
          str += code[i];
          i++;
        }
      }
      str += quote;
      i++;
      tokens.push({ type: "string", value: str });
      continue;
    }

    // Numbers (including decimals and scientific notation)
    if (/[0-9]/.test(code[i]) || (code[i] === "." && /[0-9]/.test(code[i + 1]))) {
      let num = "";
      while (i < code.length && /[0-9.]/.test(code[i])) {
        num += code[i];
        i++;
      }
      tokens.push({ type: "value", value: num });
      continue;
    }

    // Identifiers
    if (/[a-zA-Z_$]/.test(code[i])) {
      let word = "";
      while (i < code.length && /[a-zA-Z0-9_$-]/.test(code[i])) {
        word += code[i];
        i++;
      }

      if (keywords.includes(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (components.includes(word)) {
        tokens.push({ type: "component", value: word });
      } else if (props.includes(word) || /^[a-z]/i.test(word)) {
        tokens.push({ type: "propName", value: word });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ type: "component", value: word });
      } else {
        tokens.push({ type: "text", value: word });
      }
      continue;
    }

    // Brackets and punctuation
    if ("{}".includes(code[i])) {
      tokens.push({ type: "bracket", value: code[i] });
      i++;
      continue;
    }

    if ("()".includes(code[i])) {
      tokens.push({ type: "punctuation", value: code[i] });
      i++;
      continue;
    }

    // Colon
    if (code[i] === ":") {
      tokens.push({ type: "punctuation", value: ":" });
      i++;
      continue;
    }

    // Equals
    if (code[i] === "=") {
      tokens.push({ type: "punctuation", value: "=" });
      i++;
      continue;
    }

    // Comma
    if (code[i] === ",") {
      tokens.push({ type: "punctuation", value: "," });
      i++;
      continue;
    }

    // Whitespace and newlines
    if (/\s/.test(code[i])) {
      let ws = "";
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i];
        i++;
      }
      tokens.push({ type: "text", value: ws });
      continue;
    }

    // Default - any other character
    tokens.push({ type: "text", value: code[i] });
    i++;
  }

  return tokens;
}

export function useCodeColorizer(code: string): ReactNode {
  const colorized = useMemo(() => {
    const tokens = tokenize(code);
    return tokens.map((token, index) => (
      <span key={index} className={colors[token.type]}>
        {token.value}
      </span>
    ));
  }, [code]);

  return <>{colorized}</>;
}

export function CodeColorized({ code }: { code: string }) {
  const colorized = useCodeColorizer(code);
  return <>{colorized}</>;
}