interface SpecificationsTableProps {
  specs: Record<string, unknown>;
}

export function SpecificationsTable({ specs }: SpecificationsTableProps) {
  const entries = Object.entries(specs).filter(
    ([, v]) => v !== null && v !== undefined && v !== '',
  );

  if (entries.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-gray-900 mb-3">
        Specifications
      </h3>
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([key, value], i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2.5 text-gray-500 font-medium w-2/5 capitalize">
                  {key.replace(/_/g, ' ')}
                </td>
                <td className="px-4 py-2.5 text-gray-800">
                  {typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
