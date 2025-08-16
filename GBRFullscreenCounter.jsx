import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GBRFullscreenCounter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=Scxs7L0vhZ4");
  const [youtubeId, setYoutubeId] = useState("Scxs7L0vhZ4");

  const handleSet = (e) => {
    e?.preventDefault?.();
    const n = Number(inputValue);
    if (!Number.isNaN(n)) setCount(n);
  };

  const bump = (delta) => {
    setCount((c) => c + delta);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    try {
      const url = new URL(youtubeUrl);
      let id = url.searchParams.get("v");
      // Caso seja um link encurtado (youtu.be/ID)
      if (!id && url.hostname.includes("youtu.be")) {
        id = url.pathname.replace("/", "");
      }
      // Caso seja embed
      if (!id && url.pathname.includes("/embed/")) {
        id = url.pathname.split("/embed/")[1];
      }
      if (id) setYoutubeId(id);
    } catch {
      console.warn("URL inválido");
    }
  };

  // Atalhos de teclado (setas)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") bump(1);
      if (e.key === "ArrowDown") bump(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Fundo: vídeo YouTube */}
      <div className="absolute inset-0 -z-10">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&playsinline=1&loop=1&playlist=${youtubeId}`}
          title="YouTube background"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ pointerEvents: "none" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#002060]/50 via-black/40 to-black/70" />
      </div>

      {/* Conteúdo centrado */}
      <div className="relative flex h-full w-full items-center justify-center p-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
          <div className="flex items-center gap-6 sm:gap-10">
            {/* Controles esquerda */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => bump(1)}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-2xl backdrop-blur-md transition hover:bg-white/20"
              >
                ⬆️
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => bump(-1)}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-2xl backdrop-blur-md transition hover:bg-white/20"
              >
                ⬇️
              </motion.button>
            </div>

            {/* Número principal */}
            <div className="relative flex min-w-[240px] flex-col items-center justify-center text-center sm:min-w-[320px]">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-r from-[#E30613] via-white to-[#002060] opacity-80 blur-md" />
              <div className="rounded-[2rem] bg-[#002060]/30 p-6 backdrop-blur-xl ring-1 ring-white/20">
                <div className="text-xs uppercase tracking-[0.25em] text-white/80">Counter</div>
                <div className="relative mt-2 flex h-[140px] items-center justify-center sm:h-[180px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={count}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className="font-black leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                      style={{
                        fontSize: "clamp(72px, 14vw, 160px)",
                        color: "#FFFFFF",
                        textShadow: "0 4px 16px rgba(0,0,0,0.5)",
                      }}
                    >
                      {count}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Input número */}
                <form onSubmit={handleSet} className="mt-4 flex w-full items-center justify-center gap-3">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-40 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 backdrop-blur-md outline-none"
                    placeholder="Definir número"
                  />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="rounded-xl bg-[#E30613] px-4 py-2 font-semibold text-white shadow-lg"
                  >
                    Definir
                  </motion.button>
                </form>

                {/* Input link YouTube */}
                <form onSubmit={handleUrlSubmit} className="mt-4 flex w-full items-center justify-center gap-3">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-72 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 backdrop-blur-md outline-none"
                    placeholder="Colar link do YouTube"
                  />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="rounded-xl bg-[#002060] px-4 py-2 font-semibold text-white shadow-lg"
                  >
                    Atualizar
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Controles direita */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => bump(1)}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-2xl backdrop-blur-md transition hover:bg-white/20"
              >
                ⬆️
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => bump(-1)}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-2xl backdrop-blur-md transition hover:bg-white/20"
              >
                ⬇️
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#E30613] via-white to-[#002060] opacity-90" />
    </div>
  );
}
