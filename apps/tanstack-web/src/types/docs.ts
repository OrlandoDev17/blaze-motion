export type DocBlockType = "h2" | "h3" | "p" | "list" | "code" | "command" | "callout";

export interface DocListBlock {
  id: string;
  type: "list";
  items: string[];
  ordered?: boolean;
}

export interface DocCalloutBlock {
  id: string;
  type: "callout";
  intent?: "info" | "warning" | "tip" | "error";
  text: string;
}

export interface DocTextBlock {
  id: string;
  type: "h2" | "h3" | "p";
  text: string;
}

export interface DocCodeBlock {
  id: string;
  type: "code";
  code: string;
  language?: string;
}

export interface DocCodeSplitBlock {
  id: string;
  type: "code-split";
  importCode: string;
  animationCode: string;
  language?: string;
}

export interface DocCommandBlock {
  id: string;
  type: "command";
  commands: { label: string; code: string }[];
  defaultIndex?: number;
}

export type DocBlock = DocTextBlock | DocListBlock | DocCalloutBlock | DocCodeBlock | DocCodeSplitBlock | DocCommandBlock;

export interface DocPageData {
  title: string;
  description?: string;
  content: DocBlock[];
  nextPage?: {
    label: string;
    href: string;
  };
  prevPage?: {
    label: string;
    href: string;
  };
}