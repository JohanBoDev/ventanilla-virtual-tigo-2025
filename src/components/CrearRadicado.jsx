import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
    X, User, Mail, Hash, Building2, FileText, Info, Paperclip, UploadCloud,
    ArrowLeft, ArrowRight, Send, Check, Trash2
} from "lucide-react";
import toast from "react-hot-toast";

// --- Datos y configuración se mantienen intactos ---
const documentTypes = ["Cédula", "Nit", "Cédula Extranjería", "Pasaporte"];
const senderTypes = ["Cliente", "Proveedor", "Otro"];
const companies = ["Colombia Móvil S.A. E.S.P.", "UNE EPM Telecomunicaciones S.A.", "Edatel S.A.", "Orbitel"];
const subjectTypes = [
    "Gestión de Correspondencia General", "Solicitudes y peticiones generales PQR", "Demandas",
    "Tutelas", "Gestión requerimientos judiciales", "Gestión requerimientos legales",
    "Facturas / Cuentas de cobro proveedores", "Facturas arrendamiento inmuebles", "No Radicable"
];

const steps = [
    { number: 1, name: "Información del Remitente" },
    { number: 2, name: "Información del Documento" },
    { number: 3, name: "Comentarios y Envío" }
];

const stepVariants = {
    hidden: (direction) => ({ opacity: 0, x: direction > 0 ? "25%" : "-25%" }),
    visible: { opacity: 1, x: "0%", transition: { duration: 0.4, ease: "easeInOut" } },
    exit: (direction) => ({ opacity: 0, x: direction > 0 ? "-25%" : "25%", transition: { duration: 0.4, ease: "easeInOut" } }),
};

export default function CrearRadicadoModal_Visual({ isOpen, onClose }) {
    // --- Lógica de estado y funciones sin cambios ---
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState({
        documentType: "", identification: "", senderType: "", fullName: "",
        email: "", company: "", subject: "", comments: "",
    });
    const [documents, setDocuments] = useState([]);
    const [annexes, setAnnexes] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, fileType) => {
        const files = Array.from(e.target.files);
        if (fileType === 'document') setDocuments(prev => [...prev, ...files]);
        else setAnnexes(prev => [...prev, ...files]);
    };

    const removeFile = (fileName, fileType) => {
        if (fileType === 'document') setDocuments(prev => prev.filter(f => f.name !== fileName));
        else setAnnexes(prev => prev.filter(f => f.name !== fileName));
    }

    const nextStep = () => {
        setDirection(1);
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Radicado creado y enviado con éxito");
        onClose();
    };

    // --- Componentes de UI reutilizables (sin cambios) ---
    const renderInput = (name, placeholder, type, icon) => (<div className="relative"> <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div> <input type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" /> </div>);
    const renderSelect = (name, placeholder, options, icon) => (<div className="relative"> <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div> <select name={name} value={formData[name]} onChange={handleChange} className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"> <option value="" disabled className="text-gray-500">{placeholder}</option> {options.map(opt => <option key={opt} value={opt} className="bg-gray-800">{opt}</option>)} </select> <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"> <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0L10 10.405l2.908-2.857c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.629.418-.989.418s-.719-.151-.989-.418L5.516 9.19c-.408-.445-.436-1.197 0-1.642z" /></svg> </div> </div>);
    const renderFileInput = (label, name, state, icon) => (<div className="w-full"> <label className="relative block w-full cursor-pointer bg-gray-900/50 border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors rounded-lg p-6 text-center"> {icon} <span className="mt-2 block font-semibold text-gray-300">{label}</span> <input type="file" name={name} multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, name)} /> </label> <div className="mt-2 space-y-1 max-h-24 overflow-y-auto"> {state.map(file => (<div key={file.name} className="flex items-center justify-between bg-gray-900/80 text-gray-400 text-sm px-3 py-1 rounded"> <span className="truncate pr-2">{file.name}</span> <button type="button" onClick={() => removeFile(file.name, name)} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button> </div>))} </div> </div>);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-[#0B1A3E] border border-blue-900/50 rounded-2xl p-6 md:p-8 w-full max-w-4xl shadow-2xl text-white flex flex-col"
                        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-center mb-2">Crear Nuevo Radicado</h2>

                        {/* Barra de Progreso */}
                        <div className="flex justify-between items-center mt-5 mb-8 px-4 sm:px-8">
                            {steps.map((s, index) => (
                                <div key={s.number} className="flex items-center w-full">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s.number ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                        {step > s.number ? <Check size={24} /> : s.number}
                                    </div>
                                    <p className={`ml-3 whitespace-nowrap transition-colors duration-300 hidden sm:block font-semibold ${step >= s.number ? 'text-white' : 'text-gray-500'}`}>{s.name}</p>
                                    {index < steps.length - 1 && <div className={`flex-grow h-1 mx-4 transition-colors duration-300 rounded-full ${step > s.number ? 'bg-blue-600' : 'bg-gray-700'}`}></div>}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="overflow-hidden relative min-h-[300px] flex flex-col">
                            <AnimatePresence mode="wait" custom={direction}>
                                {/*
                                  FIX: Se eliminó el padding 'p-4' de este div.
                                  El padding del contenedor principal es suficiente y este
                                  estaba causando que el contenido se comprimiera.
                                */}
                                <motion.div className="flex-grow" key={step} custom={direction} variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                    {step === 1 && (<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5"> {renderSelect("documentType", "Tipo Documento (*)", documentTypes, <User size={20} />)} {renderInput("identification", "No. de identificación (*)", "text", <Hash size={20} />)} {renderSelect("senderType", "Tipo Remitente (*)", senderTypes, <Info size={20} />)} {renderInput("fullName", "Nombre y Apellido (*)", "text", <User size={20} />)} <div className="md:col-span-2"> {renderInput("email", "Correo electrónico (*)", "email", <Mail size={20} />)} </div> </div>)}
                                    {step === 2 && (<div className="space-y-6"> <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {renderSelect("company", "Selecciona empresa (*)", companies, <Building2 size={20} />)} {renderSelect("subject", "Tipo de Asunto (*)", subjectTypes, <FileText size={20} />)} </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"> {renderFileInput("Cargar Documentos (*)", "document", documents, <UploadCloud size={32} className="mx-auto text-blue-400" />)} {renderFileInput("Cargar Anexo", "annex", annexes, <Paperclip size={32} className="mx-auto text-gray-400" />)} </div> </div>)}
                                    {step === 3 && (<div> <label htmlFor="comments" className="font-semibold text-gray-300 mb-2 block">¿Desea realizar algún comentario adicional?</label> <textarea name="comments" id="comments" rows="8" value={formData.comments} onChange={handleChange} placeholder="Escribe tus comentarios aquí..." className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" /> </div>)}
                                </motion.div>
                            </AnimatePresence>
                        </form>

                        {/* Navegación */}
                        <div className="flex justify-between items-center mt-8 pt-2 border-t border-blue-900/50">
                            <motion.button type="button" onClick={prevStep} whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-2 bg-gray-700 hover:bg-gray-600 font-semibold  py-2 pt-5 px-5 rounded-lg transition-all duration-300 ${step === 1 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                                <ArrowLeft size={20} /> Atrás
                            </motion.button>

                            {step < 3 ? (<motion.button type="button" onClick={nextStep} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-5 rounded-lg transition-colors"> Siguiente <ArrowRight size={20} /> </motion.button>) : (<motion.button type="submit" onClick={handleSubmit} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-5 rounded-lg transition-colors"> <Send size={20} /> Radicar </motion.button>)}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}