interface ChallengeFiltersProps {
    filterPoints: number | string;
    setFilterPoints: (val: number) => void;
    filterName: string;
    setFilterName: (val: string) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({ filterPoints, setFilterPoints, filterName, setFilterName, setPage }) => {

    const onPointsChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
    {
        setFilterPoints(parseInt(e.target.value));
        setPage(1);
    };

    const onFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        setFilterName(e.target.value);
        setPage(1);
    };

    return (
        <>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Title</span>
            </div>
            <input 
                type="text" 
                value={filterName} 
                placeholder="Title" 
                className="input input-bordered input-primary w-full max-w-xs" 
                onChange={onFilterNameChange}
            />
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Points</span>
            </div>
            <select className="select select-primary select-bordered" value={filterPoints} onChange={onPointsChange}>
                <option>All</option>
                {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
        </label>
        </>
    )
}

export default ChallengeFilters