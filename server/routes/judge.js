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
    const { code, language, testCases } = req.body;
    const filename = `quest_${Date.now()}`;
    let filePath = '';
    let command = '';
    let compileCommand = '';

    // 1. Wrap code based on language to inject test cases automatically
    let wrappedCode = code;

    if (language === 'javascript') {
        filePath = path.join(tempDir, `${filename}.js`);
        wrappedCode += `
            const testCases = ${JSON.stringify(testCases)};
            testCases.forEach((tc, index) => {
                try {
                    const args = JSON.parse("[" + tc.input + "]"); 
                    const result = solve(...args);
                    process.stdout.write(result.toString() + (index < testCases.length - 1 ? "###" : ""));
                } catch (e) {
                    process.stderr.write("Runtime Error in test case " + (index + 1));
                }
            });
        `;
        command = `node ${filePath}`;
    } else if (language === 'python') {
        filePath = path.join(tempDir, `${filename}.py`);
        wrappedCode += `
import json
test_cases = ${JSON.stringify(testCases)}
for i, tc in enumerate(test_cases):
    try:
        args = json.loads("[" + tc.input + "]")
        print(solve(*args), end=("###" if i < len(test_cases) - 1 else ""))
    except Exception as e:
        import sys
        sys.stderr.write("Runtime Error")
        `;
        command = `python ${filePath}`;
    } else if (language === 'cpp') {
        filePath = path.join(tempDir, `${filename}.cpp`);
        const cppExe = path.join(tempDir, `${filename}.exe`);
        // Note: For C++/Java, it's easier to have the user handle I/O or use a more complex header.
        // For now, we'll keep the standard compilation.
        compileCommand = `g++ "${filePath}" -o "${cppExe}"`;
        command = `"${cppExe}"`;
    } else if (language === 'java') {
        filePath = path.join(tempDir, `Solution.java`);
        compileCommand = `javac "${filePath}"`;
        command = `java -cp "${tempDir}" Solution`;
    }

    try {
        // Write the wrapped code to file
        fs.writeFileSync(filePath, wrappedCode);

        const execute = (cmd) => {
            return new Promise((resolve) => {
                exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
                    resolve({ error, stdout, stderr });
                });
            });
        };

        // 2. Compilation Step
        if (compileCommand) {
            const compileResult = await execute(compileCommand);
            if (compileResult.error) {
                cleanup(filePath);
                return res.json({ 
                    success: false, 
                    output: compileResult.stderr || compileResult.error.message,
                    message: "⚔️ Compilation Error" 
                });
            }
        }

        // 3. Execution Step
        const runResult = await execute(command);
        cleanup(filePath);

        if (runResult.error) {
            return res.json({ 
                success: false, 
                output: runResult.stderr || "Runtime Error", 
                message: "❌ Defeat" 
            });
        }

        const rawOutput = runResult.stdout.trim();
        // Split outputs by our delimiter to check multiple test cases
        const userResults = rawOutput.split("###");
        
        let allPassed = true;
        let feedback = "";

        if (testCases && testCases.length > 0) {
            testCases.forEach((tc, index) => {
                const expected = tc.expected.toString().trim();
                const actual = userResults[index] ? userResults[index].trim() : "No Output";
                
                if (actual !== expected) {
                    allPassed = false;
                    feedback += `TC ${index + 1}: Expected ${expected}, got ${actual}\n`;
                } else {
                    feedback += `TC ${index + 1}: Passed ✅\n`;
                }
            });
        }

        res.json({
            success: allPassed,
            output: feedback || rawOutput,
            message: allPassed ? "✅ Victory! All Test Cases Passed." : "❌ Wrong Answer"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "The Judge is busy." });
    }
});

function cleanup(filePath) {
    try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        const base = filePath.split('.').slice(0, -1).join('.');
        if (fs.existsSync(`${base}.exe`)) fs.unlinkSync(`${base}.exe`);
        if (fs.existsSync(`${base}.class`)) fs.unlinkSync(`${base}.class`);
    } catch (e) {
        console.error("Cleanup error", e);
    }
}

module.exports = router;