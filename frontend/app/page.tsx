import DashboardPage from './n3/page';

export default function Home() {
  return (
    <div className="flex h-screen bg-background w-svw">
      <main className="flex-1 overflow-auto">
        <DashboardPage />
      </main>
    </div>
  );
}
