const logger = (req, res, next) => {
    console.log(req.method, req.url);
    // res.json({ res: "Response from the middleware" })
    next();
}

//DUMMY
// const auth = (req, res, next) => {
//     const { username, password } = req.body;
//     if (username === "admin" && password === "admin") next();
//     else res.status(401).json({ msg: "failed authentication" })
// }

module.exports = { logger }