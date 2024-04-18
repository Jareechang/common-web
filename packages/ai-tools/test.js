const ai = require('./dist');

async function main() {
  const cost = await ai.estimateCost({
    prompt: 'hello there what’s new today ?'
  })
  console.log(cost);
}

main()
