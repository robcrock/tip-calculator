import { Attribution } from "@/components/attribution";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Bill Select Tip % 5% 10% 15% 25% 50% Custom Number of People Tip Amount
        / person Total / person Reset
      </div>
      <Attribution
        name={"Robert Crocker"}
        link={"https://www.frontendmentor.io/profile/robcrock"}
      />
    </main>
  );
}
