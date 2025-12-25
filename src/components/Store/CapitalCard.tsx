import { useState } from "react";
import { EyeIcon } from "lucide-react";
import { IoEyeOff } from "react-icons/io5";
import type { CapitalCardProps } from "@/types/store";
export default function CapitalCard({
  cardText,
  moneyNumber,
}: CapitalCardProps) {
    const [showEyeIcon, setShowEyeIcon] = useState(false);
  return (
    <>
      {/* Capital Card */}
      <div
        className="flex items-center justify-center gap-3 bg-slate-50 p-4 py-2 rounded-xl border grow"
        onClick={() => setShowEyeIcon(!showEyeIcon)}
      >
        <div className="text-center">
          <p className="text-xs text-slate-500">{cardText}</p>
          <p className="font-semibold text-emerald-600">
            {showEyeIcon ? moneyNumber : "******"}
          </p>
        </div>
        <button>
          {showEyeIcon ? (
            <EyeIcon size={18} className="text-emerald-600" />
          ) : (
            <IoEyeOff size={18} className="text-slate-500" />
          )}
        </button>
      </div>
    </>
  );
}
