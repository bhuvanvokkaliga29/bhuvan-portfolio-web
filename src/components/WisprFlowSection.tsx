import { useState, useEffect } from "react";
import { Mic, Sparkles, Terminal, CheckCircle2, ArrowRight, Play, Pause, Cpu, Zap, Volume2 } from "lucide-react";

interface VoicePromptSample {
  id: string;
  label: string;
  spokenAudioText: string;
  actionOutput: string;
  resultMetric: string;
}

const voiceSamples: VoicePromptSample[] = [
  {
    id: "prompt-1",
    label: "Mobile GSAP Optimization",
    spokenAudioText:
      '"Refactor the mobile layout: clear GSAP inline styles on viewport switch, add cleanProps to prevent stuck transforms, and make the 3D cards swipeable."',
    actionOutput:
      "→ GSAP ticker synchronized with Lenis; inline opacity/transform resets added on mobile resize; touch-none removed for fluid scrolling.",
    resultMetric: "Zero layout shift • Smooth 60fps mobile scroll",
  },
  {
    id: "prompt-2",
    label: "AML Fraud Project Architecture",
    spokenAudioText:
      '"Document the AML Mule Detection pipeline: highlight the 130+ graph features, OOF-safe engineering, 0.9819 AUC-ROC on IIT Delhi leaderboard, and SHAP explainability."',
    actionOutput:
      "→ Project modal updated with mathematical validation, precision metrics, and multi-vector graph analysis.",
    resultMetric: "0.9819 AUC-ROC (Public) • 0.9813 (Private)",
  },
  {
    id: "prompt-3",
    label: "Wispr Flow Section Architecture",
    spokenAudioText:
      '"Design an interactive voice-driven section titled \'Built by Voice. Brought to Life by Ideas.\' with real-time waveform animation and a 4-step pipeline."',
    actionOutput:
      "→ Synthesized WisprFlowSection.tsx with animated SVG wave pulses, interactive prompt switcher, and transparent developer documentation.",
    resultMetric: "3x Developer Velocity • Zero keystroke friction",
  },
];

const WisprFlowSection = () => {
  const [activeSample, setActiveSample] = useState<VoicePromptSample>(voiceSamples[0]);
  const [isPlayingWaveform, setIsPlayingWaveform] = useState(true);
  const [typedChars, setTypedChars] = useState(0);

  // Animated transcription typing effect when prompt changes
  useEffect(() => {
    setTypedChars(0);
    const textLength = activeSample.spokenAudioText.length;
    const interval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= textLength) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [activeSample]);

  return (
    <section
      id="wispr-flow"
      className="relative w-full min-h-screen bg-zinc-950 text-white py-24 px-6 md:px-16 overflow-hidden z-20 border-t border-zinc-800/80"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-yellow-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Massive Background Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center text-[18vw] font-black uppercase tracking-tighter text-white/[0.02] select-none pointer-events-none leading-none">
        VOICE FIRST
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Mic size={14} className="animate-pulse" />
            Wispr Flow Hiring Challenge • November 2026
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            Built by Voice. <br />
            <span className="text-transparent text-stroke-yellow">
              Brought to Life by Ideas.
            </span>
          </h2>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Keyboards were built for transcribing mechanical text, not for communicating complex architectural visions. During this portfolio upgrade, I leveraged <span className="text-white font-bold">Wispr Flow</span> as a high-bandwidth voice dictation interface — speaking design decisions, code constraints, and refactoring instructions at the natural speed of thought.
          </p>
        </div>

        {/* --- INTERACTIVE VOICE WORKFLOW SIMULATOR --- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left Side: Voice Dictation & Interactive Waveform Box (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Control Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                  <Volume2 size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Voice Dictation Console
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Wispr Flow • Speech-to-Instruction Flow
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPlayingWaveform(!isPlayingWaveform)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-bold transition-colors"
                title="Toggle animated audio waveform"
              >
                {isPlayingWaveform ? <Pause size={12} /> : <Play size={12} />}
                <span className="text-[10px] uppercase tracking-wider">
                  {isPlayingWaveform ? "Pause Wave" : "Play Wave"}
                </span>
              </button>
            </div>

            {/* Prompt Selector Pills */}
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                Select Spoken Development Prompt:
              </span>
              <div className="flex flex-wrap gap-2">
                {voiceSamples.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => setActiveSample(sample)}
                    className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                      activeSample.id === sample.id
                        ? "bg-yellow-400 text-zinc-950 shadow-md scale-105"
                        : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Spoken Transcript Box with Typing Cursor */}
            <div className="bg-zinc-950/80 rounded-2xl p-5 border border-zinc-800/90 mb-6 font-mono relative">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                <span className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                  Spoken Voice Input:
                </span>
                <span>Sub-50ms Transcription</span>
              </div>
              <p className="text-zinc-200 text-sm leading-relaxed min-h-[4rem]">
                {activeSample.spokenAudioText.slice(0, typedChars)}
                <span className="inline-block w-2 h-4 bg-yellow-400 ml-1 animate-pulse align-middle" />
              </p>
            </div>

            {/* Dynamic Waveform Visualizer */}
            <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/60 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                <span>Acoustic Frequency Spectrum</span>
                <span className="text-green-400 font-mono">Stream Active</span>
              </div>
              <div className="flex items-center justify-between gap-1 h-12 px-2">
                {Array.from({ length: 36 }).map((_, i) => {
                  const heights = [
                    "h-2", "h-4", "h-7", "h-10", "h-6", "h-11", "h-8", "h-5", "h-9", "h-12",
                    "h-4", "h-8", "h-10", "h-6", "h-12", "h-9", "h-3", "h-7", "h-11", "h-5"
                  ];
                  const randomHeight = heights[i % heights.length];
                  return (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlayingWaveform ? `${randomHeight} bg-yellow-400` : "h-1.5 bg-zinc-700"
                      }`}
                      style={{
                        transitionDelay: `${(i % 6) * 50}ms`,
                        opacity: isPlayingWaveform ? 0.85 : 0.4,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Action Output Result */}
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-zinc-400 font-mono text-[11px]">
                {activeSample.actionOutput}
              </div>
              <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg whitespace-nowrap self-start sm:self-auto">
                {activeSample.resultMetric}
              </span>
            </div>
          </div>

          {/* Right Side: The 4-Step Voice-to-Code Pipeline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800 rounded-[32px] p-6 sm:p-8 flex-1 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-[0.2em] block mb-1">
                  Architecture
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6">
                  The Voice-to-Product Pipeline
                </h3>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex gap-4 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-yellow-400/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center font-black flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                        Spoken Intent <Mic size={12} className="text-yellow-400" />
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                        Articulating architectural thoughts and styling requirements in continuous speech without typing drag.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-yellow-400/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-green-400/10 border border-green-400/30 text-green-400 flex items-center justify-center font-black flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                        Wispr Flow Dictation <Zap size={12} className="text-green-400" />
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                        Noise-tolerant, rapid speech-to-text dictation converting nuanced developer terminology accurately.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-yellow-400/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/30 text-blue-400 flex items-center justify-center font-black flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                        AI Reasoning Engine <Cpu size={12} className="text-blue-400" />
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                        AI coding agent parses the dictated instructions, analyzes file trees, and writes surgical code diffs.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-yellow-400/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 text-purple-400 flex items-center justify-center font-black flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                        Verified Build & Ship <CheckCircle2 size={12} className="text-purple-400" />
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                        Automated compilation, zero-regression checks, test suite execution, and instant production deployment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Velocity Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-yellow-400 text-zinc-950 flex items-center justify-between font-black">
                <div>
                  <span className="text-[10px] uppercase tracking-widest block opacity-75">
                    Speed Multiplier
                  </span>
                  <span className="text-xl tracking-tight">3× Execution Speed</span>
                </div>
                <Sparkles size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* --- THREE CORE LESSONS: VOICE AS A PRODUCTIVITY INTERFACE --- */}
        <div className="w-full">
          <div className="text-center mb-8">
            <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-[0.2em]">
              Product & Growth Insights
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-1">
              What I Learned Building with Voice
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl hover:border-yellow-400/30 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-bold mb-4">
                01
              </div>
              <h4 className="text-base font-black uppercase text-white tracking-tight mb-2">
                High-Bandwidth Thinking
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Typing forces complex mental architectures through a 60 WPM serial bottleneck. Speaking at 150+ WPM lets developers communicate complete multi-faceted instructions in a single breath.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl hover:border-yellow-400/30 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-2xl bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 font-bold mb-4">
                02
              </div>
              <h4 className="text-base font-black uppercase text-white tracking-tight mb-2">
                Eliminating Cognitive Fatigue
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Long debugging sessions create physical and mental keystroke fatigue. Voice dictation keeps developers immersed in pure architectural problem-solving rather than keyboard friction.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl hover:border-yellow-400/30 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-2xl bg-blue-400/10 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold mb-4">
                03
              </div>
              <h4 className="text-base font-black uppercase text-white tracking-tight mb-2">
                The Future of AI Interfaces
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                As AI models become more agentic, human input is no longer about typing syntax line-by-line; it's about steering intent with high nuance. Voice is the native language of that future.
              </p>
            </div>

          </div>
        </div>

        {/* Transparent Disclosure Notice */}
        <div className="mt-16 text-center text-[11px] text-zinc-500 font-mono max-w-2xl border-t border-zinc-800/80 pt-6">
          <p>
            ℹ️ <span className="text-zinc-400 font-bold">Workflow Disclosure:</span> Wispr Flow is the voice-first dictation tool used during the hands-on engineering and iterative design of this portfolio upgrade. This section showcases that authentic workflow and product synergy for the Wispr Flow Hiring Challenge.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WisprFlowSection;

