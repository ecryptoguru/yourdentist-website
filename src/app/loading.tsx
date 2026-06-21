export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
      <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-700 rounded-full animate-spin" />
      <p className="mt-4 text-warm-500 text-sm">Loading...</p>
    </div>
  );
}
