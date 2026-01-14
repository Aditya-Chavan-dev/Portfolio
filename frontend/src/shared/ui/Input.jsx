import React from 'react';

/**
 * ATOMIC INPUT COMPONENT
 * Enforces Design System Tokens:
 * - font-mono
 * - bg-deep
 * - tactical-cyan focus states
 */

const Input = ({
    type = "text",
    placeholder,
    value,
    onChange,
    label,
    error,
    className = ''
}) => {
    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label className="text-xs font-mono text-tactical-cyan uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            <div className="relative group">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
                        w-full bg-bg-deep/50 border border-border-subtle rounded-md p-3
                        text-text-primary font-mono text-sm
                        focus:outline-none focus:border-tactical-cyan/50 focus:ring-1 focus:ring-tactical-cyan/50
                        placeholder:text-text-secondary/50
                        transition-all duration-300
                        ${error ? 'border-red-500/50 focus:border-red-500' : ''}
                    `}
                />

                {/* Tactical Corner Marker */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-tactical-cyan opacity-0 group-focus-within:opacity-100 transition-opacity" />
            </div>

            {error && (
                <span className="text-red-400 text-[10px] font-mono ml-1">{error}</span>
            )}
        </div>
    );
};

export default Input;
