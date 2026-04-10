export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { imageBase64, mediaType, lang } = req.body;
  if (!imageBase64) return res.status(400).json({ error: 'No image provided' });

  const prompt = lang === 'en'
    ? `Analyze this food image and respond ONLY with a JSON object. No explanation, no markdown, just raw JSON:
{"name":"food name","calories":number,"carbs":number,"protein":number,"fat":number,"sodium":number,"detail":"2-3 sentences about nutrition and health tips for this food"}
All numbers must be integers. sodium is in mg.`
    : `이 음식 사진을 분석해서 JSON만 반환해줘. 설명 없이 JSON만:
{"name":"음식이름","calories":숫자,"carbs":숫자,"protein":숫자,"fat":숫자,"sodium":숫자,"detail":"이 음식의 영양 정보와 건강 조언 2~3문장"}
모든 숫자는 정수. sodium은 mg 단위.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64
              }
            },
            { type: 'text', text: prompt }
          ]
        }]
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'API error' });

    const text = data.content[0].text.trim().replace(/```json|```/g, '').trim();
    const result = JSON.parse(text);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
