

const Info = () => {
    return (
        <article className="prose lg:prose-xl mx-auto p-4">
            <h1>PySect: Python Coding Challenges Platform</h1>

            <h2>Welcome to PySect</h2>

            <h3>About PySect</h3>
            <p>PySect is a dedicated platform designed to enhance your Python coding skills through a series of engaging challenges. Whether you are a beginner looking to sharpen your programming abilities or an experienced developer seeking a fun way to practice, PySect is the ideal environment for you.</p>

            <h2>How it Works</h2>

            <h3>Challenge Structure</h3>
            <p>Each challenge on PySect presents a unique problem statement along with detailed descriptions and input/output examples. Your task is to write a Python script that generates the correct output based on the provided examples. The code is executed in a top-down manner, simulating a normal terminal execution.</p>

            <h3>Input Handling</h3>
            <p>All input values should be treated as if they were entered by a user through the <code>input</code> function. In the example scenarios, each "input block" represents an independent execution. Developers are not required to anticipate or handle multiple executions for each input block, as PySect manages this internally.</p>

            <h2>Scoring System</h2>

            <h3>Challenge Difficulty</h3>
            <p>Challenges are assigned a score that reflects their difficulty level. The higher the score, the more challenging the task. Successfully completing a challenge earns you the corresponding points.</p>

            <h3>Point Redemption</h3>
            <p>Accumulated points can be redeemed for exciting rewards available on the platform. This adds a competitive and rewarding element to your coding journey on PySect. Showcase your skills, earn points, and unlock a variety of rewards to enhance your coding experience.</p>

            <h2>Getting Started</h2>

            <ol>
                <li><strong>Explore Challenges</strong>: Browse through a diverse range of challenges tailored to different skill levels.</li>
                <li><strong>Submit Solutions</strong>: Upload your Python files to solve the challenges and see if your code stands up to the test.</li>
                <li><strong>Earn Points</strong>: Successfully completing challenges will earn you points based on their difficulty.</li>
                <li><strong>Redeem Rewards</strong>: Use your earned points to redeem rewards and enhance your coding journey.</li>
            </ol>

            <h2>Join PySect Today</h2>
            <p>PySect is more than just a coding platform; it's a community where developers come together to learn, challenge themselves, and grow. Join us today to embark on a rewarding coding adventure and elevate your Python programming skills.</p>

            <pre>
                <code>
                    # Happy Coding on PySect!
                    print("Welcome to PySect!")
                </code>
            </pre>

            <p>Version: 1.0.0</p>
        </article>
    )
}

export default Info