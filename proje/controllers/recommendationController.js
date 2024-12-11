const { exec } = require('child_process');

exports.getRecommendations = (req, res) => {
    const { userId } = req.body;

    // Python scriptini çalıştır
    const pythonProcess = exec(`python3 ml/recommendation.py ${userId}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Hata: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Hata: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        console.log(`Çıktı: ${stdout}`);
        res.json({ recommendations: JSON.parse(stdout) });
    });
};
