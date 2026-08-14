interface Props {
  fullScreen?: boolean;
}

const Loading = ({ fullScreen = true }: Props) => {
  return (
    <div className={`${fullScreen ? 'min-h-screen' : 'py-12'} flex flex-col justify-center items-center gap-8`}>
      <div className="text-7xl md:text-8xl font-black tracking-tight text-gray-800">
        <span className="text-blue-600">PIYA</span>
        <span className="text-gray-400">.</span>
        <span>Dev</span>
      </div>
      <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-blue-600 rounded-full animate-[loading_1.2s_ease-in-out_infinite]"></div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default Loading;