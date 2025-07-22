import TigoLogo from '@/assets/img/TIGOLogo.png'

// --- Componente Header ---
const Header = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-20 bg-transparent">
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={TigoLogo} alt="TIGO Logo" className="h-8" />
                </div>
                <div className="hidden lg:flex items-center gap-8">
                    <a href="#" className="text-sm font-semibold text-white/80 hover:text-white transition">Soluciones</a>
                    <a href="https://ayuda.tigo.com.co/hc/centro-de-ayuda/articles/1728715360-canales-de-atencion-al-cliente-tigo-general" target='_blank' className="text-sm font-semibold text-white/80 hover:text-white transition">Soporte</a>
                    <a href="https://mi.tigo.com.co/ingresar" className="text-sm font-semibold text-white/80 hover:text-white transition" target='_blank'>Mi Tigo</a>
                </div>
                <div className="flex items-center gap-4">
                    <a href="https://telefonosdecolombia.com/tigo/" target='_blank' className="hidden sm:block text-sm font-semibold text-white/80 hover:text-white transition">Contacto</a>
                    <button className="px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition">
                        Iniciar Sesión
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;