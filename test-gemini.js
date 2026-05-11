const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyAezS5odbRjtadStDfUQwDG_u9jyWieass');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
async function run() {
  try {
    const result = await model.generateContent("Hello");
    console.log(result.response.text());
  } catch(e) {
    console.error(e);
  }
}
run();
