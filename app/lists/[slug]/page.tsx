import PicksDisplay from "@/app/lists/components/pickdisplay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row gap-4">
        <PicksDisplay />
      </div>
    </main>
  );
}
