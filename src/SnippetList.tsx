import React from 'react';
import { Copy } from 'lucide-react';
import { snippets } from './snippets';

export const SnippetList = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button className="px-3 py-1.5 bg-slate-900 text-white rounded-full text-sm font-medium">Todos ({snippets.length})</button>
        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600">Jurisprudência (7)</button>
        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600">Legislação (1)</button>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          {snippets.map((snippet) => (
            <div key={snippet.id} className="mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.09614 11.0225V11.0223C0.252847 10.5373 -0.0361355 9.46262 0.450708 8.62236L4.5653 1.52166C5.05229 0.68125 6.13074 0.393329 6.97419 0.878504C7.81764 1.36368 8.10662 2.43834 7.61963 3.27861L3.50504 10.3793C3.01819 11.2196 1.93959 11.5075 1.09614 11.0225" fill="#FFCE00"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.0888 11.0223C10.2454 11.5073 9.16692 11.2196 8.67992 10.3793L4.56533 3.27861C4.07849 2.43834 4.36747 1.36368 5.21077 0.878504C6.05421 0.393329 7.13267 0.68125 7.61966 1.52166L11.7343 8.62236C12.2212 9.46262 11.9323 10.5373 11.0888 11.0223Z" fill="#378CC8"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.54745 1.40819C7.53577 1.39121 7.52486 1.37392 7.51273 1.35739C7.4915 1.32874 7.46876 1.30175 7.44632 1.27476C7.43101 1.25657 7.4166 1.23792 7.40068 1.22033C7.38067 1.19835 7.35929 1.17788 7.33837 1.15711C7.3176 1.13634 7.29728 1.11526 7.2753 1.0954C7.2574 1.07933 7.2386 1.06492 7.22026 1.04961C7.19327 1.02732 7.16643 1.00473 7.13778 0.983809C7.1211 0.971528 7.10351 0.960612 7.08638 0.948938C7.055 0.927559 7.02331 0.906485 6.99025 0.886926C6.971 0.875706 6.95114 0.865548 6.93143 0.854935C6.9005 0.838105 6.86942 0.821882 6.83788 0.807175C6.81286 0.795501 6.78739 0.785191 6.76192 0.774729C6.73554 0.763813 6.709 0.7532 6.68217 0.743648C6.65215 0.733035 6.62182 0.723786 6.59135 0.714689C6.568 0.707866 6.54465 0.701195 6.52115 0.695282C6.4887 0.687095 6.4558 0.680272 6.4229 0.673904C6.39986 0.669659 6.37681 0.665413 6.35361 0.661926C6.32162 0.657074 6.28948 0.653587 6.25719 0.650555C6.23156 0.648129 6.20594 0.646006 6.18047 0.644793C6.15136 0.643277 6.12209 0.642822 6.09283 0.642822C6.06357 0.642822 6.03431 0.643277 6.0052 0.644793C5.97957 0.646006 5.9541 0.648129 5.92848 0.650555C5.89618 0.653587 5.86404 0.657074 5.83205 0.661926C5.80885 0.665413 5.78581 0.669659 5.76276 0.673904C5.72986 0.680272 5.69696 0.687095 5.66436 0.695282C5.64101 0.701195 5.61766 0.707866 5.59431 0.714689C5.56384 0.723786 5.53336 0.733035 5.5035 0.743648C5.47666 0.7532 5.45013 0.763813 5.42359 0.774729C5.39812 0.785191 5.3728 0.795501 5.34779 0.807175C5.31625 0.821882 5.28517 0.838105 5.25409 0.854935C5.23453 0.865548 5.21467 0.875706 5.19541 0.886926C5.16221 0.906485 5.13052 0.927711 5.09913 0.948938C5.082 0.960612 5.06456 0.971528 5.04789 0.983809C5.01923 1.00473 4.99224 1.02732 4.96525 1.04976C4.94691 1.06492 4.92811 1.07948 4.91037 1.0954C4.88839 1.11526 4.86807 1.13634 4.84715 1.15711C4.82622 1.17803 4.80484 1.19835 4.78498 1.22033C4.76906 1.23792 4.75451 1.25657 4.73935 1.27476C4.71675 1.30175 4.69401 1.32874 4.67294 1.35739C4.66081 1.37392 4.64974 1.39121 4.63822 1.40819C4.61669 1.43957 4.59546 1.47126 4.57575 1.50431C4.26296 2.03239 4.23598 2.708 4.56574 3.27687L6.09283 5.91228L7.61992 3.27687C7.94954 2.708 7.92255 2.03239 7.60991 1.50446C7.5902 1.47126 7.56883 1.43957 7.54745 1.40819" fill="#7AB441"/>
                </svg>
                <span>Jusbrasil</span>
              </div>
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="text-[16px] font-semibold text-[#007A5F]">
                  <span>{snippet.id}. </span>
                  <span className="underline decoration-[#007A5F] underline-offset-2">{snippet.title}</span>
                </h3>
                <button className="flex items-center gap-2 px-4 h-9 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors w-fit font-semibold text-[14px] flex-shrink-0">
                  <Copy size={16} />
                  Copiar ementa
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-2">{snippet.meta}</p>
              <blockquote className="border-l-2 border-slate-300 pl-4 py-1 mt-3 text-slate-800 text-[14px] leading-relaxed">
                <span className="font-semibold">Ementa para citar:</span> {snippet.ementa}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
