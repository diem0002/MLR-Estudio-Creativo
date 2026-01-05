'use client';

import { useState } from 'react';
import { createTable } from './actions';

export default function SetupPage() {
    const [status, setStatus] = useState<string>('Esperando...');
    const [loading, setLoading] = useState(false);

    const handleSetup = async () => {
        setLoading(true);
        setStatus('Conectando con la base de datos...');
        const result = await createTable();
        setStatus(result.success ? `¡Éxito! ${result.message}` : `Error: ${result.message}`);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Instalación Automática</h1>
                <p className="text-gray-600">
                    Vamos a configurar la base de datos automáticamente para que no tengas que tocar la consola de Vercel.
                </p>

                <div className="p-4 bg-gray-100 rounded-lg text-sm font-mono text-left break-all">
                    Estado: {status}
                </div>

                <button
                    onClick={handleSetup}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? 'Instalando...' : 'Crear Tablas de Base de Datos'}
                </button>
            </div>
        </div>
    );
}
