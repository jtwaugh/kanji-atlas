const BASIC = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', ゐ: 'i', ゑ: 'e', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
};

const YOUON = {
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
};

const LONG_VOWEL = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };

export function kanaToRomaji(kana) {
  if (!kana) return '';
  let out = '';
  let i = 0;
  while (i < kana.length) {
    const ch = kana[i];
    if (ch === '.' || ch === '-' || ch === '・') {
      out += ch;
      i++;
      continue;
    }
    if (ch === 'ー') {
      const last = out[out.length - 1];
      out += LONG_VOWEL[last] ? '' : '';
      if (last && LONG_VOWEL[last]) out = out.slice(0, -1) + LONG_VOWEL[last];
      i++;
      continue;
    }
    if (ch === 'っ') {
      const next = kana.slice(i + 1, i + 3);
      const nextR = YOUON[next] || BASIC[kana[i + 1]] || '';
      out += nextR[0] || '';
      i++;
      continue;
    }
    const pair = kana.slice(i, i + 2);
    if (YOUON[pair]) {
      out += YOUON[pair];
      i += 2;
      continue;
    }
    if (BASIC[ch]) {
      const r = BASIC[ch];
      const prev = out[out.length - 1];
      // Collapse おう/おお → ō, うう → ū, etc. for on'yomi long vowels.
      if (
        (prev === 'o' && (r === 'u' || r === 'o')) ||
        (prev === 'u' && r === 'u')
      ) {
        out = out.slice(0, -1) + LONG_VOWEL[prev];
      } else {
        out += r;
      }
      i++;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}
