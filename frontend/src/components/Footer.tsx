import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-800">
            <Image
              src="/logo.jpeg"
              alt="Caçadores de Falhas Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-bold">Caçadores de Falhas</h3>
        </div>
        <p className="text-gray-400 mb-4">Detecção de ondas gravitacionais</p>
        <p className="text-sm text-gray-500">
          © 2024 - Pietra Himmelsbach, Nei Agripino, Derick Galdino
        </p>
      </div>
    </footer>
  );
}
