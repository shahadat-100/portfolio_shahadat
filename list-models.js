const { GoogleGenerativeAI } = require('@google/generative-ai');


async function run() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAezS5odbRjtadStDfUQwDG_u9jyWieass`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error(e);
  }
}
run();
