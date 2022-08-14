module.exports = ThisFunc => (req,res,next) => {
    Promise.resolve(ThisFunc(req,res,next)).catch(next)
}