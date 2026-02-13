export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        }),
      }
    );

    const data = await response.json();
   const base64Image = data.data[0].b64_json;
const imageUrl = `data:image/png;base64,${base64Image}`;

res.status(200).json({ image: imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Image generation failed" });
  }
}
