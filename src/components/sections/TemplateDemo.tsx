"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eyebrow,
} from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  Crop,
  RotateCw,
  Scaling,
  Sliders,
  Wand2,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ExternalLink,
  Minus,
  Square,
  X,
  Plus,
} from "lucide-react";

export function TemplateDemo() {
  const [brightness, setBrightness] = useState<number>(6);
  const [contrast, setContrast] = useState<number>(18);
  const [deskew, setDeskew] = useState<number>(0);
  const [removeBg, setRemoveBg] = useState<boolean>(true);
  const [noiseRemoval, setNoiseRemoval] = useState<boolean>(true);
  const [activeTool, setActiveTool] = useState<string>("crop");

  return (
    <section
      id="templates-demo"
      className="py-20 lg:py-28 bg-[var(--bg-2)] border-t border-[var(--border)] relative overflow-hidden"
      aria-labelledby="template-demo-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <Reveal className="flex flex-col gap-4 mb-12 max-w-2xl">
          <Eyebrow>Field Detection &amp; Image Preparation</Eyebrow>
          <SectionHeading id="template-demo-heading">
            Precise extraction rules.
            <br />
            Configured in seconds.
          </SectionHeading>
          <p className="text-[var(--text-2)] text-[15px] leading-relaxed max-w-[54ch]">
            DocScanPro automatically highlights key regions, adjusts contrast and deskew, and
            maps your document into structured columns before OCR extraction begins.
          </p>
        </Reveal>

        {/* ── High-Fidelity Desktop App Frame ── */}
        <Reveal delay={0.15}>
          <div className="border border-[#262833] rounded-lg overflow-hidden bg-[#0D0E11] shadow-2xl">
            {/* Desktop Window Title Bar */}
            <div className="bg-[#111216] border-b border-[#202229] h-10 px-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path
                      d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
                      stroke="#FF7847"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M11 12h10M11 16h10M11 20h6"
                      stroke="#FF7847"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-semibold text-xs text-white">
                    DocScan<span className="text-[var(--accent)]">Pro</span>
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#71747F]">
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>Tools</span>
                  <span>Help</span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 pl-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#1C1E24] text-white rounded-t text-xs font-mono border-t-2 border-[var(--accent)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Marksheet_Sem4</span>
                    <X size={10} className="text-[#71747F] ml-1" />
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#14151A] text-[#71747F] rounded-t text-xs font-mono">
                    <span>Invoice_0187</span>
                    <X size={10} className="text-[#71747F] ml-1" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#71747F]">
                <Minus size={12} />
                <Square size={10} />
                <X size={12} />
              </div>
            </div>

            {/* Desktop Toolbar */}
            <div className="bg-[#141519] border-b border-[#202229] h-11 px-4 flex items-center justify-between gap-3 overflow-x-auto">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTool("crop")}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-all ${
                    activeTool === "crop"
                      ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                      : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37]"
                  }`}
                >
                  <Crop size={13} />
                  <span>Crop</span>
                </button>
                <button
                  onClick={() => setActiveTool("rotate")}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-all ${
                    activeTool === "rotate"
                      ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                      : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37]"
                  }`}
                >
                  <RotateCw size={13} />
                  <span>Rotate</span>
                </button>
                <button
                  onClick={() => setActiveTool("deskew")}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-all ${
                    activeTool === "deskew"
                      ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                      : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37]"
                  }`}
                >
                  <Scaling size={13} />
                  <span>Deskew</span>
                </button>
                <button
                  onClick={() => setActiveTool("perspective")}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-all ${
                    activeTool === "perspective"
                      ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                      : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37]"
                  }`}
                >
                  <Sliders size={13} />
                  <span>Perspective</span>
                </button>
                <button
                  onClick={() => setActiveTool("enhance")}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border transition-all ${
                    activeTool === "enhance"
                      ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                      : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37]"
                  }`}
                >
                  <Wand2 size={13} />
                  <span>Enhance</span>
                </button>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/service"
                  className="flex items-center gap-1.5 text-[var(--accent)] hover:underline font-mono text-[11px] uppercase tracking-wider"
                >
                  <span>Launch Live Workspace</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            {/* Inner Studio Work Area */}
            <div className="flex flex-col xl:flex-row">
              {/* Mini Pages Column */}
              <div className="hidden lg:flex w-20 bg-[#121318] border-r border-[#202229] p-2 flex-col items-center shrink-0">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#71747F] mb-2">
                  Pages 1
                </span>
                <div className="w-14 p-1 bg-[#FAF8F2] border-2 border-[var(--accent)] rounded shadow">
                  <div className="h-16 bg-white border border-[#DDD] p-1 flex flex-col justify-between">
                    <div className="w-full h-1 bg-[#555] rounded-xs" />
                    <div className="space-y-0.5">
                      <div className="w-full h-0.5 bg-[#CCC]" />
                      <div className="w-3/4 h-0.5 bg-[#CCC]" />
                    </div>
                    <div className="border border-[var(--accent)]/50 h-5 bg-[var(--accent)]/10" />
                  </div>
                  <span className="block text-center font-mono text-[7px] text-[#A1A1AA] mt-1 uppercase">
                    Page 01
                  </span>
                </div>
                <div className="mt-2 w-14 h-9 border border-dashed border-[#2F323D] text-[#71747F] rounded flex items-center justify-center">
                  <Plus size={13} />
                </div>
              </div>

              {/* Scanned Document Canvas */}
              <div className="flex-1 bg-[#16171D] p-6 lg:p-10 flex justify-center items-center overflow-x-auto relative">
                <div className="relative my-4">
                  {/* Corner Crop Brackets */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--accent)] pointer-events-none z-20" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] pointer-events-none z-20" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--accent)] pointer-events-none z-20" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--accent)] pointer-events-none z-20" />

                  {/* Midpoint diamond handles */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />

                  {/* Marksheet Sheet */}
                  <div
                    className="w-[360px] sm:w-[460px] bg-[#FAF8F2] text-[#1E1E1E] p-6 shadow-2xl rounded-sm border border-[#E0DCCE] relative select-none"
                    style={{
                      filter: `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`,
                      transform: `rotate(${deskew}deg)`,
                    }}
                  >
                    {/* Header */}
                    <div className="text-center pb-3 border-b border-[#D6D0BE]">
                      <div className="mx-auto w-8 h-8 border-2 border-[#333] flex items-center justify-center rotate-45 mb-1.5">
                        <div className="w-4 h-4 bg-[#333] -rotate-45" />
                      </div>
                      <h3 className="font-serif text-base tracking-widest uppercase font-bold text-[#1F1F1F]">
                        Sample University
                      </h3>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-[#666]">
                        Semester IV Examination
                      </p>
                      <div className="mt-1.5 py-0.5 bg-[#1F1F1F] text-white font-serif text-xs tracking-[0.25em] font-semibold uppercase">
                        Marksheet
                      </div>
                    </div>

                    {/* Metadata Box with Orange Detection Bounds */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-3 py-2.5 border-b border-[#D6D0BE] text-[9px] font-mono relative">
                      <div>
                        <span className="text-[#777] block text-[7px] uppercase">Student Name</span>
                        <span className="font-semibold text-[#111] relative inline-block">
                          Aarav Mehta
                          <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/15 rounded-xs" />
                        </span>
                      </div>
                      <div>
                        <span className="text-[#777] block text-[7px] uppercase">Roll Number</span>
                        <span className="font-semibold text-[#111] relative inline-block">
                          2304117
                          <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/15 rounded-xs" />
                        </span>
                      </div>
                      <div>
                        <span className="text-[#777] block text-[7px] uppercase">Programme</span>
                        <span className="font-semibold text-[#111] relative inline-block">
                          B.Sc. Computer Science
                          <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/15 rounded-xs" />
                        </span>
                      </div>
                      <div>
                        <span className="text-[#777] block text-[7px] uppercase">Session</span>
                        <span className="font-semibold text-[#111] relative inline-block">
                          2025 – 2026
                          <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/15 rounded-xs" />
                        </span>
                      </div>
                    </div>

                    {/* Marks Table */}
                    <div className="mt-2.5 relative">
                      <div className="absolute -inset-1 border border-[var(--accent)] bg-[var(--accent)]/5 rounded-xs pointer-events-none" />
                      <table className="w-full text-left text-[8px] border-collapse relative z-10 font-mono">
                        <thead>
                          <tr className="border-b border-[#333] uppercase text-[#444]">
                            <th className="py-1 px-1">Code</th>
                            <th className="py-1 px-1">Subject</th>
                            <th className="py-1 px-1 text-center">Max</th>
                            <th className="py-1 px-1 text-center">Obtained</th>
                            <th className="py-1 px-1 text-center">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E6E1D2]">
                          {[
                            ["CS401", "Data Structures", "100", "86", "A"],
                            ["CS402", "Operating Systems", "100", "79", "B+"],
                            ["CS403", "Database Systems", "100", "91", "A+"],
                            ["MA404", "Discrete Mathematics", "100", "74", "B+"],
                            ["CS405", "Computer Networks", "100", "83", "A"],
                            ["CS406", "Software Engineering", "100", "88", "A"],
                          ].map((r, i) => (
                            <tr key={r[0]} className={i === 3 ? "bg-[#FFE8DE]" : ""}>
                              <td className="py-1 px-1 font-semibold">{r[0]}</td>
                              <td className="py-1 px-1">{r[1]}</td>
                              <td className="py-1 px-1 text-center text-[#666]">{r[2]}</td>
                              <td className="py-1 px-1 text-center font-bold">{r[3]}</td>
                              <td className="py-1 px-1 text-center font-semibold">{r[4]}</td>
                            </tr>
                          ))}
                          <tr className="border-t-2 border-[#333] font-bold">
                            <td colSpan={2} className="py-1 px-1 uppercase">
                              <span className="relative inline-block">
                                Total
                                <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/20 rounded-xs" />
                              </span>
                            </td>
                            <td className="py-1 px-1 text-center">600</td>
                            <td className="py-1 px-1 text-center">501</td>
                            <td className="py-1 px-1 text-center">A</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Annotated Tags & Leader Lines */}
                    <div className="hidden sm:block absolute top-[148px] -left-28 flex items-center gap-1">
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Student Name
                      </span>
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                    </div>

                    <div className="hidden sm:block absolute top-[178px] -left-24 flex items-center gap-1">
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Programme
                      </span>
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                    </div>

                    <div className="hidden sm:block absolute top-[148px] -right-24 flex items-center gap-1">
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Roll Number
                      </span>
                    </div>

                    <div className="hidden sm:block absolute top-[178px] -right-20 flex items-center gap-1">
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Session
                      </span>
                    </div>

                    <div className="hidden sm:block absolute top-[242px] -right-32 flex items-center gap-1">
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Marks Table · 6 Rows
                      </span>
                    </div>

                    <div className="hidden sm:block absolute bottom-[82px] -left-16 flex items-center gap-1">
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Total
                      </span>
                      <div className="w-6 h-px border-t border-dashed border-[var(--accent)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Settings & Controls Sidebar */}
              <div className="w-full xl:w-76 bg-[#111216] border-t xl:border-t-0 xl:border-l border-[#202229] p-4 flex flex-col justify-between shrink-0 space-y-5">
                {/* Processing Steps */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Processing</span>
                    <span className="font-mono text-[9px] text-[#71747F] uppercase tracking-wider">
                      4 Steps
                    </span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-[#A1A1AA]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#71747F]">01</span>
                        <CheckCircle2 size={12} className="text-[#10B981]" />
                        <span>Scan image</span>
                      </div>
                      <span className="text-[#10B981] font-bold uppercase">Done</span>
                    </div>
                    <div className="flex items-center justify-between text-[#A1A1AA]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#71747F]">02</span>
                        <CheckCircle2 size={12} className="text-[#10B981]" />
                        <span>Image processing</span>
                      </div>
                      <span className="text-[#10B981] font-bold uppercase">Done</span>
                    </div>
                    <div className="bg-[#1C1D24] p-1.5 rounded border border-[var(--accent)]/30 space-y-1">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-[#71747F]">03</span>
                          <Loader2 size={12} className="text-[var(--accent)] animate-spin" />
                          <span className="font-semibold">OCR &amp; analysis</span>
                        </div>
                        <span className="text-[var(--accent)] font-bold uppercase">Running</span>
                      </div>
                      <div className="w-full h-1 bg-[#262833] rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-[var(--accent)] rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[#71747F]">
                      <div className="flex items-center gap-2">
                        <span>04</span>
                        <span className="w-2.5 h-2.5 rounded-full border border-[#444]" />
                        <span>Structured data</span>
                      </div>
                      <span className="uppercase text-[#636674]">Waiting</span>
                    </div>
                  </div>
                </div>

                {/* Image Adjustments Sliders */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Image adjustments</span>
                    <button
                      onClick={() => {
                        setBrightness(0);
                        setContrast(0);
                        setDeskew(0);
                      }}
                      className="font-mono text-[9px] text-[var(--accent)] hover:underline uppercase"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="space-y-2.5 font-mono text-[11px]">
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-[#A1A1AA]">Brightness</span>
                        <span className="text-white">+{brightness}</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={brightness}
                        onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                        className="w-full h-1 bg-[#262833] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-[#A1A1AA]">Contrast</span>
                        <span className="text-white">+{contrast}</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={contrast}
                        onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                        className="w-full h-1 bg-[#262833] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-[#A1A1AA]">Deskew angle</span>
                        <span className="text-white">{deskew.toFixed(1)}°</span>
                      </div>
                      <input
                        type="range"
                        min="-15"
                        max="15"
                        step="0.1"
                        value={deskew}
                        onChange={(e) => setDeskew(parseFloat(e.target.value))}
                        className="w-full h-1 bg-[#262833] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                    </div>

                    <div className="pt-2 border-t border-[#202229] space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#A1A1AA]">Remove background</span>
                        <button
                          onClick={() => setRemoveBg(!removeBg)}
                          className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${
                            removeBg ? "bg-[var(--accent)] justify-end" : "bg-[#262833] justify-start"
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#A1A1AA]">Noise removal</span>
                        <button
                          onClick={() => setNoiseRemoval(!noiseRemoval)}
                          className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors ${
                            noiseRemoval ? "bg-[var(--accent)] justify-end" : "bg-[#262833] justify-start"
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <div className="pt-3 border-t border-[#202229]">
                  <Link
                    href="/service"
                    className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#0B0B0A] font-bold text-xs py-2.5 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20 active:scale-[0.98]"
                  >
                    <span>Open in Full Workspace Studio</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
