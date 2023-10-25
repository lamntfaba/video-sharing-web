import React, { useEffect, useState } from 'react';

interface AlertType {
    type: string;
    message: string;
    showAlert: boolean;
    onClose: () => void;
}

const Alert = ({ type, message, showAlert, onClose }: AlertType) => {
    useEffect(() => {
        if (showAlert) {
            const timeout = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [showAlert, onClose]);
    const alertClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        // info: 'bg-blue-100 border-blue-400 text-blue-700',
        // warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        error: 'bg-red-100 border-red-400 text-red-700',
    }[type];

    return (showAlert &&
        <div className={`animate-bounce p-4 border-l-4 rounded fixed bottom-10 left-5 z-10 ${alertClasses}`}>
            {message}
        </div>
    );
};

export default Alert;
