export const fileToBase64 = (file: File | null) =>
    new Promise((resolve, reject) => {
        if (!file) return null
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
