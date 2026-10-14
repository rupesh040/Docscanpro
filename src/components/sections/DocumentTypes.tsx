import { documentTypes } from "@/data/document-types";
import type { DocumentType } from "@/data/document-types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

function DocumentThumbnail({ symbol }: { symbol: DocumentType["symbol"] }) {
  // Each thumbnail is a minimal inline SVG mimicking the document's appearance
  const thumbnails: Record<DocumentType["symbol"], React.ReactNode> = {
    marksheet: (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#F5F4F0" />
        <text x="50" y="14" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333" fontFamily="sans-serif">SCHOOL MARKSHEET</text>
        <line x1="10" y1="18" x2="90" y2="18" stroke="#999" strokeWidth="0.5" />
        {["Subject","Theory","Practical","Total","Grade"].map((h, i) => (
          <text key={h} x={10 + i * 18} y="25" fontSize="4" fill="#555" fontFamily="sans-serif">{h}</text>
        ))}
        {[["Mathematics","85","15","100","A"],["Science","78","20","98","A"],["English","82","18","100","A"],["Social St.","75","25","100","A"],["Computer","90","10","100","A"]].map((row, ri) => (
          row.map((cell, ci) => (
            <text key={`${ri}-${ci}`} x={10 + ci * 18} y={33 + ri * 8} fontSize="4" fill="#333" fontFamily="sans-serif">{cell}</text>
          ))
        ))}
        {/* Orange highlights */}
        <rect x="46" y="28" width="16" height="6" fill="#FF7847" opacity="0.15" />
        <rect x="64" y="28" width="14" height="6" fill="#FF7847" opacity="0.15" />
      </svg>
    ),
    "answer-sheet": (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#F5F4F0" />
        <text x="50" y="12" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333" fontFamily="sans-serif">ANSWER SHEET</text>
        <text x="10" y="22" fontSize="4" fill="#555" fontFamily="sans-serif">Roll No.:</text>
        <text x="10" y="30" fontSize="4" fill="#555" fontFamily="sans-serif">Q.</text>
        <text x="22" y="30" fontSize="4" fill="#555" fontFamily="sans-serif">A B C D</text>
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <g key={i}>
            <text x="10" y={38 + i * 8} fontSize="4" fill="#333" fontFamily="sans-serif">{i+1}</text>
            {[0,1,2,3].map(j => (
              <circle key={j} cx={24 + j * 7} cy={36 + i * 8} r="2.5"
                fill={i === 2 && j === 1 ? "#FF7847" : "none"}
                stroke={i === 2 && j === 1 ? "#FF7847" : "#999"} strokeWidth="0.6" />
            ))}
          </g>
        ))}
      </svg>
    ),
    invoice: (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#F5F4F0" />
        <text x="50" y="12" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333" fontFamily="sans-serif">INVOICE</text>
        <text x="10" y="22" fontSize="4" fill="#555" fontFamily="sans-serif">Invoice No.</text>
        <text x="70" y="22" textAnchor="end" fontSize="4" fill="#333" fontFamily="sans-serif">INV-2024</text>
        <line x1="10" y1="26" x2="90" y2="26" stroke="#ddd" strokeWidth="0.5" />
        {["Item","Qty","Rate","Amount"].map((h, i) => (
          <text key={h} x={10 + i * 20} y="33" fontSize="4" fontWeight="bold" fill="#555" fontFamily="sans-serif">{h}</text>
        ))}
        {[["Laptop","2","45,000","90,000"],["Mouse","5","500","2,500"],["Keyboard","3","1,200","3,600"]].map((row, ri) => (
          row.map((cell, ci) => (
            <text key={`${ri}-${ci}`} x={10 + ci * 20} y={41 + ri * 9} fontSize="4" fill="#333" fontFamily="sans-serif">{cell}</text>
          ))
        ))}
        <rect x="55" y="65" width="35" height="8" fill="#FF7847" opacity="0.15" />
        <text x="90" y="71" textAnchor="end" fontSize="4" fontWeight="bold" fill="#FF7847" fontFamily="sans-serif">96,100</text>
      </svg>
    ),
    certificate: (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#FDFBF4" />
        <rect x="4" y="4" width="92" height="122" stroke="#C9A84C" strokeWidth="1" fill="none" />
        <rect x="7" y="7" width="86" height="116" stroke="#C9A84C" strokeWidth="0.4" fill="none" />
        <text x="50" y="22" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#8B7355" fontFamily="serif">CERTIFICATE</text>
        <text x="50" y="32" textAnchor="middle" fontSize="4" fill="#8B7355" fontFamily="serif">This is to certify that</text>
        <text x="50" y="50" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333" fontFamily="serif">Rahul Sharma</text>
        <text x="50" y="60" textAnchor="middle" fontSize="4" fill="#555" fontFamily="serif">has successfully completed</text>
        <circle cx="50" cy="95" r="12" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
        <circle cx="50" cy="95" r="9" stroke="#C9A84C" strokeWidth="0.4" fill="#C9A84C" opacity="0.2" />
      </svg>
    ),
    "application-form": (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#F5F4F0" />
        <text x="50" y="12" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#333" fontFamily="sans-serif">APPLICATION FORM</text>
        <text x="10" y="22" fontSize="4" fontWeight="bold" fill="#555" fontFamily="sans-serif">Personal Information</text>
        {[["Name :","Rahul Sharma"],["Date of Birth :","15/08/2006"],["Address :","Lucknow"],["Phone :","9876543210"],["Email :","rahul@ex.com"]].map(([label, val], i) => (
          <g key={label}>
            <text x="10" y={32 + i * 10} fontSize="3.5" fill="#777" fontFamily="sans-serif">{label}</text>
            <text x="38" y={32 + i * 10} fontSize="3.5" fill="#333" fontFamily="sans-serif">{val}</text>
            <line x1="10" y1={34 + i * 10} x2="90" y2={34 + i * 10} stroke="#eee" strokeWidth="0.4" />
          </g>
        ))}
        <rect x="35" y="28" width="55" height="6" fill="#FF7847" opacity="0.1" />
      </svg>
    ),
    receipt: (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#F5F4F0" />
        <text x="50" y="12" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#333" fontFamily="sans-serif">RECEIPT</text>
        <text x="10" y="22" fontSize="4" fill="#555" fontFamily="sans-serif">Receipt No.</text>
        <text x="90" y="22" textAnchor="end" fontSize="4" fill="#333" fontFamily="sans-serif">RCP-00125</text>
        <text x="10" y="30" fontSize="4" fill="#555" fontFamily="sans-serif">Date</text>
        <text x="90" y="30" textAnchor="end" fontSize="4" fill="#333" fontFamily="sans-serif">10 Mar 2024</text>
        <line x1="10" y1="34" x2="90" y2="34" stroke="#ddd" strokeWidth="0.5" />
        {[["Tuition Fee","₹ 15,000"],["Exam Fee","₹ 2,000"]].map(([d, a], i) => (
          <g key={d}>
            <text x="10" y={42 + i * 9} fontSize="4" fill="#333" fontFamily="sans-serif">{d}</text>
            <text x="90" y={42 + i * 9} textAnchor="end" fontSize="4" fill="#333" fontFamily="sans-serif">{a}</text>
          </g>
        ))}
        <rect x="10" y="58" width="80" height="10" fill="#FF7847" opacity="0.15" />
        <text x="50" y="65" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#FF7847" fontFamily="sans-serif">Total: ₹ 17,000</text>
      </svg>
    ),
    attendance: (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#F5F4F0" />
        <text x="50" y="10" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#333" fontFamily="sans-serif">ATTENDANCE SHEET</text>
        <text x="50" y="18" textAnchor="middle" fontSize="4" fill="#555" fontFamily="sans-serif">Month: March 2024</text>
        {["Roll No.","Name","1","2","3","4","5"].map((h, i) => (
          <text key={h} x={8 + i * 13} y="26" fontSize="3.5" fontWeight="bold" fill="#555" fontFamily="sans-serif">{h}</text>
        ))}
        {[["001","Rahul","P","P","A","P","P"],["002","Priya","P","A","P","P","A"],["003","Amit","P","P","P","A","P"],["004","Sneha","A","P","P","P","P"],["005","Rohan","P","P","A","P","A"]].map((row, ri) => (
          row.map((cell, ci) => (
            <text key={`${ri}-${ci}`} x={8 + ci * 13} y={34 + ri * 8} fontSize="3.5"
              fill={cell === "A" ? "#FF7847" : "#333"} fontFamily="sans-serif">{cell}</text>
          ))
        ))}
      </svg>
    ),
    custom: (
      <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" aria-hidden="true">
        <rect width="100" height="130" fill="#151514" />
        <rect x="10" y="10" width="80" height="110" stroke="#2A2926" strokeWidth="1" strokeDasharray="4 2" fill="none" />
        <text x="50" y="16" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#77746F" fontFamily="sans-serif">CUSTOM DOCUMENT</text>
        <circle cx="50" cy="65" r="16" stroke="#FF7847" strokeWidth="1" fill="none" />
        <text x="50" y="63" textAnchor="middle" fontSize="18" fill="#FF7847" fontFamily="sans-serif">+</text>
        <text x="50" y="96" textAnchor="middle" fontSize="5" fill="#77746F" fontFamily="sans-serif">Create Your</text>
        <text x="50" y="104" textAnchor="middle" fontSize="5" fill="#77746F" fontFamily="sans-serif">Own Template</text>
      </svg>
    ),
  };

  return (
    <div className="w-full aspect-[3/4] bg-[#F5F4F0] border border-[#DDDDDD] overflow-hidden flex items-stretch">
      {thumbnails[symbol]}
    </div>
  );
}

export function DocumentTypes() {
  return (
    <section
      id="templates"
      className="py-20 lg:py-28 bg-[var(--bg)] border-t border-[var(--border)]"
      aria-labelledby="doc-types-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 mb-4 max-w-2xl">
          <Eyebrow>Supported Formats</Eyebrow>
          <SectionHeading id="doc-types-heading">
            One workflow.
            <br />
            Different documents.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[var(--text-2)] text-[15px] leading-relaxed max-w-[52ch] mb-12">
            Plain text extraction works on any readable document. Structured
            field extraction requires a configured template for that document&apos;s
            layout.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {documentTypes.map((doc) => (
            <StaggerItem key={doc.symbol}>
              <div className="bg-[var(--bg)] p-5 flex flex-col gap-4 h-full hover:bg-[var(--bg-2)] transition-colors duration-300 group cursor-default">
                <div className="w-full max-w-[130px]">
                  <DocumentThumbnail symbol={doc.symbol} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-sans font-semibold text-[14px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                    {doc.title}
                  </h3>
                  <p className="font-sans text-[12px] text-[var(--text-2)] leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-3)] border border-[var(--border)] inline-block px-3 py-2">
            Note: Structured extraction requires a user-configured template for each document layout
          </p>
        </Reveal>
      </div>
    </section>
  );
}
