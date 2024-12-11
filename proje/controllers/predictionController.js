const { exec } = require('child_process');

exports.predict = (req, res) => {
    const { features } = req.body; // Örn: [5.1, 3.5, 1.4, 0.2]

    // Python scriptini çalıştır
    const pythonProcess = exec(`python3 ml/predict.py ${features.join(' ')}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Hata: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Hata: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        console.log(`Çıktı: ${stdout}`);
        res.json({ prediction: stdout.trim() });
    });
};
