const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure a 'temp' directory exists for code execution
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

router.post('/run', async (req, res) => {
    const { code, language, testCases } = req.body;
    
    // 1. Setup language-specific configuration
    const filename = `quest_${Date.now()}`;
    let filePath = '';
    let command = '';

    if (language === 'javascript') {
        filePath = path.join(tempDir, `${filename}.js`);
        command = `node ${filePath}`;
    } else if (language === 'python') {
        filePath = path.join(tempDir, `${filename}.py`);
        command = `python ${filePath}`;
    } else {
        return res.status(400).json({ error: "Language not supported yet!" });
    }

    // 2. Write the code to a temporary file
    try {
        fs.writeFileSync(filePath, code);

        // 3. Execute the code
        // We use a 5-second timeout to prevent the server from hanging
        exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
            // Cleanup: Always delete the file regardless of outcome
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            if (error) {
                if (error.killed) return res.json({ success: false, output: "Time Limit Exceeded (Max 5s)" });
                return res.json({ success: false, output: stderr || error.message });
            }

            const userOutput = stdout.trim();
            
            // 4. Validate against Test Cases (Simple Example)
            // Expecting testCases to be an array: [{input: '...', expected: '...'}]
            let results = [];
            let allPassed = true;

            if (testCases && testCases.length > 0) {
                // For a single-run setup, we check if stdout matches the first expected output
                if (userOutput !== testCases[0].expected.trim()) {
                    allPassed = false;
                }
            }

            res.json({
                success: allPassed,
                output: userOutput,
                message: allPassed ? "✅ Test Case Passed!" : "❌ Wrong Answer"
            });
        });

    } catch (err) {
        console.error("Execution Error:", err);
        res.status(500).json({ error: "Guardian Error: The Judge is unavailable." });
    }
});

module.exports = router;