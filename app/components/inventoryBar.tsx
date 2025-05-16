'use client';

type InventoryBarProps = {
  label: string;
  value: number;
  max: number;
};

export default function InventoryBar(props: InventoryBarProps) {
  const percentage = props.value / props.max;

  let color = 'bg-red-500';
  if (percentage >= 0.66) {
    color = 'bg-green-500';
  } else {
    if (percentage >= 0.33) {
      color = 'bg-yellow-400';
    }
  }

  return (
    <div className="bg-gray-200 rounded flex flex-col items-center py-4">
      <div className="w-full px-4 h-40 relative">
        <div className="h-full bg-white rounded border overflow-hidden relative">
          <div
            className={`w-full absolute bottom-0 left-0 ${color} transition-all duration-700 ease-in-out`}
            style={{
              height: (percentage * 100).toString() + '%'
            }}
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-center">{props.label}</div>
    </div>
  );
}
