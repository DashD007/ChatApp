const asyncHandler = (requestfunction) => async(req,res,next) => {
    try {
        await requestfunction(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
}

export default asyncHandler;