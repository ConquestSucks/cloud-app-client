interface StorageWarningProps {
    show: boolean;
}

export const StorageWarning = ({ show }: StorageWarningProps) => {
    if (!show) return null;

    return (
        <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-4">
            <div className="flex items-center gap-3">
                <div className="text-red-600 bg-red-100 p-2 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div>
                    <h4 className="font-medium text-red-900">Внимание!</h4>
                    <p className="text-sm text-red-600">
                        Ваше хранилище почти заполнено. Рекомендуем освободить место.
                    </p>
                </div>
            </div>
        </div>
    );
}; 