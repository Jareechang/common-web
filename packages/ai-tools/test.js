const ai = require('./dist');

async function main() {
  //const cost = await ai.estimateCost({
    //prompt: 'hello there what’s new today ?'
  //})
  const entities = await ai.nlp.extractEntities({
    prompt: 'hello there what’s new today ?'
  })
  console.log(entities);

  const cost = await ai.estimateCost({
    prompt: 'hello there what’s new today ?'
  })
  console.log(cost);
}

main()
