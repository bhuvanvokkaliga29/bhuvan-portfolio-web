import { useState } from "react";
import { Mic, Terminal, Zap, Code2, ArrowUpRight } from "lucide-react";

interface VoiceLog {
  title: string;
  voiceInput: string;
  diffAction: string;
  latency: string;
}

const voiceLogs: VoiceLog[] = [
  {
    title: "Mobile Architecture & GSAP Lifecycle",
    voiceInput:
      "Refactor mobile responsiveness: remove touch-none block, clear GSAP inline styles on unmount, and fix the desktop scroll pinning conflict.",
    diffAction:
      "Patch Contact.tsx, Welcome.tsx & Projects.tsx • CleanProps verified • Smooth 60fps mobile scroll",
    latency: "38ms",
  },
  {
    title: "130+ Feature AML Mule Detection",
    voiceInput:
      "Document the AML graph pipeline: highlight OOF-safe feature engineering, 0.9819 AUC-ROC on national leaderboard, and SHAP interpretability.",
    diffAction:
      "Add mathematical validation metrics • Integrate graph topology visualization • Compile verified results",
    latency: "44ms",
  },
  {
    title: "Multi-Agent Threat Intelligence",
    voiceInput:
      "Configure PhishAI Guard architecture: coordinate 6 autonomous agents across Shannon entropy, DKIM/SPF crypto verification, and IOC matching.",
    diffAction:
      "Synthesize 6-agent cooperative pipeline • Weighted ensemble scoring • Zero-day quarantine rules",
    latency: "41ms",
  },
];

const WisprFlowSection = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeLog = voiceLogs[selectedIdx];

  return (
    <section
      id="wispr-flow"
      className="relative w-full bg-[#09090b] text-white py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden z-20 border-t border-zinc-900"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-yellow-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      {/* Raw Background Monospace Watermark */}
      <div className="absolute top-10 right-10 text-[11vw] font-mono font-black text-white/[0.015] select-none pointer-events-none tracking-tighter leading-none">
        VOICE.IO
      </div>

      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1560px] mx-auto flex flex-col relative z-10">
        
        {/* Header Block: Raw, Bold & Minimalist */}
        <div className="max-w-4xl lg:max-w-5xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-yellow-400 font-mono text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            Wispr Flow Hiring Challenge • Growth Engineering
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
            Built by Voice. <br />
            <span className="text-transparent text-stroke-yellow">
              Brought to Life by Ideas.
            </span>
          </h2>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed pt-2 font-normal max-w-2xl">
            Keyboards are a 60 WPM mechanical bottleneck. Real system design happens at 150+ WPM. During this challenge, I used <span className="text-white font-semibold">Wispr Flow</span> as a high-bandwidth voice layer—dictating architecture, debugging parameters, and styling directives directly to AI coding tools at the speed of thought.
          </p>
        </div>

        {/* --- RAW TERMINAL WORKFLOW CONSOLE --- */}
        <div className="w-full bg-[#0f0f12] rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden mb-16">
          
          {/* Terminal Window Chrome */}
          <div className="bg-[#141418] px-6 py-3.5 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-700/80" />
              <span className="w-3 h-3 rounded-full bg-zinc-700/80" />
              <span className="w-3 h-3 rounded-full bg-zinc-700/80" />
              <span className="ml-3 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <Terminal size={12} className="text-yellow-400" />
                wispr-flow --session live_engineering_stream
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              VOICE PIPELINE READY
            </div>
          </div>

          {/* Console Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Live Audio Visualizer Bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#09090b] border border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <Mic size={15} />
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-300 block font-bold">
                    Acoustic Voice Stream
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Real-time dictation capture
                  </span>
                </div>
              </div>

              {/* Minimal Waveform Visualizer */}
              <div className="flex items-center gap-1 h-8">
                {[12, 24, 32, 18, 28, 14, 36, 20, 10, 26, 34, 16, 28, 22, 12, 30, 24, 18, 32, 14, 26, 20].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] bg-yellow-400 rounded-full transition-all duration-300"
                    style={{
                      height: `${h}px`,
                      opacity: 0.7 + (i % 3) * 0.15,
                    }}
                  />
                ))}
              </div>

              <span className="text-[11px] font-mono text-yellow-400 font-bold hidden sm:inline-block">
                Sub-50ms Latency
              </span>
            </div>

            {/* Prompt Selector Tabs */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                // Select Spoken Voice Trace:
              </span>
              <div className="flex flex-wrap gap-2">
                {voiceLogs.map((log, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`text-xs font-mono px-4 py-2 rounded-xl border transition-all ${
                      selectedIdx === idx
                        ? "bg-yellow-400 text-zinc-950 font-bold border-yellow-400 shadow-[0_0_20px_rgba(244,196,0,0.25)]"
                        : "bg-[#141418] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    0{idx + 1}. {log.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Transcript Output */}
            <div className="rounded-2xl bg-[#09090b] border border-zinc-800/80 p-5 font-mono text-xs space-y-4">
              <div>
                <span className="text-zinc-500 select-none">$ wispr-flow input --audio-stream</span>
                <p className="text-white font-medium text-sm sm:text-base leading-relaxed mt-1 pl-3 border-l-2 border-yellow-400">
                  {activeLog.voiceInput}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-zinc-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">✓ Executed:</span>
                  <span>{activeLog.diffAction}</span>
                </div>
                <span className="text-zinc-500 font-mono">
                  Engine Latency: <span className="text-yellow-400 font-bold">{activeLog.latency}</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* --- 3 RAW ARCHITECTURAL PRINCIPLES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="p-6 rounded-3xl bg-[#0f0f12] border border-zinc-800/80 space-y-3">
            <span className="text-yellow-400 font-mono text-xs font-bold">
              01 // SPEED OF THOUGHT
            </span>
            <h4 className="text-lg font-black uppercase text-white tracking-tight">
              High-Bandwidth Input
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Typing turns multi-dimensional thoughts into linear keystroke bottlenecks. Speaking instructions allows complete architectural contexts to be communicated in seconds without cognitive drag.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0f0f12] border border-zinc-800/80 space-y-3">
            <span className="text-yellow-400 font-mono text-xs font-bold">
              02 // DIRECT STEERING
            </span>
            <h4 className="text-lg font-black uppercase text-white tracking-tight">
              Agentic Synergy
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              AI code generation models are only as good as the prompt intent they receive. Voice provides the nuance, detail, and speed required to steer autonomous coding agents effectively.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0f0f12] border border-zinc-800/80 space-y-3">
            <span className="text-yellow-400 font-mono text-xs font-bold">
              03 // VELOCITY MULTIPLIER
            </span>
            <h4 className="text-lg font-black uppercase text-white tracking-tight">
              Rapid Execution
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              For high-growth engineering teams, execution velocity is everything. Voice dictation accelerates ideation-to-deployment cycles by eliminating typing strain and maintaining uninterrupted developer flow.
            </p>
          </div>

        </div>

        {/* Transparent Bottom Note */}
        <div className="mt-14 pt-6 border-t border-zinc-900 text-center font-mono text-[11px] text-zinc-500">
          Wispr Flow is the voice dictation tool used during the development of this portfolio upgrade for the Wispr Flow Hiring Challenge.
        </div>

      </div>
    </section>
  );
};

export default WisprFlowSection;
