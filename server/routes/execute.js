const axios = require('axios');
router.get('/me', exports.getMe);
router.post('/submit', auth, async (req, res) => {
  const { code, language_id, questId } = req.body;

  const quest = await Quest.findById(questId);

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'false', wait: 'true' },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE0_KEY
    },
    data: {
      source_code: code,
      language_id: language_id,
      stdin: quest.testCases[0].input 
    }
  };

  try {
    const response = await axios.request(options);
    const output = response.data.stdout;

    if (output.trim() === quest.testCases[0].expectedOutput.trim()) {
      return res.json({ status: 'Passed', xpAwarded: quest.baseXP });
    } else {
      return res.json({ status: 'Failed', actual: output });
    }
  } catch (error) {
    res.status(500).json({ error: "Judge0 Service Down" });
  }
});