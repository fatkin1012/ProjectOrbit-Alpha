"use client";
import React, { useMemo, useState } from "react";
import { SAPCase } from "../types";

export default function CaseForm({ onAdd }: { onAdd: (c: SAPCase) => void }) {
  const [tCodeInput, setTCodeInput] = useState("");
  const [tCodes, setTCodes] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [requirement, setRequirement] = useState("");
  const [steps, setSteps] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isPasted, setIsPasted] = useState(false);

  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = () => reject(new Error("Failed to read image file."));
      reader.readAsDataURL(file);
    });

  const handlePaste = async (e: React.ClipboardEvent) => {
    const imageItems = Array.from(e.clipboardData.items).filter((item) => item.type.includes("image"));
    if (imageItems.length > 0) {
      const blobs = imageItems
        .map((item) => item.getAsFile())
        .filter((file): file is File => file !== null);

      const nextImages = await Promise.all(blobs.map((blob) => readFileAsDataURL(blob)));
      setImages((prev) => [...prev, ...nextImages]);
      setIsPasted(true);
      window.setTimeout(() => setIsPasted(false), 1400);
    }
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) {
      return;
    }

    const nextImages = await Promise.all(files.map((file) => readFileAsDataURL(file)));
    setImages((prev) => [...prev, ...nextImages]);
    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const normalizeTCode = (value: string) => value.trim().toUpperCase();

  const addTCodes = (rawValue: string) => {
    const parsed = rawValue
      .split(/[\s,]+/)
      .map((code) => normalizeTCode(code))
      .filter((code) => code.length > 0);

    if (parsed.length === 0) {
      return;
    }

    setTCodes((prev) => {
      const merged = new Set([...prev, ...parsed]);
      return Array.from(merged);
    });
    setTCodeInput("");
  };

  const handleAddTCode = () => {
    addTCodes(tCodeInput);
  };

  const handleRemoveTCode = (codeToRemove: string) => {
    setTCodes((prev) => prev.filter((code) => code !== codeToRemove));
  };

  const canSave = useMemo(() => {
    return tCodes.length > 0 && [title, requirement, steps].every((field) => field.trim().length > 0);
  }, [requirement, steps, tCodes.length, title]);

  const onSave = () => {
    if (!canSave) {
      return;
    }

    onAdd({
      id: Date.now().toString(),
      tCode: tCodes[0],
      tCodes,
      title: title.trim(),
      requirement: requirement.trim(),
      steps: steps.trim(),
      screenshot: images[0],
      screenshots: images,
      createdAt: Date.now(),
    });

    setTCodeInput("");
    setTCodes([]);
    setTitle("");
    setRequirement("");
    setSteps("");
    setImages([]);
  };

  return (
    <section
      onPaste={handlePaste}
      className="glass-card pop-in rounded-3xl p-6 md:p-8"
      aria-label="Add new wiki case"
    >
      <h2 className="text-2xl font-semibold tracking-tight">Add A New SAP Case</h2>
      <p className="mt-1 text-sm text-slate-600">
        Capture solutions quickly and make them searchable for future you.
      </p>

      <div className="mt-5 grid gap-3">
        <label htmlFor="tcode" className="text-sm font-semibold text-slate-700">
          T-Codes
        </label>
        <div className="flex gap-2">
          <input
            id="tcode"
            className="h-12 flex-1 rounded-xl border-2 border-emerald-200 bg-white/90 px-3 outline-none transition focus:border-emerald-500"
            placeholder="e.g. VL03N, VA02"
            value={tCodeInput}
            onChange={(e) => setTCodeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                handleAddTCode();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTCode}
            className="h-12 rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-slate-600">Add one or multiple codes (comma or Enter).</p>

        {tCodes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tCodes.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleRemoveTCode(code)}
                className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                aria-label={`Remove ${code}`}
              >
                {code} x
              </button>
            ))}
          </div>
        )}

        <label htmlFor="title" className="text-sm font-semibold text-slate-700">
          Case Title
        </label>
        <input
          id="title"
          className="h-12 rounded-xl border-2 border-green-200 bg-white/90 px-3 outline-none transition focus:border-green-500"
          placeholder="e.g. Delivery status check not updating"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="requirement" className="text-sm font-semibold text-slate-700">
          Requirement
        </label>
        <textarea
          id="requirement"
          className="min-h-24 rounded-xl border-2 border-lime-200 bg-white/90 p-3 outline-none transition focus:border-lime-500"
          placeholder="What did the user ask for?"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
        />

        <label htmlFor="steps" className="text-sm font-semibold text-slate-700">
          Resolution Steps
        </label>
        <textarea
          id="steps"
          className="min-h-32 rounded-xl border-2 border-emerald-200 bg-white/90 p-3 outline-none transition focus:border-emerald-400"
          placeholder="Step-by-step notes to solve the case"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>

      <div className="mt-5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/80 p-4">
        <p className="text-sm font-semibold text-emerald-800">Paste Screenshot</p>
        <p className="text-xs text-emerald-700">
          Click this card and press Ctrl+V to paste one or more screenshots.
        </p>

        <label className="mt-3 inline-flex cursor-pointer rounded-lg border-2 border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50">
          Upload Screenshots
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadImages}
            className="sr-only"
          />
        </label>

        <div className="mt-3 text-xs text-emerald-700" role="status" aria-live="polite">
          {isPasted ? "Screenshot pasted successfully." : "Paste or upload screenshots."}
        </div>

        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={`${image.slice(0, 20)}-${index}`} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  className="max-h-32 w-full rounded-xl border border-emerald-200 object-cover shadow"
                  alt={`Screenshot preview ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-1 top-1 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold text-white"
                  aria-label={`Remove screenshot ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={!canSave}
        className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save To Wiki
      </button>
    </section>
  );
}