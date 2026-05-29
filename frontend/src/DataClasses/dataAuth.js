export class LoginData {

    username = ""
    password = ""

    isValid() {

        const errors = {
            username: [],
            password: []
        }

        if ([null, undefined, ""].includes(this.username)) {

            errors.username.push(
                "Username is required!"
            )

        } else if (this.username.length <= 5) {

            errors.username.push(
                "Username must be greater than 5 characters!"
            )

        }

        if ([null, undefined, ""].includes(this.password)) {

            errors.password.push(
                "Password is required!"
            )

        } else if (this.password.length <= 8) {

            errors.password.push(
                "Password must be greater than 8 characters!"
            )

        }

        return {
            success:
                errors.username.length === 0 &&
                errors.password.length === 0,

            errors
        }

    }

    toObject() {

        return {
            username: this.username.toLowerCase(),
            password: this.password
        }

    }

}
export class SignupData {

    username = ""
    email = ""
    password = ""
    confirm = ""

    isValid() {

        const errors = {
            username: [],
            email: [],
            password: [],
            confirm: []
        }

        // Username validation
        if ([null, undefined, ""].includes(this.username)) {

            errors.username.push(
                "Username is required!"
            )

        } else if (this.username.length <= 5) {

            errors.username.push(
                "Username must be greater than 5 characters!"
            )

        }

        // Email validation
        if ([null, undefined, ""].includes(this.email)) {

            errors.email.push(
                "Email is required!"
            )

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
        ) {

            errors.email.push(
                "Invalid email address!"
            )

        }

        // Password validation
        if ([null, undefined, ""].includes(this.password)) {

            errors.password.push(
                "Password is required!"
            )

        } else if (this.password.length <= 8) {

            errors.password.push(
                "Password must be greater than 8 characters!"
            )

        }

        // Confirm password validation
        if (this.confirm !== this.password) {

            console.log(this.confirm, this.password)

            errors.confirm.push(
                "Passwords do not match!"
            )

        }

        return {

            success:
                errors.username.length === 0 &&
                errors.email.length === 0 &&
                errors.password.length === 0 &&
                errors.confirm.length === 0,

            errors

        }

    }

    toObject() {

        return {
            username: this.username.toLowerCase(),
            email: this.email.toLowerCase(),
            password: this.password
        }

    }

}