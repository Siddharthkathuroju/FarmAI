import axios from "axios";

export default async function translate(text: string, targetLang: string): Promise<string> {
    const API_KEY = "<API_KEY>";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    try {
        const response = await axios.post(url, {
            q: text,
            target: targetLang,
        });

        const translatedText = response.data.data.translations[0].translatedText;
        return translatedText;
    } catch (error) {
        throw error;
    }
}