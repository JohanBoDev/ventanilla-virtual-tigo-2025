import Hero from '@/pages/Hero'
import './App.css'
import FormInfoModal from '@/components/FormInfoModal';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

function App() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          // --- Estilos base para todas las notificaciones ---
          className: '', // className se puede dejar vacío si se usan estilos inline
          style: {
            background: '#0B1A3E', // Fondo oscuro del tema
            color: '#FFFFFF',      // Texto blanco
            border: '1px solid rgba(0, 102, 255, 0.2)', // Borde azul sutil
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 102, 255, 0.1), 0 8px 10px -6px rgba(0, 102, 255, 0.1)',
            padding: '16px',
            fontSize: '16px',
          },

          // --- Estilos específicos para cada tipo de notificación ---

          // Éxito (Success)
          success: {
            duration: 3000,
            icon: <CheckCircle className="text-green-400" />,
            style: {
              // Se pueden añadir estilos específicos si es necesario
              // background: '#10B981', // O un fondo verde
            },
          },

          // Error
          error: {
            duration: 4000,
            icon: <AlertTriangle className="text-red-400" />,
          },

          // Loading (se usa cuando llamas a toast.loading)
          loading: {
            icon: <Info className="text-blue-500 animate-pulse" />,
          },
        }}
      />      <Hero />
      <FormInfoModal />

    </>
  )
}

export default App

