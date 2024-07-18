import image from "../../assets/images/error.svg"
const ErrorPage = () => {
    return (
        <div className="w-full object-cover flex items-center justify-center">
            <img src={image} alt="error-image"/>
        </div>
    )
}

export default ErrorPage;