
import React from 'react';

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.871 14.542c-1.353.946-2.371 2.37-2.371 3.958v.5c0 .552.448 1 1 1h17c.552 0 1-.448 1-1v-.5c0-1.588-1.018-3.012-2.371-3.958M12 14.542V17m-3.371-2.458L7 13.5m9.371-.958L17 13.5M6 10.5C6 7.462 8.686 5 12 5s6 2.462 6 5.5m-12 0c0 1.25.333 2.417 1 3.5m10-3.5c0 1.25-.333 2.417-1 3.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5c-1.832 0-3.5.698-4.752 1.845M12 5c1.832 0 3.5.698 4.752 1.845" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5c0-1.577.81-2.97 2-3.818m2 3.818c1.19-.848 2-2.24 2-3.818" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
            <div className="container mx-auto flex items-center justify-center p-4">
                <BrainIcon />
                <h1 className="ml-3 text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                    LearnCR GMAT Assistant
                </h1>
            </div>
        </header>
    );
};
