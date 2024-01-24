interface Challenge {
    id: number;
    name: string;
    subtitle: string;
    description: string;
    points: number;
    input_sample: string;
    output_sample: string;
    memory_limit: number;
    time_limit: number;
    is_completed: boolean;
}

export default Challenge;