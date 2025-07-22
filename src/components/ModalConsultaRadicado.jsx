import { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useBuscarRadicado } from "@/hooks/useBuscarRadicados";
import { toast } from "react-hot-toast";
import { Search, Hash, User, X, LoaderCircle } from "lucide-react";

// --- Variantes de Animación ---
const resultsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export const ModalConsultaRadicado = ({ isOpen, onClose }) => {
    const [radicado, setRadicado] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const { resultado, buscarRadicado, cargando, clearResultado } = useBuscarRadicado();

    // La lógica de negocio no ha sido modificada.
    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => {
            setRadicado("");
            setIdentificacion("");
            if (resultado) clearResultado();
        }, 300);
    }, [onClose, resultado, clearResultado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedRadicado = radicado.trim();
        const trimmedIdentificacion = identificacion.trim();

        if (!trimmedRadicado && !trimmedIdentificacion) {
            toast.error("Debes ingresar el número de radicado o tu identificación.");
            return;
        }
        if (trimmedRadicado && !/^\d+$/.test(trimmedRadicado)) {
            toast.error("El número de radicado solo debe contener números.");
            return;
        }
        if (trimmedIdentificacion && !/^\d+$/.test(trimmedIdentificacion)) {
            toast.error("El número de identificación solo debe contener números.");
            return;
        }

        buscarRadicado({
            radicado: trimmedRadicado,
            identificacion: trimmedIdentificacion,
        });
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0B1A3E] border border-blue-900/50 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl shadow-blue-500/10 relative"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <Search className="text-blue-400" size={28} />
                            <h2 className="text-2xl font-bold text-white">Consultar Radicado</h2>
                        </div>

                        {/* --- Formulario (sin cambios) --- */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input type="text" placeholder="Número de radicado" value={radicado} onChange={(e) => setRadicado(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input type="text" placeholder="Número de identificación" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={cargando}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors">
                                {cargando ? (<><LoaderCircle size={20} className="animate-spin" />Consultando...</>) : ("Consultar")}
                            </motion.button>
                        </form>

                        {/* --- Sección de Resultados con Lógica Original y Diseño Responsive --- */}
                        {resultado && (
                            <motion.div
                                variants={resultsVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-6 border-t border-blue-900/50 pt-6"
                            >
                                {(Array.isArray(resultado) ? resultado : [resultado]).map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemVariants}
                                        className={`bg-blue-900/20 p-4 rounded-lg ${(Array.isArray(resultado) && idx < resultado.length - 1) ? 'mb-4' : ''}`}
                                    >
                                        {/* La única mejora es esta grilla responsive */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                            {Object.entries(item).map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    // Si una key es 'asunto' o similar, ocupará todo el ancho en desktop
                                                    className={['asunto', 'descripcion'].some(k => key.toLowerCase().includes(k)) ? 'sm:col-span-2' : ''}
                                                >
                                                    <p className="break-words">
                                                        <span className="font-semibold text-gray-100 capitalize">
                                                            {key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")}:
                                                        </span>{" "}
                                                        <span className={key.toLowerCase().includes("estado") ? "text-yellow-400 font-medium" : "text-gray-300"}>
                                                            {typeof value === "object" && value !== null ? JSON.stringify(value) : (value ?? "No disponible")}
                                                        </span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};