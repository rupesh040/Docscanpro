"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  FolderOpen,
  Camera,
  RotateCcw,
  RotateCw,
  Search,
  ShieldCheck,
  Copy,
  Upload,
  Minus,
  Square,
  X,
  Plus,
  Check,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  WifiOff,
  Layers,
  ArrowLeft,
  Crop,
  RotateCw as RotateIcon,
  Scaling,
  Sliders,
  Wand2,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface SubjectRow {
  num: string;
  code: string;
  subject: string;
  max: number;
  obtained: number;
  grade: string;
  status: "verified" | "review";
}

const initialRows: SubjectRow[] = [
  { num: "01", code: "CS401", subject: "Data Structures", max: 100, obtained: 86, grade: "A", status: "verified" },
  { num: "02", code: "CS402", subject: "Operating Systems", max: 100, obtained: 79, grade: "B+", status: "verified" },
  { num: "03", code: "CS403", subject: "Database Systems", max: 100, obtained: 91, grade: "A+", status: "verified" },
  { num: "04", code: "MA404", subject: "Discrete Mathematics", max: 100, obtained: 74, grade: "B+", status: "review" },
  { num: "05", code: "CS405", subject: "Computer Networks", max: 100, obtained: 83, grade: "A", status: "verified" },
  { num: "06", code: "CS406", subject: "Software Engineering", max: 100, obtained: 88, grade: "A", status: "verified" },
];

export default function ServicePage() {
  // Navigation & Workspace Mode
  const [workspaceMode, setWorkspaceMode] = useState<"scan-review" | "extracted-text">("scan-review");
  const [activeTab, setActiveTab] = useState<"marksheet" | "invoice">("marksheet");
  const [viewMode, setViewMode] = useState<"original" | "enhanced" | "detected">("detected");
  const [extractTab, setExtractTab] = useState<"fields" | "table" | "raw">("table");
  const [selectedFormat, setSelectedFormat] = useState<"PDF" | "EXCEL" | "CSV" | "TXT">("EXCEL");

  // Image Adjustments Sliders & Toggles
  const [brightness, setBrightness] = useState<number>(6);
  const [contrast, setContrast] = useState<number>(18);
  const [deskew, setDeskew] = useState<number>(0);
  const [removeBg, setRemoveBg] = useState<boolean>(true);
  const [noiseRemoval, setNoiseRemoval] = useState<boolean>(true);

  // Active Tool
  const [activeTool, setActiveTool] = useState<"crop" | "rotate" | "deskew" | "perspective" | "enhance">("crop");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Table Data State
  const [rows, setRows] = useState<SubjectRow[]>(initialRows);
  const [activeRow, setActiveRow] = useState<number>(3); // Row index 3 (MA404)
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  const reviewPending = rows.some((r) => r.status === "review");
  const totalObtained = rows.reduce((sum, r) => sum + r.obtained, 0);
  const totalMax = rows.reduce((sum, r) => sum + r.max, 0);
  const checksPassedCount = reviewPending ? 6 : 7;

  const handleAcceptReview = (val: number) => {
    setRows((prev) =>
      prev.map((r, i) => (i === 3 ? { ...r, obtained: val, status: "verified" } : r))
    );
  };

  const handleCellEdit = (index: number, valStr: string) => {
    const val = parseInt(valStr, 10) || 0;
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, obtained: val } : r))
    );
  };

  const handleExport = () => {
    setExportFeedback(`Exported Marksheet_Sem4.${selectedFormat.toLowerCase() === "excel" ? "xlsx" : selectedFormat.toLowerCase()}`);
    setTimeout(() => setExportFeedback(null), 3500);
  };

  const resetAdjustments = () => {
    setBrightness(0);
    setContrast(0);
    setDeskew(0);
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#E4E4E7] flex flex-col font-sans select-none overflow-x-hidden">
      {/* ── Top Return Banner for Marketing Site Visitors ── */}
      <div className="bg-[#14151B] border-b border-[#23242B] px-4 py-1.5 flex items-center justify-between text-xs text-[#9B9DA6]">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[var(--accent)] hover:text-[#FFA07A] font-mono text-[11px] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Marketing Overview</span>
          </Link>
          <span className="text-[#3A3B43]">|</span>
          <span className="font-mono text-[11px] text-[#A1A1AA]">
            DocScanPro Desktop App Service Simulator
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="text-[#71747F]">SWITCH VIEW:</span>
          <button
            onClick={() => setWorkspaceMode("scan-review")}
            className={`px-2 py-0.5 rounded transition-colors ${
              workspaceMode === "scan-review"
                ? "bg-[var(--accent)] text-[#0B0B0A] font-bold"
                : "text-[#A1A1AA] hover:text-white"
            }`}
          >
            Scan &amp; Field Detection
          </button>
          <button
            onClick={() => setWorkspaceMode("extracted-text")}
            className={`px-2 py-0.5 rounded transition-colors ${
              workspaceMode === "extracted-text"
                ? "bg-[var(--accent)] text-[#0B0B0A] font-bold"
                : "text-[#A1A1AA] hover:text-white"
            }`}
          >
            Extracted Data &amp; Table Review
          </button>
        </div>
      </div>

      {/* ── Desktop App Window Header Bar ── */}
      <header className="bg-[#111216] border-b border-[#202229] h-10 px-3 flex items-center justify-between">
        {/* Left: App Logo & Classic Menu */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
                stroke="#FF7847"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M11 12h10M11 16h10M11 20h6"
                stroke="#FF7847"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-semibold text-xs tracking-tight text-white">
              DocScan<span className="text-[var(--accent)]">Pro</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#8F929C] font-normal">
            <span className="hover:text-white cursor-pointer transition-colors">File</span>
            <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
            <span className="hover:text-white cursor-pointer transition-colors">View</span>
            <span className="hover:text-white cursor-pointer transition-colors">Tools</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help</span>
          </div>

          {/* Document Tabs */}
          <div className="flex items-center gap-1 pl-2">
            <button
              onClick={() => setActiveTab("marksheet")}
              className={`flex items-center gap-2 px-3 py-1 rounded-t text-xs font-mono transition-all ${
                activeTab === "marksheet"
                  ? "bg-[#1C1E24] text-white border-t-2 border-[var(--accent)]"
                  : "bg-[#14151A] text-[#71747F] hover:text-[#A1A1AA]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Marksheet_Sem4</span>
              <X size={11} className="text-[#71747F] hover:text-white ml-1" />
            </button>

            <button
              onClick={() => setActiveTab("invoice")}
              className={`flex items-center gap-2 px-3 py-1 rounded-t text-xs font-mono transition-all ${
                activeTab === "invoice"
                  ? "bg-[#1C1E24] text-white border-t-2 border-[var(--accent)]"
                  : "bg-[#14151A] text-[#71747F] hover:text-[#A1A1AA]"
              }`}
            >
              <span>Invoice_0187</span>
              <X size={11} className="text-[#71747F] hover:text-white ml-1" />
            </button>

            <button
              title="Open Document"
              className="p-1 text-[#71747F] hover:text-white transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-3 text-[#71747F]">
          <Minus size={13} className="hover:text-white cursor-pointer" />
          <Square size={11} className="hover:text-white cursor-pointer" />
          <X size={13} className="hover:text-red-400 cursor-pointer" />
        </div>
      </header>

      {/* ── Contextual Action Toolbar ── */}
      <div className="bg-[#141519] border-b border-[#202229] h-12 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-[#1B1D23] hover:bg-[#252830] text-[#D4D4D8] border border-[#2B2D37] text-xs px-3 py-1.5 rounded transition-all">
            <FolderOpen size={14} className="text-[var(--accent)]" />
            <span>Import</span>
          </button>
          <button className="flex items-center gap-1.5 bg-[#1B1D23] hover:bg-[#252830] text-[#D4D4D8] border border-[#2B2D37] text-xs px-3 py-1.5 rounded transition-all">
            <Camera size={14} className="text-[#38BDF8]" />
            <span>Scan</span>
          </button>

          <div className="h-5 w-px bg-[#262832] mx-1" />

          {/* If in Scan & Review Mode: show Image Editing Tools */}
          {workspaceMode === "scan-review" ? (
            <>
              <button
                onClick={() => setActiveTool("crop")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all ${
                  activeTool === "crop"
                    ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium shadow-sm"
                    : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37] hover:bg-[#252830]"
                }`}
              >
                <Crop size={14} />
                <span>Crop</span>
              </button>
              <button
                onClick={() => setActiveTool("rotate")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all ${
                  activeTool === "rotate"
                    ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                    : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37] hover:bg-[#252830]"
                }`}
              >
                <RotateIcon size={14} />
                <span>Rotate</span>
              </button>
              <button
                onClick={() => setActiveTool("deskew")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all ${
                  activeTool === "deskew"
                    ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                    : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37] hover:bg-[#252830]"
                }`}
              >
                <Scaling size={14} />
                <span>Deskew</span>
              </button>
              <button
                onClick={() => setActiveTool("perspective")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all ${
                  activeTool === "perspective"
                    ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                    : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37] hover:bg-[#252830]"
                }`}
              >
                <Sliders size={14} />
                <span>Perspective</span>
              </button>
              <button
                onClick={() => setActiveTool("enhance")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all ${
                  activeTool === "enhance"
                    ? "bg-[#1E2028] text-[var(--accent)] border-[var(--accent)] font-medium"
                    : "bg-[#1B1D23] text-[#D4D4D8] border-[#2B2D37] hover:bg-[#252830]"
                }`}
              >
                <Wand2 size={14} />
                <span>Enhance</span>
              </button>
            </>
          ) : (
            <>
              {/* In Extracted Text Mode: show Data & Verification Tools */}
              <button className="flex items-center gap-1.5 bg-[#1B1D23] hover:bg-[#252830] text-[#D4D4D8] border border-[#2B2D37] text-xs px-3 py-1.5 rounded transition-all">
                <Search size={13} />
                <span>Find &amp; replace</span>
              </button>
              <button
                onClick={() => handleAcceptReview(74)}
                className="flex items-center gap-1.5 bg-[#1B1D23] hover:bg-[#252830] text-[var(--accent)] border border-[var(--accent)]/50 text-xs px-3 py-1.5 rounded transition-all shadow-sm shadow-[var(--accent)]/10"
              >
                <ShieldCheck size={14} />
                <span>Validate</span>
              </button>
              <button className="hidden sm:flex items-center gap-1.5 bg-[#1B1D23] hover:bg-[#252830] text-[#D4D4D8] border border-[#2B2D37] text-xs px-3 py-1.5 rounded transition-all">
                <Copy size={13} />
                <span>Copy as table</span>
              </button>
            </>
          )}

          <div className="h-5 w-px bg-[#262832] mx-1" />

          <button title="Undo" className="p-1.5 text-[#8F929C] hover:text-white transition-colors">
            <RotateCcw size={14} />
          </button>
          <button title="Redo" className="p-1.5 text-[#8F929C] hover:text-white transition-colors">
            <RotateCw size={14} />
          </button>
        </div>

        {/* Search input & Export primary button */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:flex items-center">
            <Search size={13} className="absolute left-2.5 text-[#71747F]" />
            <input
              type="text"
              readOnly
              value="Search documents and text"
              className="bg-[#101115] border border-[#262833] text-xs rounded pl-8 pr-14 py-1.5 text-[#71747F] w-64 focus:outline-none"
            />
            <span className="absolute right-2 font-mono text-[9px] bg-[#1C1E26] text-[#71747F] px-1.5 py-0.5 rounded border border-[#2B2D38]">
              Ctrl K
            </span>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#0B0B0A] font-medium text-xs px-4 py-1.5 rounded transition-all shadow-md shadow-[var(--accent)]/20 active:scale-[0.98]"
          >
            <Upload size={14} className="stroke-[2.5]" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ── Main App Layout Grid ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── Left Sidebar (Workspace & Recent) ── */}
        <aside className="w-full lg:w-52 bg-[#111216] border-r border-[#202229] p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* WORKSPACE */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#636674] px-2 block mb-2">
                Workspace
              </span>
              <nav className="space-y-0.5 text-xs">
                <button
                  onClick={() => setWorkspaceMode("scan-review")}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded transition-colors ${
                    workspaceMode === "scan-review"
                      ? "bg-[#2A1D18] text-[var(--accent)] border-l-2 border-[var(--accent)] font-medium"
                      : "text-[#9CA3AF] hover:bg-[#181A20] hover:text-white"
                  }`}
                >
                  <Camera size={14} />
                  <span>Scan &amp; Review</span>
                </button>
                <button className="w-full flex items-center justify-between px-2.5 py-2 rounded text-[#9CA3AF] hover:bg-[#181A20] hover:text-white transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FolderOpen size={14} />
                    <span>Documents</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#71717A] bg-[#181A20] px-1.5 rounded">
                    12
                  </span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-[#9CA3AF] hover:bg-[#181A20] hover:text-white transition-colors">
                  <Layers size={14} />
                  <span>Templates</span>
                </button>
                <button
                  onClick={() => setWorkspaceMode("extracted-text")}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded transition-colors ${
                    workspaceMode === "extracted-text"
                      ? "bg-[#2A1D18] text-[var(--accent)] border-l-2 border-[var(--accent)] font-medium"
                      : "text-[#9CA3AF] hover:bg-[#181A20] hover:text-white"
                  }`}
                >
                  <FileText size={14} />
                  <span>Extracted Text</span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-[#9CA3AF] hover:bg-[#181A20] hover:text-white transition-colors">
                  <Upload size={14} />
                  <span>Exports</span>
                </button>
              </nav>
            </div>

            {/* RECENT */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#636674] px-2 block mb-2">
                Recent
              </span>
              <div className="space-y-1">
                <div className="p-2 bg-[#1A1C23] border border-[#292B36] rounded text-xs cursor-pointer">
                  <div className="font-mono text-xs text-white flex items-center gap-1.5">
                    <FileText size={12} className="text-[var(--accent)]" />
                    <span>Marksheet_Sem4</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#71747F] uppercase tracking-wider block mt-0.5">
                    Marksheet · 1 Page
                  </span>
                </div>

                <div className="p-2 hover:bg-[#16171E] rounded text-xs cursor-pointer transition-colors">
                  <div className="font-mono text-xs text-[#A1A1AA] flex items-center gap-1.5">
                    <FileText size={12} />
                    <span>Invoice_0187</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#636674] uppercase tracking-wider block mt-0.5">
                    Invoice · 2 Pages
                  </span>
                </div>

                <div className="p-2 hover:bg-[#16171E] rounded text-xs cursor-pointer transition-colors">
                  <div className="font-mono text-xs text-[#A1A1AA] flex items-center gap-1.5">
                    <FileText size={12} />
                    <span>Course_Certificate</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#636674] uppercase tracking-wider block mt-0.5">
                    Certificate · 1 Page
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer Status */}
          <div className="pt-4 border-t border-[#1F2128] space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-2 text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>OCR engine ready</span>
            </div>
            <div className="flex items-center gap-2 text-[#71747F]">
              <WifiOff size={11} />
              <span>Offline mode</span>
            </div>
          </div>
        </aside>

        {/* ── Optional Page Thumbnails Column (in Scan & Review mode) ── */}
        {workspaceMode === "scan-review" && (
          <aside className="w-24 bg-[#121318] border-r border-[#202229] p-2.5 flex flex-col items-center shrink-0">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#71747F] mb-3">
              Pages 1
            </span>
            <div className="w-16 p-1.5 bg-[#FAF8F2] border-2 border-[var(--accent)] rounded shadow cursor-pointer group relative">
              <div className="h-20 bg-white border border-[#DDD] p-1 flex flex-col justify-between overflow-hidden">
                <div className="w-full h-1.5 bg-[#555] rounded-xs mb-1" />
                <div className="space-y-1">
                  <div className="w-full h-0.5 bg-[#CCC]" />
                  <div className="w-4/5 h-0.5 bg-[#CCC]" />
                  <div className="w-full h-0.5 bg-[#CCC]" />
                </div>
                <div className="border border-[var(--accent)]/60 h-7 bg-[var(--accent)]/10" />
              </div>
              <span className="block text-center font-mono text-[8px] text-[#A1A1AA] mt-1 uppercase">
                Page 01
              </span>
            </div>

            <button
              title="Add Page"
              className="mt-3 w-16 h-12 border border-dashed border-[#2F323D] hover:border-[#4B5061] text-[#71747F] hover:text-white rounded flex items-center justify-center transition-colors"
            >
              <Plus size={16} />
            </button>
          </aside>
        )}

        {/* ── Center Document Canvas Pane ── */}
        <section className="flex-1 bg-[#141519] border-r border-[#202229] flex flex-col overflow-y-auto">
          {/* Top Segmented Toggle Bar */}
          <div className="h-10 border-b border-[#202229] px-4 flex items-center justify-between bg-[#111216]">
            <div className="flex items-center gap-1 bg-[#1A1C22] p-0.5 rounded border border-[#272933]">
              <button
                onClick={() => setViewMode("original")}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === "original"
                    ? "bg-[#252731] text-white font-medium"
                    : "text-[#828592] hover:text-white"
                }`}
              >
                Original
              </button>
              <button
                onClick={() => setViewMode("enhanced")}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === "enhanced"
                    ? "bg-[var(--accent)] text-[#0B0B0A] font-semibold"
                    : "text-[#828592] hover:text-white"
                }`}
              >
                Enhanced
              </button>
              <button
                onClick={() => setViewMode("detected")}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === "detected"
                    ? "bg-[var(--accent)] text-[#0B0B0A] font-semibold"
                    : "text-[#828592] hover:text-white"
                }`}
              >
                Detected fields
              </button>
            </div>

            <span className="font-mono text-[10px] text-[#71747F] uppercase tracking-widest">
              Template · Marksheet
            </span>
          </div>

          {/* Document Canvas Display with Annotations */}
          <div className="flex-1 p-6 flex justify-center items-center bg-[#16171D] overflow-y-auto relative">
            <div className="relative">
              {/* Corner Crop Brackets & Edge Midpoint Handles (in Scan & Review mode) */}
              {workspaceMode === "scan-review" && (
                <>
                  {/* Top-Left Bracket */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--accent)] pointer-events-none z-20" />
                  {/* Top-Right Bracket */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] pointer-events-none z-20" />
                  {/* Bottom-Left Bracket */}
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--accent)] pointer-events-none z-20" />
                  {/* Bottom-Right Bracket */}
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--accent)] pointer-events-none z-20" />

                  {/* Midpoint diamond handles */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[var(--accent)] rotate-45 z-20" />
                </>
              )}

              {/* Scanned Marksheet Sheet */}
              <div
                className="w-full max-w-[500px] bg-[#FAF8F2] text-[#1E1E1E] p-7 shadow-2xl rounded-sm border border-[#E0DCCE] relative select-text"
                style={{
                  filter: `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`,
                  transform: `rotate(${deskew}deg)`,
                }}
              >
                {/* University Emblem & Title */}
                <div className="text-center pb-4 border-b border-[#D6D0BE]">
                  <div className="mx-auto w-9 h-9 border-2 border-[#333] flex items-center justify-center rotate-45 mb-2">
                    <div className="w-5 h-5 bg-[#333] -rotate-45" />
                  </div>
                  <h1 className="font-serif text-lg tracking-widest uppercase font-bold text-[#1F1F1F]">
                    Sample University
                  </h1>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#666] mt-0.5">
                    Semester IV Examination
                  </p>
                  <div className="mt-2 py-1 bg-[#1F1F1F] text-white font-serif text-sm tracking-[0.25em] font-semibold uppercase">
                    Marksheet
                  </div>
                </div>

                {/* Student Details Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-3 border-b border-[#D6D0BE] text-[10px] font-mono relative">
                  {/* Student Name */}
                  <div className="relative">
                    <span className="text-[#777] block text-[8px] uppercase">Student Name</span>
                    <span className="font-semibold text-[#111] relative inline-block">
                      Aarav Mehta
                      {/* Bounding box around name */}
                      {viewMode === "detected" && (
                        <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/10 rounded-xs pointer-events-none" />
                      )}
                    </span>
                  </div>

                  {/* Roll Number */}
                  <div className="relative">
                    <span className="text-[#777] block text-[8px] uppercase">Roll Number</span>
                    <span className="font-semibold text-[#111] relative inline-block">
                      2304117
                      {viewMode === "detected" && (
                        <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/10 rounded-xs pointer-events-none" />
                      )}
                    </span>
                  </div>

                  {/* Programme */}
                  <div className="relative">
                    <span className="text-[#777] block text-[8px] uppercase">Programme</span>
                    <span className="font-semibold text-[#111] relative inline-block">
                      B.Sc. Computer Science
                      {viewMode === "detected" && (
                        <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/10 rounded-xs pointer-events-none" />
                      )}
                    </span>
                  </div>

                  {/* Session */}
                  <div className="relative">
                    <span className="text-[#777] block text-[8px] uppercase">Session</span>
                    <span className="font-semibold text-[#111] relative inline-block">
                      2025 – 2026
                      {viewMode === "detected" && (
                        <span className="absolute -inset-0.5 border border-[var(--accent)] bg-[var(--accent)]/10 rounded-xs pointer-events-none" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Marks Table */}
                <div className="mt-3 relative">
                  {/* Bounding box around entire table */}
                  {viewMode === "detected" && (
                    <div className="absolute -inset-1 border border-[var(--accent)] bg-[var(--accent)]/5 rounded-xs pointer-events-none" />
                  )}

                  <table className="w-full text-left text-[9px] border-collapse relative z-10">
                    <thead>
                      <tr className="border-b border-[#333] font-mono uppercase text-[#444]">
                        <th className="py-1 px-1">Code</th>
                        <th className="py-1 px-1">Subject</th>
                        <th className="py-1 px-1 text-center">Max</th>
                        <th className="py-1 px-1 text-center">Obtained</th>
                        <th className="py-1 px-1 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono divide-y divide-[#E6E1D2]">
                      {rows.map((row, idx) => (
                        <tr
                          key={row.code}
                          onClick={() => setActiveRow(idx)}
                          className={`cursor-pointer transition-colors ${
                            idx === activeRow
                              ? "bg-[#FFE8DE]"
                              : "hover:bg-[#F2EFE7]"
                          }`}
                        >
                          <td className="py-1 px-1 font-semibold text-[#222]">{row.code}</td>
                          <td className="py-1 px-1 text-[#333]">{row.subject}</td>
                          <td className="py-1 px-1 text-center text-[#555]">{row.max}</td>
                          <td className="py-1 px-1 text-center font-bold">
                            {idx === 3 && reviewPending ? (
                              <span className="inline-block px-1.5 py-0.5 bg-[var(--accent)]/20 border border-[var(--accent)] text-[#9A3412] rounded">
                                {row.obtained}
                              </span>
                            ) : (
                              <span>{row.obtained}</span>
                            )}
                          </td>
                          <td className="py-1 px-1 text-center font-semibold text-[#222]">
                            {row.grade}
                          </td>
                        </tr>
                      ))}
                      {/* Total row with bounding box */}
                      <tr className="border-t-2 border-[#333] font-bold font-mono relative">
                        <td colSpan={2} className="py-1.5 px-1 uppercase text-[#111]">
                          <span className="relative inline-block">
                            Total
                            {viewMode === "detected" && (
                              <span className="absolute -inset-1 border border-[var(--accent)] bg-[var(--accent)]/15 rounded-xs pointer-events-none" />
                            )}
                          </span>
                        </td>
                        <td className="py-1.5 px-1 text-center">{totalMax}</td>
                        <td className="py-1.5 px-1 text-center">{totalObtained}</td>
                        <td className="py-1.5 px-1 text-center">A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Signatures & Seal */}
                <div className="mt-8 pt-4 flex justify-between items-end text-[8px] font-mono text-[#666]">
                  <div className="text-center">
                    <div className="w-24 border-b border-[#999] mb-1" />
                    <span>Controller of Exams</span>
                  </div>

                  <div className="w-14 h-14 rounded-full border-2 border-[#1E3A8A]/30 flex items-center justify-center text-[7px] text-[#1E3A8A]/40 font-serif text-center uppercase tracking-tighter leading-tight p-1 rotate-12">
                    Official Seal
                  </div>

                  <div className="text-center">
                    <div className="w-20 border-b border-[#999] mb-1" />
                    <span>Registrar</span>
                  </div>
                </div>

                {/* ── Annotated Orange Field Labels & Leader Lines (in Detected fields mode) ── */}
                {viewMode === "detected" && (
                  <>
                    {/* Tag: STUDENT NAME */}
                    <div className="absolute top-[162px] -left-28 flex items-center gap-1">
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Student Name
                      </span>
                      <div className="w-10 h-px border-t border-dashed border-[var(--accent)]" />
                    </div>

                    {/* Tag: PROGRAMME */}
                    <div className="absolute top-[194px] -left-24 flex items-center gap-1">
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Programme
                      </span>
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                    </div>

                    {/* Tag: ROLL NUMBER */}
                    <div className="absolute top-[162px] -right-26 flex items-center gap-1">
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Roll Number
                      </span>
                    </div>

                    {/* Tag: SESSION */}
                    <div className="absolute top-[194px] -right-20 flex items-center gap-1">
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Session
                      </span>
                    </div>

                    {/* Tag: MARKS TABLE · 6 ROWS */}
                    <div className="absolute top-[260px] -right-36 flex items-center gap-1">
                      <div className="w-10 h-px border-t border-dashed border-[var(--accent)]" />
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Marks Table · 6 Rows
                      </span>
                    </div>

                    {/* Tag: TOTAL */}
                    <div className="absolute bottom-[88px] -left-18 flex items-center gap-1">
                      <span className="bg-[var(--accent)] text-[#0B0B0A] font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                        Total
                      </span>
                      <div className="w-8 h-px border-t border-dashed border-[var(--accent)]" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Canvas Bottom Zoom & Status Bar */}
          <div className="h-9 border-t border-[#202229] px-4 flex items-center justify-between text-[10px] font-mono bg-[#111216] text-[#71747F]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[var(--accent)] inline-block rounded-xs" />
              <span className="text-[var(--accent)] uppercase font-semibold">Detected Field</span>
              <span className="text-[#3B3D46]">·</span>
              <span>6 FIELDS FOUND</span>
            </div>

            {/* Zoom / Fit Controls */}
            <div className="flex items-center gap-1 bg-[#181A22] px-2 py-0.5 rounded border border-[#262832]">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="px-1 text-[#8F929C] hover:text-white"
              >
                —
              </button>
              <span className="px-2 text-white">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                className="px-1 text-[#8F929C] hover:text-white"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="px-1.5 text-[9px] text-[#8F929C] hover:text-white border-l border-[#2E313D] ml-1"
              >
                Fit
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-0.5 text-[#8F929C] hover:text-white"
              >
                <RefreshCw size={10} />
              </button>
            </div>

            <span>A4 · 210 × 297 MM</span>
          </div>
        </section>

        {/* ── Right Panel: Conditional by Workspace Mode ── */}
        {workspaceMode === "scan-review" ? (
          /* ── Scan & Review Tools Sidebar (Image Adjustments + Processing + Extracted Fields) ── */
          <aside className="w-full lg:w-80 bg-[#111216] p-4 flex flex-col justify-between shrink-0 space-y-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Processing Steps Status */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Processing</span>
                  <span className="font-mono text-[10px] text-[#71747F] uppercase tracking-wider">
                    4 Steps
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#A1A1AA]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#71747F]">01</span>
                      <CheckCircle2 size={13} className="text-[#10B981]" />
                      <span>Scan image</span>
                    </div>
                    <span className="text-[9px] uppercase text-[#10B981] font-bold">Done</span>
                  </div>

                  <div className="flex items-center justify-between text-[#A1A1AA]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#71747F]">02</span>
                      <CheckCircle2 size={13} className="text-[#10B981]" />
                      <span>Image processing</span>
                    </div>
                    <span className="text-[9px] uppercase text-[#10B981] font-bold">Done</span>
                  </div>

                  {/* Active Step with progress bar */}
                  <div className="bg-[#1C1D24] p-2 rounded border border-[var(--accent)]/30 space-y-1.5">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-[#71747F]">03</span>
                        <Loader2 size={13} className="text-[var(--accent)] animate-spin" />
                        <span className="font-semibold">OCR &amp; analysis</span>
                      </div>
                      <span className="text-[9px] uppercase text-[var(--accent)] font-bold">
                        Running
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#262833] rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[var(--accent)] rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[#71747F]">
                    <div className="flex items-center gap-2">
                      <span>04</span>
                      <span className="w-3 h-3 rounded-full border border-[#444] inline-block" />
                      <span>Structured data</span>
                    </div>
                    <span className="text-[9px] uppercase text-[#636674]">Waiting</span>
                  </div>
                </div>
              </div>

              {/* Image Adjustments Sliders */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-white">Image adjustments</span>
                  <button
                    onClick={resetAdjustments}
                    className="font-mono text-[9px] text-[var(--accent)] hover:underline uppercase tracking-wider"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
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
                    <div className="flex justify-between text-[11px] mb-1">
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
                    <div className="flex justify-between text-[11px] mb-1">
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

                  {/* Toggle switches */}
                  <div className="pt-2 border-t border-[#202229] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A1A1AA] text-xs">Remove background</span>
                      <button
                        onClick={() => setRemoveBg(!removeBg)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                          removeBg ? "bg-[var(--accent)] justify-end" : "bg-[#262833] justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#A1A1AA] text-xs">Noise removal</span>
                      <button
                        onClick={() => setNoiseRemoval(!noiseRemoval)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                          noiseRemoval ? "bg-[var(--accent)] justify-end" : "bg-[#262833] justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extracted Fields Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Extracted fields</span>
                  <button className="font-mono text-[9px] text-[#71747F] hover:text-white uppercase tracking-wider">
                    Edit
                  </button>
                </div>

                <div className="border border-[#262833] rounded overflow-hidden bg-[#181920]">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead>
                      <tr className="bg-[#121318] text-[#71747F] text-[9px] uppercase border-b border-[#262833]">
                        <th className="py-1.5 px-2">Field</th>
                        <th className="py-1.5 px-2">Value</th>
                        <th className="py-1.5 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#20222B]">
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Student name</td>
                        <td className="py-1.5 px-2 text-white font-medium">Aarav Mehta</td>
                        <td className="py-1.5 px-2 text-right text-[#10B981] text-[9px] uppercase">
                          Verified
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Roll number</td>
                        <td className="py-1.5 px-2 text-white">2304117</td>
                        <td className="py-1.5 px-2 text-right text-[#10B981] text-[9px] uppercase">
                          Verified
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Programme</td>
                        <td className="py-1.5 px-2 text-white truncate max-w-[90px]">
                          B.Sc. Computer Science
                        </td>
                        <td className="py-1.5 px-2 text-right text-[#10B981] text-[9px] uppercase">
                          Verified
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Session</td>
                        <td className="py-1.5 px-2 text-white">2025 – 2026</td>
                        <td className="py-1.5 px-2 text-right text-[#10B981] text-[9px] uppercase">
                          Verified
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Subjects</td>
                        <td className="py-1.5 px-2 text-white">6 rows</td>
                        <td className="py-1.5 px-2 text-right text-[#10B981] text-[9px] uppercase">
                          Verified
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Total marks</td>
                        <td className="py-1.5 px-2 text-white font-bold">{totalObtained} / 600</td>
                        <td className="py-1.5 px-2 text-right text-[#10B981] text-[9px] uppercase">
                          Verified
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 text-[#71747F]">Overall grade</td>
                        <td className="py-1.5 px-2 text-white font-bold">A</td>
                        <td className="py-1.5 px-2 text-right text-[var(--accent)] text-[9px] uppercase font-bold">
                          Review
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Export As */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Export as</span>
                  <span className="font-mono text-[9px] text-[#71747F] uppercase tracking-wider">
                    Select format
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 mb-3 font-mono text-[10px]">
                  {(["PDF", "EXCEL", "CSV", "TXT"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`py-1.5 rounded transition-all text-center ${
                        selectedFormat === fmt
                          ? "bg-[#2A1D18] text-[var(--accent)] border border-[var(--accent)] font-bold shadow-sm"
                          : "bg-[#1B1D23] text-[#8F929C] hover:text-white border border-[#262832]"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExport}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#0B0B0A] font-bold text-xs py-2.5 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20 active:scale-[0.98]"
                >
                  <Upload size={14} className="stroke-[2.5]" />
                  <span>Export document</span>
                </button>

                {exportFeedback && (
                  <div className="mt-2 p-2 bg-[#10B981]/15 border border-[#10B981]/40 rounded text-center text-xs font-mono text-[#10B981] animate-in fade-in">
                    ✓ {exportFeedback}
                  </div>
                )}
              </div>
            </div>
          </aside>
        ) : (
          /* ── Extracted Text Review Pane (Table review, crop inspect, and 7 verification checks) ── */
          <>
            <section className="w-full lg:w-[480px] bg-[#141519] border-r border-[#202229] flex flex-col overflow-y-auto shrink-0">
              <div className="h-10 border-b border-[#202229] px-4 flex items-center justify-between bg-[#111216]">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <button
                    onClick={() => setExtractTab("fields")}
                    className={`py-2 transition-colors ${
                      extractTab === "fields"
                        ? "text-white border-b-2 border-[var(--accent)] font-semibold"
                        : "text-[#71747F] hover:text-white"
                    }`}
                  >
                    Fields
                  </button>
                  <button
                    onClick={() => setExtractTab("table")}
                    className={`py-2 transition-colors ${
                      extractTab === "table"
                        ? "text-white border-b-2 border-[var(--accent)] font-semibold"
                        : "text-[#71747F] hover:text-white"
                    }`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setExtractTab("raw")}
                    className={`py-2 transition-colors ${
                      extractTab === "raw"
                        ? "text-white border-b-2 border-[var(--accent)] font-semibold"
                        : "text-[#71747F] hover:text-white"
                    }`}
                  >
                    Raw text
                  </button>
                </div>
                <span className="font-mono text-[9px] text-[#636674] uppercase tracking-widest">
                  Template · Marksheet
                </span>
              </div>

              <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                {/* Document Details Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#D4D4D8]">Document details</span>
                    <span className="font-mono text-[10px] text-[#71747F] uppercase tracking-wider">
                      4 Fields
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-[#1B1D23] border border-[#272932] rounded flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#71747F] block">
                          Student Name
                        </span>
                        <span className="text-xs font-medium text-white">Aarav Mehta</span>
                      </div>
                      <Check size={14} className="text-[#10B981]" />
                    </div>

                    <div className="p-2.5 bg-[#1B1D23] border border-[#272932] rounded flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#71747F] block">
                          Roll Number
                        </span>
                        <span className="text-xs font-medium text-white">2304117</span>
                      </div>
                      <Check size={14} className="text-[#10B981]" />
                    </div>

                    <div className="p-2.5 bg-[#1B1D23] border border-[#272932] rounded flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#71747F] block">
                          Programme
                        </span>
                        <span className="text-xs font-medium text-white">B.Sc. Computer Science</span>
                      </div>
                      <Check size={14} className="text-[#10B981]" />
                    </div>

                    <div className="p-2.5 bg-[#1B1D23] border border-[#272932] rounded flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#71747F] block">
                          Session
                        </span>
                        <span className="text-xs font-medium text-white">2025 – 2026</span>
                      </div>
                      <Check size={14} className="text-[#10B981]" />
                    </div>
                  </div>
                </div>

                {/* Marks Table Review Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#D4D4D8]">Marks table</span>
                    <span className="font-mono text-[9px] text-[#71747F] uppercase tracking-wider">
                      6 Rows · Click a cell to edit
                    </span>
                  </div>

                  <div className="border border-[#262833] rounded overflow-hidden bg-[#181920]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#121318] text-[#71747F] font-mono text-[9px] uppercase border-b border-[#262833]">
                          <th className="py-2 px-2.5">#</th>
                          <th className="py-2 px-2">Code</th>
                          <th className="py-2 px-2">Subject</th>
                          <th className="py-2 px-2 text-right">Max</th>
                          <th className="py-2 px-2 text-right">Obtained</th>
                          <th className="py-2 px-2 text-center">Grade</th>
                          <th className="py-2 px-2.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#20222B] font-mono text-[11px]">
                        {rows.map((row, idx) => {
                          const isSelected = idx === activeRow;
                          return (
                            <tr
                              key={row.code}
                              onClick={() => setActiveRow(idx)}
                              className={`cursor-pointer transition-colors ${
                                isSelected ? "bg-[#2A1D18]" : "hover:bg-[#1E2028]"
                              }`}
                            >
                              <td className="py-2 px-2.5 text-[#71747F]">{row.num}</td>
                              <td className="py-2 px-2 text-[#D4D4D8] font-semibold">{row.code}</td>
                              <td className="py-2 px-2 text-[#A1A1AA] truncate max-w-[120px]">
                                {row.subject}
                              </td>
                              <td className="py-2 px-2 text-right text-[#71747F]">{row.max}</td>
                              <td className="py-2 px-2 text-right font-bold">
                                {idx === 3 && row.status === "review" ? (
                                  <input
                                    type="number"
                                    value={row.obtained}
                                    onChange={(e) => handleCellEdit(idx, e.target.value)}
                                    className="w-12 text-right px-1 py-0.5 bg-[#14151B] border border-[var(--accent)] text-[var(--accent)] rounded focus:outline-none"
                                  />
                                ) : (
                                  <span className="text-white">{row.obtained}</span>
                                )}
                              </td>
                              <td className="py-2 px-2 text-center text-[#D4D4D8]">{row.grade}</td>
                              <td className="py-2 px-2.5 text-right">
                                {row.status === "verified" ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] text-[#10B981] font-mono uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                    Verified
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[9px] text-[var(--accent)] font-mono uppercase font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                    Review
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}

                        <tr className="bg-[#121318] border-t-2 border-[#292B37] font-semibold text-white">
                          <td colSpan={3} className="py-2 px-2.5 uppercase font-mono text-[10px]">
                            Total
                          </td>
                          <td className="py-2 px-2 text-right text-[#71747F]">{totalMax}</td>
                          <td className="py-2 px-2 text-right text-[var(--accent)]">{totalObtained}</td>
                          <td className="py-2 px-2 text-center">A</td>
                          <td className="py-2 px-2.5 text-right">
                            <span className="inline-flex items-center gap-1 text-[9px] text-[#10B981] font-mono uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                              Computed
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-2 text-[10px] font-mono text-[#10B981] flex items-center gap-1.5">
                    <Check size={12} />
                    <span>
                      Total matches. {rows.map((r) => r.obtained).join(" + ")} = {totalObtained}
                    </span>
                  </div>
                </div>

                {/* Bottom Source Crop & Cell Inspector */}
                <div className="pt-3 border-t border-[#202229] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#71747F]">
                    <span className="uppercase tracking-widest">Source Crop</span>
                    <span className="uppercase tracking-widest text-[#9CA3AF]">
                      Cell Inspector · Row 04
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#FAF8F2] text-[#222] p-2.5 rounded border border-[#3E404D] font-mono text-[9px]">
                      <div className="text-[#666] flex justify-between pb-1 border-b border-[#E0DCCE]">
                        <span>CS403 Database Systems</span>
                        <span>100  91  A+</span>
                      </div>
                      <div className="bg-[#FFE8DE] border-l-2 border-[var(--accent)] px-1 py-1 my-1 flex justify-between font-bold text-[#111]">
                        <span>MA404 Discrete Math</span>
                        <span className="px-1.5 bg-[var(--accent)]/30 border border-[var(--accent)] text-[#9A3412] rounded">
                          74
                        </span>
                        <span>B+</span>
                      </div>
                      <div className="text-[#666] flex justify-between pt-1 border-t border-[#E0DCCE]">
                        <span>CS405 Computer Networks</span>
                        <span>100  83  A</span>
                      </div>
                    </div>

                    <div className="bg-[#191B22] border border-[#2B2D38] p-3 rounded flex flex-col justify-between">
                      <span className="text-xs font-medium text-white block mb-1">
                        Confirm the detected value
                      </span>
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono">
                        <span className="text-[#71747F]">Detected:</span>
                        <span className="px-1.5 py-0.5 bg-[var(--accent)]/20 border border-[var(--accent)] text-[var(--accent)] font-bold rounded">
                          74
                        </span>
                        <span className="text-[#71747F]">Also read:</span>
                        <span
                          onClick={() => handleAcceptReview(71)}
                          className="px-1.5 py-0.5 bg-[#252833] text-[#A1A1AA] hover:text-white rounded cursor-pointer transition-colors"
                        >
                          71
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAcceptReview(74)}
                          className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#0B0B0A] text-xs font-semibold py-1.5 rounded transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Check size={13} />
                          <span>Accept 74</span>
                        </button>
                        <button className="px-2.5 py-1.5 bg-[#232530] hover:bg-[#2C2F3D] text-[#D4D4D8] text-xs rounded border border-[#343644] transition-all flex items-center gap-1">
                          <ArrowUpRight size={13} />
                          <span>Locate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Verification & Export Side Panel */}
            <aside className="w-full lg:w-72 bg-[#111216] p-4 flex flex-col justify-between shrink-0 space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Verification</span>
                    <span className="font-mono text-[10px] text-[#71747F] uppercase tracking-wider">
                      7 Checks
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="text-2xl font-bold font-mono text-white">
                        {checksPassedCount}/7
                      </span>
                      <span className="text-xs text-[#71747F]">checks passed</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      <div className="h-1.5 rounded-full bg-[#10B981]" />
                      <div className="h-1.5 rounded-full bg-[#10B981]" />
                      <div className="h-1.5 rounded-full bg-[#10B981]" />
                      <div className="h-1.5 rounded-full bg-[#10B981]" />
                      <div className="h-1.5 rounded-full bg-[#10B981]" />
                      <div className="h-1.5 rounded-full bg-[#10B981]" />
                      <div
                        className={`h-1.5 rounded-full transition-colors ${
                          reviewPending ? "bg-[var(--accent)]" : "bg-[#10B981]"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        <CheckCircle2 size={13} className="text-[#10B981]" />
                        <span>Student name</span>
                      </div>
                      <span className="text-[9px] text-[#10B981] uppercase font-bold">Pass</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        <CheckCircle2 size={13} className="text-[#10B981]" />
                        <span>Roll number</span>
                      </div>
                      <span className="text-[9px] text-[#10B981] uppercase font-bold">Pass</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        <CheckCircle2 size={13} className="text-[#10B981]" />
                        <span>Programme &amp; session</span>
                      </div>
                      <span className="text-[9px] text-[#10B981] uppercase font-bold">Pass</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        <CheckCircle2 size={13} className="text-[#10B981]" />
                        <span>All 6 subject rows read</span>
                      </div>
                      <span className="text-[9px] text-[#10B981] uppercase font-bold">Pass</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        <CheckCircle2 size={13} className="text-[#10B981]" />
                        <span>Max marks total 600</span>
                      </div>
                      <span className="text-[9px] text-[#10B981] uppercase font-bold">Pass</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        <CheckCircle2 size={13} className="text-[#10B981]" />
                        <span>Total equals sum of marks</span>
                      </div>
                      <span className="text-[9px] text-[#10B981] uppercase font-bold">Pass</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#D4D4D8]">
                        {reviewPending ? (
                          <AlertTriangle size={13} className="text-[var(--accent)]" />
                        ) : (
                          <CheckCircle2 size={13} className="text-[#10B981]" />
                        )}
                        <span>Obtained · MA404</span>
                      </div>
                      <span
                        className={`text-[9px] uppercase font-bold ${
                          reviewPending ? "text-[var(--accent)]" : "text-[#10B981]"
                        }`}
                      >
                        {reviewPending ? "Review" : "Pass"}
                      </span>
                    </div>
                  </div>

                  {reviewPending && (
                    <div className="mt-4 p-3 bg-[#241712] border border-[var(--accent)]/40 rounded text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-semibold text-[var(--accent)]">
                        <AlertTriangle size={13} />
                        <span>1 value needs review</span>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                        The digit in MA404 · Obtained was read from a low-contrast area. Confirm it
                        against the source crop.
                      </p>
                      <button
                        onClick={() => setActiveRow(3)}
                        className="flex items-center gap-1 font-mono text-[10px] text-[var(--accent)] hover:underline"
                      >
                        <ArrowUpRight size={11} />
                        <span>Jump to cell</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Export as</span>
                    <span className="font-mono text-[9px] text-[#71747F] uppercase tracking-wider">
                      Select format
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mb-3 font-mono text-[10px]">
                    {(["PDF", "EXCEL", "CSV", "TXT"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`py-1.5 rounded transition-all text-center ${
                          selectedFormat === fmt
                            ? "bg-[#2A1D18] text-[var(--accent)] border border-[var(--accent)] font-bold shadow-sm"
                            : "bg-[#1B1D23] text-[#8F929C] hover:text-white border border-[#262832]"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleExport}
                    className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#0B0B0A] font-bold text-xs py-2.5 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20 active:scale-[0.98]"
                  >
                    <Upload size={14} className="stroke-[2.5]" />
                    <span>Export document</span>
                  </button>

                  {exportFeedback && (
                    <div className="mt-2 p-2 bg-[#10B981]/15 border border-[#10B981]/40 rounded text-center text-xs font-mono text-[#10B981] animate-in fade-in">
                      ✓ {exportFeedback}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </>
        )}
      </div>

      {/* ── Global Bottom Status Bar ── */}
      <footer className="bg-[#0B0C0E] border-t border-[#1F2128] h-7 px-4 flex items-center justify-between font-mono text-[10px] text-[#71747F]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            READY
          </span>
          <span className="text-[#3B3D46]">|</span>
          <span>MARKSHEET_SEM4.SCAN</span>
          <span className="text-[#3B3D46]">|</span>
          <span>PAGE 1 OF 1</span>
        </div>

        <div className="flex items-center gap-3">
          <span>WORKS OFFLINE</span>
          <span className="text-[#3B3D46]">·</span>
          <span className="text-[#A1A1AA]">DOCSCANPRO</span>
        </div>
      </footer>
    </div>
  );
}
