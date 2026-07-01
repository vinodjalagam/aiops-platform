type LoadingProps = {
  text?: string;
};

export default function Loading({
  text = "Loading...",
}: LoadingProps) {
  return (
    <main className="flex-1 bg-slate-950 flex items-center justify-center">
      <div className="text-center">

        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        <h1 className="text-white text-2xl font-semibold">
          {text}
        </h1>

      </div>
    </main>
  );
}
