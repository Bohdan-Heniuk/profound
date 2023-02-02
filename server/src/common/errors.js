export function ForbidenException(message) {
    this.message = message,
    this.status = 403
}

export function BadRequest(message) {
    this.message = message,
    this.status = 400
}

export function InternalError(message) {
    this.message = message,
    this.status = 500
}

export function UnauthorizedException(message) {
    this.message = message
    this.status = 401
}