import React, { useState, useId } from 'react';
import { STANDARD_FASTENERS } from '../data/initialData';
import { TorqueCalcResult } from '../types';
import { Calculator, Zap, ShieldCheck, Info, RotateCcw, ArrowRightLeft, Sliders, CheckCircle2 } from 'lucide-react';

export const TorqueCalculator: React.FC<{ onOpenInfo: () => void }> = ({ onOpenInfo }) => {
  const [threadSize, setThreadSize] = useState('M10');
  const [propertyClass, setPropertyClass] = useState<'8.8' | '10.9' | '12.9' | '4.8' | '5.8'>('10.9');
  const [frictionPreset, setFrictionPreset] = useState<'lubricated' | 'phosphate' | 'zinc' | 'dry' | 'custom'>('zinc');
  const [frictionValue, setFrictionValue] = useState(0.12);
  const [yieldPercent, setYieldPercent] = useState(90);

  // Quick unit converter state
  const [convertValue, setConvertValue] = useState<number>(50);
  const [convertFromUnit, setConvertFromUnit] = useState<'nm' | 'lbfft' | 'lbfin' | 'kgfm'>('nm');

  // Generate unique IDs for accessibility
  const threadSizeId = useId();
  const propertyClassId = useId();
  const yieldPercentId = useId();
  const frictionSliderId = useId();
  const convertValueId = useId();
  const convertFromUnitId = useId();

  // Preset frictions
  const handlePresetChange = (preset: 'lubricated' | 'phosphate' | 'zinc' | 'dry' | 'custom') => {
    setFrictionPreset(preset);
    if (preset === 'lubricated') setFrictionValue(0.08);
    else if (preset === 'zinc') setFrictionValue(0.12);
    else if (preset === 'phosphate') setFrictionValue(0.14);
    else if (preset === 'dry') setFrictionValue(0.18);
  };

  // Fastener selection
  const fastener = STANDARD_FASTENERS.find(f => f.size === threadSize) || STANDARD_FASTENERS[4];

  // Material Yield Strength Rp0.2 (MPa) based on ISO 898-1
  const getProofStrength = (propClass: string) => {
    switch (propClass) {
      case '4.8': return 320;
      case '5.8': return 400;
      case '8.8': return 640;
      case '10.9': return 900; // 940 MPa typical Rp0.2, 900 conservative design
      case '12.9': return 1080;
      default: return 640;
    }
  };

  // Calculation according to simplified VDI 2230 method:
  // Stress Area As (mm²)
  // Preload FM = 0.9 * As * Rp0.2 * (yieldPercent / 100)
  // Torque MA = FM * (0.16 * P + 0.58 * d2 * µth + (D_Km / 2) * µb)
  // With approx standard bearing diameter D_Km ≈ 1.3 * d, and d2 ≈ d - 0.6495 * P
  const calculateTorque = (): TorqueCalcResult => {
    const d = fastener.nominalDiameter;
    const p = fastener.pitch;
    const As = fastener.stressArea;
    const Rp02 = getProofStrength(propertyClass);

    // Effective stress limitation considering combined tension and torsion during tightening:
    // ν ≈ 0.9 typical utilization
    const effectiveFactor = (yieldPercent / 100);
    // Combined stress factor in VDI 2230 reduces pure tensile capability to ~90% due to thread torsion:
    const tensionStrengthEff = Rp02 * 0.9 * effectiveFactor;
    
    // Preload Force FM in Newtons
    const preloadN = tensionStrengthEff * As;
    const preloadKn = parseFloat((preloadN / 1000).toFixed(2));

    // Equivalent mean thread diameter d2
    const d2 = d - 0.6495 * p;
    // Mean head bearing diameter (assumed standard hex head ISO 4014)
    const Dkm = 1.35 * d;

    // Torque formula in N.m
    // MA = FM * [ (p / (2 * PI)) + (d2 * µ / 2) + (Dkm * µ / 2) ] / 1000
    const mu = frictionValue;
    const threadLeadTerm = p / (2 * Math.PI);
    const threadFrictionTerm = (d2 * mu) / 2;
    const headFrictionTerm = (Dkm * mu) / 2;

    const torqueNm = (preloadN * (threadLeadTerm + threadFrictionTerm + headFrictionTerm)) / 1000;
    const roundedNm = parseFloat(torqueNm.toFixed(1));

    // Conversions
    const torqueLbfFt = parseFloat((roundedNm * 0.737562).toFixed(1));
    const torqueLbfIn = parseFloat((roundedNm * 8.85075).toFixed(1));
    const torqueKgfM = parseFloat((roundedNm * 0.101972).toFixed(2));

    // Yield torque estimated (at 100% yield)
    const yieldTorque = parseFloat(((roundedNm / (yieldPercent / 100)) * 1.05).toFixed(1));

    // Recommended tightening angle estimated after snug torque (typically ~40% MA snug)
    // Approximate angle = (preload / stiffness) -> typical hard joint 60° to 90° for M8-M12
    const approxAngle = Math.round(45 + (d * 3.2));

    return {
      nominalDiameter: d,
      pitch: p,
      stressArea: As,
      proofStrength: Rp02,
      preloadKn,
      tighteningTorqueNm: roundedNm,
      tighteningTorqueLbfFt: torqueLbfFt,
      tighteningTorqueKgfM: torqueKgfM,
      tighteningTorqueLbfIn: torqueLbfIn,
      yieldTorqueNm: yieldTorque,
      recommendedAngleDeg: approxAngle,
      safetyMargin: yieldPercent <= 80 ? 'Conservador (Montagem Geral)' : yieldPercent <= 90 ? 'Padrão VDI 2230 (Aperto de Precisão)' : 'Crítico / Próximo ao Escoamento'
    };
  };

  const results = calculateTorque();

  // Unit conversion helper
  const getConvertedValues = () => {
    let inNm = 0;
    if (convertFromUnit === 'nm') inNm = convertValue;
    if (convertFromUnit === 'lbfft') inNm = convertValue / 0.737562;
    if (convertFromUnit === 'lbfin') inNm = convertValue / 8.85075;
    if (convertFromUnit === 'kgfm') inNm = convertValue / 0.101972;

    return {
      nm: (inNm).toFixed(2),
      lbfft: (inNm * 0.737562).toFixed(2),
      lbfin: (inNm * 8.85075).toFixed(1),
      kgfm: (inNm * 0.101972).toFixed(3),
      cnm: (inNm * 100).toFixed(0)
    };
  };

  const converted = getConvertedValues();

  return (
    <div id="torque-calculator-section" className="bg-[#0b1426] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide uppercase mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            Ferramenta de Engenharia VDI 2230
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Calculadora de Torque & Pré-Carga de Aperto
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl flex items-center gap-2">
            Simulação analítica de força axial (<span className="text-amber-300 font-mono">FM</span>) e momento torsor de aperto (<span className="text-amber-300 font-mono">MA</span>) baseada nas normas ISO 898-1, ISO 16047 e VDI 2230.
            <button onClick={onOpenInfo} className="text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-500/50 text-xs">
              Sobre a calculadora
            </button>
          </p>
        </div>

        <button
          onClick={() => {
            setThreadSize('M10');
            setPropertyClass('10.9');
            handlePresetChange('zinc');
            setYieldPercent(90);
          }}
          className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-slate-700"
          title="Restaurar padrão M10 Classe 10.9"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          Restaurar Padrão M10
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Thread Size & Property Class */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={threadSizeId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Diâmetro Nominal (Métrica ISO)
              </label>
              <select
                id={threadSizeId}
                value={threadSize}
                onChange={(e) => setThreadSize(e.target.value)}
                className="w-full bg-[#070c17] border border-slate-700 focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80 rounded-xl px-4 py-2.5 text-white font-mono text-sm outline-none transition-colors"
              >
                {STANDARD_FASTENERS.map(f => (
                  <option key={f.size} value={f.size} className="bg-slate-900 text-white">
                    {f.size} (Passo {f.pitch} mm | As {f.stressArea} mm²)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={propertyClassId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Classe de Resistência (ISO 898-1)
              </label>
              <select
                id={propertyClassId}
                value={propertyClass}
                onChange={(e) => setPropertyClass(e.target.value as any)}
                className="w-full bg-[#070c17] border border-slate-700 focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80 rounded-xl px-4 py-2.5 text-white font-mono text-sm outline-none transition-colors"
              >
                <option value="8.8">Classe 8.8 (Rp0.2 = 640 MPa)</option>
                <option value="10.9">Classe 10.9 (Rp0.2 = 900 MPa)</option>
                <option value="12.9">Classe 12.9 (Rp0.2 = 1080 MPa)</option>
                <option value="5.8">Classe 5.8 (Rp0.2 = 400 MPa)</option>
                <option value="4.8">Classe 4.8 (Rp0.2 = 320 MPa)</option>
              </select>
            </div>
          </div>

          {/* Friction Condition */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Condição de Atrito Total (μ_tot)
              </span>
              <span className="text-amber-400 font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                μ = {frictionValue.toFixed(2)}
              </span>
            </div>

            {/* Friction Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {[
                { id: 'lubricated', label: 'Lubrificado', sub: 'Graxa/MoS2 (0.08)' },
                { id: 'zinc', label: 'Zincado/Geomet', sub: 'Com cera (0.12)' },
                { id: 'phosphate', label: 'Fosfatizado', sub: 'Padrão (0.14)' },
                { id: 'dry', label: 'Seco/Oxidado', sub: 'Sem óleo (0.18)' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetChange(p.id as any)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    frictionPreset === p.id 
                      ? 'bg-amber-500/15 border-amber-400 text-amber-200' 
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="font-semibold">{p.label}</p>
                  <p className="text-[10px] text-slate-400">{p.sub}</p>
                </button>
              ))}
            </div>

            {/* Custom Slider */}
            <div className="bg-[#070c17] p-3 rounded-xl border border-slate-800 flex items-center gap-4">
              <Sliders className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <label htmlFor={frictionSliderId}>Ajuste Fino de Atrito (0.06 a 0.25)</label>
                  <span className="font-mono text-amber-300">μ = {frictionValue.toFixed(2)}</span>
                </div>
                <input
                  id={frictionSliderId}
                  type="range"
                  min="0.06"
                  max="0.25"
                  step="0.01"
                  value={frictionValue}
                  onChange={(e) => {
                    setFrictionValue(parseFloat(e.target.value));
                    setFrictionPreset('custom');
                  }}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Utilization % */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={yieldPercentId} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Aproveitamento do Limite de Escoamento (Rp0.2)
              </label>
              <span className="text-blue-400 font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
                {yieldPercent}% de Rp0.2
              </span>
            </div>
            <input
              id={yieldPercentId}
              type="range"
              min="50"
              max="95"
              step="5"
              value={yieldPercent}
              onChange={(e) => setYieldPercent(parseInt(e.target.value, 10))}
              className="w-full accent-blue-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>50% (Baixa Solicitação)</span>
              <span>75% (Geral)</span>
              <span className="text-amber-400">90% (VDI Padrão)</span>
              <span className="text-rose-400">95% (Crítico)</span>
            </div>
          </div>

          {/* Technical Info Note */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Atenção Prática:</strong> Pequenas variações de atrito (ex: de 0.10 para 0.18) podem reduzir a pré-carga real em mais de <strong>40%</strong> com o mesmo torque. Sempre audite o estado de lubrificação no recebimento de lotes.
            </p>
          </div>
        </div>

        {/* Right Column: Calculated Results & Visualization */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          {/* Main Display Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Primary Torque (N.m) */}
            <div className="bg-gradient-to-br from-[#0c1933] to-[#0a1324] border-2 border-amber-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80 mb-1 flex items-center justify-between">
                <span>Torque Recomendado (MA)</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">N.m</span>
              </div>
              <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
                {results.tighteningTorqueNm} <span className="text-xl font-normal text-amber-400">N.m</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Limite de Escoamento: ~{results.yieldTorqueNm} N.m
              </div>
            </div>

            {/* Preload Force (kN) */}
            <div className="bg-gradient-to-br from-[#0e1f3d] to-[#071326] border border-blue-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300/80 mb-1 flex items-center justify-between">
                <span>Força de Pré-Carga (FM)</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">kN</span>
              </div>
              <div className="text-4xl font-extrabold font-mono text-blue-200 tracking-tight">
                {results.preloadKn} <span className="text-xl font-normal text-blue-400">kN</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono">
                Área Resistente (As): {fastener.stressArea} mm²
              </div>
            </div>
          </div>

          {/* Secondary Units Breakdown */}
          <div className="bg-[#070c17] rounded-xl p-4 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Equivalências de Torque em Outros Sistemas:
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Libras-Pé (lbf.ft)</span>
                <span className="text-base font-bold font-mono text-amber-300">{results.tighteningTorqueLbfFt}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Libras-Pol (lbf.in)</span>
                <span className="text-base font-bold font-mono text-white">{results.tighteningTorqueLbfIn}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Quilograma-Força (kgf.m)</span>
                <span className="text-base font-bold font-mono text-blue-300">{results.tighteningTorqueKgfM}</span>
              </div>
            </div>
          </div>

          {/* Interactive Torque-Angle Diagram Simulation */}
          <div className="bg-[#070c17] rounded-xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Curva Característica de Aperto (Torque x Ângulo)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Ângulo Estimado: ~{results.recommendedAngleDeg}°
              </span>
            </div>

            {/* SVG Interactive Graphic */}
            <div className="h-28 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 300 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#d4af37" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="20" y1="15" x2="290" y2="15" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="20" y1="45" x2="290" y2="45" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="20" y1="75" x2="290" y2="75" stroke="#334155" />

                {/* Axis Labels */}
                <text x="25" y="12" fill="#64748b" fontSize="8" fontFamily="monospace">Torque (N.m)</text>
                <text x="240" y="86" fill="#64748b" fontSize="8" fontFamily="monospace">Ângulo (deg)</text>

                {/* Snug Zone, Elastic Zone, Yield Zone */}
                {/* Curve: Run-in (0->50), Elastic (50->200), Yield (200->270) */}
                <path
                  d="M 20 75 Q 55 74 70 65 L 210 28 Q 235 22 275 20"
                  fill="none"
                  stroke="url(#curveGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Operating Point Indicator */}
                <circle cx="205" cy="30" r="4.5" fill="#d4af37" stroke="#ffffff" strokeWidth="1.5" />
                <text x="145" y="24" fill="#d4af37" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  Ponto de Aperto ({results.tighteningTorqueNm} N.m)
                </text>

                {/* Snug point indicator */}
                <line x1="70" y1="65" x2="70" y2="75" stroke="#94a3b8" strokeDasharray="2 2" />
                <text x="60" y="85" fill="#94a3b8" fontSize="7" fontFamily="monospace">Snug</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> {results.safetyMargin}
              </span>
              <span className="text-slate-400 font-mono">
                Classe {propertyClass} • Passo {fastener.pitch}mm
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Quick Unit Converter Bar */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Conversor Rápido de Unidades de Torque:</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-[#070c17] px-3 py-1.5 rounded-lg border border-slate-700">
              <input
                id={convertValueId}
                type="number"
                value={convertValue}
                onChange={(e) => setConvertValue(parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent text-white font-mono text-sm outline-none text-right"
              />
              <select
                id={convertFromUnitId}
                value={convertFromUnit}
                onChange={(e) => setConvertFromUnit(e.target.value as any)}
                className="bg-transparent text-amber-400 text-xs font-semibold outline-none cursor-pointer"
              >
                <option value="nm" className="bg-slate-900 text-white">N.m</option>
                <option value="lbfft" className="bg-slate-900 text-white">lbf.ft</option>
                <option value="lbfin" className="bg-slate-900 text-white">lbf.in</option>
                <option value="kgfm" className="bg-slate-900 text-white">kgf.m</option>
              </select>
            </div>

            <span className="text-slate-500 font-bold">=</span>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-800 text-slate-200">
                <strong className="text-amber-300">{converted.nm}</strong> N.m
              </span>
              <span className="bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-800 text-slate-200">
                <strong className="text-blue-300">{converted.lbfft}</strong> lbf.ft
              </span>
              <span className="bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-800 text-slate-200">
                <strong className="text-emerald-300">{converted.kgfm}</strong> kgf.m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
