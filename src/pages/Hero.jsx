import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import HeroImg from '@/assets/img/img-banner.png';
import { ModalConsultaRadicado } from "@/components/ModalConsultaRadicado";
import CrearRadicadoModal_Visual from '@/components/CrearRadicado'; // Asegúrate que el nombre de importación sea correcto

// --- Componente Hero Corregido para Móviles ---
const Hero = () => {
    const [modalCrearOpen, setModalCrearOpen] = useState(false);
    const [modalConsultarOpen, setModalConsultarOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <>
            <section className="relative min-h-screen w-full flex items-center  bg-[#002b5c] overflow-hidden py-24 sm:py-32">
                <Header />
                {/* Fondos decorativos */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#002b5c] via-[#003f7f] to-[#0a4e9a]"></div>
                <div className="absolute -bottom-1/2 -left-1/4 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent rounded-full blur-3xl"></div>

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/*
                      FIX: Se usa 'order' para controlar el orden visual.
                      - En móvil, el orden natural del DOM se aplica (Texto primero, luego Imagen).
                      - En pantallas grandes ('lg'), se invierte el orden con 'lg:order-first/last'.
                    */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-16 items-center"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* --- Columna de Texto y CTA (Primero en el DOM) --- */}
                        <div className="text-center lg:text-left lg:order-last">
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
                                variants={itemVariants}
                            >
                                Ventanilla Virtual
                                <span className="block text-blue-300">TIGO 2025</span>
                            </motion.h1>

                            <motion.p
                                className="mt-6 text-lg lg:text-xl text-blue-100 max-w-lg mx-auto lg:mx-0"
                                variants={itemVariants}
                            >
                                Radica y gestiona tus documentos de forma segura, rápida y desde cualquier lugar. La transformación digital a tu alcance.
                            </motion.p>

                            <motion.div
                                className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                                variants={itemVariants}
                            >
                                <button
                                    onClick={() => setModalCrearOpen(true)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full text-base font-semibold text-[#002B5C] bg-[#FFCC00] hover:bg-[#f5c100] transition-transform shadow-md hover:scale-105"
                                >
                                    Crear un Radicado
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>

                                <button
                                    onClick={() => setModalConsultarOpen(true)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full border border-blue-300 text-base font-semibold text-blue-100 hover:bg-white/10 transition"
                                >
                                    Consultar Radicado
                                </button>
                            </motion.div>
                        </div>

                        {/* --- Columna de Imagen (Segundo en el DOM) --- */}
                        <motion.div
                            className="flex justify-center lg:order-first"
                            variants={itemVariants}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative p-2 bg-white/10 rounded-3xl border border-white/20 shadow-2xl">
                                <img
                                    src={HeroImg}
                                    alt="Agente de TIGO presentando la Ventanilla Virtual"
                                    className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- Modales --- */}
            <CrearRadicadoModal_Visual isOpen={modalCrearOpen} onClose={() => setModalCrearOpen(false)} />
            <ModalConsultaRadicado isOpen={modalConsultarOpen} onClose={() => setModalConsultarOpen(false)} />
        </>
    );
};

export default Hero;