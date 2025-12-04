interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
}

export default function DashboardCard({ title, value, icon, subtitle }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}
