"use client";

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: "#c49098" }}>

      {/* Top right — warm peach/orange */}
      <div
        className="absolute"
        style={{
          width: "160vw",
          height: "130vh",
          top: "-30vh",
          right: "-40vw",
          background:
            "radial-gradient(ellipse at 60% 40%, #e88060 0%, #d87868 25%, #cc7878 50%, transparent 70%)",
          filter: "blur(60px)",
          animation: "sweep1 24s ease-in-out infinite",
          transformOrigin: "40% 60%",
        }}
      />

      {/* Top left — cool lavender-grey */}
      <div
        className="absolute"
        style={{
          width: "100vw",
          height: "100vh",
          top: "-20vh",
          left: "-30vw",
          background:
            "radial-gradient(ellipse at 35% 35%, #9898ac 0%, #a8a8bc 30%, transparent 65%)",
          filter: "blur(55px)",
          animation: "sweep2 28s ease-in-out infinite",
          transformOrigin: "65% 65%",
        }}
      />

      {/* Center — warm cream highlight */}
      <div
        className="absolute"
        style={{
          width: "90vw",
          height: "80vh",
          top: "15vh",
          left: "20vw",
          background:
            "radial-gradient(ellipse at 50% 50%, #f0c8a8 0%, #e8b898 35%, transparent 68%)",
          filter: "blur(50px)",
          animation: "sweep3 20s ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />

      {/* Bottom — soft cool grey-blue, very gradual */}
      <div
        className="absolute"
        style={{
          width: "180vw",
          height: "80vh",
          bottom: "-10vh",
          left: "-40vw",
          background:
            "radial-gradient(ellipse at 50% 80%, #9ea8b8 0%, #aeb8c8 30%, #bec4d0 55%, transparent 72%)",
          filter: "blur(65px)",
          animation: "sweep4 30s ease-in-out infinite",
          transformOrigin: "50% 20%",
        }}
      />

      {/* Mid — soft blending layer to smooth out the middle */}
      <div
        className="absolute"
        style={{
          width: "140vw",
          height: "60vh",
          top: "35vh",
          left: "-20vw",
          background:
            "radial-gradient(ellipse at 50% 50%, #d4a0a8 0%, #c89898 30%, transparent 65%)",
          filter: "blur(70px)",
          animation: "sweep5 26s ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />

      <style>{`
        @keyframes sweep1 {
          0%, 100% { transform: rotate(0deg) scale(1); }
          33%  { transform: rotate(-6deg) scale(1.04) translate(-3vw, 5vh); }
          66%  { transform: rotate(4deg)  scale(0.97) translate(3vw, -4vh); }
        }
        @keyframes sweep2 {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25%  { transform: rotate(7deg)  scale(1.05) translate(4vw, -5vh); }
          75%  { transform: rotate(-5deg) scale(0.96) translate(-5vw, 6vh); }
        }
        @keyframes sweep3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%  { transform: translate(6vw, 8vh) scale(1.1); }
          70%  { transform: translate(-5vw, -4vh) scale(0.94); }
        }
        @keyframes sweep4 {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(-4deg) scale(1.05) translate(4vw, -5vh); }
        }
        @keyframes sweep5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%  { transform: translate(-4vw, -5vh) scale(1.06); }
          70%  { transform: translate(5vw, 4vh) scale(0.96); }
        }
      `}</style>
    </div>
  );
}
