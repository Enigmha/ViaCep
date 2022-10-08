export default function RequesetException(message){
    const error = new Error(message);
    return error;
}

RequesetException.prototype = Object.create(Error.prototype);
