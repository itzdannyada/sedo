'use client'
import React from 'react';



interface ConfirmationModalProps {
    message: string;
    onConfirm: () => Promise<void> | void;
    onCancel: () => void;
    open: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    message,
    onConfirm,
    onCancel,
    open,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full max-w-md">
                <div className="mb-6 text-white text-lg">{message}</div>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
                        onClick={onCancel}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
                        onClick={async () => await onConfirm()}
                        type="button"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;