interface Challenge {
    id: number;
    name: string;
    description: string;
    points: number;
    input_sample: string;
    output_sample: string;
    memory_limit: number;
    time_limit: number;
    // other properties...
}

export default Challenge;