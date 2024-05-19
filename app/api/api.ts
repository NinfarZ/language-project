export async function translateWord(lang: string, text: string) {
    const response = await fetch(`https://api.languagetoolplus.com/v2/check?text=${text}&language=${lang}`, {method: 'POST'});
    return response.json()
  }
