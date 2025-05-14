'use client';

type Props = {
  onClick?: () => void;
};

const DraggableHandle = ({ onClick }: Props) => (
  <div
    onClick={onClick}
    className="w-10 h-1.5 rounded-full bg-gray-400 mx-auto mt-2 cursor-pointer"
  />
);

export default DraggableHandle;
