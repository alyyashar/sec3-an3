'use client';
import { AuditHistoryTable } from '../_components/audit-history-table';

export default function N3XUSDashboard() {
  return (
    <div className="text-white p-6">
      <main className="flex-1 overflow-auto">
        <div className="flex my-4">
          <h2 className="text-3xl font-bold tracking-tight">
            N3XUS - Audit History
          </h2>
        </div>
        <AuditHistoryTable />
      </main>
    </div>
  );
}
