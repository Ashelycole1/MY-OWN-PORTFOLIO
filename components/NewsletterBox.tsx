'use client';

import { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export function NewsletterBox() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
    };

    return (
        <div className="p-5 rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tech Nation Dispatch</span>
            </div>
            <h3 className="text-lg font-anton uppercase tracking-wide mb-1">
                Stay Ahead of the Curve
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Architecture breakdowns, offline-first patterns, and real engineering dispatches from Africa. No spam, ever.
            </p>

            {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/30 text-xs text-primary font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>You’re on the dispatch list! Check your inbox soon.</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground/60"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-xl bg-[#E1F036] hover:brightness-105 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
                    >
                        Subscribe to Dispatch
                    </button>
                </form>
            )}
        </div>
    );
}

export default NewsletterBox;
