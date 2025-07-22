import { useEffect, useState } from 'react';
import { Users, X, Info } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import LogoTigo from '../assets/img/TIGOLogo.png';

const FormInfoModal = () => {
    const [showModal, setShowModal] = useState(true);
    const [hasSeen, setHasSeen] = useState(false);

    useEffect(() => {
        const viewed = sessionStorage.getItem('form-info-viewed');
        if (viewed) {
            setShowModal(false);
            setHasSeen(true);
        }

        // Cierre automático después de 7 segundos
        const timer = setTimeout(() => {
            setShowModal(false);
            setHasSeen(true);
            sessionStorage.setItem('form-info-viewed', 'true');
        }, 7000);

        return () => clearTimeout(timer); // limpiar al desmontar
    }, []);

    const closeModal = () => {
        setShowModal(false);
        setHasSeen(true);
        sessionStorage.setItem('form-info-viewed', 'true');
    };

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative border border-white/10"
                            initial={{ scale: 0.9, y: -20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        >
                            {/* Botón cerrar */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                                <div className="flex-shrink-0 p-4 bg-blue-600 rounded-2xl shadow-lg">
                                    <Users className="h-10 w-10 text-white" />
                                </div>
                                <div className="w-full">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                        Bienvenido a la Ventanilla Virtual de <img src={LogoTigo} className='h-8 ml-1 inline-block object-cover' alt="" />
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                                        Aquí podrás crear radicados o consultar el estado de tus solicitudes de forma ágil y segura. Utiliza los botones de la página principal para comenzar.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón para volver a abrir el modal */}
            {hasSeen && !showModal && (
                <motion.button
                    onClick={() => setShowModal(true)}
                    className="fixed bottom-6 right-6 bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-full shadow-lg hover:bg-white/20 transition-colors flex items-center gap-2 z-40"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <Info className="w-5 h-5" />
                    <span className="text-sm font-semibold">Información</span>
                </motion.button>
            )}
        </>
    );
};

export default FormInfoModal;
