const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const Submission = require('../models/Submission');
const User = require('../models/User');

const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;

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
        compileCommand = `g++ "${filePath}" -o "${cppExe}"`;
        command = `"${cppExe}"`;
    } else if (language === 'java') {
        filePath = path.join(tempDir, `Solution.java`);
        compileCommand = `javac "${filePath}"`;
        command = `java -cp "${tempDir}" Solution`;
    }

    try {
      
        fs.writeFileSync(filePath, wrappedCode);

        const execute = (cmd) => {
            return new Promise((resolve) => {
                exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
                    resolve({ error, stdout, stderr });
                });
            });
        };

        if (compileCommand) {
            const compileResult = await execute(compileCommand);
            if (compileResult.error) {
                cleanup(filePath);
                return res.json({
                    success: false,
                    output: compileResult.stderr || compileResult.error.message,
                    message: "Compilation Error" 
                });
            }
        }

        const runResult = await execute(command);
        cleanup(filePath);

        if (runResult.error) {
            return res.json({ 
                success: false, 
                output: runResult.stderr || "Runtime Error", 
                message: "Defeat" 
            });
        }

        const rawOutput = runResult.stdout.trim();
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

// SUBMIT ROUTE
router.post('/submit', auth, async (req, res) => {
    const { code, language, testCases, questId, floorId, subject, expectedXp } = req.body;
    const filename = `quest_${Date.now()}`;
    let filePath = '';
    let command = '';
    let compileCommand = '';

    let wrappedCode = code;

    // Build the execution string exactly like /run
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
        compileCommand = `g++ "${filePath}" -o "${cppExe}"`;
        command = `"${cppExe}"`;
    } else if (language === 'java') {
        filePath = path.join(tempDir, `Solution.java`);
        compileCommand = `javac "${filePath}"`;
        command = `java -cp "${tempDir}" Solution`;
    }

    try {
        fs.writeFileSync(filePath, wrappedCode);

        const execute = (cmd) => {
            return new Promise((resolve) => {
                exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
                    resolve({ error, stdout, stderr });
                });
            });
        };

        if (compileCommand) {
            const compileResult = await execute(compileCommand);
            if (compileResult.error) {
                cleanup(filePath);
                return res.json({
                    success: false,
                    output: compileResult.stderr || compileResult.error.message,
                    message: "Compilation Error" 
                });
            }
        }

        const runResult = await execute(command);
        cleanup(filePath);

        if (runResult.error) {
            return res.json({ 
                success: false, 
                output: runResult.stderr || "Runtime Error", 
                message: "Defeat" 
            });
        }

        const rawOutput = runResult.stdout.trim();
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

        const finalStatus = allPassed ? 'success' : 'failed';
        
        // Save submission
        const submission = new Submission({
            userId: req.user.id,
            questId,
            floorId,
            subject,
            code,
            status: finalStatus,
            language
        });
        await submission.save();

        let xpAdded = 0;
        let levelUp = false;
        
        // Add XP if passed and never passed before
        if (allPassed && expectedXp) {
            const hasPassedBefore = await Submission.findOne({
                userId: req.user.id,
                questId,
                status: 'success',
                _id: { $ne: submission._id }
            });
            
            if (!hasPassedBefore) {
                let user = await User.findById(req.user.id);
                if (user) {
                    const oldLevel = calculateLevel(user.xp);
                    user.xp += expectedXp;
                    const newLevel = calculateLevel(user.xp);
                    if (newLevel > oldLevel) {
                        user.level = newLevel;
                        levelUp = true;
                    }
                    await user.save();
                    xpAdded = expectedXp;
                }
            }
        }

        res.json({
            success: allPassed,
            output: feedback || rawOutput,
            message: allPassed ? "✅ Victory! Submission accepted." : "❌ Wrong Answer",
            xpAdded,
            levelUp
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "The Judge is busy." });
    }
});

const sqlite3 = require('sqlite3').verbose();

// SQL Judge Route using Local In-Memory DB
router.post('/run-sql', (req, res) => {
    const { query, initScript, expectedOutput } = req.body;

    if (!query || !query.trim()) {
        return res.json({ success: false, output: "Query cannot be empty.", message: "❌ Syntax Error" });
    }

    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
        if (initScript) {
            db.exec(initScript, (err) => {
                if (err) {
                    db.close();
                    return res.json({ success: false, output: err.message, message: "❌ Schema Init Error" });
                }
            });
        }

        db.all(query, [], (err, rows) => {
            db.close();
            if (err) {
                return res.json({ success: false, output: err.message, message: "❌ Execution Error" });
            }

            let userOutput = "";
            if (rows && rows.length > 0) {
                userOutput = rows.map(row => Object.values(row).join('|')).join('\n');
            }

            const normalizedUser = userOutput.replace(/\r\n/g, '\n').trim();
            const normalizedExpected = (expectedOutput || "").replace(/\r\n/g, '\n').trim();

            if (normalizedUser === normalizedExpected) {
                res.json({
                    success: true,
                    output: userOutput,
                    message: "✅ Valid Query! System logic verified."
                });
            } else {
                res.json({
                    success: false,
                    output: `Result:\n${userOutput || "<No Rows>"}\n\nExpected:\n${expectedOutput}`,
                    message: "❌ Incorrect Result Set"
                });
            }
        });
    });
});

module.exports = router;