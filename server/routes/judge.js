const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

router.post('/run', async (req, res) => {
    const { code, language, testCases, subject } = req.body;
    
    const filename = `quest_${Date.now()}`;
    let filePath = '';
    let command = '';

    if (language === 'javascript') {
        filePath = path.join(tempDir, `${filename}.js`);
        command = `node ${filePath}`;
    } else if (language === 'python') {
        filePath = path.join(tempDir, `${filename}.py`);
        command = `python3 ${filePath}`; 
    } else {
        return res.status(400).json({ error: "Protocol Error: Language not supported." });
    }

    try {
        fs.writeFileSync(filePath, code);

        exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            if (error) {
                if (error.killed) return res.json({ success: false, output: "TIMEOUT: CPU Overload / Infinite Loop detected." });
                return res.json({ success: false, output: stderr || error.message });
            }

            const userOutput = stdout.trim();
            let allPassed = true;
            let feedback = "✅ System Call Validated!";

            if (subject === 'os') {
                const expected = testCases[0]?.expected.trim();
                
                const cleanUser = userOutput.replace(/\s+/g, '').toLowerCase();
                const cleanExpected = expected.replace(/\s+/g, '').toLowerCase();

                if (cleanUser !== cleanExpected) {
                    allPassed = false;
                    feedback = `❌ Scheduling Conflict: Kernel expected [${expected}] but process returned [${userOutput}].`;
                }
            } 
            else {
                if (testCases && testCases.length > 0) {
                    if (userOutput !== testCases[0].expected.trim()) {
                        allPassed = false;
                        feedback = "❌ Logic Error: Result does not match the Expected Archive.";
                    }
                }
            }

            res.json({
                success: allPassed,
                output: userOutput,
                message: feedback
            });
        });

    } catch (err) {
        console.error("Judge Crash:", err);
        res.status(500).json({ error: "Kernel Panic: Judge is offline." });
    }
});

module.exports = router;