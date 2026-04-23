export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY is not set. Skipping verification.");
    // If we're missing the key, we can either fail or pass. 
    // Passing is safer for dev, but we should log it.
    return true; 
  }

  if (!token) {
    return false;
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await res.json();
    
    // v3 returns a score. We can set a threshold like 0.5
    if (data.success && data.score >= 0.5) {
      return true;
    }

    console.error("reCAPTCHA validation failed", data);
    return false;
  } catch (err) {
    console.error("Error validating reCAPTCHA", err);
    return false;
  }
}
