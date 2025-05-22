'use client';
// Props for each inventory bar showing item label, current amount, and maximum capacity
type InventoryBarProps = {
  label: string;
  value: number;
  max: number;
};

export default function InventoryBar(props: InventoryBarProps) {


    // Calculate how full the bar should be (0 to 1)
  const percentage = props.value / props.max;

  // Set bar color based on fill level
  let color = 'bg-red-500';
  if (percentage >= 0.66) {
    color = 'bg-green-500';
  } else {
    if (percentage >= 0.33) {
      color = 'bg-yellow-400';
    }
  }

  return (
     // Outer wrapper with background and padding
    <div className="bg-gray-200 rounded flex flex-col items-center pb-6 pt-4">
      <div className="w-full px-4 h-60 relative">
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
