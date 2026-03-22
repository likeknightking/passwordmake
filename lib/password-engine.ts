export interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

export interface PasswordResult {
  password: string
  entropy: number
  strength: 'weak' | 'fair' | 'strong' | 'unbreakable'
  crackTime: string
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/'
const AMBIGUOUS = /[0OlI1]/g

// EFF word list sample (300 words for passphrase generation)
const EFF_WORDS = [
  'ability','absence','abstract','academy','account','achieve','acquire','action',
  'address','advance','advice','afford','agency','agenda','agreed','aircraft',
  'airline','airport','algebra','almost','already','ancient','another','anxiety',
  'archive','around','article','artist','assume','attempt','auction','average',
  'balance','battery','because','becomes','before','behind','believe','beneath',
  'benefit','between','billion','border','bottle','branch','breath','bridge',
  'broken','budget','button','camera','cancel','carbon','career','careful',
  'carpet','castle','casual','caught','center','charge','cherry','chosen',
  'circle','client','coffee','column','common','compare','complex','confirm',
  'connect','content','contest','control','corner','cotton','county','couple',
  'course','cousin','create','credit','crisis','crystal','custom','damage',
  'danger','debate','decide','degree','design','detail','device','dinner',
  'direct','divide','dollar','domain','double','dragon','drawer','driven',
  'driver','during','easily','effect','effort','either','eleven','empire',
  'employ','enable','engage','engine','enough','entire','escape','estate',
  'expert','fabric','factor','failed','family','famous','federal','finish',
  'flower','follow','forest','formal','format','fortune','fossil','friend',
  'garden','gather','gentle','global','golden','govern','ground','handle',
  'happen','harbor','health','hidden','higher','honest','hospital','human',
  'import','income','indeed','island','itself','jigsaw','jungle','junior',
  'justice','kernel','kimono','laptop','launch','leader','lesson','letter',
  'likely','listen','little','living','locate','longer','manage','manner',
  'margin','market','matter','medium','member','mental','message','method',
  'middle','mirror','mobile','modern','moment','mostly','mountain','moving',
  'museum','mutual','nature','nearly','needed','normal','notice','number',
  'object','online','option','orange','origin','output','outside','oxygen',
  'parent','patient','patrol','pattern','people','person','phrase','picture',
  'planet','player','plenty','pocket','policy','portal','prefer','pretty',
  'prince','prison','process','profit','project','proper','protect','proven',
  'public','purple','puzzle','quality','quarter','quickly','rabbit','reason',
  'remain','remove','repair','report','result','return','reveal','ribbon',
  'rocket','rotate','safety','salmon','sample','saving','school','screen',
  'search','secret','select','series','simple','single','sister','silver',
  'slight','social','source','stable','staff','standard','start','static',
  'steady','stone','story','street','strong','student','submit','sudden',
  'super','system','table','target','travel','under','unique','update',
  'useful','vector','vendor','viable','visual','volume','wallet','while',
]

function getCharset(options: PasswordOptions): string {
  let charset = ''
  if (options.uppercase) charset += UPPERCASE
  if (options.lowercase) charset += LOWERCASE
  if (options.numbers) charset += NUMBERS
  if (options.symbols) charset += SYMBOLS
  if (options.excludeAmbiguous) charset = charset.replace(AMBIGUOUS, '')
  return charset
}

/** Draw a single unbiased index in [0, rangeSize) from a Uint32 random source. */
function unbiasedIndex(rangeSize: number): number {
  const limit = Math.floor(2 ** 32 / rangeSize) * rangeSize
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const buf = new Uint32Array(1)
    crypto.getRandomValues(buf)
    if (buf[0] < limit) return buf[0] % rangeSize
  }
}

export function generatePassword(options: PasswordOptions): PasswordResult {
  const charset = getCharset(options)
  if (!charset) throw new Error('At least one character type must be selected')

  let password = ''
  for (let i = 0; i < options.length; i++) {
    password += charset[unbiasedIndex(charset.length)]
  }

  // Ensure at least one char from each selected type
  const ensure: string[] = []
  if (options.uppercase) ensure.push(UPPERCASE)
  if (options.lowercase) ensure.push(LOWERCASE)
  if (options.numbers) ensure.push(NUMBERS)
  if (options.symbols) ensure.push(SYMBOLS)

  if (ensure.length > 1) {
    const arr = password.split('')
    ensure.forEach((set) => {
      const filteredSet = options.excludeAmbiguous ? set.replace(AMBIGUOUS, '') : set
      if (filteredSet.length > 0) {
        const pos = unbiasedIndex(options.length)
        arr[pos] = filteredSet[unbiasedIndex(filteredSet.length)]
      }
    })
    password = arr.join('')
  }

  const entropy = calculateEntropy(charset.length, options.length)
  return {
    password,
    entropy,
    strength: getStrength(entropy),
    crackTime: estimateCrackTime(entropy),
  }
}

export function generatePassphrase(wordCount: number, separator = '-'): PasswordResult {
  const words = Array.from({ length: wordCount }, () => EFF_WORDS[unbiasedIndex(EFF_WORDS.length)])
  const passphrase = words.join(separator)
  const entropy = wordCount * Math.log2(EFF_WORDS.length)
  return {
    password: passphrase,
    entropy,
    strength: getStrength(entropy),
    crackTime: estimateCrackTime(entropy),
  }
}

export function generateBulk(options: PasswordOptions, count: number): PasswordResult[] {
  return Array.from({ length: count }, () => generatePassword(options))
}

function calculateEntropy(charsetSize: number, length: number): number {
  return length * Math.log2(charsetSize)
}

function getStrength(entropy: number): PasswordResult['strength'] {
  if (entropy < 40) return 'weak'
  if (entropy < 60) return 'fair'
  if (entropy < 80) return 'strong'
  return 'unbreakable'
}

function estimateCrackTime(entropy: number): string {
  // Assuming 10 billion guesses/second (modern GPU cluster)
  const guesses = Math.pow(2, entropy)
  const seconds = guesses / 1e10

  if (seconds < 1) return 'less than a second'
  if (seconds < 60) return `${Math.round(seconds)} seconds`
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000).toLocaleString()} years`
  if (seconds < 31536000 * 1e9) return `${(seconds / 31536000 / 1e6).toFixed(1)} million years`
  return 'longer than the age of the universe'
}
