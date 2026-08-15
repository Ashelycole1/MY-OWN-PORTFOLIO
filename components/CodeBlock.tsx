'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <div className="relative my-6 rounded-xl border border-border/60 bg-[#0d1117] overflow-hidden text-sm group shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-[#161b22]/80">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {language}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground bg-background/40 hover:bg-background/80 border border-border/30 transition-all"
                    aria-label="Copy code to clipboard"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 text-primary" />
                            <span className="text-primary text-[11px]">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[11px]">Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#e6edf3]">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default CodeBlock;
