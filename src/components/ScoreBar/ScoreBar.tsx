type ScoreProps = {
        value: number;
    };

const ScoreBar = ( {value} : ScoreProps ) => {
    const getColor = (val: number) => {
        if (val >= 70) return 'bg-green-500';
        if (val >= 40) return 'bg-yellow-400';
        return 'bg-red-500';
    };

    return(
        <div className="w-[100%] bg-gray-300 rounded-full h-7 overflow-hidden relative">
            <div 
                className={`h-full ${getColor(value)} transition-all duration-300`}
                style={{ width: `${value}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-black font-semibold">{value}%</p>
            </div>
        </div>
    );
};

export default ScoreBar;