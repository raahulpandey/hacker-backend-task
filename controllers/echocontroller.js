exports.echo =(req, res) => {
    const { name, age } = req.body;

    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (typeof name !== 'string') return res.status(400).json({ error: 'Name must be a string' });
    if (name.trim().length < 2) return res.status(400).json({ error: 'Name must be at least 2 characters long' });

    if (age === undefined) return res.status(400).json({ error: 'Age is required' });
    if (typeof age !== 'number') return res.status(400).json({ error: 'Age must be a number' });
    if (age < 1 || age > 150) return res.status(400).json({ error: 'Age must be between 1 and 150' });

    res.status(200).json({ success: true, you_sent: { name: name.trim(), age } });
} ;