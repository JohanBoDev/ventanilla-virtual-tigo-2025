import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// La URL base de la API de Tigo
const BASE_URL = "https://framework.tigo.com.co/apirouter-rswatermark/aps/v1/state";

export const useBuscarRadicado = () => {
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(false);

    /**
     * Limpia el resultado de la búsqueda anterior.
     * Útil para llamar al cerrar el modal.
     */
    const clearResultado = () => {
        setResultado(null);
    };

    const buscarRadicado = async ({ radicado, identificacion }) => {
        const toastId = toast.loading('Consultando información...');
        setCargando(true);
        setResultado(null);

        try {
            // ✅ Validación: no permitir ambos campos a la vez
            if (radicado && identificacion) {
                throw new Error("Solo puedes buscar por radicado o por identificación, no ambos.");
            }

            let endpoint = "";

            if (identificacion) {
                endpoint = `${BASE_URL}/id/${identificacion}`;
            } else if (radicado) {
                endpoint = `${BASE_URL}/${radicado}`;
            } else {
                throw new Error("Debes ingresar un número de radicado o de identificación.");
            }

            const response = await axios.get(endpoint);

            if (!response.data) throw new Error("Sin datos en la respuesta");

            setResultado(response.data);
            toast.success('Radicado encontrado con éxito', { id: toastId });

        } catch (err) {
            console.error("Error en la búsqueda:", err);

            if (err.message === "Solo puedes buscar por radicado o por identificación, no ambos.") {
                toast.error(err.message, { id: toastId });
            } else if (err.response?.status === 404) {
                toast.error('No se encontraron resultados. Verifica los datos.', { id: toastId });
            } else if (err.code === 'ERR_NETWORK') {
                toast.error('Error de red. Revisa tu conexión.', { id: toastId });
            } else {
                toast.error('Error al consultar el radicado.', { id: toastId });
            }
        } finally {
            setCargando(false);
        }
    };


    return { resultado, buscarRadicado, cargando, clearResultado };
};
