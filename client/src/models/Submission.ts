interface Submission {
    id: number;
    creation_date: string;
    update_date: string;
    error: string;
    output: string;
    status: 'running' | 'broken' | 'ready' | 'success' | 'failure';
    src_data: string;
}

export default Submission;