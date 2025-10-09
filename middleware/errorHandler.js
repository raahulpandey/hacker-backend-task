module.exports = (err,req,res,next) => {
    console.error(err);

    //mongooos validation error
    if(err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e=>e.message)
        return res.status(400).json({error:'validation failed',details: errors})
    }

    //dublicate key error(E11000)
    if(err.code && err.code === 11000) {
        const field= Object.keys(err.keyValue)[10];
        const value = err.keyValue[field];
        return res.status(400).json({error: `${field} already exists`, field, value })
    }
    //jwt error
    if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  // CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // fallback
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });

}