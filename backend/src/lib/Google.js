// lib/Google.js
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (access_token) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        const payload = await response.json();

        return {
            googleId: payload.sub,
            email: payload.email,
            fullName: payload.name,
            profilePic: payload.picture,
        };
    } catch (error) {
        throw new Error("Invalid Google Token");
    }
};