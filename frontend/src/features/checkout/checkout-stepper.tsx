import { Check } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'ADDRESS' },
  { n: 2, label: 'ORDER SUMMARY' },
];

interface CheckoutStepperProps {
  step: number;
}

export function CheckoutStepper({ step }: CheckoutStepperProps) {
  return (
    <div className="px-3 sm:px-8 py-4 flex items-center justify-center gap-0">
      {STEPS.map(({ n, label }, i) => {
        const isDone = n < step;
        const isActive = n === step;
        return (
          <>
            {i > 0 && <div key={`line-${n}`} className="w-16 h-px bg-blue-300 mx-3" />}
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  isDone
                    ? 'bg-[#2874f0] border-[#2874f0] text-white'
                    : isActive
                      ? 'bg-[#2874f0] border-[#2874f0] text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : n}
              </div>
              <span
                className={`text-xs font-bold tracking-widest ${
                  isActive ? 'text-gray-800' : isDone ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
          </>
        );
      })}
    </div>
  );
}
