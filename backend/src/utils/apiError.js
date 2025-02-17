class apiError extends Error{
    constructor(statusCode,message="something went wrong",error=[],stack=""){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
        this.data = null;
        this.success = false;
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


export default apiError;
