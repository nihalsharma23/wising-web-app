import { useRef, useEffect } from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                ref={modalRef}
                className="relative w-full max-w-md bg-[#121212] border border-divider-grey rounded-2xl p-8 shadow-2xl transform transition-all animate-in zoom-in-95 duration-300"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#C0C0C0] hover:text-white transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-white text-xl">check</span>
                    </div>

                    <h3 className="text-xl font-['Syne'] font-medium text-white uppercase tracking-tight">
                        You're on the list
                    </h3>

                    <p className="text-sm text-white font-['Inter'] font-light leading-relaxed">
                        We will send a mail to notify you the beta launching.
                    </p>
                </div>
            </div>
        </div>
    );
}
