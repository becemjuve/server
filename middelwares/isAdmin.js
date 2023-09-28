

exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(401).json({message:"only admin can acces this page"})
    next();
}