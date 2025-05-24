//spinner used to signify loading, takes in a colour so it can be used on all pages
type SpinnerProps = {
    color?: string;
  };
  
  export default function Spinner(props: SpinnerProps) {
    const spinnerColor = props.color ?? 'border-blue-500';
  
    return (
      <div className="flex items-center justify-center h-40">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-4 ${spinnerColor} border-solid`} />
      </div>
    );
  }
  