export class AuthService {
    static login(email, password) {
        return fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    }

    static checkExistingUser(email) {
        return fetch("http://localhost:8080/user/getUserByEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: email,
        });
    }
}